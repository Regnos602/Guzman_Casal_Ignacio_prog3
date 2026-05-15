const contenedorCartas = document.querySelector("#cartas");
const botonAnterior = document.querySelector("#anterior");
const botonSiguiente = document.querySelector("#siguiente");

let mazoId = null;
let paginaActual = 0;
let paginas = [];

async function cargarPrimeraPagina() {
    const respuesta = await fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=6");
    const datos = await respuesta.json();

    mazoId = datos.deck_id;

    const cartas = datos.cards.map(cartaApi => {
        return new Carta(
            cartaApi.code,
            cartaApi.value,
            cartaApi.suit,
            cartaApi.image,
            cartaApi.image
        );
    });

    paginas.push(cartas);
    mostrarCartas(cartas);
}

function mostrarCartas(cartas) {
    contenedorCartas.innerHTML = "";

    cartas.forEach(carta => {
        const cartaHtml = carta.createHtmlElement();
        contenedorCartas.appendChild(cartaHtml);
    })
}

async function paginaSiguiente() {
  if (paginas[paginaActual + 1]) {
    paginaActual++;
    mostrarCartas(paginas[paginaActual]);
  } else {
    const respuesta = await fetch(`https://deckofcardsapi.com/api/deck/${mazoId}/draw/?count=6`);
    const datos = await respuesta.json();

    const cartas = datos.cards.map(cartaApi => {
      return new Carta(
        cartaApi.code,
        cartaApi.value,
        cartaApi.suit,
        cartaApi.image,
        cartaApi.image
      );
    });

    paginas.push(cartas);
    paginaActual++;
    mostrarCartas(cartas);
  }
}

function paginaAnterior() {
  if (paginaActual > 0) {
    paginaActual--;
    mostrarCartas(paginas[paginaActual]);
  }
}

botonSiguiente.addEventListener("click", paginaSiguiente);
botonAnterior.addEventListener("click", paginaAnterior);

cargarPrimeraPagina();