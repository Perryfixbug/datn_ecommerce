CREATE TABLE "RefreshToken" (
    "id" BIGINT NOT NULL,
    "tokenHash" VARCHAR(128) NOT NULL,
    "idNguoiDung" BIGINT NOT NULL,
    "expiresAt" TIMESTAMP(0) NOT NULL,
    "revokedAt" TIMESTAMP(0),
    "replacedById" BIGINT,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "pk_refreshtoken" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "uq_refreshtoken_hash" ON "RefreshToken"("tokenHash");
CREATE INDEX "ix_refreshtoken_user_revoked" ON "RefreshToken"("idNguoiDung", "revokedAt");
CREATE INDEX "ix_refreshtoken_expires" ON "RefreshToken"("expiresAt");

ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_idNguoiDung_fkey"
  FOREIGN KEY ("idNguoiDung") REFERENCES "NguoiDung"("idNguoiDung") ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_replacedById_fkey"
  FOREIGN KEY ("replacedById") REFERENCES "RefreshToken"("id") ON DELETE SET NULL ON UPDATE NO ACTION;