# Instala o MinIO (armazenamento S3-compatible para XMLs fiscais e PFX
# cifrados) como Servico do Windows via NSSM.
param(
    [Parameter(Mandatory = $true)][string]$RootUser,
    [Parameter(Mandatory = $true)][string]$RootPassword,
    [string]$DataDir = 'C:\afe\minio-data',
    [int]$ApiPort = 9000,
    [int]$ConsolePort = 9001
)
$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'

$nssm = 'C:\tools\nssm\nssm.exe'
if (-not (Test-Path $nssm)) {
    throw "NSSM nao encontrado em $nssm - rode install-nssm.ps1 primeiro."
}

$installDir = 'C:\tools\minio'
$exePath = Join-Path $installDir 'minio.exe'
New-Item -ItemType Directory -Force -Path $installDir | Out-Null
New-Item -ItemType Directory -Force -Path $DataDir | Out-Null

if (-not (Test-Path $exePath)) {
    Invoke-WebRequest -Uri 'https://dl.min.io/server/minio/release/windows-amd64/minio.exe' -OutFile $exePath
}

if (Get-Service -Name AfeMinio -ErrorAction SilentlyContinue) {
    & $nssm stop AfeMinio
    & $nssm remove AfeMinio confirm
}

& $nssm install AfeMinio $exePath server $DataDir "--address" ":$ApiPort" "--console-address" ":$ConsolePort"
# AppEnvironmentExtra espera UMA string com as variaveis separadas por
# quebra de linha, nao argumentos separados.
$envBlock = "MINIO_ROOT_USER=$RootUser`nMINIO_ROOT_PASSWORD=$RootPassword"
& $nssm set AfeMinio AppEnvironmentExtra $envBlock
& $nssm set AfeMinio AppDirectory $installDir
& $nssm set AfeMinio Start SERVICE_AUTO_START
& $nssm set AfeMinio AppStdout 'C:\afe\logs\minio.log'
& $nssm set AfeMinio AppStderr 'C:\afe\logs\minio.log'
& $nssm set AfeMinio AppRotateFiles 1

New-Item -ItemType Directory -Force -Path 'C:\afe\logs' | Out-Null

& $nssm start AfeMinio

Write-Output "MinIO instalado como servico 'AfeMinio' (API :$ApiPort, console :$ConsolePort)."
