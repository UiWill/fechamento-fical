/// <reference path="./global.d.ts" />

const campoToken = document.getElementById("token") as HTMLTextAreaElement;
const msgToken = document.getElementById("msg-token") as HTMLDivElement;
const campoPasta = document.getElementById("pasta-selecionada") as HTMLDivElement;
const btnEscolherPasta = document.getElementById("btn-escolher-pasta") as HTMLButtonElement;
const btnConcluir = document.getElementById("btn-concluir") as HTMLButtonElement;

let tokenValido = "";
let pastaEscolhida: string | null = null;

function atualizarBotaoConcluir(): void {
  btnConcluir.disabled = !(tokenValido && pastaEscolhida);
}

async function validarToken(): Promise<void> {
  const valor = campoToken.value.trim();
  tokenValido = "";
  atualizarBotaoConcluir();
  if (!valor) {
    msgToken.className = "mensagem";
    return;
  }
  msgToken.className = "mensagem ok";
  msgToken.innerHTML = '<span class="spinner"></span>Confirmando com o servidor…';

  const resultado = await window.agenteApi.validarToken(valor);
  if (resultado.ok) {
    tokenValido = valor;
    msgToken.className = "mensagem ok";
    msgToken.textContent = `Código válido — autorizado para ${resultado.cnpjs.length} empresa(s).`;
  } else {
    msgToken.className = "mensagem erro";
    msgToken.textContent = "Esse código não é válido ou não foi possível confirmar com o servidor.";
  }
  atualizarBotaoConcluir();
}

campoToken.addEventListener("blur", () => void validarToken());

btnEscolherPasta.addEventListener("click", async () => {
  const pasta = await window.agenteApi.escolherPasta();
  if (!pasta) return;
  pastaEscolhida = pasta;
  campoPasta.textContent = pasta;
  campoPasta.classList.add("preenchido");
  atualizarBotaoConcluir();
});

btnConcluir.addEventListener("click", async () => {
  if (!tokenValido || !pastaEscolhida) return;
  btnConcluir.disabled = true;
  btnConcluir.innerHTML = '<span class="spinner"></span>Salvando…';
  await window.agenteApi.salvarConfiguracao({ token: tokenValido, pasta: pastaEscolhida });
});

// Se a pessoa reabrir a tela de configurações já com uma pasta salva, mostra ela.
void window.agenteApi.obterConfiguracaoAtual().then((atual) => {
  if (atual.pasta) {
    pastaEscolhida = atual.pasta;
    campoPasta.textContent = atual.pasta;
    campoPasta.classList.add("preenchido");
    atualizarBotaoConcluir();
  }
});
