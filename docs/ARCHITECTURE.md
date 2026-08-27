# Arquitetura — Automação do Fechamento Fiscal

Plataforma multi-tenant desenvolvida para a CAPTAL Contabilidade (empresa
piloto, ver `Contrato_CAPTAL_William_Automacao_Fechamento_Fiscal.pdf` na raiz
do projeto) e desenhada para escalar para outros escritórios contábeis no
futuro.

## Visão geral

```
                    Caddy (reverse proxy + HTTPS automático)
                    api.dominio.com.br    app.dominio.com.br
                          │                      │
                          ▼                      ▼
                   ┌──────────────┐      ┌──────────────┐
                   │   core-api   │      │  admin-web   │
                   │  (NestJS)    │      │  (Next.js)   │
                   │  :3000       │      │  :3200       │
                   └──────┬───────┘      └──────────────┘
                          │ HTTP interno (localhost)
                          ▼
                   ┌──────────────┐
                   │ fiscal-engine │──▶ SEFAZ
                   │ (koffi+ACBr)  │
                   │  :3100        │
                   └──────────────┘
                          ▲
                          │ (core-api também fala com:)
                ┌─────────┴─────────┐
                ▼                   ▼
           ┌─────────┐        ┌───────────┐
           │ Postgres │        │  MinIO    │
           │ (Prisma) │        │(XML/PFX)  │
           └─────────┘        └───────────┘
```

Todos os serviços rodam **nativamente no Windows Server** (Serviços do
Windows via NSSM, sem Docker/WSL2 — ver `docs/SETUP_SERVIDOR_WINDOWS.md`).
Só o Caddy fica exposto publicamente; os demais escutam em `127.0.0.1`,
alcançáveis de fora só através do reverse proxy.

**Estado atual — HTTP na porta 8080, não 80/443:** o mesmo servidor já
roda o **TSplus** (portal de acesso remoto da equipe), que ocupa as
portas 80 e 443 para o próprio portal web dele — descoberto ao testar
`app.dnotas.com.br` e cair na tela de login do TSplus em vez do
admin-web. Como o Let's Encrypt sempre valida domínio batendo nas portas
80/443 reais (não dá pra redirecionar essa validação pra uma porta
alternativa), o Caddy roda em HTTP puro na porta 8080, sem HTTPS
automático, até decidirmos entre mover as portas do TSplus (afeta quem
usa o acesso remoto) ou migrar para uma VPS dedicada. Domínios reais:
`http://fiscal.dnotas.com.br:8080` (admin-web) e
`http://fiscal-api.dnotas.com.br:8080` (core-api). `fiscal-engine`
(porta 3100) nunca teve firewall aberto, é inacessível de fora desde o
início. Instalar o Caddy é o primeiro passo assim que houver um domínio
(`infra/windows/install-caddy.ps1`, já pronto).

- **admin-web**: painel onde a CAPTAL cadastra CNPJs, acompanha documentos
  fiscais, configura regras e baixa exportações. Consome só a API HTTP do
  `core-api` — nunca fala com o `fiscal-engine` nem com o Postgres
  diretamente.
- **core-api**: dono de toda a lógica de negócio e do banco. Orquestra o
  `fiscal-engine` para falar com a SEFAZ, mas não tem acesso direto à
  ACBrLib.
- **fiscal-engine**: único processo com o binário nativo `ACBrNFe64.dll`
  carregado via FFI (`koffi`). Roda como serviço próprio (não dentro do
  core-api) por dois motivos: (1) um crash na lib nativa não deve derrubar a
  API principal, (2) mantém a única superfície que fala com a SEFAZ isolada
  e auditável. Escuta só em localhost, nunca exposto pelo Caddy.

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
- **Isolamento total de outros projetos seus**: banco, storage e servidor
  são exclusivos deste projeto — nada compartilhado com `nfe_marketplace`
  ou qualquer outro sistema seu, por causa do sigilo exigido nas Cláusulas
  12ª/14ª do contrato com a CAPTAL.
- **Windows Server nativo, sem Docker/WSL2**: o servidor provisionado saiu
  Windows Server 2025. Chegamos a montar Docker dentro de WSL2 (documentado
  no histórico do deploy), mas o WSL2 exige uma sessão de desktop real pra
  inicializar — sem Docker Desktop instalado, isso força auto-logon com
  senha do Administrator gravada no registro, uma concessão de segurança
  ruim pra um servidor com dados fiscais sob sigilo contratual. Decidimos
  reescrever para rodar tudo como Serviço do Windows de verdade (via NSSM):
  sobe sozinho no boot, sem sessão nenhuma aberta, sem esse trade-off.
- **Sem Redis/BullMQ por enquanto**: nenhum processador de fila real existe
  ainda (jobs agendados — polling de NSU, faturamento mensal — são fase 2).
  Adicionar quando houver job de verdade a rodar, em vez de manter
  infraestrutura ociosa.

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
| Certificado digital (upload, criptografia, alerta de vencimento) | ✅ Cifra/armazena/usa corretamente; upload ainda é base64 em JSON (trocar por multipart) |
| Manifestação do Destinatário | ⚠️ Implementada de ponta a ponta (fiscal-engine → core-api → tela), mas é a primeira vez — sem precedente pra comparar. `NFE_EnviarEvento` e o layout do INI de evento não foram validados contra a SEFAZ real ainda |
| Motor de classificação fiscal (CFOP → regra) | ⚠️ Resolução de regra isolada existe; aplicação em lote sobre documentos recebidos, não |
| Geração de TXT Domínio Sistemas | ❌ Bloqueado — aguarda leiaute da CAPTAL (Cláusula 3ª, item I) |
| Faturamento | ⚠️ Cálculo mensal (R$49,90 × CNPJs ativos) implementado; cobrança em si (Pix/boleto/gateway) não definida |
| Autenticação | ✅ Login + JWT funcionam; `JwtAuthGuard` aplicado globalmente (`APP_GUARD`) — toda rota exige token, exceto `/auth/login` e `/health` |
| Painel admin-web | ⚠️ Login, listagem/cadastro de empresa, cadastro de certificado, sincronização SEFAZ e manifestação por documento — todos funcionais. Sem tela de regras fiscais, exportação TXT ou faturamento ainda |
| Deploy servidor dedicado | ✅ Rodando de verdade em produção (Postgres/MinIO/fiscal-engine/core-api/admin-web via NSSM); Caddy/HTTPS pendente de domínio |

## Convenções

- **Multi-tenant por coluna** (`organizacaoId`/`empresaId`), não por schema —
  toda query de domínio deve filtrar por esses campos. Ainda não há
  middleware/guard central impondo isso (fase 2); por enquanto cada service
  precisa lembrar de filtrar corretamente.
- **fiscal-engine é a única porta de saída para a SEFAZ.** Nenhum outro
  serviço deve importar `koffi` ou tocar na ACBrLib diretamente.
- **Nunca logar PFX, senha de certificado ou XML completo** em texto —
  esses dados são objeto de sigilo contratual.
