CREATE TABLE "AuditLog" (
  "id" UUID NOT NULL,
  "resourceType" VARCHAR(30) NOT NULL,
  "resourceId" BIGINT NOT NULL,
  "actorId" BIGINT NOT NULL,
  "action" VARCHAR(30) NOT NULL,
  "previousStatus" VARCHAR(30) NOT NULL,
  "nextStatus" VARCHAR(30) NOT NULL,
  "reason" VARCHAR(500),
  "metadata" JSONB,
  "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "AuditLog_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "NhanVienSan"("idNhanVien") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE INDEX "AuditLog_resourceType_resourceId_createdAt_idx" ON "AuditLog"("resourceType", "resourceId", "createdAt");
CREATE INDEX "AuditLog_actorId_createdAt_idx" ON "AuditLog"("actorId", "createdAt");
