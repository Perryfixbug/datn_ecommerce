CREATE TABLE "HomepageConfig" (
  "id" INTEGER NOT NULL,
  "version" INTEGER NOT NULL DEFAULT 0,
  "draft" JSONB NOT NULL,
  "published" JSONB,
  "publishedVersion" INTEGER,
  "publishedAt" TIMESTAMPTZ(3),
  "updatedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "HomepageConfig_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "HomepageConfig_singleton" CHECK ("id" = 1),
  CONSTRAINT "HomepageConfig_version_check" CHECK ("version" >= 0)
);
INSERT INTO "HomepageConfig" ("id", "draft") VALUES (1, '{"items": []}');
