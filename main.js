let paginaActual = 1;
const seriesPorPagina = 6;
// con este se linkea al div de series "contenido principal"
const seriesContainer = document.getElementById("series");

const btnAnterior = document.getElementById("anterior");
const btnSiguiente = document.getElementById("siguiente");

function cargarPagina(pagina) {
  seriesContainer.innerHTML = "";

  const inicio = (pagina - 1) * seriesPorPagina + 1;
  const fin = inicio + seriesPorPagina;

  for (let i = inicio; i < fin; i++) {
    fetch(`https://api.tvmaze.com/shows/${i}`)
      .then((response) => response.json())
      .then((data) => {
        const serie = new Serie(
          data.id,
          data.url,
          data.name,
          data.language,
          data.genres,
          data.image?.medium || ""
        );
        const elemento = serie.createHtmlElement();
        seriesContainer.appendChild(elemento);
      })
      .catch((error) => {
        console.error(`Error al cargar serie con ID ${i}:`, error);
      });
  }
}

function paginaSiguiente() {
  const spinnerContainer = document.querySelector(".spinner-container");
  if (spinnerContainer) {
    spinnerContainer.style.display = "flex";
  }
  setTimeout(() => {
    paginaActual++;
    cargarPagina(paginaActual);
    if (spinnerContainer) {
      spinnerContainer.style.display = "none";
    }
  }, 500);
}

function paginaAnterior() {
  const spinnerContainer = document.querySelector(".spinner-container");
  if (spinnerContainer) {
    spinnerContainer.style.display = "flex";
  }
  setTimeout(() => {
    if (paginaActual > 1) {
      paginaActual--;
      cargarPagina(paginaActual);
    }
    if (spinnerContainer) {
      spinnerContainer.style.display = "none";
    }
  }, 500);
}

btnSiguiente.addEventListener("click", paginaSiguiente);
btnAnterior.addEventListener("click", paginaAnterior);

document.addEventListener("DOMContentLoaded", () => {
  cargarPagina(paginaActual);
});
