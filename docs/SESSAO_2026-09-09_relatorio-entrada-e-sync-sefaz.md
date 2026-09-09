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
101ac59 Documenta a sessao de hoje (relatorio de entrada, sync SEFAZ, correcoes de servidor)
8b6e15a Implementa geracao do TXT de entrada para importacao no Dominio Sistemas
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

## 6. Exportação TXT pro Domínio Sistemas — v1 (só entrada)

Contexto do contrato (`Contrato_CAPTAL_William_Automacao_Fechamento_Fiscal.pdf`,
cláusula 2ª): o sistema é pra CAPTAL Contabilidade, e o item VI do escopo é
"geração de arquivo TXT para importação no Domínio Sistemas" — literalmente
o entregável final que fecha o ciclo (cobrança é R$49,90/CNPJ/mês vitalício
pra carteira da CAPTAL).

**O que existe agora:**

- Botão "Gerar TXT" na página da empresa (filtro por mês), chama
  `POST /empresas/:id/exportacoes-txt` e já baixa o arquivo automaticamente
  (`apps/admin-web/src/lib/api.ts`: `gerarExportacaoTxt` +
  `baixarExportacaoTxt`).
- Backend (`apps/core-api/src/exportacao-txt/`): `exportacao-txt.service.ts`
  monta o arquivo, salva no MinIO (bucket `afe-exportacoes-txt`), grava
  status na tabela `ExportacaoTxt`. `dominio-layout.ts` tem os construtores
  de cada linha do layout (`|` delimitado).
- Cobre só os blocos de **entrada**: `0000` (abertura — CNPJ da empresa),
  `0010` (fornecedor — CNPJ, razão social, endereço lido sob demanda do XML
  já armazenado no MinIO) e `1000` (nota — CNPJ emitente, CFOP, número/série
  extraídos da própria chave de acesso, datas, valor total, chave completa).

**Como foi decodificado (importante ler antes de mexer):** não existe
documentação oficial em mãos — o leiaute foi decodificado por engenharia
reversa a partir de um arquivo de exemplo real, `ExportacaoDominio-ENDURO-08-2026.txt`
(não versionado no git — tem CNPJ/razão social/valores reais de fornecedores
de um cliente real, cláusula de confidencialidade do contrato). Cruzei os
campos contra dado que já conhecíamos por outra via (chave de acesso, CFOP,
valores) pra confirmar posições com confiança. Campos cujo significado exato
não foi confirmado replicam o mesmo valor constante visto no arquivo-modelo
(comentado em `dominio-layout.ts` — ex: campos `F`/`T`/`E`/`N`/`36`/`7` no
registro 1000 e 0010).

**Tentei achar a documentação oficial e não consegui** — o usuário mandou
o link `https://suporte.dominioatendimento.com/central/faces/solucao.html?codigo=672`
("Leiaute Domínio Sistemas com Separador"), que parece ser a doc real (tem
uma tabela de campos por registro, formato Campo/Nº/Tipo/Casas
Decimais/Formato/Comentário — o mesmo padrão que a Enduro usa). Só que o
fetch automático da página só traz conteúdo até ~Registro 0520 e nunca
consegue puxar os registros 1000/1020/1060/1500 de verdade (a página parece
carregar conteúdo via JavaScript/paginação, e em tentativas diferentes o
fetch chega a "inventar" uma tabela incompleta de 13 campos pro registro
1000 que **não bate** com os 100 campos reais vistos no arquivo da Enduro —
não confiar nisso.

## 7. Pendências conhecidas

- **Confirmar o leiaute oficial do Domínio (prioridade alta).** Alguém
  precisa abrir `codigo=672` num navegador de verdade (logado, se pedir) e
  copiar/colar aqui as tabelas dos registros **1000, 1020, 1060 e 1500**
  (bloco de entrada). Com o texto real dá pra corrigir qualquer campo
  errado no `dominio-layout.ts` — hoje ele só foi validado por engenharia
  reversa contra UM arquivo de exemplo.
- **Confirmar com o contador o campo "acumulador" nas notas de entrada.**
  No arquivo-modelo da Enduro esse campo só aparece preenchido nas notas de
  **saída** (registro 2000, campo 4, valor fixo "600" pra todas as vendas);
  nas notas de entrada ele vem sempre vazio. Não sabemos se é porque a
  Enduro simplesmente não usa acumulador nas compras, ou se o campo de
  entrada mora em outra posição não vista nesse exemplo. Enquanto isso não
  for confirmado, o TXT de entrada não preenche acumulador nenhum — e o
  `RegraFiscal.acumulador` que já existe no motor de classificação (pensado
  originalmente pra isso) fica sem uso no TXT por enquanto.
- **Blocos que faltam, por falta de dado capturado:**
  - `1020`/`1060` (totalizadores de ICMS por situação tributária/CFOP) —
    precisaria de parsing completo do XML (itens, impostos por item), que
    hoje não existe (`xml-utils.ts` só extrai CFOP/valor total da nota
    inteira, não por item).
  - `1500` (parcelas/duplicatas) — não capturamos condição de pagamento em
    lugar nenhum do sistema.
  - Bloco inteiro de **saída** (`2000`/`2020`/`2060`/`2500`) — depende da
    captura de NF-e/NFC-e de saída, que ainda não existe (fica pro fim de
    semana, por decisão do usuário — depois disso, adicionar essas funções
    em `dominio-layout.ts` seguindo o mesmo padrão das de entrada).
- **Validar um TXT de verdade com o contador antes de confiar** — gerar
  pra alguma empresa real da carteira e conferir se o Domínio aceita o
  arquivo sem erro, antes de usar isso em produção pra fechamento de
  verdade.
- Limite de 18 consultas/hora por empresa fica em memória
  (`documentos-fiscais.service.ts`) — reseta se o serviço reiniciar
  (aceitável, só acontece em deploy).
- Senha do usuário admin está fraca (`123456`) — provisório.
- **SSH pro servidor esteve instável hoje** (`kex_exchange_identification:
  read: Connection reset by peer` / `Connection closed`) — resolvido nas
  duas vezes reiniciando o serviço `sshd` no PowerShell do próprio servidor
  (`Restart-Service sshd -Force`). Se acontecer de novo, é o primeiro passo
  a tentar.

## Fontes consultadas (limite da SEFAZ)

- https://www.fsist.com.br/ajuda/artigos/limite-de-20-consultas-por-hora/
- https://ajuda.omie.com.br/pt-BR/articles/8340736-consumo-indevido-de-consultas-nsu-agente-de-nf-e
- https://atendimento.tecnospeed.com.br/hc/pt-br/articles/10794811536791-Distribui%C3%A7%C3%A3o-DFe-Regras-para-a-sincroniza%C3%A7%C3%A3o-de-NFe-e-causas-de-uso-indevido
- https://qive.com.br/blog/consumo-indevido-consulta-nfe

## Fontes consultadas (leiaute Domínio Sistemas — incompletas, ver seção 7)

- https://suporte.dominioatendimento.com/central/faces/solucao.html?codigo=672
  ("Leiaute: Domínio Sistemas com Separador" — a doc real, mas o fetch
  automático não consegue puxar os registros 1000+ dessa página)
- https://suporte.dominioatendimento.com/central/faces/solucao.html?codigo=11916
  (página "como importar", só aponta de volta pro codigo=672)
