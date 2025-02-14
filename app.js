// // document faz com que seleciona um documento por exemplo html
// //.innerHTML propriedade de dentro do HTML
// // .querySelector faz com que selecione o conteúdo específico

// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do número secreto';
let listaNumeroSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAletorio();
let tentativas = 1;



function exibirTextoTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto; 
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemIncial() {   
    exibirTextoTela('h1', 'Jogo do número secreto');
    
    exibirTextoTela('p', 'Escolha um número entre 1 e 10');

}

exibirMensagemIncial()

// Trecho que executa alguma responsabilidade ou ação
// .value faz com que puxe somente o valor e não o HTML inteiro
function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        exibirTextoTela('h1', 'Acertou!');
        let concordanciaTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${concordanciaTentativa}.`;
        exibirTextoTela('p', mensagemTentativas);
        // .getElementById seleciona um id específico do HTML e ao seguida colocando . acessa a lista sobre o que fazer sobre o atributo
        //no caso removeAttribute(remover atributo)
        document.getElementById('reiniciar').removeAttribute('disabled')
    } else {
        if (chute < numeroSecreto) {
            exibirTextoTela('h1', 'Errou!');
            exibirTextoTela('p', 'O número secreto é maior!');
        } else {
            exibirTextoTela('h1', 'Errou!');
            exibirTextoTela('p', 'O número secreto é menor!');
        }
        tentativas++;
        limparCampo();

       
        }

    }   


function gerarNumeroAletorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeElementosNaLista = listaNumeroSorteados.length;

    if (quantidadeElementosNaLista == numeroLimite) {
        listaNumeroSorteados = [];
    }

    if (listaNumeroSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAletorio();

    } else {
        listaNumeroSorteados.push(numeroEscolhido);
        console.log(listaNumeroSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAletorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemIncial()
    document.getElementById('reiniciar').setAttribute('disabled', true)
}