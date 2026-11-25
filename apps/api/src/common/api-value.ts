export const VIETNAM_TIMEZONE = "Asia/Ho_Chi_Minh"

const BIGINT_PATTERN = /^(0|[1-9][0-9]*)$/

export function parseApiId(value: string): bigint {
  if (!BIGINT_PATTERN.test(value)) {
    throw new Error("ID must be a non-negative decimal string")
  }
  return BigInt(value)
}

export function serializeApiValue<T>(value: T): T {
  return JSON.parse(
    JSON.stringify(value, (_key, nestedValue: unknown) => {
      if (typeof nestedValue === "bigint") return nestedValue.toString()
      if (nestedValue instanceof Date) return nestedValue.toISOString()
      return nestedValue
    })
  ) as T
}

export function roundVnd(value: number): number {
  if (!Number.isFinite(value)) throw new Error("Amount must be finite")
  return Math.round(value)
}
