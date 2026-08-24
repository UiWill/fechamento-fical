# ACBrLibNFe (dependência nativa)

Esta pasta recebe, em tempo de build da imagem Docker, o binário Linux da
ACBrLibNFe — biblioteca open source (LGPL) do projeto ACBr que fala
diretamente com os webservices SOAP da SEFAZ (Distribuição DFe, eventos,
consultas). É carregada via FFI pelo `koffi` em `src/acbr/binding.ts`.

Este projeto usa sua **própria cópia**, baixada diretamente do projeto ACBr —
não depende de nenhum outro projeto ou cliente seu.

## Versão de referência

`ACBrLibNFe-Linux-1.5.0.441` — mesma versão já validada em produção em outro
projeto seu (comunicação SOAP/mTLS com a SEFAZ funcionando corretamente),
usada aqui como baseline conhecida. Pode ser atualizada para uma versão mais
recente do ACBr desde que os testes de integração (`status-servico`,
`distribuicao-dfe`) sejam revalidados em homologação antes de subir para
produção.

## Como obter

1. Baixe o pacote Linux (`ACBrLibNFe-Linux-*.tar.gz` ou `.zip`) em
   https://github.com/ACBr/ACBrLib/releases (ou https://projetoacbr.com.br/).
2. Extraia de forma que esta pasta fique assim:

```
lib/
├── libacbrnfe64.so
├── libcrypto-1_1-x64.so   (ou versão OpenSSL equivalente ao build escolhido)
├── libssl-1_1-x64.so
├── libxml2.so / libxslt.so / libiconv.so (conforme exigido pelo build)
└── Schemas/
    └── NFe/                # XSDs de validação, distribuídos junto no pacote
```

3. Confirme o caminho real no arquivo baixado — o binário CONSOLE-MT
   (multi-thread, sem interface gráfica) é o indicado para rodar em
   container/servidor.

## Por que não fica versionado no git

Binários nativos não pertencem ao controle de versão do código-fonte. O
`Dockerfile` deste app copia esta pasta durante o build (`COPY lib/ ./lib/`);
localmente, baixe uma vez e mantenha fora do commit (`.gitignore` já cobre
`apps/fiscal-engine/lib/*.so`).
