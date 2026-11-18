ARG NODE_VERSION=24-alpine

FROM node:${NODE_VERSION} AS builder
WORKDIR /repo
RUN apk add --no-cache libc6-compat && corepack enable
ENV HUSKY=0

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/storefront/package.json ./apps/storefront/package.json
COPY apps/admin/package.json ./apps/admin/package.json
COPY apps/api/package.json ./apps/api/package.json
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm --filter api build
RUN pnpm --filter api deploy --prod --legacy --frozen-lockfile /runtime

FROM node:${NODE_VERSION} AS runner
WORKDIR /app
ENV NODE_ENV=production HOST=0.0.0.0 PORT=4000
COPY --from=builder --chown=node:node /runtime ./
USER node
EXPOSE 4000
CMD ["node", "dist/apps/api/src/main.js"]
