import { existsSync } from "node:fs"
import { loadEnvFile } from "node:process"
import { fileURLToPath } from "node:url"
import { defineConfig } from "prisma/config"

const envPath = fileURLToPath(new URL(".env", import.meta.url))

if (existsSync(envPath)) {
  loadEnvFile(envPath)
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "pnpm exec tsx prisma/seed.ts",
  },
  datasource: {
    // Không cần URL để validate/generate; lệnh truy cập DB vẫn bắt buộc có URL.
    url: process.env.DATABASE_URL,
  },
})
