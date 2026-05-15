const contenedorCartas = document.querySelector("#cartas");

const botonOrdenarValor = document.querySelector("#ordenarValor");
const botonOrdenarPalo = document.querySelector("#ordenarPalo");

let cartasGuardadas = JSON.parse(localStorage.getItem("cartas")) || [];

function mostrarCartasGuardadas(cartas) {
  contenedorCartas.innerHTML = "";

  cartas.forEach(cartaGuardada => {
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

function ordenarPorValor() {
  cartasGuardadas.sort((a, b) => {
    return a.value.localeCompare(b.value);
  });

  mostrarCartasGuardadas(cartasGuardadas);
}

function ordenarPorPalo() {
  cartasGuardadas.sort((a, b) => {
    return a.suit.localeCompare(b.suit);
  });

  mostrarCartasGuardadas(cartasGuardadas);
}

botonOrdenarValor.addEventListener("click", ordenarPorValor);
botonOrdenarPalo.addEventListener("click", ordenarPorPalo);

mostrarCartasGuardadas(cartasGuardadas);