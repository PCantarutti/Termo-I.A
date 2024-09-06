  import json from './recuperar_json.js';

  let palavras = json.palavras
  let tema = json.tema

  const indicarTema = document.getElementById('indicarTema');
  indicarTema.innerText = tema + ", " + (palavras.length) + " palavras encontradas";

  // seleciona uma palavra dentro do array palavras aleatoriamente entre 0 e o numero máximo de elementos em palavras menos 1
  let numero = Math.floor(Math.random() * palavras.length); 
  let palavra = palavras[numero];
  palavra = palavra.toUpperCase();
  console.log(palavra);
  
  let resultadoResposta = "";

document.addEventListener('DOMContentLoaded', function() {
  
  // Aplicar conversão para maiúsculas na linha de inputs
  const initialInputs = document.querySelectorAll('.ativo');
  initialInputs.forEach(input => {
    input.addEventListener('input', function() {
      if (this.value.length > 1) {
        this.value = this.value.slice(0, 1);
      }
        this.value = this.value.replace(/[^a-zA-Z]/g, '').toUpperCase(); // Converte para maiúsculas
    });
  });


  // Listener para o Enter e teclas de navegação nos inputs
  document.addEventListener('keydown', function(event) {
    const key = event.key;
    const activeElement = document.activeElement;

    const container = document.getElementById('container');
    
    const input1 = document.getElementById('1-input');
    const input2 = document.getElementById('2-input');
    const input3 = document.getElementById('3-input');
    const input4 = document.getElementById('4-input');
    const input5 = document.getElementById('ultimo-input');
    
    try {
    if ((key === 'ArrowRight' || key === ' ' || key === 'Enter') && activeElement.id === 'ultimo-input' && ((input1.classList.contains('single-char-input') && input1.value.trim() !== '') && (input2.classList.contains('single-char-input') && input2.value.trim() !== '') && (input3.classList.contains('single-char-input') && input3.value.trim() !== '') && (input4.classList.contains('single-char-input') && input4.value.trim() !== '') && (input5.classList.contains('single-char-input') && input5.value.trim() !== ''))) {

      // Chama a função condicao quando Enter é pressionado em um input com id 'ultimo-input' com um valor dentro
      condicao(); 
      
      const valor = input1.value + input2.value + input3.value + input4.value + input5.value;
      console.log(valor);

      setTimeout(() => {
        const inputElement = document.getElementById('1-input');
        if (inputElement) {
          inputElement.focus();
        } else {
          // Se todos os elementos com esse id forem apagados, mostrar uma mensagem de erro.
          console.warn('Fim de jogo');
        }
      }, 1);
    } 
    
    else if (key === 'ArrowLeft' && activeElement.classList.contains('ativo')) {
      // Move o foco para o input anterior
      const previousInput = activeElement.previousElementSibling;
      if (previousInput && previousInput.classList.contains('ativo')) {
        previousInput.focus();
      }
    } else if ((key === 'ArrowRight' || key === ' ' || key === 'Enter') && activeElement.classList.contains('ativo')) {
      // Move o foco para o input seguinte
      const nextInput = activeElement.nextElementSibling;
      if (nextInput.classList.contains('ativo')) {
        nextInput.focus();
      }
    } else if ((key >= 'a' && key <= 'z') && activeElement.classList.contains('single-char-input')) {
      // Move focus to next input (com delay para não digitar no rpoximo input sem querer)
      const nextInput = activeElement.nextElementSibling;
      activeElement.value = key.toUpperCase();
      setTimeout(() => {
        if (nextInput && nextInput.classList.contains('single-char-input')) {
            nextInput.focus();
        }
      }, 1);
    } else if (key === 'Backspace' && activeElement.classList.contains('single-char-input')) {
      if (activeElement.value === '') { // previne de limpar input anterior se o atual estiver vazio
        const previousInput = activeElement.previousElementSibling;
        if (previousInput && previousInput.classList.contains('single-char-input')) {
          previousInput.focus();
          previousInput.value = ''; // limpa o input atual se o anterior estiver vazio
        }
      } else {
        activeElement.value = ''; // limpar o input atual se tiver um valor
      }
    }
  } catch (error) {
    if (container.classList.contains('ativo')) {
      container.classList.add('errado');
      setTimeout(() => {
        container.classList.remove('errado');
      }, 500);
    }
    }
    
  });

  function condicao() {
      resultadoResposta = '';
      
      const inputs = document.querySelectorAll('.single-char-input'); // Seleciona todos os inputs
      inputs.forEach(input => {
          // Função para converter automaticamente letras para maiúsculas
          input.addEventListener('input', function() {
              this.value = this.value.replace(/[^a-zA-Z]/g, '').toUpperCase();
          });
            
            if (input.classList.contains('ativo')) { 
              
              // Enquanto a classe for ativo significa que o jogo não acabou e atualiza a resposta
              resultadoResposta += input.value;
              
              for (let i = 0; i < palavra.length; i++) {
                if ((input.id === (i+1) + '-input') && input.value === palavra[i]) {
                    input.disabled = true;
                    input.classList.remove('ativo');
                    input.classList.add('desativado');
                    input.style.backgroundColor = "darkgreen";
                    input.style.borderColor = "darkgreen";
                    input.autofocus = false;
                    input.removeAttribute('id');
                    break;
                } 
                else if ((input.id === 'ultimo-input') && input.value === palavra[4]) {
                  input.disabled = true;
                  input.classList.remove('ativo');
                  input.classList.add('desativado');
                  input.style.backgroundColor = "darkgreen";
                  input.style.borderColor = "darkgreen";
                  input.autofocus = false;
                  input.removeAttribute('id');
                  break;
                } 
                else if ((input.id === (i+1) + '-input' || input.id === 'ultimo-input') && input.value != palavra[i] && palavra.includes(input.value)) {
                    input.disabled = true;
                    input.classList.remove('ativo');
                    input.classList.add('desativado');
                    input.style.backgroundColor = "yellow";
                    input.style.borderColor = "yellow";
                    input.autofocus = false;
                    input.removeAttribute('id');
                    break;
                } 
                else {
                    input.style.backgroundColor = "";
                    input.disabled = true;
                    input.classList.remove('ativo');
                    input.classList.add('desativado');
                    input.autofocus = false;
                    setTimeout(() => {
                      input.removeAttribute('id');
                    }, 500);

                    if (!input.previousSibling || !input.previousElementSibling){
                      break;
                    } else {
                      input.previousElementSibling.removeAttribute('id');
                    }
                }
              }
            }
      });
      container.removeAttribute('id');
      criarLinha(); // Chama a função para criar uma nova linha
  }

  function criarNovoInput() {
      const input = document.createElement('input');
      input.type = 'text';
      input.classList.add('single-char-input', 'ativo');
      input.maxLength = 1;
      input.style.textTransform = 'capitalize';
      input.setAttribute('autocomplete', 'off');
      return input;
  }

  function criarLinha() {
      const formulario = document.getElementById('formulario');
      const divsNoFormulario = formulario.querySelectorAll('div');
      const numeroDeDivs = divsNoFormulario.length;
      const tentativasRestantes = document.getElementById('tentativas');
      const textoTentativas = document.getElementById('texto-tentativas');

      tentativasRestantes.innerText = 6 - numeroDeDivs;
      let strong = document.createElement("strong");
      strong.textContent = numeroDeDivs;

      // console.log('Número de divs no formulário:', numeroDeDivs);
      // console.log(resultadoResposta);

      if (resultadoResposta == palavra) {
        textoTentativas.innerText = "Você acertou em ";
        textoTentativas.appendChild(strong);
        textoTentativas.appendChild(document.createTextNode(" tentativas!"));
      } else if (numeroDeDivs == 6) {
        strong.textContent = palavra;
        textoTentativas.innerText = "A palavra era ";
        textoTentativas.appendChild(strong);
      } else {
        // Criar mais divs
        const novaLinha = document.createElement('div');
        novaLinha.classList.add('words');
        novaLinha.classList.add('ativo');
        novaLinha.setAttribute("id", "container");
      
        for (let i = 0; i < 5; i++) {
            const novoInput = criarNovoInput();
            if (i === 4) {
                novoInput.id = 'ultimo-input';  // Atribui o id ao último input
            } else if (i < 4 && i != 0) {
              novoInput.id = (i+1) + '-input';
            } else if (i === 0) {
              novoInput.id = '1-input';
              novoInput.autofocus = true;
            }
            novaLinha.appendChild(novoInput);
        }
      
        formulario.appendChild(novaLinha);
      }
  }
});

