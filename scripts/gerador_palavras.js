// Make sure to include these imports:
import { GoogleGenerativeAI } from "@google/generative-ai";

// Define palavras padrao caso não receba um prompt
const palavrasPadrao = [
    "canto", "falar", "linda", "morar", "pouco", "verde", "terra", "carro", "feliz", "amigo",
    "jogar", "vento", "praia", "corpo", "longe", "curta", "brava", "banho", "grato", "ponto",
    "certo", "custo", "calmo", "nuvem", "caixa", "porta", "rampa", "limpo", "ostra", "traje",
    "roupa", "trigo", "fruta", "pedra", "justo", "longo", "fosco", "folha", "nevoa", "vento",
    "molho", "leito", "lucro", "matiz", "haste", "flora", "troca", "carne", "fenda", "peito",
    "vapor", "vazio", "truco", "visto", "ferro", "livro", "prato", "brisa", "nobre", "talho",
    "meiga", "prego", "navio", "manga", "farda", "feira", "meigo", "regra", "sagaz", "ritmo",
    "tempo", "barra", "areia", "chuva", "tarde", "remar", "queda", "monta", "tenue", "tocar",
    "limpa", "cegar", "rosca", "norte", "lugar", "plano", "leque", "vinho", "fauna", "suave",
    "haste", "traje", "toque", "monte", "nuvem", "fugaz", "haste", "breve", "firma", "cinto",
    "moral", "amiga", "campo", "banco", "fardo", "falsa", "briga", "coisa", "certo", "chato",
    "claro", "drama", "densa", "escol", "fator", "feita", "forma", "gasto", "graca", "homem",
    "igual", "jovem", "junho", "lavar", "lugar", "legal", "manha", "mundo", "noite", "final",
    "nacao", "papel", "parte", "prato", "perto", "quase", "rapaz", "regra", "ruido", "sorte",
    "tempo", "termo", "uniao", "vazio", "valor", "verde", "xisto", "zebra",
];

// Salva as palavras do array palavrasPadrao no armazenamento local até que seja subscrito 
localStorage.setItem('palavrasGeradas', JSON.stringify(palavrasPadrao));
localStorage.setItem('tema', JSON.stringify("Geral"));

const API_KEY = "AIzaSyANjFgrIFeeXqNLcPpXPvm1e0HruZNgM8w";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

const resultadoGeracaoRuim = document.querySelector("#resultadoGeracaoRuim");
const resultadoGeracaoBom = document.querySelector("#resultadoGeracaoBom");

async function gerarPalavras(prompt) {

    const consulta = [
        {text: "Gere o máximo de palavras em português com exatamente 5 letras separadas por vírgula. Apenas as palavras com 5 letras de A a Z, tente gerar o máximo de palavras possivel. O tema das palavras geradas é definido pelo usuário"},
        {text: "input: comida"},
        {text: "output: aipim, amora, araca, arroz, aveia, avelã, bacon, bauru, cacau, caqui, carne, chopp, cidra, clara, couve, cravo, crepe, curau, curry, glace, jambo, jatai, leite, licor, limão, lombo, louro, mamão, manga, melao, menta, milho, nozes, orobo, pequi, pinha, pirão, pizza, pudim, quibe, ração, salsa, saquê, sonho, sufle, sushi, torta, trigo, trufa, vagem, vinho, vodca"},
        {text: "input: cinema"},
        {text: "output: filme, atriz, papel, oscar, telas, clipe, cenas, curta, drama, lente, duble, frame, série, shows, herói, trama, luzes, áudio, mídia"},
        {text: `input: o tema é ${prompt}`},
        {text: "output: "},
      ];

    try {
        const result = await model.generateContent(consulta);
        const response = await result.response;
        const text = response.text();
        console.log(text);

        // Limpar o texto e retornar o array de palavras
        return limparTexto(text);
    } catch (error) {
        console.error("Erro ao gerar palavras:", error);
        resultadoGeracaoRuim.textContent = "Ocorreu um erro ao gerar as palavras. Por favor, tente novamente.";
        return [];
    }
}

function limparTexto(texto) {
    // Separar a string em um array usando a vírgula como separador e remover espaços em branco
    const palavras = texto.split(', ').map(palavra => palavra.trim());

    // Expressão regular para verificar caracteres especiais
    const regex = /[^a-zA-Zà-úÀ-Ú ]/g;

    // Normalizar todos os nomes de uma vez e filtrar as palavras válidas
    return palavras.map(palavra => palavra.normalize('NFD').replace(/[\u0300-\u036f]/g, "")).filter(palavra => !regex.test(palavra) && palavra.length === 5);
}

function desativaBotao() {

    const botaoPlay = document.querySelector("#botao-play");

    botaoPlay.disabled = true;

}



function ativaBotao() {

    const botaoPlay = document.querySelector("#botao-play");

    botaoPlay.disabled = false;

    botaoPlay.innerText = "JOGAR";

}

// Seleciona o botão play
const botao = document.getElementById('botao-play');

// Adiciona o evento de clique ao botão play
botao.onclick = function() {
    // Redireciona para a outra página
    window.location.href = "tabela.html";
};


document.querySelector("#Confirmar_prompt").addEventListener("click", async () => {
    desativaBotao();
    resultadoGeracaoRuim.textContent = "";
    const prompt = document.querySelector("#input_prompt").value;

    if (prompt === "") {
        resultadoGeracaoRuim.textContent = "Digite um tema acima.";
        ativaBotao();
        return;
    }

    const palavras = await gerarPalavras(prompt);

    if (palavras.length > 0) {
        // Armazenar as palavras no localStorage como um JSON
        localStorage.setItem('palavrasGeradas', JSON.stringify(palavras));
        localStorage.setItem('tema', JSON.stringify(prompt));
        resultadoGeracaoBom.textContent = `Jogo sobre o tema ${prompt} criado`;
        ativaBotao();
    } else {
        resultadoGeracaoRuim.textContent = "Nenhuma palavra encontrada.";
        ativaBotao();
    }
});
