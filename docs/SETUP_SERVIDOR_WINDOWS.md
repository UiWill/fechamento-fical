# Setup do servidor de produção — Windows Server nativo

Deploy nativo (sem Docker/WSL2) — decisão tomada depois de o servidor
provisionado ter saído Windows Server 2025, e o WSL2 se mostrar frágil para
rodar sem sessão interativa (ver `docs/ARCHITECTURE.md`). Windows Server roda
tudo como Serviços do Windows de verdade — sobem sozinhos no boot, sem
precisar de auto-logon nem de ninguém logado via RDP.

Este guia já foi executado uma vez de ponta a ponta contra o servidor real
(178.132.198.4) — os passos abaixo refletem o que de fato funcionou, não uma
teoria. As armadilhas encontradas (e a correção) estão anotadas onde
ocorreram.

## Componentes e onde rodam

| Componente | Como roda | Porta |
|---|---|---|
| PostgreSQL 16 | Serviço via NSSM, sob conta local sem privilégios (`pgservice`) | 5432 (só localhost) |
| MinIO | Serviço via NSSM | 9000 (API), 9001 (console) |
| Caddy | Serviço via NSSM — reverse proxy + HTTPS automático (pendente até ter domínio) | 80, 443 |
| fiscal-engine | Serviço via NSSM (Node + `ACBrNFe64.dll` via koffi) | 3100 |
| core-api | Serviço via NSSM (NestJS) | 3000 |
| admin-web | Serviço via NSSM (Next.js) | 3200 |

Enquanto não há domínio configurado, core-api e admin-web ficam expostos
direto nas portas 3000/3200 via regra de firewall (`AFE-CoreApi`,
`AFE-AdminWeb`). Quando o domínio existir, instalar o Caddy
(`install-caddy.ps1`) e fechar essas portas no firewall, deixando só 80/443
públicas.

## ⚠️ Cuidado ao rodar estes scripts via SSH a partir de Windows/Linux/Mac

O shell padrão do OpenSSH Server no Windows é o `cmd.exe`, que **não trata
aspas simples como delimitador de string** (só aspas duplas). Se você
invocar `powershell -File script.ps1 -Param 'valor'` através de SSH a partir
de outro shell (bash, outro PowerShell), as aspas simples chegam como
caracteres literais dentro do parâmetro — já aconteceu de uma senha virar
literalmente `'a-senha-com-aspas'` dentro de uma variável de ambiente de
serviço, e isso não dá erro na hora, só falha de forma confusa depois
(autenticação rejeitada). **Sempre use aspas duplas** para argumentos de
scripts PowerShell invocados remotamente via SSH:

```powershell
# ERRADO (via SSH remoto) - aspas simples viram parte do valor
powershell -File install-minio.ps1 -RootUser 'afe-admin' -RootPassword 'senha'

# CERTO
powershell -File install-minio.ps1 -RootUser "afe-admin" -RootPassword "senha"
```

Se estiver rodando localmente no servidor (RDP, console), aspas simples
funcionam normalmente — o problema é só na travessia via SSH não-interativo.

## 1. Pré-requisitos no servidor

- Windows Server com OpenSSH Server habilitado (`Add-WindowsCapability -Online
  -Name OpenSSH.Server~~~~0.0.1.0`, depois `Start-Service sshd` e
  `Set-Service sshd -StartupType Automatic`) e acesso por chave SSH de
  administrador.
- Node.js 20+ e Git — `winget` costuma falhar em VPS sem região geográfica
  configurada corretamente (erro `0x8a15000f`); se acontecer, baixe os
  instaladores oficiais direto (nodejs.org, git-for-windows) em vez de
  depender do winget.
- pnpm (`npm install -g pnpm`).
- DNS de dois domínios apontando pro IP do servidor, quando existirem: um
  para o `core-api` (ex: `api.seudominio.com.br`) e outro para o `admin-web`
  (ex: `app.seudominio.com.br`).

## 2. Instalar as dependências de infraestrutura

Rode cada script (como Administrador) a partir de `infra/windows/`:

```powershell
.\install-nssm.ps1
.\install-postgres.ps1 -SuperPassword "SENHA_FORTE_AQUI" -ServiceAccountPassword "OUTRA_SENHA_FORTE"
.\install-minio.ps1 -RootUser "afe-admin" -RootPassword "OUTRA_SENHA_FORTE"
```

`install-postgres.ps1` baixa o PostgreSQL como distribuição "binaries" (zip),
**não** o instalador gráfico da EDB — o instalador gráfico falha ao rodar
via SSH não-interativo (erro escrevendo `temp_check_comspec.bat`, uma
limitação de sessão parecida com a do WSL2). O script também cria uma conta
Windows local sem privilégios (`pgservice` por padrão) porque **o
`postgres.exe` se recusa a rodar sob uma conta de administrador** — é uma
proteção de segurança do próprio PostgreSQL, não específica deste ambiente.

Quando tiver um domínio, edite `infra/windows/Caddyfile` com os domínios
reais antes de instalar:

```powershell
.\install-caddy.ps1
```

## 3. Criar o banco e o usuário da aplicação

