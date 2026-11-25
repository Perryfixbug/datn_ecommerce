export interface ListResponse<T> {
  nextCursor: string | null
  total: number
  items: T[]
}

export interface ErrorDetail {
  field?: string
  code: string
  message: string
}

export interface ErrorBody {
  code: string
  message: string
  details?: ErrorDetail[]
  correlationId?: string
}

export interface ErrorResponse {
  error: ErrorBody
}

export function createListResponse<T>(
  items: T[],
  total: number,
  nextCursor: string | null
): ListResponse<T> {
  return { nextCursor, total, items }
}
