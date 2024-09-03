document.addEventListener('DOMContentLoaded', function() {
  let meuInput = document.getElementById('ultimo-input');

  let palavra = 'dueto'.toUpperCase();

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
      condicao(); // Call function condicao when Enter is pressed in 'ultimo-input' with a value
      setTimeout(() => {
        document.getElementById('1-input').focus();
    }, 1);

    } else if (key === 'ArrowLeft' && activeElement.classList.contains('single-char-input')) {
      // Move focus to previous input (with delay)
      const previousInput = activeElement.previousElementSibling;
      if (previousInput && previousInput.classList.contains('single-char-input')) {
        setTimeout(() => {
          previousInput.focus();
        }, 10); // Adjust delay as needed (in milliseconds)
      }
    } else if ((key === 'ArrowRight' || key === ' ' || key === 'Enter') && activeElement.classList.contains('single-char-input') && activeElement.value !== '') {
      // Move focus to next input
      const nextInput = activeElement.nextElementSibling;
      if (nextInput && nextInput.classList.contains('single-char-input')) {
        nextInput.focus();
      }
    } else if ((key >= 'a' && key <= 'z') && activeElement.classList.contains('single-char-input')) {
      // Move focus to next input
      const nextInput = activeElement.nextElementSibling;
      activeElement.value = key.toUpperCase();
      setTimeout(() => {
        if (nextInput && nextInput.classList.contains('single-char-input')) {
            nextInput.focus();
        }
      }, 1);
    } else if (key === 'Backspace' && activeElement.classList.contains('single-char-input')) {
      if (activeElement.value === '') { // Prevent clearing previous input if empty
        const previousInput = activeElement.previousElementSibling;
        if (previousInput && previousInput.classList.contains('single-char-input')) {
          previousInput.focus();
          previousInput.value = ''; // Clear previous input only if current is empty
        }
      } else {
        activeElement.value = ''; // Clear current input if it has a value
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
                    input.id = ''
                    input.style.backgroundColor = "darkgreen";
                    input.style.borderColor = "darkgreen";
                    input.autofocus = false;
                    break;
                } 
                else if ((input.id === 'ultimo-input') && input.value === palavra[4]) {
                  input.disabled = true;
                  input.classList.remove('ativo');
                  input.classList.add('desativado');
                  input.id = ''
                  input.style.backgroundColor = "darkgreen";
                  input.style.borderColor = "darkgreen";
                  input.autofocus = false;
                  break;
                } 
                else if ((input.id === (i+1) + '-input' || input.id === 'ultimo-input') && input.value != palavra[i] && palavra.includes(input.value)) {
                    input.disabled = true;
                    input.classList.remove('ativo');
                    input.classList.add('desativado');
                    input.id = ''
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
          
          // Atualiza a referência ao último input
          meuInput = document.getElementById('ultimo-input');
      }
  }
});
