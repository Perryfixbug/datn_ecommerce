import { useQuery, type UseQueryOptions } from "@tanstack/react-query"
import type { HealthStatus } from "../../../api-contract/src/index.js"

import { apiClient, type ApiError } from "../lib/axios-instance.js"

export type { HealthStatus } from "../../../api-contract/src/index.js"

const fetchHealth = async (): Promise<HealthStatus> => {
  const { data } = await apiClient.get<HealthStatus>("/api/v1/health")
  return data
}

export const healthQueryKey = ["health"] as const

export const useHealth = (
  options?: Omit<
    UseQueryOptions<HealthStatus, ApiError>,
    "queryKey" | "queryFn"
  >
) =>
  useQuery({
    queryKey: healthQueryKey,
    queryFn: fetchHealth,
    refetchInterval: 30_000,
    ...options,
  })
