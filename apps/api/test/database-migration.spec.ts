import { readFileSync } from "node:fs"

const read = (path: string) =>
  readFileSync(new URL(path, import.meta.url), "utf8")
const sql = read("../prisma/migrations/20261122000000_init/migration.sql")
const spec = read("../../../docs/specs/database/DB_Schema.md")

it("giữ đủ bảng, cột và CHECK của đặc tả trong migration khởi tạo", () => {
  const sections = spec.split(/^### /m).slice(1)
  expect(sections).toHaveLength(27)
  let columns = 0
  let checks = 0
  for (const section of sections) {
    const body = section.split(/^## /m)[0]!
    const name = body.split("\n")[0]!.trim()
    const rows = body.split("\n").map((line) =>
      line
        .split("|")
        .slice(1, -1)
        .map((cell) => cell.trim())
    )
    const fields = rows.filter(
      (row) => row.length === 7 && /^[a-z]/.test(row[0]!)
    )
    const names = new Set(fields.map((row) => row[0]!))
    const table = sql
      .split('CREATE TABLE "' + name + '" (')[1]
      ?.split("\n);")[0]
    expect(table).toBeDefined()
    for (const field of fields) {
      expect(table).toContain('"' + field[0] + '" ')
      columns++
    }
    for (const row of rows.filter((row) => row[0]?.startsWith("`ck_"))) {
      const constraint = row[0]!.slice(1, -1)
      const expression = row[1]!
        .slice(1, -1)
        .replace(/'([^']|'')*'|[A-Za-z_][A-Za-z0-9_]*/g, (token) =>
          names.has(token) ? '"' + token + '"' : token
        )
      expect(sql).toContain(
        'ALTER TABLE "' +
          name +
          '" ADD CONSTRAINT "' +
          constraint +
          '" CHECK (' +
          expression +
          ");"
      )
      checks++
    }
  }
  expect(columns).toBe(271)
  expect(checks).toBe(49)
  expect(sql.match(/CREATE TABLE /g)).toHaveLength(27)
  expect(sql.match(/ADD CONSTRAINT .* CHECK /g)).toHaveLength(checks)
  expect(sql.match(/ADD CONSTRAINT .* FOREIGN KEY /g)).toHaveLength(42)
  expect(sql.match(/CREATE UNIQUE INDEX /g)).toHaveLength(22)
  expect(sql.match(/CREATE INDEX /g)).toHaveLength(39)
  expect(sql).not.toMatch(/DROP TABLE|TRUNCATE|DELETE FROM/i)
})
