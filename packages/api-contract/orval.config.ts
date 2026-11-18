import { defineConfig } from "orval"

const contract = (audience: string) => ({
  input: { target: "../api-spec/generated/" + audience + "-openapi.yaml" },
  output: {
    target: "./src/generated/" + audience + ".ts",
    client: "zod" as const,
    mode: "single" as const,
    prettier: true,
  },
})

export default defineConfig({
  shop: contract("shop"),
  admin: contract("admin"),
})
