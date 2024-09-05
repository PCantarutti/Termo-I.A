// Make sure to include these imports:
import { GoogleGenerativeAI } from "@google/generative-ai";
import { fazerPergunta } from "./pergunta.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY2);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = await fazerPergunta("gere a lista: ");

  const parts = [
    {text: "Gere até 100 palavras em português com exatamente 5 letras separadas por vírgula. Apenas as palavras com 5 letras de A a Z, caso uma palavra contenha 'ç' ou acentuação substitua por caracter normal por exemplor maçãs seria macas, se uma palavra não tiver 5 letras remova, de maneira alguma uma palavra pode ter menos ou mais que 5 letras, tente gerar o máximo de palavras possivel, se a palavra não faz sentido remova. O tema é definido pelo usuário"},
    {text: "input: comida"},
    {text: "output: aipim, amora, araca, arroz, aveia, avelã, bacon, bauru, cacau, caqui, carne, chopp, cidra, clara, couve, cravo, crepe, curau, curry, glace, jambo, jatai, leite, licor, limão, lombo, louro, mamão, manga, melao, menta, milho, nozes, orobo, pequi, pinha, pirão, pizza, pudim, quibe, ração, salsa, saquê, sonho, sufle, sushi, torta, trigo, trufa, vagem, vinho, vodca"},
    {text: `input: o tema é palavras relacionadas a ${prompt} com 5 letras apenas`},
    {text: "output: "},
  ];

const result = await model.generateContent(
    {contents: [{ role: "user", parts }]}
);

console.log(result.response.text());



//Minha parte
let resultado = result.response.text();

// Separar a string em um array usando a vírgula como separador e remover espaços em branco
resultado = resultado.split(', ').map(palavra => palavra.trim());

// Expressão regular para verificar caracteres especiais
const regex = /[^a-zA-Zà-úÀ-Ú ]/g; 

// Normalizar todos os nomes de uma vez
resultado = resultado.map(palavra => palavra.normalize('NFD').replace(/[\u0300-\u036f]/g, ""));

// Filtrar o array, removendo nomes com caracteres especiais
resultado = resultado.filter(palavra => !regex.test(palavra));

console.log(resultado); 

// node --env-file .env index.js

// const prompt = `Gere pelo menos 10 até 100 palavras em português como tema ${tema} com exatamente 5 letras separadas por vírgula e dentro de aspas. Apenas as palavras com 5 letras de A a Z, caso uma palavra contenha 'ç' ou acentuação substitua por caracter normal, se uma palavra não tiver 5 letras remova, tente gerar o máximo de palavras possivel, se a palavra não faz sentido remova, a primeira palavra deve ser 'termo' e a última 'final', tudo isso dentro de []`