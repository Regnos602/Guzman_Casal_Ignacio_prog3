const contenedorCartas = document.querySelector("#cartas");
const botonAnterior = document.querySelector("#anterior");
const botonSiguiente = document.querySelector("#siguiente");

let mazoId = null;
let paginaActual = 0;
let paginas = [];

// Trae las primeras 6 cartas desde la API y guarda el id del mazo
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

// Limpia y muestra las cartas recibidas
function mostrarCartas(cartas) {
    contenedorCartas.innerHTML = "";

    cartas.forEach(carta => {
        const cartaHtml = carta.createHtmlElement();
        contenedorCartas.appendChild(cartaHtml);
    })
}

// Muestra la pagina siguiente o trae 6 cartas nuevas si todavía no fueron cargadas
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

// Vuelve a la pagina anterior si no estamos en la primera
function paginaAnterior() {
  if (paginaActual > 0) {
    paginaActual--;
    mostrarCartas(paginas[paginaActual]);
  }
}

botonSiguiente.addEventListener("click", paginaSiguiente);
botonAnterior.addEventListener("click", paginaAnterior);

cargarPrimeraPagina();