# fiscal-engine — único serviço com acesso à ACBrLibNFe (FFI nativo).
# Base glibc (não alpine/musl): a lib .so da ACBr é compilada contra glibc,
# incompatível com musl libc do Alpine.
FROM node:20-bookworm-slim AS base
RUN apt-get update && apt-get install -y --no-install-recursive ca-certificates \
    && rm -rf /var/lib/apt/lists/*

FROM base AS deps
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev

FROM base AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
# A ACBrLibNFe distribui sua própria cópia de libssl/libcrypto/libxml2 etc.
# Apontamos o loader para usá-las em vez das libs do sistema — evita
# incompatibilidade de versão do OpenSSL entre distros.
ENV LD_LIBRARY_PATH=/app/lib

RUN groupadd --system app && useradd --system --gid app app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json ./
COPY lib ./lib

RUN chown -R app:app /app
USER app

EXPOSE 3100
CMD ["node", "dist/main.js"]
