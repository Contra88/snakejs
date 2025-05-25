//* config canvas
let canvas = document.getElementById("gameCanvas");
let displayScore = document.getElementById("score");
let ctx = canvas.getContext("2d");

//*config tablero
let celdaSize = 20;
let columnas = canvas.width / celdaSize;
let filas = canvas.height / celdaSize;

//* snake comida score
let serpiente = [{ x: 10, y: 10 }];
let direccion = { x: 1, y: 0 };
let comida = generarComida();
let puntaje = 0;
let juegoIntervalo;
let foodSound = new Audio("music/foodSound.mp3");
let gameOverSound = new Audio("music/gameOver.mp3");
let startSound = new Audio("music/startSound.mp3");

//* gameLoop
function juegoLoop() {
  actualizar(); //comer y colisiones
  dibujar(); //dibujar marco comida y serpiente
}

//*Update
function actualizar() {
  let cabeza = {
    x: serpiente[0].x + direccion.x,
    y: serpiente[0].y + direccion.y,
  };

  //COLISIONES
  if (
    cabeza.x < 0 ||
    cabeza.x >= columnas ||
    cabeza.y < 0 ||
    cabeza.y >= filas ||
    serpiente.some((el) => el.x === cabeza.x && el.y === cabeza.y)
  ) {
    gameOverSound.play();
    alert("GAME OVER");
    clearInterval(juegoIntervalo);
    return;
  }

  //COMER COMIDA
  if (cabeza.x === comida.x && cabeza.y === comida.y) {
    serpiente.unshift(cabeza);
    puntaje++;
    displayScore.textContent = "SCORE " + puntaje;
    foodSound.play();
    comida = generarComida();
  } else {
    serpiente.pop(); // quitar la cola o posicion anterior
    serpiente.unshift(cabeza); // mover cabeza al la sig posicion de inicio
  }
}

//*DRAW
function dibujar() {
  //dibujar canva
  ctx.fillStyle = "#111"; //color tablero
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //dibujar comida
  ctx.fillStyle = "red";
  ctx.fillRect(
    comida.x * celdaSize,
    comida.y * celdaSize,
    celdaSize,
    celdaSize
  );

  //dibujar snake
  ctx.fillStyle = "lime";
  for (let el of serpiente) {
    ctx.fillRect(el.x * celdaSize, el.y * celdaSize, celdaSize, celdaSize);
  }
}

//*GENERTE FOOD
function generarComida() {
  let nuevaComida;

  do {
    nuevaComida = {
      x: Math.floor(Math.random() * columnas),
      y: Math.floor(Math.random() * filas),
    };
  } while (
    serpiente.some((el) => el.x == nuevaComida.x && el.y == nuevaComida.y)
  );
  return nuevaComida;
}

//*config keyboard
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && direccion.y === 0) {
    direccion = { x: 0, y: -1 };
  } else if (e.key === "ArrowDown" && direccion.y === 0) {
    direccion = { x: 0, y: 1 };
  } else if (e.key === "ArrowLeft" && direccion.x === 0) {
    direccion = { x: -1, y: 0 };
  } else if (e.key === "ArrowRight" && direccion.x === 0) {
    direccion = { x: 1, y: 0 };
  }
});

//*RUN GAME
pantallaInicio();
//juegoIntervalo = setInterval(juegoLoop, 150);

//**************************** Extras******************************* */

//*Mostrar pantalla inicio

function pantallaInicio() {
  let juegoIniciado = false;
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && juegoIniciado == false) {
      //*RUN GAME
      startSound.play();
      juegoIntervalo = setInterval(juegoLoop, 150);
      juegoIniciado = true;
    }
  });
}
