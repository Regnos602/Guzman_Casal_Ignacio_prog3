class Carta{ 
    constructor(code,value,suit,imagen, url){
        this.code = code;
        this.value = value;
        this.suit = suit;
        this.imagen = imagen;
        this.url = url;
    }

    toJsonString(){
        return JSON.stringify(this);
    }

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

}


