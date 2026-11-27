import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common"
import { randomBytes } from "node:crypto"
import type { z } from "zod"
import {
  CasesListAdminCasesQueryParams,
  CasesListAdminCasesResponse,
  CasesGetAdminCaseResponse,
  CasesResolveAdminCaseBody,
} from "../../../../../packages/api-contract/src/generated/admin.js"
import { Prisma } from "../../../generated/prisma/client.js"
import { PrismaService } from "../../infrastructure/database/prisma.service.js"

export type CaseQuery = z.infer<typeof CasesListAdminCasesQueryParams>
export type Resolution = z.infer<typeof CasesResolveAdminCaseBody>
type Summary = z.infer<typeof CasesListAdminCasesResponse>["items"][number]
type Detail = z.infer<typeof CasesGetAdminCaseResponse>
type Row = Omit<Detail, "createdAt" | "closedAt" | "history"> & {
  createdAt: Date
  closedAt: Date | null
}

export function parseCaseId(value: string) {
  const [kind, ...parts] = value.split(":")
  if (
    !/^(complaint:[1-9][0-9]{0,18}|report:[1-9][0-9]{0,18}|dispute:[1-9][0-9]{0,18}:[1-9][0-9]{0,18})$/.test(
      value
    ) ||
    parts.some((part) => BigInt(part) > 9223372036854775807n)
  )
    throw new BadRequestException({
      code: "VALIDATION_ERROR",
      message: "caseId không hợp lệ hoặc vượt miền bigint",
    })
  return {
    kind,
    id: BigInt(parts[0]!),
    storeId: parts[1] ? BigInt(parts[1]) : null,
  }
}

// UNION tại DB để giới hạn dữ liệu trước khi trả về, không tải cả ba bảng vào bộ nhớ.
const casesSql = Prisma.sql`
  SELECT 'complaint:' || k."idKhieuNai" AS "caseId", 'complaint' AS kind,
    k."trangThai" AS status, k."idNguoiGui"::text AS "requesterId", u."hoTen" AS "requesterName",
    k."idDonHang"::text AS "orderId", NULL::text AS "storeId", NULL::text AS "productId",
    k."thoiGianGui" AS "createdAt", k."thoiGianDong" AS "closedAt",
    k."noiDung" AS content, k."bangChung" AS evidence, k."ketQua" AS outcome,
    k."lyDoXuLy" AS reason, k."idNhanVien"::text AS "handlerId"
  FROM "KhieuNai" k JOIN "NguoiDung" u ON u."idNguoiDung" = k."idNguoiGui"
  UNION ALL
  SELECT 'report:' || b."idBaoCao", 'report',
    CASE WHEN b."trangThai" = 'ChoXuLy' THEN 'ChoXuLy' ELSE 'DaXuLy' END,
    b."idNguoiMua"::text, u."hoTen", NULL::text, s."idCuaHang"::text, b."idSanPham"::text,
    b."thoiGianGui", b."thoiGianDong", concat_ws(E'\n', b."lyDo", b."moTa"), b."bangChung", b."ketQua", NULL::text, b."idNhanVien"::text
  FROM "BaoCao" b JOIN "NguoiDung" u ON u."idNguoiDung" = b."idNguoiMua"
  JOIN "SanPham" s ON s."idSanPham" = b."idSanPham"
  UNION ALL
  SELECT 'dispute:' || t."idDonHang" || ':' || t."idCuaHang", 'dispute',
    CASE WHEN t."trangThaiTranhChap" = 'ChoXuLy' THEN 'ChoXuLy' ELSE 'DaXuLy' END,
    d."idNguoiMua"::text, u."hoTen", t."idDonHang"::text, t."idCuaHang"::text, NULL::text,
    t."thoiGianMo", t."thoiDiemPhanXu", concat_ws(E'\n', h."lyDoHoan", h."moTa"), h."bangChung", t."ketQua", t."lyDoPhanQuyet", t."idNhanVien"::text
  FROM "TranhChap" t JOIN "HoanHang" h ON h."idDonHang" = t."idDonHang" AND h."idCuaHang" = t."idCuaHang"
  JOIN "DonHang" d ON d."idDonHang" = t."idDonHang"
  JOIN "NguoiDung" u ON u."idNguoiDung" = d."idNguoiMua"
`

function summary(row: Row): Summary {
  return {
    caseId: row.caseId,
    kind: row.kind,
    status: row.status,
    requesterId: row.requesterId,
    requesterName: row.requesterName,
    orderId: row.orderId,
    storeId: row.storeId,
    productId: row.productId,
    createdAt: row.createdAt.toISOString(),
    closedAt: row.closedAt?.toISOString() ?? null,
  }
}
const newId = () => randomBytes(8).readBigUInt64BE() & 0x7fffffffffffffffn || 1n

@Injectable()
export class AdminCasesService {
  constructor(private readonly db: PrismaService) {}

