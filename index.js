// - Lo primero de todo será capturar los elementos `"holes"`, los `"moles"` y el `"score"` para poder insertarle funcionalidad a través de JS. Estos son los elementos dinámicos de nuestro juego.
const holes$$ = document.querySelectorAll(".hole");
const moles$$ = document.querySelectorAll(".mole");
const score$$ = document.querySelector(".score");

// - Tendremos que crear una variable no inicializada para el último agujero, una variable con un valor booleano que nos indique si ha terminado el tiempo del juego y una variable con la puntuación inicializada a `0`.
let lastHole;
let finishTime = false;
let score = 0;

// - En este punto crearemos una función para crear un tiempo randomizado para que los Hans Topo salgan de los hoyos aleatoriamente. Esto se puede hacer a través del método `Math.random()`.
const timeRandom = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

// - Gracias a que la variable del último agujero podemos prevenir a través de una función llamada `randomHole` que no nos inpute el mismo número randomizado en el último agujero. De esta forma cada agujero tendrá un tiempo completamente distinto al anterior.
const randomHole = (holes) => {
  const index = Math.floor(Math.random() * holes.length);
  const hole = holes[index];
  if (hole == lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
};

// - Hay que crear también una función que nos determine el tiempo que los Hans Topo deben estar "asomados" a través de la clase `"up"` (esta clase en la hoja de estilos nos va a mostrar el topo a través de una animación vertical). Por lo tanto tendremos que inputarle el tiempo de mostrado y añadirle la clase `"up"` a nuestro elemento y una vez pasado el tiempo randomizado eliminar dicha clase.
const timeTop = () => {
  const time = timeRandom(500, 1000);
  const hole = randomHole(holes$$);
  hole.classList.add("up");
  setTimeout(() => {
    hole.classList.remove("up");
    if (!finishTime) {
      timeTop();
    }
  }, time);
};

function startGame() {
  score$$.textContent = 0;
  finishTime = false;
  score = 0;
  timeTop();
  let myTimeout = setTimeout(() => {
    finishTime = true;
  }, 15000);
  
  //muestra topos aleatoriamente durante 15 segundos
}

// La última función importante será la función wack, la cual nos sumará un punto al marcador y nos quitará la clase "up" de nuestro elemento clickado para ocultar a Hans Topo mediante el click.⁄

moles$$.forEach((mole) => {
  mole.addEventListener("click", (e) => {
    if (!e.isTrusted) return;
    score++;
    console.log(mole);
    mole.classList.remove("up");
    console.log(mole);
    score$$.textContent = score;
  });
});
