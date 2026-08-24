# Setup da VPS de produção

VPS **nova e dedicada** a este projeto — sem nenhuma dependência de
infraestrutura de outros projetos seus (decisão tomada por causa do sigilo
exigido nas Cláusulas 12ª/14ª do contrato com a CAPTAL).

## 1. Provisionar a VPS

- Tamanho recomendado para começar (1 cliente piloto, dezenas de CNPJs):
  2 vCPU / 4 GB RAM / 60 GB SSD — dá para caber no orçamento de R$2.000 de
  infraestrutura do contrato por vários meses (ex: Hetzner CX22, Contabo,
  ou instância equivalente na DigitalOcean/Hostinger).
- SO: Ubuntu 22.04 LTS ou 24.04 LTS.
- Aponte dois registros DNS tipo A para o IP da VPS:
  - `api.SEUDOMINIO.com.br` → core-api
  - `app.SEUDOMINIO.com.br` (ou o subdomínio que preferir) → admin-web

## 2. Instalar Docker

```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
# nova sessão de shell para o grupo docker valer
```

## 3. Clonar o projeto e configurar variáveis de ambiente

```bash
git clone <url-do-repositorio> automacao-fechamento-fiscal
cd automacao-fechamento-fiscal
cp .env.example .env
```

Preencha no `.env`, além do que já está em `.env.example`:

```
API_DOMAIN=api.seudominio.com.br
ADMIN_DOMAIN=app.seudominio.com.br
TRAEFIK_ACME_EMAIL=seu-email@dominio.com.br
FISCAL_ENGINE_INTERNAL_KEY=$(openssl rand -hex 32)
CERT_MASTER_KEY=$(openssl rand -hex 32)
JWT_SECRET=$(openssl rand -hex 32)
```

**Guarde esse `.env` fora do git** (já está no `.gitignore`) — em algum
gerenciador de segredos ou backup cifrado à parte. Perder o
`CERT_MASTER_KEY` significa perder acesso a todos os certificados digitais
já cadastrados.

## 4. Baixar a ACBrLibNFe (dependência nativa)

Siga `apps/fiscal-engine/lib/README.md` — baixe o pacote Linux da ACBrLibNFe
e extraia em `apps/fiscal-engine/lib/` antes do build (o Dockerfile copia
essa pasta para dentro da imagem).

## 5. Subir os serviços

```bash
docker compose -f infra/docker-compose.prod.yml --env-file .env up -d --build
docker compose -f infra/docker-compose.prod.yml logs -f
```

O Traefik emite certificado TLS automaticamente via Let's Encrypt na
primeira requisição HTTPS a cada domínio.

## 6. Rodar a migration inicial do banco

```bash
docker compose -f infra/docker-compose.prod.yml exec core-api \
  node node_modules/.bin/prisma migrate deploy --schema node_modules/@afe/database/prisma/schema.prisma
```

(Ou gere as migrations localmente com `pnpm db:migrate` antes do deploy e
suba já com os arquivos de migration versionados — abordagem preferível para
não gerar schema divergente entre ambientes.)

## 7. Backups

Ainda não automatizado neste scaffold — antes de colocar clientes reais em
produção, configurar pelo menos:

- `pg_dump` diário do Postgres (dados fiscais + faturamento) para storage
  externo à VPS (ex: outro bucket S3-compatible, ou download automático para
  outro local).
- Backup do bucket MinIO `afe-documentos-fiscais` (retenção legal de XMLs
  fiscais é de vários anos — não pode depender só do disco desta VPS).
- Snapshot do volume `letsencrypt` (evita re-emitir certificados
  desnecessariamente).

## 8. Monitoramento mínimo

Health checks já existem (`GET /health` no core-api, `GET /health` no
fiscal-engine) — falta só apontar algo externo para eles (ex: um monitor de
uptime simples) antes de depender disso para clientes reais.
