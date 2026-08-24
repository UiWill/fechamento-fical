# Automação do Fechamento Fiscal

Plataforma multi-tenant de automação do fechamento fiscal — busca de NF-e de
entrada (Manifestação do Destinatário), download de XMLs de NF-e/NFC-e de
saída, classificação por regras fiscais e exportação de TXT para o Domínio
Sistemas. Desenvolvida sob contrato com a CAPTAL Contabilidade (empresa
piloto).

Veja `docs/ARCHITECTURE.md` para o desenho completo e o que está
implementado vs. pendente, e `docs/SETUP_VPS.md` para colocar em produção.

## Estrutura

```
apps/
  fiscal-engine/   Node/TS + koffi + ACBrLibNFe — único ponto que fala com a SEFAZ
  core-api/        NestJS — regras de negócio, multi-tenant, faturamento
  admin-web/       Next.js — painel da CAPTAL
packages/
  database/        Schema Prisma + client compartilhado
  shared/          Tipos/zod compartilhados entre core-api e admin-web
infra/             docker-compose (dev e produção) + config do Traefik
docs/              Arquitetura e setup de infraestrutura
```

## Desenvolvimento local

Pré-requisitos: Node 20+, pnpm 10+, Docker.

```bash
pnpm install
cp .env.example .env   # preencha CERT_MASTER_KEY, JWT_SECRET (ex: openssl rand -hex 32)
pnpm db:generate
docker compose -f infra/docker-compose.yml up
```

- core-api: http://localhost:3000/health
- fiscal-engine: http://localhost:3100/health
- admin-web: http://localhost:3200

A ACBrLibNFe (dependência nativa do `fiscal-engine`) precisa ser baixada à
parte — ver `apps/fiscal-engine/lib/README.md`.
