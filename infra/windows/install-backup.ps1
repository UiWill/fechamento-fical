# Registra a Tarefa Agendada do backup diario (backup-diario.ps1) - roda
# como SYSTEM (nao precisa de usuario logado) todo dia as 5h30, depois da
# ultima janela de sincronizacao SEFAZ e antes da consulta diaria de
# situacao (6h). Rodar este script uma vez (como administrador) no servidor.

$ErrorActionPreference = 'Stop'

$nomeTarefa = 'AfeBackupDiario'
$scriptBackup = Join-Path (Split-Path -Parent $MyInvocation.MyCommand.Path) 'backup-diario.ps1'

$acao = New-ScheduledTaskAction -Execute 'powershell.exe' `
    -Argument "-NoProfile -ExecutionPolicy Bypass -File `"$scriptBackup`""
$gatilho = New-ScheduledTaskTrigger -Daily -At '05:30'
$principal = New-ScheduledTaskPrincipal -UserId 'SYSTEM' -LogonType ServiceAccount -RunLevel Highest
$config = New-ScheduledTaskSettingsSet -StartWhenAvailable -DontStopOnIdleEnd -ExecutionTimeLimit (New-TimeSpan -Hours 1)

Register-ScheduledTask -TaskName $nomeTarefa -Action $acao -Trigger $gatilho `
    -Principal $principal -Settings $config -Force | Out-Null

Write-Output "Tarefa '$nomeTarefa' registrada - roda todo dia as 05:30."
Write-Output "Pra rodar uma vez agora e conferir: Start-ScheduledTask -TaskName $nomeTarefa"
Write-Output "Log fica em C:\afe\backups\backup.log"
