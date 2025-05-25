//* 1. Setup del canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");

//* 2. Configuración del tablero
const cellSize = 20;
const columns = canvas.width / cellSize; // 400 / 20 = 20 columnas vertica
const rows = canvas.height / cellSize; // 400 / 20 = 20 filas horizontal

//* 3. Serpiente y comida
let snake = [{ x: 10, y: 10 }]; // inicia en el centro
let direction = { x: 1, y: 0 }; // moviéndose a la derecha
let food = generateFood();
let score = 0;
let gameInterval;

//* 4. Función principal de actualización
function gameLoop() {
  update();
  draw();
}

//* 5. Actualizar estado del juego
function update() {
  // Nueva cabeza
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Colisiones
  if (
    head.x < 0 ||
    head.x >= columns ||
    head.y < 0 ||
    head.y >= rows ||
    snake.some((segment) => segment.x === head.x && segment.y === head.y)
  ) {
    clearInterval(gameInterval);
    alert("¡Game Over!");
    return;
  }

  // Comer comida
  if (head.x === food.x && head.y === food.y) {
    snake.unshift(head); // crece
    food = generateFood(); // nueva comida
    score++;
    scoreDisplay.textContent = "Puntaje: " + score;
  } else {
    snake.pop(); // elimina cola
    snake.unshift(head); // mueve cabeza
  }
}

//* 6. Dibujar todo
function draw() {
  //! Limpiar canvas
  ctx.fillStyle = "#111"; //aplica color gris oscuro
  ctx.fillRect(0, 0, canvas.width, canvas.height); //lo aplica a todo el rectangulo del canva

  // Dibujar comida
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * cellSize, food.y * cellSize, cellSize, cellSize);

  //! Dibujar serpiente
  ctx.fillStyle = "lime";
  for (let segment of snake) {
    ctx.fillRect(
      segment.x * cellSize,
      segment.y * cellSize,
      cellSize,
      cellSize
    );
  }

  // (Opcional) Dibujar la rejilla
  //drawGrid();
}

//* 7. Dibujar la rejilla (opcional, útil para desarrollo)
function drawGrid() {
  ctx.strokeStyle = "#222";
  for (let x = 0; x <= canvas.width; x += cellSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y <= canvas.height; y += cellSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

//* 8. Generar comida aleatoria
function generateFood() {
  let newFood;
  do {
    newFood = {
      x: Math.floor(Math.random() * columns),
      y: Math.floor(Math.random() * rows),
    };
  } while (
    snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y)
  );
  return newFood;
}

//*9. Control del teclado
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && direction.y === 0) {
    direction = { x: 0, y: -1 };
  } else if (e.key === "ArrowDown" && direction.y === 0) {
    direction = { x: 0, y: 1 };
  } else if (e.key === "ArrowLeft" && direction.x === 0) {
    direction = { x: -1, y: 0 };
  } else if (e.key === "ArrowRight" && direction.x === 0) {
    direction = { x: 1, y: 0 };
  }
});

//* 10. Iniciar el juego
gameInterval = setInterval(gameLoop, 150); // velocidad del juego
