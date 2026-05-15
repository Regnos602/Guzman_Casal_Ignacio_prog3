const contenedorCartas = document.querySelector("#cartas");

async function cargarCartas() {
  const respuesta = await fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=6");
  const datos = await respuesta.json();

  const cartasApi = datos.cards;

  cartasApi.forEach(cartaApi => {
    const carta = new Carta(
      cartaApi.code,
      cartaApi.value,
      cartaApi.suit,
      cartaApi.image
    );

    const cartaHtml = carta.createHtmlElement();

    contenedorCartas.appendChild(cartaHtml);
  });
}

cargarCartas();