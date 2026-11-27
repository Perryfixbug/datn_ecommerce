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

export type AccountRequest = AuthRequest & { accountScope: "all" | "customers" }
export const RequireAccountPermission = (permission: "read" | "manage") =>
  SetMetadata("accountPermission", permission)

@Injectable()
export class AccountPermissionsGuard implements CanActivate {
  constructor(
    private readonly db: PrismaService,
    private readonly reflector: Reflector
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<AccountRequest>()
    if (request.user.role !== "NhanVien") this.deny()
    const staff = await this.db.nhanVienSan.findUnique({
      where: { idNhanVien: BigInt(request.user.id) },
      select: {
        chucVu: true,
        nguoiDung: { select: { trangThai: true, vaiTro: true } },
      },
    })
    if (
      !staff ||
      staff.nguoiDung.trangThai !== "HoatDong" ||
      staff.nguoiDung.vaiTro !== "NhanVien"
    )
      this.deny()
    const manage =
      this.reflector.get<string>("accountPermission", context.getHandler()) ===
      "manage"
    if (staff.chucVu === "QuanTriVien") request.accountScope = "all"
    else if (staff.chucVu === "NhanVienVanHanh" && !manage)
      request.accountScope = "customers"
    else this.deny()
    return true
  }
  private deny(): never {
    throw new ForbiddenException({
      code: "FORBIDDEN",
      message: "Không có quyền quản lý tài khoản",
    })
  }
}
