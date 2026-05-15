const contenedorCartas = document.querySelector("#cartas");

const botonOrdenarValor = document.querySelector("#ordenarValor");
const botonOrdenarPalo = document.querySelector("#ordenarPalo");

// Trae las cartas guardadas desde localStorage
let cartasGuardadas = JSON.parse(localStorage.getItem("cartas")) || [];

// Muestra en pantalla las cartas recibidas
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

// Ordena las cartas guardadas por valor
function ordenarPorValor() {
  cartasGuardadas.sort((a, b) => {
    return a.value.localeCompare(b.value);
  });

  mostrarCartasGuardadas(cartasGuardadas);
}

// Ordena las cartas guardadas por palo
function ordenarPorPalo() {
  cartasGuardadas.sort((a, b) => {
    return a.suit.localeCompare(b.suit);
  });

  mostrarCartasGuardadas(cartasGuardadas);
}

botonOrdenarValor.addEventListener("click", ordenarPorValor);
botonOrdenarPalo.addEventListener("click", ordenarPorPalo);

mostrarCartasGuardadas(cartasGuardadas);