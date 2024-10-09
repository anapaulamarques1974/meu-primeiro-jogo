let numeroSecreto;
let tentativa = 0;

function gerarNumeroAleatorio() {
    return new Promise((resolve) => {
        setTimeout(() => {
            numeroSecreto =Math.floor(Math.random()*100)+1;
            resolve(numeroSecreto);
        }, 1000);
    });

}
function verificarPalpite(palpite){
    return new Promise ((resolve, reject) =>{
        tentativas++;
        if (papite < 1 || papite > 100) {
            reject("Por favor, digite um número de 1 a 100");
        }else if(palpite === numeroSecreto) {
            resolve("parabéns, você acertou o numero !!! Estou muito feliz por você!");
           
        } else if(palpite < numeroSecreto){
            resolve("muito baixo! Tente novamente")
        }else {
            resolve("Muito Alto! Tente Novamente")
        }

    });
}
async function iniciarJogo(){
    await gerarNumeroAleatorio();
    const botaoEnviar = document.getElementById("enviar");
    const inputPalpite = document.getElementById("palpite");
    const resultado = document.getElementById('resultado');
    const tentativasDisplay = document.getElementById(tentativas);

    botaoEnviar.addEventListener("click", async () => {
        try {
            const palpite = parseInt (inputPalpite.value);
            const menssagem = await verificarPalpite(palpite);
            resultado.textContent = menssagem;
            tentativasDisplay.textContent = 'tentativas: $(tentativas)';

            // Limpa o campo de palpite
inputPalpite.value = "";

//Reiniciar o jogo se o usuário acertar
if (menssagem.includes("acertou")) {   
    tentativa = 0;
    resultado.textContent += "O jogo será reiniciado";
    await gerarNumeroAleatorio();
    tentativasDisplay.textContent = "";     
}
        }catch (erro) {
            resultado.textContent = erro;
        }         

    })

}

// iniciar o jogo ao carregar a página
Window.onload = iniciarJogo;
