# Arquitetura — Automação do Fechamento Fiscal

Plataforma multi-tenant desenvolvida para a CAPTAL Contabilidade (empresa
piloto, ver `Contrato_CAPTAL_William_Automacao_Fechamento_Fiscal.pdf` na raiz
do projeto) e desenhada para escalar para outros escritórios contábeis no
futuro.

## Visão geral

```
                         ┌──────────────┐
                         │  admin-web   │  Next.js — painel da CAPTAL
                         │ (Next.js)    │
                         └──────┬───────┘
                                │ HTTPS
                                ▼
                         ┌──────────────┐        ┌─────────────┐
                         │   core-api   │───────▶│ fiscal-engine│
                         │  (NestJS)    │ HTTP    │ (koffi+ACBr) │──▶ SEFAZ
                         │              │ interno │              │
                         └──────┬───────┘        └─────────────┘
                                │
                ┌───────────────┼────────────────┐
                ▼               ▼                ▼
           ┌─────────┐    ┌─────────┐      ┌───────────┐
           │ Postgres │    │  Redis  │      │  MinIO    │
           │ (Prisma) │    │(BullMQ) │      │(XML/PFX)  │
           └─────────┘    └─────────┘      └───────────┘
```

- **admin-web**: painel onde a CAPTAL cadastra CNPJs, acompanha documentos
  fiscais, configura regras e baixa exportações. Consome só a API HTTP do
  `core-api` — nunca fala com o `fiscal-engine` nem com o Postgres
  diretamente.
- **core-api**: dono de toda a lógica de negócio e do banco. Orquestra o
  `fiscal-engine` para falar com a SEFAZ, mas não tem acesso direto à
  ACBrLib.
- **fiscal-engine**: único processo com o binário nativo `libacbrnfe64.so`
  carregado via FFI (`koffi`). Isolado em container próprio por dois
  motivos: (1) um crash na lib nativa não deve derrubar a API principal, (2)
  precisa de dependências de sistema específicas (OpenSSL bundlado pela
  ACBr) que não devem se misturar com o resto do sistema. Fica só na rede
  Docker interna, nunca exposto ao Traefik.

## Por que essas escolhas

- **Acesso direto à SEFAZ, sem provedor terceiro**: usamos a ACBrLibNFe (SDK
  open source LGPL do projeto ACBr) via `koffi`, o mesmo padrão que já roda
  em produção em outro projeto seu (`market.dnotas.com.br`). A chamada
  `NFE_DistribuicaoDFePorUltNSU` foi portada quase 1:1 desse projeto — ver
  `apps/fiscal-engine/src/acbr/client.ts`, que é uma generalização
  multi-tenant de `nfe_marketplace/src/nfe/acbrDistribuicao.js`.
- **Postgres + Prisma, não Oracle**: mesmo padrão dos seus projetos mais
  recentes (disphel, dspsafety). Migrations versionadas, sem custo de
  licença, e multi-tenant por `tenant_id` (Organizacao/Empresa) é bem mais
  simples de operar em escala do que um schema Oracle por CNPJ.
- **Certificados nunca em texto puro**: o PFX é cifrado (AES-256-GCM,
  envelope encryption com `CERT_MASTER_KEY`) e armazenado no MinIO; a senha
  é cifrada separadamente (IV próprio) e guardada no Postgres. O
  `fiscal-engine` recebe o conteúdo já decifrado por chamada, grava num
  arquivo temporário só durante a chamada à ACBrLib, e apaga em seguida —
  nunca persiste certificado em disco.
- **Isolamento total de outros projetos seus**: banco, filas, storage e VPS
  são exclusivos deste projeto — nada compartilhado com `nfe_marketplace`
  ou qualquer outro sistema seu, por causa do sigilo exigido nas Cláusulas
  12ª/14ª do contrato com a CAPTAL.

## Modelo de dados (resumo)

Ver `packages/database/prisma/schema.prisma` para o detalhe completo.

- `Organizacao` → tenant raiz (escritório contábil)
- `Empresa` → um CNPJ da carteira da organização; `status` dirige o
  faturamento (R$49,90/mês por CNPJ ativo — Cláusula 7ª do contrato)
- `Certificado` → 1:1 com Empresa, PFX cifrado
- `DocumentoFiscal` → metadados de NFe/NFCe (XML fica no MinIO)
- `RegraFiscal` → mapeamento CFOP/observação/acumulador, com override por
  Empresa
- `ManifestacaoEvento`, `ExportacaoTxt`, `Fatura`, `AuditLog`

## O que está implementado vs. pendente

| Área | Status |
|---|---|
| Estrutura do monorepo, schema do banco | ✅ Feito |
| Distribuição DFe (busca/download de XML via SEFAZ) | ✅ Portado e funcional (`fiscal-engine`), falta validar em homologação real |
| Status do serviço SEFAZ | ⚠️ Implementado mas não validado — assinatura da função precisa confirmação no manual da ACBrLib |
| Certificado digital (upload, criptografia, alerta de vencimento) | ✅ Lógica de criptografia pronta; upload ainda é base64 em JSON (trocar por multipart) |
| Manifestação do Destinatário | ❌ Não implementado — não existe precedente em nenhum projeto seu, ver `manifestacao.service.ts` |
| Motor de classificação fiscal (CFOP → regra) | ⚠️ Resolução de regra isolada existe; aplicação em lote sobre documentos recebidos, não |
| Geração de TXT Domínio Sistemas | ❌ Bloqueado — aguarda leiaute da CAPTAL (Cláusula 3ª, item I) |
| Faturamento | ⚠️ Cálculo mensal (R$49,90 × CNPJs ativos) implementado; cobrança em si (Pix/boleto/gateway) não definida |
| Autenticação | ⚠️ Login + JWT funcionam; guard existe mas não está aplicado às rotas ainda |
| Deploy VPS dedicada | ✅ docker-compose.prod.yml + Traefik prontos, ver `docs/SETUP_VPS.md` |

## Convenções

- **Multi-tenant por coluna** (`organizacaoId`/`empresaId`), não por schema —
  toda query de domínio deve filtrar por esses campos. Ainda não há
  middleware/guard central impondo isso (fase 2); por enquanto cada service
  precisa lembrar de filtrar corretamente.
- **fiscal-engine é a única porta de saída para a SEFAZ.** Nenhum outro
  serviço deve importar `koffi` ou tocar na ACBrLib diretamente.
- **Nunca logar PFX, senha de certificado ou XML completo** em texto —
  esses dados são objeto de sigilo contratual.
