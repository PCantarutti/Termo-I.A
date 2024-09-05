  import json from './recuperar_json.js';

  let palavras = json.palavras
  let tema = json.tema

  const indicarTema = document.getElementById('indicarTema');
  indicarTema.innerText = tema;

  // seleciona uma palavra dentro do array palavras aleatoriamente entre 0 e o numero máximo de elementos em palavras menos 1
  let numero = Math.floor(Math.random() * palavras.length); 
  let palavra = palavras[numero];
  palavra = palavra.toUpperCase();
  console.log(palavra);

document.addEventListener('DOMContentLoaded', function() {

  // Aplicar conversão para maiúsculas na primeira linha de inputs
  const initialInputs = document.querySelectorAll('.single-char-input');
  initialInputs.forEach(input => {
      input.addEventListener('input', function() {
          this.value = this.value.replace(/[^a-zA-Z]/g, '').toUpperCase(); // Converte para maiúsculas
      });
  });

  // Listener para o Enter e teclas de navegação nos inputs
  document.addEventListener('keydown', function(event) {
    const key = event.key;
    const activeElement = document.activeElement;
  
    if (key === 'Enter' && activeElement.id === 'ultimo-input' && activeElement.value !== '') {
      condicao(); // Chama a função condicao quando Enter é pressionado em um input com id 'ultimo-input' com um valor dentro
      setTimeout(() => {
        const inputElement = document.getElementById('1-input');
        if (inputElement) {
          inputElement.focus();
        } else {
          // Se todos os elementos com esse id forem apagados, mostrar uma mensagem de erro.
          console.warn('Elemento com ID "1-input" não encontrado.');
        }
    }, 1);

    } else if (key === 'ArrowLeft' && activeElement.classList.contains('single-char-input')) {
      // Move o foco para o input anterior
      const previousInput = activeElement.previousElementSibling;
      if (previousInput && previousInput.classList.contains('single-char-input')) {
        previousInput.focus();
      }
    } else if ((key === 'ArrowRight' || key === ' ' || key === 'Enter') && activeElement.classList.contains('single-char-input') && activeElement.value !== '') {
      // Move o foco para o input seguinte
      const nextInput = activeElement.nextElementSibling;
      if (nextInput && nextInput.classList.contains('single-char-input')) {
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
  });

  function condicao() {
      const inputs = document.querySelectorAll('.single-char-input'); // Seleciona todos os inputs
      inputs.forEach(input => {
          // Função para converter automaticamente letras para maiúsculas
          input.addEventListener('input', function() {
              this.value = this.value.replace(/[^a-zA-Z]/g, '').toUpperCase();
          });
          
            if (input.classList.contains('ativo')) { 
              for (let i = 0; i < palavra.length; i++) {
                if ((input.id === (i+1) + '-input') && input.value === palavra[i]) {
                    input.disabled = true;
                    input.classList.remove('ativo');
                    input.classList.add('desativado');
                    input.style.backgroundColor = "darkgreen";
                    input.style.borderColor = "darkgreen";
                    input.autofocus = false;
                    break;
                } 
                else if ((input.id === 'ultimo-input') && input.value === palavra[4]) {
                  input.disabled = true;
                  input.classList.remove('ativo');
                  input.classList.add('desativado');
                  input.style.backgroundColor = "darkgreen";
                  input.style.borderColor = "darkgreen";
                  input.autofocus = false;
                  break;
                } 
                else if ((input.id === (i+1) + '-input' || input.id === 'ultimo-input') && input.value != palavra[i] && palavra.includes(input.value)) {
                    input.disabled = true;
                    input.classList.remove('ativo');
                    input.classList.add('desativado');
                    input.style.backgroundColor = "yellow";
                    input.style.borderColor = "yellow";
                    input.autofocus = false;
                    break;
                } 
                else {
                    input.style.backgroundColor = "";
                    input.disabled = true;
                    input.classList.remove('ativo');
                    input.classList.add('desativado');
                    input.autofocus = false;

                    if (!input.previousSibling || !input.previousElementSibling){
                      break;
                    } else {
                      input.previousElementSibling.removeAttribute('id');
                    }
                }
              }
            }
      });

      criarLinha(); // Chama a função para criar uma nova linha
  }

  function criarNovoInput() {
      const input = document.createElement('input');
      input.type = 'text';
      input.classList.add('single-char-input', 'ativo');
      input.maxLength = 1;
      input.addEventListener('input', function() {
          this.value = this.value.replace(/[^a-zA-Z]/g, '').toUpperCase(); // Converte para maiúsculas
      });
      return input;
  }

  function criarLinha() {
      const formulario = document.getElementById('formulario');
      const divsNoFormulario = formulario.querySelectorAll('div');
      const numeroDeDivs = divsNoFormulario.length;
      const tentativas = document.getElementById('tentativas');
      tentativas.innerText = 6 - numeroDeDivs;
      console.log('Número de divs no formulário:', numeroDeDivs);

      if (numeroDeDivs < 6) {
          // Criar mais divs
          const novaLinha = document.createElement('div');
          novaLinha.classList.add('words');
      
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
