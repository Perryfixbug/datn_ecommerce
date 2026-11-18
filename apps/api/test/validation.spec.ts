import { BadRequestException } from "@nestjs/common"
import { z } from "zod"
import { ZodValidationPipe } from "../src/common/pipes/zod-validation.pipe.js"

const pipe = new ZodValidationPipe(
  z.object({ quantity: z.number().int().positive() })
)
it("validates and returns parsed input", () => {
  expect(pipe.transform({ quantity: 2 })).toEqual({ quantity: 2 })
})
it("rejects invalid input", () => {
  expect(() => pipe.transform({ quantity: -1 })).toThrow(BadRequestException)
})
