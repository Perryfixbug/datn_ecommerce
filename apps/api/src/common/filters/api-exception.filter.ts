import {
  ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common"
import { randomUUID } from "node:crypto"
import type { ErrorResponse } from "../response/response.js"

type RequestHeaders = { get: (name: string) => string | null }

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<{
      status: (code: number) => { json: (body: ErrorResponse) => void }
    }>()
    const request = host
      .switchToHttp()
      .getRequest<{ headers: RequestHeaders }>()
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR
    const exceptionResponse =
      exception instanceof HttpException ? exception.getResponse() : undefined
    const body = this.toErrorResponse(exceptionResponse, request)
    response.status(status).json(body)
  }

  private getCorrelationId(request: { headers: RequestHeaders }): string {
    const value = request.headers.get("x-correlation-id")
    return value ?? randomUUID()
  }

  private toErrorResponse(
    exceptionResponse: string | object | undefined,
    request: { headers: RequestHeaders }
  ): ErrorResponse {
    if (typeof exceptionResponse === "object" && exceptionResponse !== null) {
      const value = exceptionResponse as Record<string, unknown>
      if ("error" in value && typeof value.error === "object") {
        return value as unknown as ErrorResponse
      }
      if (typeof value.code === "string" && typeof value.message === "string") {
        return {
          error: {
            code: value.code,
            message: value.message,
            details: Array.isArray(value.fieldErrors)
              ? value.fieldErrors.map((detail) => ({
                  code: "INVALID_FIELD",
                  message: String(detail),
                }))
              : undefined,
            correlationId: this.getCorrelationId(request) ?? randomUUID(),
          },
        }
      }
    }
    return {
      error: {
        code: "INTERNAL_ERROR",
        message:
          typeof exceptionResponse === "string"
            ? exceptionResponse
            : "Đã xảy ra lỗi máy chủ",
        correlationId: this.getCorrelationId(request) ?? randomUUID(),
      },
    }
  }
}
