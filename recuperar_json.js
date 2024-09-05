// Função para recuperar as palavras do localStorage
function recuperarPalavras() {
const palavrasSalvas = localStorage.getItem('palavrasGeradas');
return palavrasSalvas ? JSON.parse(palavrasSalvas) : [];
}

const palavras = recuperarPalavras();

function recuperarTema() {
const temaSalvo = localStorage.getItem('tema');
return temaSalvo ? JSON.parse(temaSalvo) : [];
}

const tema = recuperarTema();

export default {palavras, tema};