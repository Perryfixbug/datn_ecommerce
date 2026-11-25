import { Injectable } from "@nestjs/common"
import {
  randomBytes,
  scrypt as scryptCallback,
  timingSafeEqual,
} from "node:crypto"
import { promisify } from "node:util"

const scrypt = promisify(scryptCallback)

@Injectable()
export class PasswordService {
  async hash(password: string) {
    const salt = randomBytes(16).toString("hex")
    const derived = (await scrypt(password, salt, 64)) as Buffer
    return `scrypt:${salt}:${derived.toString("hex")}`
  }

  async verify(password: string, stored: string) {
    const [scheme, salt, expectedHex] = stored.split(":")
    if (scheme !== "scrypt" || !salt || !expectedHex) return false
    const expected = Buffer.from(expectedHex, "hex")
    const actual = (await scrypt(password, salt, expected.length)) as Buffer
    return (
      expected.length === actual.length && timingSafeEqual(expected, actual)
    )
  }
}
