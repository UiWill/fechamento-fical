# Automação do Fechamento Fiscal

Plataforma multi-tenant de automação do fechamento fiscal — busca de NF-e de
entrada (Manifestação do Destinatário), download de XMLs de NF-e/NFC-e de
saída, classificação por regras fiscais e exportação de TXT para o Domínio
Sistemas. Desenvolvida sob contrato com a CAPTAL Contabilidade (empresa
piloto).

Veja `docs/ARCHITECTURE.md` para o desenho completo e o que está
implementado vs. pendente, e `docs/SETUP_SERVIDOR_WINDOWS.md` para colocar
em produção (Windows Server nativo, sem Docker/WSL2 — ver decisão
documentada na arquitetura).

## Estrutura

```
apps/
  fiscal-engine/   Node/TS + koffi + ACBrNFe64.dll — único ponto que fala com a SEFAZ
  core-api/        NestJS — regras de negócio, multi-tenant, faturamento
  admin-web/       Next.js — painel da CAPTAL
packages/
  database/        Schema Prisma + client compartilhado
  shared/          Tipos/zod compartilhados entre core-api e admin-web
infra/windows/     Scripts de instalação como Serviço do Windows (NSSM, Caddy, Postgres, MinIO)
docs/              Arquitetura e setup de infraestrutura
```

## Desenvolvimento local (Windows)

Pré-requisitos: Node 20+, pnpm 10+, PostgreSQL local (ou apontar
`DATABASE_URL` para um banco de dev remoto), MinIO local opcional (só
necessário pra testar upload de certificado/XML de verdade).

```powershell
pnpm install
copy .env.example .env   # preencha CERT_MASTER_KEY, JWT_SECRET (ex: openssl rand -hex 32), DATABASE_URL
pnpm db:generate
pnpm db:migrate
pnpm build
pnpm --filter @afe/fiscal-engine dev    # terminal 1
pnpm --filter @afe/core-api dev         # terminal 2
pnpm --filter @afe/admin-web dev        # terminal 3
```

- core-api: http://localhost:3000/health
- fiscal-engine: http://localhost:3100/health
- admin-web: http://localhost:3200

A `ACBrNFe64.dll` (dependência nativa do `fiscal-engine`) precisa ser
copiada à parte — ver `apps/fiscal-engine/lib/README.md`. Sem ela, o
fiscal-engine sobe normalmente mas `/health` reporta `acbrLibPresente: false`
e qualquer chamada real à SEFAZ falha.
