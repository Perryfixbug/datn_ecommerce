import { Controller, Get } from "@nestjs/common"
import type { HealthStatus } from "../../../../../packages/api-contract/src/index.js"

@Controller("health")
export class HealthController {
  @Get()
  read(): HealthStatus {
    return {
      status: "ok" as const,
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    }
  }
}
