# core-api — NestJS. Build multi-stage padrão já usado em disphel/CONTADOR_CAL.
FROM node:22-alpine AS base
RUN corepack enable

FROM base AS deps
WORKDIR /repo
COPY package.json pnpm-workspace.yaml ./
COPY packages/database/package.json packages/database/
COPY packages/shared/package.json packages/shared/
COPY apps/core-api/package.json apps/core-api/
RUN pnpm install --frozen-lockfile --filter @afe/core-api...

FROM base AS build
WORKDIR /repo
COPY --from=deps /repo/node_modules ./node_modules
COPY --from=deps /repo/packages ./packages
COPY --from=deps /repo/apps/core-api/node_modules ./apps/core-api/node_modules
COPY tsconfig.base.json ./
COPY packages ./packages
COPY apps/core-api ./apps/core-api
RUN pnpm --filter @afe/database prisma:generate
RUN pnpm --filter @afe/core-api build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -S app && adduser -S app -G app

COPY --from=build /repo/apps/core-api/dist ./dist
COPY --from=build /repo/apps/core-api/node_modules ./node_modules
COPY --from=build /repo/apps/core-api/package.json ./package.json
COPY --from=build /repo/packages/database/generated ./node_modules/@afe/database/generated

RUN chown -R app:app /app
USER app

EXPOSE 3000
CMD ["node", "dist/main.js"]
