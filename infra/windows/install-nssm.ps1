# Instala o NSSM (Non-Sucking Service Manager) — usado para rodar os apps
# Node.js (core-api, fiscal-engine, admin-web) como Servicos do Windows de
# verdade (sobem sozinhos no boot, reiniciam sozinhos se o processo cair).
$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'

$toolsDir = 'C:\tools\nssm'
$nssmExe = Join-Path $toolsDir 'nssm.exe'

if (Test-Path $nssmExe) {
    Write-Output "NSSM ja instalado em $nssmExe"
    exit 0
}

New-Item -ItemType Directory -Force -Path $toolsDir | Out-Null
$zipPath = Join-Path $env:TEMP 'nssm.zip'

Invoke-WebRequest -Uri 'https://nssm.cc/release/nssm-2.24.zip' -OutFile $zipPath
Expand-Archive -Path $zipPath -DestinationPath $env:TEMP -Force

Copy-Item -Path (Join-Path $env:TEMP 'nssm-2.24\win64\nssm.exe') -Destination $nssmExe -Force

$machinePath = [Environment]::GetEnvironmentVariable('Path', 'Machine')
if ($machinePath -notlike "*$toolsDir*") {
    [Environment]::SetEnvironmentVariable('Path', "$machinePath;$toolsDir", 'Machine')
}

Write-Output "NSSM instalado em $nssmExe"
