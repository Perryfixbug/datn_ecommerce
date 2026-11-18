# API skeleton

NestJS modular monolith. Run from the repository root:

- pnpm --filter api dev
- pnpm --filter api build
- pnpm --filter api test

Health: GET http://localhost:4000/api/v1/health. This is liveness only, not database readiness.

Prisma, Better Auth, config, logging, throttling and health libraries are installed but not wired to external services. No database schema, auth handlers, migrations or infrastructure are configured. The prisma:generate and prisma:validate commands become usable after you provide the schema/config.

Add business modules incrementally under src/modules. Keep provider integrations under src/infrastructure when implemented; do not create empty modules ahead of time. Runtime validation is provided by the Zod pipe; there is no class-validator DTO source of truth.
