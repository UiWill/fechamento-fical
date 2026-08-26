# Instala PostgreSQL 16 nativo no Windows Server a partir da distribuicao
# "binaries" (zip, sem instalador BitRock - mais confiavel para automacao
# via SSH nao-interativo, onde o instalador grafico da EDB falha ao
# escrever arquivos temporarios de checagem).
#
# O postgres.exe se recusa a rodar sob uma conta com privilegio de
# administrador (protecao de seguranca do proprio Postgres, existe em
# qualquer SO). Por isso criamos uma conta local sem privilegios dedicada
# so a isso, e o servico (via NSSM) roda sob essa conta.
param(
    [Parameter(Mandatory = $true)][string]$SuperPassword,
    [Parameter(Mandatory = $true)][string]$ServiceAccountPassword,
    [string]$ServiceAccountName = 'pgservice',
    [string]$DataDir = 'C:\afe\pgdata',
    [string]$InstallDir = 'C:\tools\postgresql'
)
$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'

$nssm = 'C:\tools\nssm\nssm.exe'
if (-not (Test-Path $nssm)) {
    throw "NSSM nao encontrado em $nssm - rode install-nssm.ps1 primeiro."
}

if (Get-Service -Name 'AfePostgres' -ErrorAction SilentlyContinue) {
    Write-Output "PostgreSQL ja instalado (servico AfePostgres encontrado)."
    exit 0
}

# --- conta de servico sem privilegios ---
if (-not (Get-LocalUser -Name $ServiceAccountName -ErrorAction SilentlyContinue)) {
    $securePw = ConvertTo-SecureString $ServiceAccountPassword -AsPlainText -Force
    New-LocalUser -Name $ServiceAccountName -Password $securePw -PasswordNeverExpires -UserMayNotChangePassword | Out-Null
    Write-Output "Usuario local '$ServiceAccountName' criado."
}

# --- binarios ---
if (-not (Test-Path $InstallDir)) {
    Write-Output "Baixando PostgreSQL (binaries zip)..."
    $zipPath = Join-Path $env:TEMP 'postgresql-binaries.zip'
    Invoke-WebRequest -Uri 'https://get.enterprisedb.com/postgresql/postgresql-16.6-1-windows-x64-binaries.zip' -OutFile $zipPath
    Expand-Archive -Path $zipPath -DestinationPath $env:TEMP -Force
    Move-Item -Path (Join-Path $env:TEMP 'pgsql') -Destination $InstallDir
}

$initdb = Join-Path $InstallDir 'bin\initdb.exe'
$postgres = Join-Path $InstallDir 'bin\postgres.exe'

$dataDirCriadoAgora = -not (Test-Path $DataDir)
if ($dataDirCriadoAgora) {
    # Nao criar $DataDir antecipadamente - o initdb precisa criar a pasta
    # folha ele mesmo para aplicar as permissoes restritas corretamente.
    # --auth=trust por enquanto (sem senha ainda) - --pwfile se mostrou
    # nao-confiavel neste ambiente (senha as vezes nao "pega" de verdade);
    # a senha real e definida via ALTER USER logo abaixo, com o metodo de
    # autenticacao revertido para scram-sha-256 antes do primeiro uso real.
    & $initdb -D $DataDir -U postgres -E UTF8 --auth=trust
}

# --- dono dos arquivos precisa ser a conta que vai rodar o processo ---
# Importante: /T + (OI)(CI) na mesma chamada NAO aplica a permissao direta
# em arquivos ja existentes (essas flags de heranca so valem para objetos
# criados DEPOIS) - por isso duas chamadas: uma sem (OI)(CI) pra aplicar
# nos arquivos existentes, outra so no diretorio raiz pra herdar em arquivos
# futuros que o proprio postgres criar rodando.
Write-Output "Ajustando dono/permissoes de $DataDir e $InstallDir para $ServiceAccountName..."
& icacls $DataDir /setowner $ServiceAccountName /T /C | Out-Null
& icacls $DataDir /grant "${ServiceAccountName}:F" /T /C
& icacls $DataDir /grant "${ServiceAccountName}:(OI)(CI)F" /C
& icacls $InstallDir /grant "${ServiceAccountName}:RX" /T /C
& icacls $InstallDir /grant "${ServiceAccountName}:(OI)(CI)RX" /C

New-Item -ItemType Directory -Force -Path 'C:\afe\logs' | Out-Null
& icacls 'C:\afe\logs' /grant "${ServiceAccountName}:(OI)(CI)F" /C | Out-Null

& $nssm install AfePostgres $postgres "-D" $DataDir
& $nssm set AfePostgres AppDirectory $InstallDir
& $nssm set AfePostgres ObjectName ".\$ServiceAccountName" $ServiceAccountPassword
& $nssm set AfePostgres Start SERVICE_AUTO_START
& $nssm set AfePostgres AppStdout 'C:\afe\logs\postgres.log'
& $nssm set AfePostgres AppStderr 'C:\afe\logs\postgres.log'
& $nssm set AfePostgres AppRotateFiles 1

& $nssm start AfePostgres
Start-Sleep -Seconds 3

$psql = Join-Path $InstallDir 'bin\psql.exe'

if ($dataDirCriadoAgora) {
    Write-Output "Definindo senha do superusuario (via conexao trust local, uma unica vez)..."
    & $psql -U postgres -h 127.0.0.1 -c "ALTER USER postgres PASSWORD '$SuperPassword';"

    Write-Output "Trocando autenticacao de trust para scram-sha-256..."
    (Get-Content "$DataDir\pg_hba.conf") -replace '127\.0\.0\.1/32\s+trust', '127.0.0.1/32            scram-sha-256' `
        -replace '::1/128\s+trust', '::1/128                 scram-sha-256' |
        Set-Content "$DataDir\pg_hba.conf"

    & $nssm restart AfePostgres
    Start-Sleep -Seconds 3
}

Write-Output "PostgreSQL instalado como servico 'AfePostgres'. Teste com:"
Write-Output "  `$env:PGPASSWORD='$SuperPassword'; & '$psql' -U postgres -h localhost -c 'SELECT version();'"
