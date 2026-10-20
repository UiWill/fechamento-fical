# Registra a Tarefa Agendada do backup diario (backup-diario.ps1) - roda
# como SYSTEM (nao precisa de usuario logado) todo dia as 21h (pedido do
# usuario em 2026-10-19, ajustado de 20h pra 21h no mesmo dia - antes
# rodava as 5h30, trocado pra nao disputar com a janela de sincronizacao
# SEFAZ da madrugada e cair num horario em que o movimento do dia ja
# fechou). A partir de 2026-10-19 o backup tambem sobe pro Google Drive
# (ver bloco no fim de backup-diario.ps1) - rclone precisa do remote
# "gdrive" ja configurado (C:\Users\Administrator\AppData\Roaming\rclone\rclone.conf).
# Rodar este script uma vez (como administrador) no servidor.

$ErrorActionPreference = 'Stop'

$nomeTarefa = 'AfeBackupDiario'
$scriptBackup = Join-Path (Split-Path -Parent $MyInvocation.MyCommand.Path) 'backup-diario.ps1'

$acao = New-ScheduledTaskAction -Execute 'powershell.exe' `
    -Argument "-NoProfile -ExecutionPolicy Bypass -File `"$scriptBackup`""
$gatilho = New-ScheduledTaskTrigger -Daily -At '21:00'
$principal = New-ScheduledTaskPrincipal -UserId 'SYSTEM' -LogonType ServiceAccount -RunLevel Highest
$config = New-ScheduledTaskSettingsSet -StartWhenAvailable -DontStopOnIdleEnd -ExecutionTimeLimit (New-TimeSpan -Hours 1)

Register-ScheduledTask -TaskName $nomeTarefa -Action $acao -Trigger $gatilho `
    -Principal $principal -Settings $config -Force | Out-Null

Write-Output "Tarefa '$nomeTarefa' registrada - roda todo dia as 21:00."
Write-Output "Pra rodar uma vez agora e conferir: Start-ScheduledTask -TaskName $nomeTarefa"
Write-Output "Log fica em C:\afe\backups\backup.log"
