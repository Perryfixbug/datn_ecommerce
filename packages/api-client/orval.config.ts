import { defineConfig } from "orval"

const client = (audience: string) => ({
  input: { target: "../api-spec/generated/" + audience + "-openapi.yaml" },
  output: {
    target: "./src/generated/" + audience + "/api.ts",
    schemas: "./src/generated/" + audience + "/models",
    client: "react-query" as const,
    httpClient: "axios" as const,
    mode: "single" as const,
    prettier: true,
    override: {
      mutator: {
        path: "./src/lib/axios-instance.ts",
        name: "customAxiosInstance",
      },
      query: { signal: true },
    },
  },
})

export default defineConfig({ shop: client("shop"), admin: client("admin") })
