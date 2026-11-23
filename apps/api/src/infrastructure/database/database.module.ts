import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { PrismaService } from "./prisma.service.js"

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: [".env", "apps/api/.env"] })],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
