# ACBrNFe64.dll (dependência nativa)

Esta pasta recebe, no servidor, os binários Windows da ACBrLibNFe —
biblioteca open source (LGPL) do projeto ACBr que fala diretamente com os
webservices SOAP da SEFAZ (Distribuição DFe, eventos, consultas). É
carregada via FFI pelo `koffi` em `src/acbr/binding.ts`.

Deploy alvo é **Windows Server nativo** (sem Docker/WSL2) — ver
`docs/SETUP_SERVIDOR_WINDOWS.md` na raiz do projeto para o passo a passo
completo de instalação como serviço.

## Arquivos necessários nesta pasta

```
lib/
├── ACBrNFe64.dll
├── libcrypto-1_1-x64.dll   (ou versão OpenSSL equivalente ao build escolhido)
├── libssl-1_1-x64.dll
├── libxml2.dll
├── libxslt.dll
├── libiconv.dll
├── libexslt.dll
└── Schemas/
    └── NFe/                # XSDs de validação, distribuídos junto no pacote
```

## Como obter

Você já tem uma cópia funcional testada em `c:\ERP_SISTEMAS\API_ACBR\Dmais\ACBrLibNFe.Demo1\dist\`
(usada pelo app de demonstração Java/JNA que comprovadamente conversa com a
SEFAZ). Copie esses arquivos de lá para cá.

Alternativa (versão mais nova ou ambiente sem essa pasta): baixe o pacote
Windows (`ACBrLibNFe-Windows-*.zip`) em
https://github.com/ACBr/ACBrLib/releases (ou https://projetoacbr.com.br/) e
extraia o build **x64** — o `ACBrNFe64.dll` e as DLLs de dependência ficam
juntos no mesmo pacote.

## Por que não fica versionado no git

Binários nativos não pertencem ao controle de versão do código-fonte. Copie
esses arquivos manualmente no servidor de produção (e no ambiente de
desenvolvimento local, se for testar chamadas reais à ACBr) — o
`.gitignore` já ignora `apps/fiscal-engine/lib/*.dll`.
