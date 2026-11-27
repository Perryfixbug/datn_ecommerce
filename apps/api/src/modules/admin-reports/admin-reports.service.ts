import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common"
import { randomBytes } from "node:crypto"
import type { z } from "zod"
import {
  ReportsResolveAdminReportBody,
  ReportsResolveAdminReportResponse,
} from "../../../../../packages/api-contract/src/generated/admin.js"
import { Prisma } from "../../../generated/prisma/client.js"
import { PrismaService } from "../../infrastructure/database/prisma.service.js"

export type ReportResolutionInput = z.infer<
  typeof ReportsResolveAdminReportBody
>
const newId = () => randomBytes(8).readBigUInt64BE() & 0x7fffffffffffffffn || 1n

@Injectable()
export class AdminReportsService {
  constructor(private readonly db: PrismaService) {}

  async resolve(
    value: string,
    actorId: bigint,
    input: ReportResolutionInput
  ): Promise<z.infer<typeof ReportsResolveAdminReportResponse>> {
    const id = BigInt(value)
    if (id < 1n || id > 9223372036854775807n)
      throw new BadRequestException({
        code: "VALIDATION_ERROR",
        message: "ID báo cáo vượt miền bigint",
      })
    const reason = input.reason.trim()
    try {
      return await this.db.$transaction(
        async (tx) => {
          const report = await tx.baoCao.findUnique({
            where: { idBaoCao: id },
            select: { idNguoiMua: true },
          })
          if (!report)
            throw new NotFoundException({
              code: "NOT_FOUND",
              message: "Không tìm thấy báo cáo",
            })
          const now = new Date()
          const updated = await tx.baoCao.updateMany({
            where: { idBaoCao: id, trangThai: "ChoXuLy" },
            data: {
              trangThai: "DaKetLuan",
              ketQua: input.outcome,
              idNhanVien: actorId,
              thoiGianDong: now,
              updatedAt: now,
            },
          })
          if (updated.count !== 1) this.conflict()
          await tx.lichSuXuLy.create({
            data: {
              idLichSuXuLy: newId(),
              idBaoCao: id,
              idNhanVien: actorId,
              hanhDong: input.outcome,
              ghiChu: reason,
              thoiGian: now,
            },
          })
          await tx.thongBao.create({
            data: {
              idThongBao: newId(),
              idNguoiDung: report.idNguoiMua,
              loai: "HeThong",
              tieuDe: "Kết quả xử lý báo cáo vi phạm",
              noiDung: input.outcome + ": " + reason,
              thoiGianGui: now,
              doiTuongLienQuan: "report:" + value,
            },
          })
          return {
            reportId: value,
            status: "DaKetLuan",
            outcome: input.outcome,
            reason,
            handlerId: actorId.toString(),
            closedAt: now.toISOString(),
          }
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
      message: "Báo cáo đã được kết luận hoặc vừa thay đổi; tải lại hồ sơ",
    })
  }
}
