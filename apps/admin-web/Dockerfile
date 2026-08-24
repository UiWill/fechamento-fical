# admin-web — Next.js standalone. Mesmo padrão multi-stage usado em disphel/CONTADOR_CAL.
FROM node:22-alpine AS base
RUN corepack enable

FROM base AS deps
WORKDIR /repo
COPY package.json pnpm-workspace.yaml ./
COPY packages/shared/package.json packages/shared/
COPY apps/admin-web/package.json apps/admin-web/
RUN pnpm install --frozen-lockfile --filter @afe/admin-web...

FROM base AS build
WORKDIR /repo
COPY --from=deps /repo/node_modules ./node_modules
COPY --from=deps /repo/packages ./packages
COPY --from=deps /repo/apps/admin-web/node_modules ./apps/admin-web/node_modules
COPY packages/shared ./packages/shared
COPY apps/admin-web ./apps/admin-web
WORKDIR /repo/apps/admin-web
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup -S app && adduser -S app -G app

COPY --from=build /repo/apps/admin-web/public ./public
COPY --from=build --chown=app:app /repo/apps/admin-web/.next/standalone ./
COPY --from=build --chown=app:app /repo/apps/admin-web/.next/static ./apps/admin-web/.next/static

USER app
EXPOSE 3000
CMD ["node", "apps/admin-web/server.js"]
