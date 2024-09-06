const chk = document.getElementById('chk');
const theme = localStorage.getItem('modo');

if (theme) {
  document.body.classList.add(theme);
  document.getElementById('input_prompt').classList.add(theme);
  document.getElementById('cabecalho__menu_id').classList.add(theme);
  document.getElementById('titulo_id').classList.add(theme);
  document.getElementById('resultadoGeracaoBom').classList.add(theme);
  chk.checked = theme === 'dark'; // Marca o checkbox se o tema for escuro
}

chk.addEventListener('change', () => {
  const newTheme = chk.checked ? 'dark' : 'light';
  localStorage.setItem('modo', newTheme);
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');
  document.getElementById('input_prompt').classList.toggle('dark');
  document.getElementById('input_prompt').classList.toggle('light');
  document.getElementById('cabecalho__menu_id').classList.toggle('dark');
  document.getElementById('cabecalho__menu_id').classList.toggle('light');
  document.getElementById('titulo_id').classList.toggle('dark');
  document.getElementById('titulo_id').classList.toggle('light');
  document.getElementById('resultadoGeracaoBom').classList.toggle('dark');
  document.getElementById('resultadoGeracaoBom').classList.toggle('light');
});