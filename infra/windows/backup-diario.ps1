# Backup diario do Postgres (pg_dump, com rotacao) e do armazenamento de
# objetos local (C:\afe\object-storage, espelhado via robocopy). Roda como
# Tarefa Agendada do Windows (ver install-backup.ps1) as 21h (pedido do
# usuario em 2026-10-19).
#
# Desde 2026-10-19 o backup tambem sobe pro Google Drive (rclone, remote
# "gdrive") - isso sim protege contra perda do servidor inteiro (disco
# morrer, reimagem acidental como a que ja aconteceu em 2026-09), ja que
# fica fora do servidor. O snapshot do dia 2026-10-19 foi preservado
# separadamente em gdrive:FechaFiscal-Backups/preservado-2026-10-19 (nunca
# sobrescrito); a partir daqui, cada rodada sobe pra
# gdrive:FechaFiscal-Backups/diario, substituindo o dia anterior.

$ErrorActionPreference = 'Stop'

$raizApp = 'C:\afe\app'
$pgDump = 'C:\tools\postgresql\bin\pg_dump.exe'
$pastaBackups = 'C:\afe\backups'
$pastaPostgres = Join-Path $pastaBackups 'postgres'
$pastaObjetos = Join-Path $pastaBackups 'object-storage'
$diasRetencaoPostgres = 14
$arquivoLog = Join-Path $pastaBackups 'backup.log'

function Escrever-Log($mensagem) {
    $linha = "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') $mensagem"
    Write-Output $linha
    Add-Content -Path $arquivoLog -Value $linha
}

New-Item -ItemType Directory -Force -Path $pastaPostgres | Out-Null
New-Item -ItemType Directory -Force -Path $pastaObjetos | Out-Null

# Le DATABASE_URL do .env sem nunca imprimir a senha - so usada aqui dentro,
# pro pg_dump se conectar (mesmo jeito que o proprio app ja le essa env var).
$linhaEnv = (Get-Content (Join-Path $raizApp '.env') | Select-String '^DATABASE_URL=').ToString()
$valorEnv = ($linhaEnv -replace '^DATABASE_URL=', '').Trim('"')
$uri = [Uri]$valorEnv
$usuario = $uri.UserInfo.Split(':')[0]
$senha = $uri.UserInfo.Split(':')[1]
$banco = $uri.AbsolutePath.TrimStart('/')
if ($banco -match '\?') { $banco = $banco.Substring(0, $banco.IndexOf('?')) }

$carimbo = Get-Date -Format 'yyyyMMdd-HHmmss'
$arquivoSql = Join-Path $pastaPostgres "afe-$carimbo.sql"
$arquivoZip = Join-Path $pastaPostgres "afe-$carimbo.zip"

try {
    Escrever-Log "Iniciando pg_dump -> $arquivoSql"
    $env:PGPASSWORD = $senha
    # --format=plain fica legivel/restauravel com qualquer psql padrao, sem
    # depender da mesma versao exata de um pg_restore binario.
    & $pgDump --host=$($uri.Host) --port=$($uri.Port) --username=$usuario --dbname=$banco --no-password --format=plain --file=$arquivoSql
    Remove-Item Env:\PGPASSWORD -ErrorAction SilentlyContinue

    if ((Get-Item $arquivoSql).Length -eq 0) {
        throw "pg_dump gerou arquivo vazio"
    }

    # Compress-Archive e nativo do PowerShell (nao precisa de 7-Zip
    # instalado) - um dump de banco comprime bem, reduz bastante o espaco
    # acumulado ao longo dos dias de retencao.
    Compress-Archive -Path $arquivoSql -DestinationPath $arquivoZip -Force
    Remove-Item $arquivoSql -Force
    $tamanhoMb = [math]::Round((Get-Item $arquivoZip).Length / 1MB, 2)
    Escrever-Log "pg_dump concluido: $arquivoZip ($tamanhoMb MB)"
} catch {
    Remove-Item Env:\PGPASSWORD -ErrorAction SilentlyContinue
    Escrever-Log "ERRO no pg_dump: $_"
}

# Rotacao - mantem so os ultimos N dias de dump do Postgres.
Get-ChildItem $pastaPostgres -Filter 'afe-*' |
    Where-Object { $_.LastWriteTime -lt (Get-Date).AddDays(-$diasRetencaoPostgres) } |
    ForEach-Object {
        Escrever-Log "Removendo dump antigo: $($_.Name)"
        Remove-Item $_.FullName -Force
    }

# Espelha o armazenamento de objetos (XMLs fiscais, certificados, TXTs,
# instaladores do agente) - robocopy /MIR e incremental, so copia o que
# mudou, entao e rapido mesmo com muitos arquivos depois do primeiro dia.
try {
    Escrever-Log "Espelhando object-storage -> $pastaObjetos"
    $resultado = & robocopy 'C:\afe\object-storage' $pastaObjetos /MIR /R:2 /W:5 /NFL /NDL /NP
    # Robocopy usa codigos de saida >= 8 pra erro real; 0-7 sao sucesso/info.
    if ($LASTEXITCODE -ge 8) {
        Escrever-Log "AVISO: robocopy terminou com codigo $LASTEXITCODE"
    } else {
        Escrever-Log "Espelhamento de object-storage concluido (codigo $LASTEXITCODE)"
    }
} catch {
    Escrever-Log "ERRO ao espelhar object-storage: $_"
}

Escrever-Log "Backup diario concluido."

# Envio pro Google Drive (rclone, remote "gdrive") - nao falha o backup
# local se der problema de rede/nuvem, so registra no log. Postgres sobe
# com nome fixo (sobrescreve o do dia anterior); object-storage vai como
# sync direto da pasta (rclone so transmite o que mudou - rapido mesmo
# com milhares de arquivos, sem precisar compactar todo santo dia).
$rclone = 'C:\tools\rclone\rclone.exe'
$pastaDriveDiario = 'gdrive:FechaFiscal-Backups/diario'

try {
    Escrever-Log "Enviando dump do Postgres para o Google Drive..."
    & $rclone copyto $arquivoZip "$pastaDriveDiario/postgres-ultimo.zip" --quiet
    if ($LASTEXITCODE -ne 0) {
        Escrever-Log "AVISO: rclone (postgres) terminou com codigo $LASTEXITCODE"
    } else {
        Escrever-Log "Dump do Postgres enviado ao Google Drive."
    }
} catch {
    Escrever-Log "ERRO ao enviar dump do Postgres para o Google Drive: $_"
}

try {
    Escrever-Log "Sincronizando object-storage com o Google Drive..."
    & $rclone sync $pastaObjetos "$pastaDriveDiario/object-storage" --quiet
    if ($LASTEXITCODE -ne 0) {
        Escrever-Log "AVISO: rclone (object-storage) terminou com codigo $LASTEXITCODE"
    } else {
        Escrever-Log "object-storage sincronizado com o Google Drive."
    }
} catch {
    Escrever-Log "ERRO ao sincronizar object-storage com o Google Drive: $_"
}

Escrever-Log "Envio ao Google Drive concluido."
