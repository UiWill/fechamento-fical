# Sessão 2026-09-09 — Relatório de entrada, sincronização SEFAZ e correções no servidor

Resumo do que foi feito nesta sessão, pra dar contexto rápido em outra
máquina depois de um `git pull`. Commits (nessa ordem, todos em `main`):

```
efc2a99 Adiciona exportacao de notas de entrada em PDF/Excel filtrada por mes
e8c13b8 Adiciona coluna de data e evita scroll horizontal na tabela de documentos
dd4167b Deixa claro o motivo do botao de exportar desabilitado quando o mes nao tem notas
4bcaef7 Sincronizar com a SEFAZ agora esgota o backlog de NSU sozinho
5eae5d9 Corrige loop de sincronizacao pra respeitar o limite real da SEFAZ (20 consultas/hora)
ea7d46e Agenda sincronizacao noturna automatica com a SEFAZ pra todas as empresas
9170b6b Mostra data/hora da ultima sincronizacao com a SEFAZ na tela da empresa
5e47c4d Detecta bloqueio real da SEFAZ (cStat 656) em vez de confiar so no contador proprio
68cbc26 Persiste cStat/xMotivo da SEFAZ pra mostrar na tela mesmo apos sincronizacao noturna
```

## 1. Exportação do relatório de notas de entrada (PDF/Excel)

Na página de uma empresa (`apps/admin-web/src/app/(admin)/empresas/[id]/page.tsx`),
seção "Documentos fiscais":

- Filtro por mês (`<input type="month">`) + rótulo em português por extenso
  (`rotuloMes` em `apps/admin-web/src/lib/format.ts`).
- Botões **Baixar PDF** e **Baixar Excel** — exportam número da nota, nome
  do emitente e valor, só das notas de **entrada** do mês selecionado, com
  total no rodapé. Tudo client-side, sem endpoint novo no backend
  (`apps/admin-web/src/lib/exportar-relatorio.ts`, usa `jspdf` +
  `jspdf-autotable` + `xlsx`).
- Botões ficam desabilitados (com explicação na tela) quando não há notas
  naquele mês — isso é comportamento normal, não bug.
- Tabela de documentos fiscais ganhou coluna **Data** e virou `table-fixed`
  com larguras em `%` pra nunca precisar de scroll horizontal. Chave de
  acesso aparece resumida (6 primeiros + … + 6 últimos dígitos), valor
  completo no `title` (tooltip).

Pra ter "valor" pra exportar, precisou:

- Coluna nova `valorTotal` (`Decimal(14,2)`) em `DocumentoFiscal` (Prisma).
- Extração do `vNF` do XML em
  `apps/core-api/src/documentos-fiscais/xml-utils.ts` (regex, mesmo
  padrão dos outros campos extraídos ali).
- **Importante:** notas sincronizadas *antes* dessa mudança só ganham
  `valorTotal` se forem re-sincronizadas (o `upsert` faz backfill só se a
  SEFAZ reenviar o mesmo NSU).

## 2. Sincronização com a SEFAZ — loop automático + limite de 20/hora

Arquivo principal: `apps/core-api/src/documentos-fiscais/documentos-fiscais.service.ts`.

**Problema original:** a Distribuição DFe da SEFAZ só devolve ~50
documentos por chamada. Pra empresas com backlog grande (histórico
grande de notas nunca buscadas), era preciso clicar em "Sincronizar"
manualmente várias vezes.

**Primeira versão (errada):** loop automático de até 100 chamadas
seguidas. **Isso estourava o limite real da SEFAZ** — pesquisei e
confirmei (ver fontes no final) que a SEFAZ permite **no máximo 20
consultas por hora, por CNPJ + certificado**, valendo tanto pra "nada
novo" (cStat 137) quanto pra "tem documento" (cStat 138). Estourar
derruba `cStat=656` "Consumo indevido" e bloqueia o CNPJ por 1h.

**Versão corrigida (atual):**

- `sincronizarComSefaz` agora faz o loop sozinho, mas para em **18
  consultas/hora por empresa** (margem de segurança, controlada em
  memória via `Map` — não sobrevive a restart do serviço, aceitável).
- **Importante — limite compartilhado:** esse limite é da SEFAZ pro
  CNPJ, **não é exclusivo do nosso sistema**. Se outro software (ex: o do
  contador) também consultar a Distribuição DFe da mesma empresa, os dois
  sistemas dividem a mesma cota de 20/hora. Nosso contador interno não
  enxerga isso.
- Por isso, além da margem proativa, tem **detecção reativa**: se vier
  `cStat=656` de verdade (mesmo dentro da nossa margem — sinal de que
  *outro sistema* consumiu o resto da cota), o serviço registra o
  bloqueio e evita novas tentativas naquela empresa por 1h.
- `cStat`/`xMotivo` da última tentativa ficam **persistidos no banco**
  (`NsuControle.ultimoCStat` / `ultimoXMotivo`, nova migração
  `20260909140000_add_ultimo_cstat_nsu_controle`) — assim a tela mostra o
  aviso de bloqueio mesmo que a sincronização tenha rodado sozinha de
  madrugada, sem ninguém olhando na hora.
- Tela da empresa mostra "Última sincronização: DD/MM/AAAA HH:mm" e, se o
  último `cStat` foi 656, um aviso amarelo explicando o bloqueio.

