; Mata qualquer cópia do Agente Fiscal já rodando ANTES de copiar os
; arquivos novos — de qualquer versão, inclusive uma bem antiga (2.0.8,
; sem nenhum código de auto-atualização) que o cliente só vai atualizar
; porque alguém reinstalou manualmente por cima. Sem isso, o processo
; antigo segura os arquivos .exe/.dll abertos e a cópia nova falha
; silenciosamente em "/S" (silencioso) — o instalador relata sucesso, mas
; o binário antigo continua ali, intocado (achado em 2026-10-26: isso é
; o motivo mais provável do loop de auto-atualização nunca avançar de
; versão, mesmo reinstalando sem parar).
!macro customInit
  nsExec::Exec 'taskkill /F /IM "${PRODUCT_FILENAME}.exe" /T'
  Sleep 500
!macroend
