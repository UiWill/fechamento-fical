# Setup do servidor de produção — Windows Server nativo

Deploy nativo (sem Docker/WSL2) — decisão tomada depois de o servidor
provisionado ter saído Windows Server 2025, e o WSL2 se mostrar frágil para
rodar sem sessão interativa (ver histórico de deploy). Windows Server roda
tudo como Serviços do Windows de verdade — sobem sozinhos no boot, sem
precisar de auto-logon nem de ninguém logado via RDP.

## Componentes e onde rodam

| Componente | Como roda | Porta |
|---|---|---|
| PostgreSQL 16 | Serviço nativo (instalador oficial) | 5432 (só localhost) |
| MinIO | Serviço via NSSM | 9000 (API), 9001 (console) |
| Caddy | Serviço via NSSM — reverse proxy + HTTPS automático | 80, 443 |
| fiscal-engine | Serviço via NSSM (Node + `ACBrNFe64.dll` via koffi) | 3100 (só localhost) |
| core-api | Serviço via NSSM (NestJS) | 3000 (só localhost) |
| admin-web | Serviço via NSSM (Next.js) | 3200 (só localhost) |

Só Caddy fica exposto nas portas 80/443; os apps ficam em `127.0.0.1` e são
alcançados de fora só através do reverse proxy.

## 1. Pré-requisitos no servidor

- Windows Server com acesso RDP/SSH de administrador (ver seção de SSH mais
  abaixo — os scripts aqui assumem que dá pra rodar comandos remotamente).
- Node.js 20+ instalado (`winget install OpenJS.NodeJS.LTS` ou instalador
  manual).
- pnpm (`npm install -g pnpm`).
- Git (`winget install Git.Git`), se for clonar via git em vez de copiar os
  arquivos manualmente.
- DNS de dois domínios apontando pro IP do servidor: um para o `core-api`
  (ex: `api.seudominio.com.br`) e outro para o `admin-web` (ex:
  `app.seudominio.com.br`).

## 2. Instalar as dependências de infraestrutura

Rode cada script (como Administrador) a partir de `infra/windows/`:

```powershell
.\install-nssm.ps1
.\install-postgres.ps1 -SuperPassword "SENHA_FORTE_AQUI"
.\install-minio.ps1 -RootUser "afe-admin" -RootPassword "OUTRA_SENHA_FORTE"
```

Edite `infra/windows/Caddyfile` com os domínios reais antes de instalar o
Caddy:

```powershell
.\install-caddy.ps1
```

## 3. Criar o banco e o usuário da aplicação

```powershell
& 'C:\Program Files\PostgreSQL\16\bin\psql.exe' -U postgres -c "CREATE USER afe WITH PASSWORD 'SENHA_DO_APP';"
& 'C:\Program Files\PostgreSQL\16\bin\psql.exe' -U postgres -c "CREATE DATABASE afe OWNER afe;"
```

## 4. Baixar a ACBrNFe64.dll (dependência nativa do fiscal-engine)

Siga `apps/fiscal-engine/lib/README.md` — copie os arquivos pra
`apps\fiscal-engine\lib\` dentro do código já implantado no servidor.

## 5. Implantar o código

Do seu ambiente de desenvolvimento (Windows local), envie os arquivos
versionados do projeto pro servidor. Formas possíveis:
- `git archive HEAD | ssh administrator@SERVIDOR "..."` (streaming direto,
  sem precisar de repositório remoto)
- Clonar direto no servidor, se o repositório já estiver num remoto (GitHub
  etc.)

No servidor, dentro da pasta do projeto (`C:\afe\app`):

```powershell
pnpm install
copy .env.example .env
# edite o .env com os valores reais (DATABASE_URL, MINIO_*, CERT_MASTER_KEY, JWT_SECRET...)
pnpm db:generate
pnpm db:migrate
pnpm build
```

## 6. Registrar os apps como serviços

```powershell
cd infra\windows
.\install-app-services.ps1 -AppRoot 'C:\afe\app' -EnvFile 'C:\afe\app\.env'
```

Verifique:

```powershell
Get-Service Afe*
Invoke-WebRequest http://localhost:3000/health
Invoke-WebRequest http://localhost:3100/health
```

## 7. Verificar HTTPS

Depois do DNS propagar, `https://api.seudominio.com.br/health` e
`https://app.seudominio.com.br` devem responder com certificado válido
(Caddy emite via Let's Encrypt automaticamente no primeiro acesso).

## Logs

Todos os serviços gravam log em `C:\afe\logs\<NomeDoServico>.log` (rotação
automática configurada pelo NSSM).

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

# editar configuracao de um servico (ex: variaveis de ambiente)
nssm edit AfeCoreApi
```
