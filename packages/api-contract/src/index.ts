import type { infer as Infer } from "zod"
import type { GetHealthResponse } from "./generated/shop.js"

export type HealthStatus = Infer<typeof GetHealthResponse>
export * as shop from "./generated/shop.js"
export * as admin from "./generated/admin.js"
