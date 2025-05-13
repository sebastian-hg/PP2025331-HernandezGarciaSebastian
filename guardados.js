window.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('series');
  
    const guardadas = JSON.parse(localStorage.getItem('seriesGuardadas')) || [];
  
    if (guardadas.length === 0) {
      const mensaje = document.createElement('p');
      mensaje.textContent = "No hay series guardadas.";
      contenedor.appendChild(mensaje);
      return;
    }
  
    guardadas.forEach(jsonSerie => {
      const serie = Serie.createFromJsonString(JSON.stringify(jsonSerie));
      const elemento = serie.createHtmlElement();
      contenedor.appendChild(elemento);
    });
  });
  