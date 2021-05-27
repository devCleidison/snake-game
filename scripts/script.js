let screen = document.getElementById("screen");
let ctx = screen.getContext("2d");
let btnStart = document.getElementById("btn-start");
let count = document.getElementById("counter");

var posXFruit;
var posYFruit;
var posX = screen.width;
var posY = screen.height;
var snake = 20;
var up;
var down;
var left;
var right;
var time = 1000;
var x = 200;
var y = 200;
var counter = 0;

document.querySelector("body").addEventListener("keydown", function (event) {
  moveSnakeTo(event.key);
});

drawScreen();

function drawScreen() {
  screen.style.backgroundColor = "forestgreen";
}

function start() {
  btnStart.hidden = true;

  generateRandomFruit();
  drawFruit();
  drawSnake(x, y);
}

function generateRandomFruit() {
  posXFruit = Math.ceil(Math.random() * snake) * snake;
  posYFruit = Math.ceil(Math.random() * snake) * snake;

  return { posXFruit, posYFruit };
}

function drawFruit() {
  generateRandomFruit();
  ctx.beginPath();
  ctx.strokeStyle = "forestgreen";
  ctx.fillStyle = "red";
  if (posXFruit - snake < 0 || posYFruit - snake < 0) {
    ctx.rect(posXFruit + snake, posYFruit + snake, snake, snake);
  } else {
    ctx.rect(posXFruit - snake, posYFruit - snake, snake, snake);
  }
  ctx.fill();
  ctx.stroke();
}

function drawSnake(x, y) {
  ctx.beginPath();
  ctx.fillStyle = "blue";
  ctx.strokeStyle = "forestgreen";
  ctx.rect(x, y, snake, snake);
  ctx.fill();
  ctx.stroke();
}

function moveSnakeTo(move) {
  clearInterval(up);
  clearInterval(down);
  clearInterval(left);
  clearInterval(right);

  switch (move) {
    case "ArrowDown":
      down = setInterval(() => {
        ctx.clearRect(x, y, snake, snake);
        drawSnake(x, (y += snake));
        if (x == posXFruit - snake && y == posYFruit - snake) {
          control();
        }
      }, time);
      break;
    case "ArrowUp":
      down = setInterval(() => {
        ctx.clearRect(x, y, snake, snake);
        drawSnake(x, (y -= snake));
        if (x == posXFruit - snake && y == posYFruit - snake) {
          control();
        }
      }, time);
      break;
    case "ArrowLeft":
      down = setInterval(() => {
        ctx.clearRect(x, y, snake, snake);
        drawSnake((x -= snake), y);
        if (x == posXFruit - snake && y == posYFruit - snake) {
          control();
        }
      }, time);
      break;
    case "ArrowRight":
      down = setInterval(() => {
        ctx.clearRect(x, y, snake, snake);
        drawSnake((x += snake), y);
        if (x == posXFruit - snake && y == posYFruit - snake) {
          control();
        }
      }, time);
      break;
  }
}

function control() {
  time -= 20;
  counter++;
  count.innerHTML = counter;

  drawFruit();
}