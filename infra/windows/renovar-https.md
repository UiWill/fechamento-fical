# Renovar o certificado HTTPS (a cada ~60 dias)

O certificado wildcard `*.dnotas.com.br` é emitido pelo Let's Encrypt via
win-acme, com validação por DNS (obrigatória para wildcard, e também porque
as portas 80/443 do servidor já são usadas pelo TSplus). Como o domínio
está no Registro.br (sem API), essa validação é manual: alguém precisa
colar um registro TXT no painel de DNS a cada renovação.

O win-acme já tenta renovar sozinho via uma tarefa agendada (`win-acme
renew`, todo dia às 09:00 + até 4h de atraso aleatório), mas como a
validação é manual, essa tentativa **fica parada esperando** até alguém
completar o passo abaixo — não expira nem falha sozinha, só não avança.

## Passo a passo

1. No servidor (`ssh administrator@178.132.198.4`), rode:
   ```powershell
   cd C:\tools\win-acme
   .\wacs.exe --renew --baseuri "https://acme-v02.api.letsencrypt.org/"
   ```
   (Ou espere a tarefa agendada `win-acme renew` disparar sozinha às 09h.)

2. O processo vai pausar e escrever o registro pedido em
   `C:\afe\certs\pending-txt.json`:
   ```json
   { "recordName": "_acme-challenge.dnotas.com.br", "token": "..." }
   ```

3. Adicione um registro **TXT** no painel DNS do Registro.br para
   `dnotas.com.br`:
   - Nome/Host: `_acme-challenge`
   - Valor: o `token` do arquivo acima
   - Salve/aplique a mudança na zona (o Registro.br exige um passo de
     confirmação separado depois de listar a entrada).

4. Confirme que propagou antes de liberar (evita falha por DNS não
   propagado ainda):
   ```bash
   dig +short TXT _acme-challenge.dnotas.com.br @f.sec.dns.br
   ```
   Repita até aparecer o valor esperado (geralmente é quase instantâneo
   nos servidores autoritativos do Registro.br, sem esperar propagação
   global).

5. Libere o win-acme criando o arquivo de confirmação:
   ```powershell
   New-Item -ItemType File -Force -Path C:\afe\certs\txt-confirmado.flag
   ```
   O processo detecta o arquivo, valida com o Let's Encrypt, baixa o
   certificado novo e sobrescreve os arquivos em `C:\afe\certs\` (mesmo
   nome de sempre: `dnotas-wildcard-chain.pem` / `dnotas-wildcard-key.pem`
   — não precisa mudar o Caddyfile).

6. Reinicie o Caddy pra carregar o certificado novo:
   ```powershell
   C:\tools\nssm\nssm.exe restart AfeCaddy
   ```

## Arquivos envolvidos

- `C:\afe\certs\dns-create.ps1` / `dns-delete.ps1` — scripts que o win-acme
  chama automaticamente durante a validação (não precisam ser editados,
  só existir).
- `C:\afe\certs\dnotas-wildcard-*.pem` — certificado, chave e cadeia atuais.
- `infra/windows/Caddyfile` — referencia os arquivos `.pem` acima nos
  blocos `https://...:8443`.
