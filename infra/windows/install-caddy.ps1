# Instala o Caddy (reverse proxy) como Servico do Windows via NSSM.
#
# Roda em HTTP puro na porta 8080 (ver Caddyfile) porque o TSplus ja usa
# 80/443 neste servidor para o portal remoto da equipe - por isso o
# firewall abaixo libera 8080, nao 80/443.
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
    # O nome do arquivo de release do Caddy inclui a versao (ex:
    # caddy_2.8.4_windows_amd64.zip) - nao existe um link fixo "sem
    # versao", entao descobre a versao atual via API do GitHub primeiro.
    $release = Invoke-RestMethod -Uri 'https://api.github.com/repos/caddyserver/caddy/releases/latest'
    $asset = $release.assets | Where-Object { $_.name -like '*windows_amd64.zip' } | Select-Object -First 1
    if (-not $asset) {
        throw "Nao encontrei o asset windows_amd64.zip na release mais recente do Caddy."
    }

    $zipPath = Join-Path $env:TEMP 'caddy.zip'
    Invoke-WebRequest -Uri $asset.browser_download_url -OutFile $zipPath
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

New-NetFirewallRule -DisplayName 'AFE-Caddy-8080' -Direction Inbound -Protocol TCP -LocalPort 8080 -Action Allow -ErrorAction SilentlyContinue | Out-Null

& $nssm start AfeCaddy

Write-Output "Caddy instalado como servico 'AfeCaddy'. Edite $caddyfileDest com os dominios reais e rode: nssm restart AfeCaddy"
