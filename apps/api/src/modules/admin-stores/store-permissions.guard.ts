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

export type StorePermission =
  | "stores.read"
  | "stores.review"
  | "stores.manage-status"
const permissions: Record<string, readonly StorePermission[]> = {
  QuanTriVien: ["stores.read", "stores.review", "stores.manage-status"],
  KiemDuyetVien: ["stores.read", "stores.review"],
  NhanVienVanHanh: ["stores.read", "stores.manage-status"],
}
export const RequireStorePermission = (permission: StorePermission) =>
  SetMetadata("storePermission", permission)

@Injectable()
export class StorePermissionsGuard implements CanActivate {
  constructor(
    private readonly db: PrismaService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext) {
    const { user } = context.switchToHttp().getRequest<AuthRequest>()
    const permission = this.reflector.get<StorePermission>(
      "storePermission",
      context.getHandler()
    )
    if (
      !user ||
      user.role !== "NhanVien" ||
      !/^[1-9][0-9]{0,18}$/.test(user.id) ||
      BigInt(user.id) > 9223372036854775807n
    )
      this.deny()
    const staff = await this.db.nhanVienSan.findUnique({
      where: { idNhanVien: BigInt(user.id) },
      select: {
        chucVu: true,
        nguoiDung: { select: { trangThai: true, vaiTro: true } },
      },
    })
    if (
      !staff ||
      staff.nguoiDung.trangThai !== "HoatDong" ||
      staff.nguoiDung.vaiTro !== "NhanVien" ||
      !Object.hasOwn(permissions, staff.chucVu) ||
      !permissions[staff.chucVu]?.includes(permission)
    )
      this.deny()
    return true
  }

  private deny(): never {
    throw new ForbiddenException({
      code: "FORBIDDEN",
      message: "Không có quyền quản lý gian hàng",
    })
  }
}
