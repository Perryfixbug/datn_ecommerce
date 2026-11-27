ALTER TABLE "NguoiDung" ADD COLUMN "authVersion" INTEGER NOT NULL DEFAULT 0;

ALTER TABLE "SanPham"
  ADD COLUMN "moderationStatus" VARCHAR(30) NOT NULL DEFAULT 'ChoDuyet',
  ADD COLUMN "moderationVersion" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN "rejectionReason" VARCHAR(500),
  ADD COLUMN "reviewedAt" TIMESTAMPTZ(3),
  ADD CONSTRAINT "SanPham_moderationStatus_check" CHECK ("moderationStatus" IN ('ChoDuyet', 'DaDuyet', 'TuChoi')),
  ADD CONSTRAINT "SanPham_moderationVersion_check" CHECK ("moderationVersion" >= 0);
CREATE INDEX "SanPham_moderationStatus_idSanPham_idx" ON "SanPham"("moderationStatus", "idSanPham");
