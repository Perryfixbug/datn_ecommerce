import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  SetMetadata,
} from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { PrismaService } from "../../infrastructure/database/prisma.service.js"
import type { AuthRequest } from "../auth/auth.types.js"

export const RequireModerationPermission = (permission: "read" | "review") =>
  SetMetadata("moderationPermission", permission)
@Injectable()
export class ModerationPermissionsGuard implements CanActivate {
  constructor(
    private readonly db: PrismaService,
    private readonly reflector: Reflector
  ) {}
  async canActivate(context: ExecutionContext) {
    const { user } = context.switchToHttp().getRequest<AuthRequest>()
    if (user.role !== "NhanVien") this.deny()
    const staff = await this.db.nhanVienSan.findUnique({
      where: { idNhanVien: BigInt(user.id) },
      select: {
        chucVu: true,
        nguoiDung: { select: { vaiTro: true, trangThai: true } },
      },
    })
    const permission = this.reflector.get<string>(
      "moderationPermission",
      context.getHandler()
    )
    if (
      !staff ||
      staff.nguoiDung.vaiTro !== "NhanVien" ||
      staff.nguoiDung.trangThai !== "HoatDong" ||
      !(
        ["QuanTriVien", "KiemDuyetVien"].includes(staff.chucVu) ||
        (permission === "read" && staff.chucVu === "NhanVienVanHanh")
      )
    )
      this.deny()
    return true
  }
  private deny(): never {
    throw new ForbiddenException({
      code: "FORBIDDEN",
      message: "Không có quyền kiểm duyệt sản phẩm",
    })
  }
}