```powershell
$env:PGPASSWORD = "SENHA_DO_SUPERUSUARIO"
& C:\tools\postgresql\bin\psql.exe -U postgres -h localhost -c "CREATE USER afe WITH PASSWORD 'SENHA_DO_APP';"
& C:\tools\postgresql\bin\psql.exe -U postgres -h localhost -c "CREATE DATABASE afe OWNER afe;"
```

## 4. Baixar a ACBrNFe64.dll (dependência nativa do fiscal-engine)

Siga `apps/fiscal-engine/lib/README.md` — copie os arquivos pra
`apps\fiscal-engine\lib\` dentro do código já implantado no servidor (a
cópia já validada localmente está em
`c:\ERP_SISTEMAS\API_ACBR\Dmais\ACBrLibNFe.Demo1\dist\`, e os XSDs de
schema em `c:\ERP_SISTEMAS\API_ACBR\Dmais\Libs\Schemas`).

## 5. Implantar o código

Do seu ambiente de desenvolvimento, envie os arquivos versionados do
projeto pro servidor via streaming direto (não precisa de repositório
remoto nem scp arquivo por arquivo):

```bash
git archive HEAD | ssh administrator@SERVIDOR "tar -x -C C:\afe\app"
```

No servidor, dentro da pasta do projeto (`C:\afe\app`):

```powershell
pnpm install
copy .env.example .env
# edite o .env com os valores reais (DATABASE_URL, MINIO_*, CERT_MASTER_KEY, JWT_SECRET...)
```

Rodar a migration inicial **uma única vez** (precisa de permissão
`CREATEDB` para o shadow database do Prisma — use o superusuário postgres,
não o usuário `afe` da aplicação, que roda com privilégio mínimo):

```powershell
cd packages\database
$env:DATABASE_URL = "postgresql://postgres:SENHA_SUPERUSUARIO@localhost:5432/afe?schema=public"
npx prisma migrate dev --name init
cd ..\..
```

Depois de aplicar a migration como superusuário, conceda as permissões pro
usuário `afe`:

```powershell
$env:PGPASSWORD = "SENHA_SUPERUSUARIO"
& C:\tools\postgresql\bin\psql.exe -U postgres -h localhost -d afe `
  -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO afe;" `
  -c "GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO afe;" `
  -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO afe;" `
  -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO afe;"
```

Copie `packages/database/prisma/migrations/` de volta pro repositório local
e commite — é histórico de schema, precisa estar versionado.

**Antes de buildar o admin-web**, crie `apps/admin-web/.env.production` com
a URL pública do core-api. O Next.js só carrega `.env`/`.env.production` de
dentro da própria pasta do app, **não** do `.env` da raiz do monorepo — se
pular esse passo, o build embute o valor padrão (`http://localhost:3000`,
que aponta pro navegador de quem estiver acessando, não pro servidor) e o
login falha com uma mensagem enganosa de "credenciais inválidas" quando na
verdade é a API inalcançável:

```powershell
"NEXT_PUBLIC_API_URL=http://SEU_IP_OU_DOMINIO:3000" | Set-Content apps\admin-web\.env.production
```

Depois disso, `pnpm build` builda tudo (fiscal-engine, core-api, admin-web).

## 6. Registrar os apps como serviços

```powershell
cd infra\windows
.\install-app-services.ps1 -AppRoot "C:\afe\app" -EnvFile "C:\afe\app\.env"
```

Verifique:

```powershell
Get-Service Afe*
Invoke-WebRequest http://localhost:3000/health
Invoke-WebRequest http://localhost:3100/health
```

`fiscal-engine` deve responder `"acbrLibPresente":true` — se vier `false`,
os arquivos do passo 4 não chegaram no lugar certo.

## 7. Verificar HTTPS (quando houver domínio)

Depois do DNS propagar e o Caddy instalado, `https://api.seudominio.com.br/health`
e `https://app.seudominio.com.br` devem responder com certificado válido
(Caddy emite via Let's Encrypt automaticamente no primeiro acesso).

## Logs

Todos os serviços gravam log em `C:\afe\logs\<NomeDoServico>.log` (rotação
automática configurada pelo NSSM). É o primeiro lugar a olhar quando um
serviço reporta "Running" no `Get-Service` mas não responde no health check
— muitas vezes o processo crashou e o NSSM já tentou reiniciar.

## Backups

Ainda não automatizado — antes de operar com clientes reais em produção,
configurar pelo menos:
- Backup diário do PostgreSQL (`pg_dump`, agendado via Task Scheduler,
  copiado para fora do servidor).
- Backup do diretório de dados do MinIO (`C:\afe\minio-data`) — retenção
  legal de XMLs fiscais é de vários anos, não pode depender só deste disco.

## Comandos úteis

```powershell
# reiniciar um serviço depois de mudar o .env ou fazer novo deploy
nssm restart AfeCoreApi
nssm restart AfeFiscalEngine
nssm restart AfeAdminWeb

# ver status de todos
Get-Service Afe*

# ver/editar variaveis de ambiente de um servico (use aspas duplas! ver aviso acima)
nssm get AfeCoreApi AppEnvironmentExtra
nssm set AfeCoreApi AppEnvironmentExtra "CHAVE=valor"
```
