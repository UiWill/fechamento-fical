# Instala o Caddy (reverse proxy com HTTPS automatico via Let's Encrypt)
# como Servico do Windows via NSSM.
$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'

$nssm = 'C:\tools\nssm\nssm.exe'
if (-not (Test-Path $nssm)) {
    throw "NSSM nao encontrado em $nssm - rode install-nssm.ps1 primeiro."
}

$installDir = 'C:\tools\caddy'
$exePath = Join-Path $installDir 'caddy.exe'
New-Item -ItemType Directory -Force -Path $installDir | Out-Null

if (-not (Test-Path $exePath)) {
    $zipPath = Join-Path $env:TEMP 'caddy.zip'
    Invoke-WebRequest -Uri 'https://github.com/caddyserver/caddy/releases/latest/download/caddy_windows_amd64.zip' -OutFile $zipPath
    Expand-Archive -Path $zipPath -DestinationPath $installDir -Force
}

$caddyfileSource = Join-Path $PSScriptRoot 'Caddyfile'
$caddyfileDest = Join-Path $installDir 'Caddyfile'
Copy-Item -Path $caddyfileSource -Destination $caddyfileDest -Force

if (Get-Service -Name AfeCaddy -ErrorAction SilentlyContinue) {
    & $nssm stop AfeCaddy
    & $nssm remove AfeCaddy confirm
}

& $nssm install AfeCaddy $exePath run "--config" $caddyfileDest
& $nssm set AfeCaddy AppDirectory $installDir
& $nssm set AfeCaddy Start SERVICE_AUTO_START
& $nssm set AfeCaddy AppStdout 'C:\afe\logs\caddy.log'
& $nssm set AfeCaddy AppStderr 'C:\afe\logs\caddy.log'
& $nssm set AfeCaddy AppRotateFiles 1

New-Item -ItemType Directory -Force -Path 'C:\afe\logs' | Out-Null

New-NetFirewallRule -DisplayName 'AFE-HTTP' -Direction Inbound -Protocol TCP -LocalPort 80 -Action Allow -ErrorAction SilentlyContinue | Out-Null
New-NetFirewallRule -DisplayName 'AFE-HTTPS' -Direction Inbound -Protocol TCP -LocalPort 443 -Action Allow -ErrorAction SilentlyContinue | Out-Null

& $nssm start AfeCaddy

Write-Output "Caddy instalado como servico 'AfeCaddy'. Edite $caddyfileDest com os dominios reais e rode: nssm restart AfeCaddy"
