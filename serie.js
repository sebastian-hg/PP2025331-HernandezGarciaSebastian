class Serie {
  id;
  url;
  name;
  language;
  generes;
  image;

  constructor(id, url, name, language, generes, image) {
    this.id = id;
    this.url = url;
    this.name = name;
    this.language = language;
    this.generes = generes;
    this.image = image;
  }

  toJsonString() {
    return JSON.stringify(this);
  }

  static createFromJsonString(json) {
    const obj = JSON.parse(json);
    return new Serie(
      obj.id,
      obj.url,
      obj.name,
      obj.language,
      obj.generes,
      obj.image
    );
  }

  guardarSerie() {
    console.log(`Serie guardada: ${this.name}`);
  }

  createHtmlElement() {
    const container = document.createElement("div");
    container.className = "carta-serie";

    // Título de la serie
    const title = document.createElement("h3");
    title.textContent = this.name;

    // Idioma de la serie
    const language = document.createElement("p");
    language.textContent = `Idioma: ${this.language}`;

    // Géneros de la serie
    const genres = document.createElement("p");
    genres.textContent = `Generos: ${this.generes.join(", ")}`;

    // Imagen de la serie con enlace a la url
    const imageLink = document.createElement("a");
    imageLink.href = this.url;
    imageLink.target = "_blank";
    const image = document.createElement("img");
    image.className = "imagen-diseño";
    image.src = this.image;
    image.alt = `Imagen de ${this.name}`;
    image.style.maxWidth = "100%";
    imageLink.appendChild(image);

    // Botón para guardar la serie
    const btnGuardar = document.createElement("button");
    btnGuardar.textContent = "Guardar";
    btnGuardar.classList.add("btn-guardar");
    btnGuardar.addEventListener("click", () => {
      Serie.guardarSerie(this);
    });

    //Añadir todos los elementos al contenedor
    container.appendChild(title);
    container.appendChild(language);
    container.appendChild(genres);
    container.appendChild(imageLink);
    container.appendChild(btnGuardar);

    return container;
  }

  static guardarSerie(serie) {

    const spinnerContainer = document.querySelector('.spinner-container');
    if (spinnerContainer) {
      spinnerContainer.style.display = 'flex'; 
    }
  
    setTimeout(() => {
      const guardadas = JSON.parse(localStorage.getItem('seriesGuardadas')) || [];
      guardadas.push(serie);
      localStorage.setItem('seriesGuardadas', JSON.stringify(guardadas));
  
      if (spinnerContainer) {
        spinnerContainer.style.display = 'none'; 
      }
      alert("Serie guardada");
    }, 500);  
   
  }
}
