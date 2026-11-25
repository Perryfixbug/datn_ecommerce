import { Module } from "@nestjs/common"
import { DatabaseModule } from "../../infrastructure/database/database.module.js"
import { AccessTokenGuard } from "./access-token.guard.js"
import { AuthController } from "./auth.controller.js"
import { AuthService } from "./auth.service.js"
import { JwtService } from "./jwt.service.js"
import { PasswordService } from "./password.service.js"

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService, PasswordService, AccessTokenGuard],
  exports: [AuthService, JwtService, AccessTokenGuard],
})
export class AuthModule {}
