import { Module } from "@nestjs/common"
import { DatabaseModule } from "../../infrastructure/database/database.module.js"
import { AuthModule } from "../auth/auth.module.js"
import { AdminStoresController } from "./admin-stores.controller.js"
import { AdminStoresService } from "./admin-stores.service.js"
import { StorePermissionsGuard } from "./store-permissions.guard.js"

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [AdminStoresController],
  providers: [AdminStoresService, StorePermissionsGuard],
})
export class AdminStoresModule {}
