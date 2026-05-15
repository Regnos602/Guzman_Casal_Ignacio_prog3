class Carta{ 
    constructor(code,value,suit,imagen, url){
        this.code = code;
        this.value = value;
        this.suit = suit;
        this.imagen = imagen;
        this.url = url;
    }

    //Convierte la carta en texto JSON para poder guardarla
    toJsonString(){
        return JSON.stringify(this);
    }

    // Crea una carta a partir de un texto JSON
    static createFromJsonString(json) {
        const datos = JSON.parse(json);

        return new Carta(
            datos.code,
            datos.value,
            datos.suit,
            datos.imagen,
            datos.url
        );
    }

    // Crea el elemento HTML que se va a mostrar en la pagina
    createHtmlElement() {
        const div = document.createElement("div");

        div.innerHTML = `
            <h3>${this.code}</h3>

            <a href="${this.imagen}" target="_blank">
                <img src="${this.imagen}" alt="${this.code}">
            </a>

            <p>Valor: ${this.value}</p>
            <p>Palo: ${this.suit}</p>

            <button>Guardar</button>
            `;

        const botonGuardar = div.querySelector("button");

        botonGuardar.addEventListener("click", () => {
            Carta.guardarCarta(this);
        });

        return div;
    }

    // Guarda la carta en localStorage para que no se repitan
    static guardarCarta(carta) {
    let cartasGuardadas = JSON.parse(localStorage.getItem("cartas")) || [];

    const existe = cartasGuardadas.some(cartaGuardada => {
      return cartaGuardada.code === carta.code;
    });

    if (!existe) {
      cartasGuardadas.push(carta);
      localStorage.setItem("cartas", JSON.stringify(cartasGuardadas));
      alert("Carta guardada");
    } else {
      alert("Esta carta ya está guardada");
    }

    }
}