  async list(
    query: CaseQuery
  ): Promise<z.infer<typeof CasesListAdminCasesResponse>> {
    if (query.cursor) parseCaseId(query.cursor)
    const filters = Prisma.sql`(${query.kind ?? null}::text IS NULL OR kind = ${query.kind ?? null}) AND (${query.status ?? null}::text IS NULL OR status = ${query.status ?? null})`
    return this.db.$transaction(
      async (tx) => {
        const counts = await tx.$queryRaw<{ total: bigint }[]>(
          Prisma.sql`SELECT count(*) AS total FROM (${casesSql}) c WHERE ${filters}`
        )
        const rows = await tx.$queryRaw<
          Row[]
        >(Prisma.sql`SELECT * FROM (${casesSql}) c WHERE ${filters}
        AND (${query.cursor ?? null}::text IS NULL OR "caseId" COLLATE "C" > ${query.cursor ?? null})
        ORDER BY "caseId" COLLATE "C" ASC LIMIT ${query.limit + 1}`)
        const items = rows.slice(0, query.limit).map(summary)
        return {
          total: Number(counts[0]!.total),
          items,
          nextCursor: rows.length > query.limit ? items.at(-1)!.caseId : null,
        }
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.RepeatableRead }
    )
  }

  async detail(
    value: string,
    tx: Prisma.TransactionClient = this.db
  ): Promise<Detail> {
    const id = parseCaseId(value)
    const rows = await tx.$queryRaw<Row[]>(
      Prisma.sql`SELECT * FROM (${casesSql}) c WHERE "caseId" = ${value}`
    )
    const row = rows[0]
    if (!row)
      throw new NotFoundException({
        code: "NOT_FOUND",
        message: "Không tìm thấy hồ sơ",
      })
    const history = await tx.lichSuXuLy.findMany({
      where:
        id.kind === "complaint"
          ? { idKhieuNai: id.id }
          : id.kind === "report"
            ? { idBaoCao: id.id }
            : { idDonHang: id.id, idCuaHang: id.storeId },
      orderBy: [{ thoiGian: "asc" }, { idLichSuXuLy: "asc" }],
      select: {
        idLichSuXuLy: true,
        idNhanVien: true,
        hanhDong: true,
        ghiChu: true,
        thoiGian: true,
      },
    })
    return {
      ...summary(row),
      content: row.content,
      evidence: row.evidence,
      outcome: row.outcome,
      reason: row.reason,
      handlerId: row.handlerId,
      history: history.map((item) => ({
        historyId: item.idLichSuXuLy.toString(),
        actorId: item.idNhanVien.toString(),
        action: item.hanhDong,
        reason: item.ghiChu,
        createdAt: item.thoiGian.toISOString(),
      })),
    }
  }

  async resolve(
    value: string,
    actorId: bigint,
    input: Resolution
  ): Promise<Detail> {
    const id = parseCaseId(value)
    if (id.kind !== "complaint")
      throw new BadRequestException({
        code: "VALIDATION_ERROR",
        message: "A-031 chỉ xử lý khiếu nại; báo cáo/tranh chấp dùng API riêng",
      })
    try {
      return await this.db.$transaction(
        async (tx) => {
          const before = await tx.khieuNai.findUnique({
            where: { idKhieuNai: id.id },
          })
          if (!before)
            throw new NotFoundException({
              code: "NOT_FOUND",
              message: "Không tìm thấy khiếu nại",
            })
          const now = new Date()
          const updated = await tx.khieuNai.updateMany({
            where: { idKhieuNai: id.id, trangThai: "ChoXuLy" },
            data: {
              trangThai: "DaXuLy",
              ketQua: input.outcome,
              lyDoXuLy: input.reason.trim(),
              idNhanVien: actorId,
              thoiGianDong: now,
              updatedAt: now,
            },
          })
          if (updated.count !== 1) this.conflict()
          await tx.lichSuXuLy.create({
            data: {
              idLichSuXuLy: newId(),
              idKhieuNai: id.id,
              idNhanVien: actorId,
              hanhDong: input.outcome,
              ghiChu: input.reason.trim(),
              thoiGian: now,
            },
          })
          await tx.thongBao.create({
            data: {
              idThongBao: newId(),
              idNguoiDung: before.idNguoiGui,
              loai: "HeThong",
              tieuDe: "Kết quả xử lý khiếu nại",
              noiDung: input.outcome + ": " + input.reason.trim(),
              thoiGianGui: now,
              doiTuongLienQuan: value,
            },
          })
          return this.detail(value, tx)
        },
        { isolationLevel: Prisma.TransactionIsolationLevel.Serializable }
      )
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2034"
      )
        this.conflict()
      throw error
    }
  }

  private conflict(): never {
    throw new ConflictException({
      code: "CONFLICT",
      message: "Khiếu nại đã được xử lý hoặc vừa thay đổi; tải lại hồ sơ",
    })
  }
}
