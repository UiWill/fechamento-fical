param(
    [string]$RecordName,
    [string]$Token
)
$ErrorActionPreference = 'Stop'

# Dominios com API da Cloudflare -- validacao de DNS fica TOTALMENTE
# automatica, sem precisar colar TXT na mao. Dominios fora dessa lista
# (ex: dnotas.com.br, que fica no Registro.br sem API) caem no fluxo
# manual antigo (ver bloco no fim do arquivo).
$zonasCloudflare = @{
    'fechafiscal.com.br' = @{
        zoneId    = '5d21115bf019ea55bcb00ed9a3b654ed'
        tokenFile = 'C:\afe\certs\cloudflare-token.txt'
    }
}

function Obter-DominioRaiz([string]$nome) {
    # _acme-challenge.api.fechafiscal.com.br -> fechafiscal.com.br
    # (ultimos 3 rotulos, cobre dominios .com.br; ajustar se algum dia
    # precisar de um TLD com numero de rotulos diferente)
    $partes = $nome -split '\.'
    return ($partes[($partes.Length - 3)..($partes.Length - 1)] -join '.')
}

$dominioRaiz = Obter-DominioRaiz $RecordName

if ($zonasCloudflare.ContainsKey($dominioRaiz)) {
    $cfg = $zonasCloudflare[$dominioRaiz]
    $apiToken = (Get-Content -LiteralPath $cfg.tokenFile -Raw).Trim()

    $corpo = @{ type = 'TXT'; name = $RecordName; content = $Token; ttl = 60 } | ConvertTo-Json
    $resposta = Invoke-RestMethod -Method Post `
        -Uri "https://api.cloudflare.com/client/v4/zones/$($cfg.zoneId)/dns_records" `
        -Headers @{ Authorization = "Bearer $apiToken"; 'Content-Type' = 'application/json' } `
        -Body $corpo

    if (-not $resposta.success) {
        throw "Falha ao criar registro TXT na Cloudflare: $($resposta.errors | ConvertTo-Json -Compress)"
    }

    # Guarda o id do registro criado -- dns-delete.ps1 usa pra limpar depois.
    $resposta.result.id | Set-Content -LiteralPath 'C:\afe\certs\ultimo-txt-cloudflare-id.txt'

    Write-Output "Registro TXT criado automaticamente via API da Cloudflare: $RecordName"
    # DNS da Cloudflare propaga rapido, mas da uma folga antes do win-acme
    # tentar validar - evita falha por timing numa tentativa muito cedo.
    Start-Sleep -Seconds 15
    return
}

# Fluxo manual (dominios sem API conhecida aqui, ex: dnotas.com.br) -- ver
# infra/windows/renovar-https.md pros passos de colar o TXT a mao.
$pendingFile = 'C:\afe\certs\pending-txt.json'
$flagFile = 'C:\afe\certs\txt-confirmado.flag'

if (Test-Path $flagFile) { Remove-Item -LiteralPath $flagFile -Force }

@{ recordName = $RecordName; token = $Token } | ConvertTo-Json | Set-Content -LiteralPath $pendingFile

Write-Output "Aguardando confirmacao do registro TXT: $RecordName = $Token"

while (-not (Test-Path $flagFile)) {
    Start-Sleep -Seconds 5
}

Write-Output "Confirmado, prosseguindo com a validacao."