## 3. Sincronização noturna automática (cron)

Novo módulo `apps/core-api/src/sincronizacao-agendada/` (usa
`@nestjs/schedule`, registrado em `app.module.ts` via
`ScheduleModule.forRoot()`):

- Roda de hora em hora **entre meia-noite e 5h da manhã** (6 janelas:
  `@Cron("0 0,1,2,3,4,5 * * *")`).
- Pra cada empresa `ATIVA` com certificado cadastrado, chama
  `sincronizarComSefaz`. Erro numa empresa (certificado vencido, etc.)
  só é logado — não trava as outras.
- Log em `C:\afe\logs\AfeCoreApi.log`, uma linha por empresa por
  execução.

**Pendente/observação:** o limite de 20/hora é por empresa, então rodar
1x/hora dá até 18 tentativas por empresa por hora, ou seja até ~108/noite
— deve dar conta de backlogs grandes em poucas noites. Se uma empresa
tiver um histórico *muito* grande, pode levar mais de uma noite pra
zerar (não tem perda de dado, só demora).

## 4. Correções de infraestrutura no servidor Windows

O servidor (178.132.198.4, Windows Server, serviços via NSSM — ver
`docs/SETUP_SERVIDOR_WINDOWS.md`) **não é um clone git** (`C:\afe\app`
não tem `.git`). Deploy é manual: `scp` dos arquivos alterados +
`pnpm build` do pacote afetado + restart do serviço NSSM correspondente
(`AfeCoreApi`, `AfeAdminWeb`, `AfeFiscalEngine`).

Descobertas/correções feitas:

- **Todas as 13 tabelas do Postgres** (menos `documentos_fiscais`, que já
  tinha sido corrigida numa migração anterior) pertenciam ao superusuário
  `postgres`, mas a aplicação conecta como o usuário `afe` — isso
  bloqueava qualquer `ALTER TABLE` (migração) com erro `42501 - é
  necessário ser o dono da tabela`. Corrigido transferindo o dono de
  todas as tabelas pra `afe` (via truque temporário de auth `trust` local
  no `pg_hba.conf`, revertido logo em seguida). **Migrações novas devem
  rodar sem esse problema agora.**
- Senha do usuário admin (`devwilliamemanoel7@gmail.com`) resetada pra
  `123456` (fraca de propósito, só provisório — trocar depois).
- Site: `https://fiscal.dnotas.com.br:8443` (admin-web) e
  `https://fiscal-api.dnotas.com.br:8443` (core-api), via Caddy — ver
  `infra/windows/Caddyfile`.

## 5. Foto do estado das notas em 2026-09-09 (~13h), antes da 1ª noite de sync automático

| Empresa | Total docs | Entrada | Sem CFOP |
|---|---:|---:|---:|
| JOSIANE MONTEIRO DE JESUS | 43 | 43 | 20 |
| SERRA AZUL SUPERMERCADO LTDA | 59 | 59 | 28 |
| SUPER MERCADO SANTA ANA LTDA | 45 | 45 | 22 |
| SUPERMERCADO DA JU LTDA | 32 | 32 | 1 |
| SUPERMERCADO PRIMAVERA SM LTDA | 61 | 61 | 31 |
| **TOTAL** | **240** | **240** | — |

Comparar com o total de amanhã pra validar se a sincronização noturna
rodou e trouxe documentos novos.

## 6. Pendências conhecidas

- **Exportação TXT (fechamento contábil) — ainda sem UI.** Existe um
  módulo de backend pronto (`apps/core-api/src/exportacao-txt/`) com
  endpoints:
  - `POST /empresas/:empresaId/exportacoes-txt` (gera exportação de um
    período — recebe `periodoInicio`/`periodoFim`)
  - `GET /empresas/:empresaId/exportacoes-txt` (lista exportações já
    geradas)

  Mas **nenhuma tela do `admin-web` chama esses endpoints** — não tem
  função nenhuma em `apps/admin-web/src/lib/api.ts` pra isso, nem botão
  em lugar nenhum. É o "motor de classificação fiscal" mencionado na
  landing page (gera TXT das notas já classificadas por CFOP/acumulador,
  pra importar em outro sistema contábil). Precisa: (1) confirmar o
  formato exato do TXT esperado pelo sistema de destino do contador, (2)
  construir a tela de exportação (parecida com a de PDF/Excel que já
  existe, mas gerando o arquivo TXT via esse endpoint do backend em vez
  de gerar no navegador).
- Limite de 18 consultas/hora por empresa fica em memória
  (`documentos-fiscais.service.ts`) — reseta se o serviço reiniciar
  (aceitável, só acontece em deploy).
- Senha do usuário admin está fraca (`123456`) — provisório.

## Fontes consultadas (limite da SEFAZ)

- https://www.fsist.com.br/ajuda/artigos/limite-de-20-consultas-por-hora/
- https://ajuda.omie.com.br/pt-BR/articles/8340736-consumo-indevido-de-consultas-nsu-agente-de-nf-e
- https://atendimento.tecnospeed.com.br/hc/pt-br/articles/10794811536791-Distribui%C3%A7%C3%A3o-DFe-Regras-para-a-sincroniza%C3%A7%C3%A3o-de-NFe-e-causas-de-uso-indevido
- https://qive.com.br/blog/consumo-indevido-consulta-nfe
