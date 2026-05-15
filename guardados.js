const contenedorCartas = document.querySelector("#cartas");

function mostrarCartasGuardadas() {
  const cartasGuardadas = JSON.parse(localStorage.getItem("cartas")) || [];

  contenedorCartas.innerHTML = "";

  cartasGuardadas.forEach(cartaGuardada => {
    const carta = new Carta(
      cartaGuardada.code,
      cartaGuardada.value,
      cartaGuardada.suit,
      cartaGuardada.imagen,
      cartaGuardada.url
    );

    const cartaHtml = carta.createHtmlElement();

    contenedorCartas.appendChild(cartaHtml);
  });
}

mostrarCartasGuardadas();