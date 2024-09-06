document.addEventListener('DOMContentLoaded', function() {
    const confirmarPrompt = document.querySelector("#Confirmar_prompt");
    const loadingDiv = document.getElementById("loading");
    
    if (confirmarPrompt && loadingDiv) {
        confirmarPrompt.addEventListener("click", async () => {
            // Mostra a div de loading
            loadingDiv.style.display = 'block';
        });
    } else {
        console.error("Elementos #Confirmar_prompt ou #loading não encontrados no DOM.");
    }
});