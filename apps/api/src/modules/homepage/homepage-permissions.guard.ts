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
export const RequireHomepagePermission = (
  permission: "read" | "edit" | "publish"
) => SetMetadata("homepagePermission", permission)
@Injectable()
export class HomepagePermissionsGuard implements CanActivate {
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
        nguoiDung: { select: { trangThai: true, vaiTro: true } },
      },
    })
    const permission = this.reflector.get<string>(
      "homepagePermission",
      context.getHandler()
    )
    if (
      !staff ||
      staff.nguoiDung.trangThai !== "HoatDong" ||
      staff.nguoiDung.vaiTro !== "NhanVien" ||
      !(
        staff.chucVu === "QuanTriVien" ||
        (staff.chucVu === "NhanVienVanHanh" &&
          ["read", "edit"].includes(permission)) ||
        (staff.chucVu === "KiemDuyetVien" && permission === "read")
      )
    )
      this.deny()
    return true
  }
  private deny(): never {
    throw new ForbiddenException({
      code: "FORBIDDEN",
      message: "Không có quyền quản lý trang chủ",
    })
  }
}
