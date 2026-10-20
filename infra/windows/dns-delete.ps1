param(
    [string]$RecordName
)
$ErrorActionPreference = 'SilentlyContinue'

$zonasCloudflare = @{
    'fechafiscal.com.br' = @{
        zoneId    = '5d21115bf019ea55bcb00ed9a3b654ed'
        tokenFile = 'C:\afe\certs\cloudflare-token.txt'
    }
}

function Obter-DominioRaiz([string]$nome) {
    $partes = $nome -split '\.'
    return ($partes[($partes.Length - 3)..($partes.Length - 1)] -join '.')
}

$dominioRaiz = Obter-DominioRaiz $RecordName
$idArquivo = 'C:\afe\certs\ultimo-txt-cloudflare-id.txt'

if ($zonasCloudflare.ContainsKey($dominioRaiz) -and (Test-Path $idArquivo)) {
    $cfg = $zonasCloudflare[$dominioRaiz]
    $apiToken = (Get-Content -LiteralPath $cfg.tokenFile -Raw).Trim()
    $recordId = (Get-Content -LiteralPath $idArquivo -Raw).Trim()

    try {
        Invoke-RestMethod -Method Delete `
            -Uri "https://api.cloudflare.com/client/v4/zones/$($cfg.zoneId)/dns_records/$recordId" `
            -Headers @{ Authorization = "Bearer $apiToken" } | Out-Null
        Write-Output "Registro TXT removido automaticamente da Cloudflare: $RecordName"
    } catch {
        Write-Output "Nao consegui remover o TXT da Cloudflare automaticamente (nao e' grave, so' sobra um registro TXT antigo): $_"
    }
    Remove-Item -LiteralPath $idArquivo -Force -ErrorAction SilentlyContinue
    return
}

Remove-Item -LiteralPath 'C:\afe\certs\pending-txt.json' -Force -ErrorAction SilentlyContinue
Remove-Item -LiteralPath 'C:\afe\certs\txt-confirmado.flag' -Force -ErrorAction SilentlyContinue

Write-Output "Registro TXT $RecordName pode ser removido manualmente do painel DNS (opcional)."
