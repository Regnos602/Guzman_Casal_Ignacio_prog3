class Carta{ 
    constructor(code,value,suit,imagen){
        this.code = code;
        this.value = value;
        this.suit = suit;
        this.imagen = imagen;
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
            datos.imagen
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
            `;
        return div;
    }
}


