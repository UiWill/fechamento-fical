# Instala PostgreSQL 16 nativo no Windows Server, como Servico do Windows
# (o instalador da EDB ja registra o servico "postgresql-x64-16" sozinho,
# sem precisar de NSSM).
param(
    [Parameter(Mandatory = $true)][string]$SuperPassword
)
$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'

if (Get-Service -Name 'postgresql-x64-16' -ErrorAction SilentlyContinue) {
    Write-Output "PostgreSQL ja instalado (servico postgresql-x64-16 encontrado)."
    exit 0
}

if (Get-Command winget -ErrorAction SilentlyContinue) {
    Write-Output "Instalando via winget..."
    winget install --id PostgreSQL.PostgreSQL.16 --silent --accept-package-agreements --accept-source-agreements
} else {
    Write-Output "winget nao disponivel — baixando instalador da EDB diretamente."
    $installerUrl = 'https://get.enterprisedb.com/postgresql/postgresql-16.6-1-windows-x64.exe'
    $installerPath = Join-Path $env:TEMP 'postgresql-installer.exe'
    Invoke-WebRequest -Uri $installerUrl -OutFile $installerPath

    Start-Process -FilePath $installerPath -ArgumentList @(
        '--mode', 'unattended',
        '--unattendedmodeui', 'none',
        '--superpassword', $SuperPassword,
        '--serverport', '5432',
        '--enable-components', 'server',
        '--disable-components', 'stackbuilder,pgAdmin'
    ) -Wait -NoNewWindow
}

Write-Output "Instalacao concluida. Verifique com: Get-Service postgresql*"
