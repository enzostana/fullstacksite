//-------------------------Exibe o elemento Carregando...------------------//
function showLoading() {
    var elemento = document.getElementById("loading");
    if (elemento) {
        elemento.style.display = "flex";
    }
}
//----------------------Esconde o elemento Carregando...------------------//
function hideLoading() {
    var elemento = document.getElementById("loading");
    if (elemento) {
        elemento.style.display = "none";
    }
}

    