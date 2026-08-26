# Registra core-api, fiscal-engine e admin-web como Servicos do Windows
# (via NSSM), lendo as variaveis de ambiente de um arquivo .env.
#
# Pre-requisitos: o projeto ja deve estar clonado/copiado em $AppRoot, com
# `pnpm install`, `pnpm db:generate` e `pnpm build` ja executados.
param(
    [string]$AppRoot = 'C:\afe\app',
    [string]$EnvFile = 'C:\afe\app\.env'
)
$ErrorActionPreference = 'Stop'

$nssm = 'C:\tools\nssm\nssm.exe'
if (-not (Test-Path $nssm)) {
    throw "NSSM nao encontrado em $nssm — rode install-nssm.ps1 primeiro."
}
if (-not (Test-Path $EnvFile)) {
    throw "Arquivo .env nao encontrado em $EnvFile"
}

$nodeExe = (Get-Command node.exe).Source

# Le o .env e monta o bloco multi-linha que o NSSM espera em AppEnvironmentExtra.
$envLines = Get-Content $EnvFile | Where-Object { $_ -match '^\s*[^#\s][^=]*=' }
$envBlock = ($envLines -join "`n")

New-Item -ItemType Directory -Force -Path 'C:\afe\logs' | Out-Null

function Install-AfeService {
    param(
        [string]$ServiceName,
        [string]$Arguments,
        [string]$WorkingDirectory,
        [string]$ExtraEnvLine = $null
    )

    & $nssm stop $ServiceName 2>$null
    & $nssm remove $ServiceName confirm 2>$null

    & $nssm install $ServiceName $nodeExe $Arguments
    & $nssm set $ServiceName AppDirectory $WorkingDirectory

    $finalEnv = if ($ExtraEnvLine) { "$envBlock`n$ExtraEnvLine" } else { $envBlock }
    & $nssm set $ServiceName AppEnvironmentExtra $finalEnv

    & $nssm set $ServiceName Start SERVICE_AUTO_START
    & $nssm set $ServiceName AppStdout "C:\afe\logs\$ServiceName.log"
    & $nssm set $ServiceName AppStderr "C:\afe\logs\$ServiceName.log"
    & $nssm set $ServiceName AppRotateFiles 1
    & $nssm set $ServiceName AppRestartDelay 5000

    & $nssm start $ServiceName
    Write-Output "Servico '$ServiceName' instalado e iniciado."
}

Install-AfeService -ServiceName 'AfeFiscalEngine' `
    -Arguments 'dist\main.js' `
    -WorkingDirectory (Join-Path $AppRoot 'apps\fiscal-engine')

Install-AfeService -ServiceName 'AfeCoreApi' `
    -Arguments 'dist\main.js' `
    -WorkingDirectory (Join-Path $AppRoot 'apps\core-api')

Install-AfeService -ServiceName 'AfeAdminWeb' `
    -Arguments 'node_modules\next\dist\bin\next start' `
    -WorkingDirectory (Join-Path $AppRoot 'apps\admin-web') `
    -ExtraEnvLine 'PORT=3200'

Write-Output "`nTodos os servicos instalados. Verifique com: Get-Service Afe*"
