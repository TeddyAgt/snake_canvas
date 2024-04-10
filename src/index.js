import "./style.scss";
import applePath from "./img/apple.svg";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const gridElem = 40; // 20 * 20

const snake = [
  [9, 9],
  [8, 9],
  [7, 9],
];
let apple = [5, 5];
let speed = 0;
let score = 0;

/*************** Drawing functions ***************/

const drawMap = () => {
  ctx.fillStyle = "#2c3e50";
  ctx.fillRect(0, 0, 800, 800);
};

const drawSnake = () => {
  for (let body of snake) {
    if (body === snake[0]) {
      ctx.fillStyle = "#27ae60";
      ctx.fillRect(body[0] * gridElem, body[1] * gridElem, gridElem, gridElem);
    } else {
      ctx.fillStyle = "#2ecc71";
      ctx.fillRect(body[0] * gridElem, body[1] * gridElem, gridElem, gridElem);
    }
  }
};

const appleImage = new Image();
appleImage.src = applePath;

const drawApple = () => {
  ctx.drawImage(appleImage, apple[0] * gridElem, apple[1] * gridElem, 40, 40);
};

const drawScore = () => {
  ctx.fillStyle = "#ecf0f1";
  ctx.font = "40px Consolas";
  ctx.textBaseline = "top";
  ctx.fillText(score, gridElem, gridElem);
};

function drawGameOver() {
  // ctx.fillStyle = "#2c3e50";
  // ctx.fillRect(0, 0, 800, 800);
  ctx.style = "ecf0f1";
  ctx.textAlign = "center";
  ctx.font = "bold 80px Consolas";
  ctx.fillText("Perdu !", 400, 200);
  ctx.font = "bold 65px Consolas";
  ctx.fillText(`Votre score est: ${score}`, 400, 400);
  ctx.font = "30px Consolas";
  ctx.fillText("Tapez sur F5 pour rejouer", 400, 680);
}

/*************** Game managing functions ***************/

let direction = "e";
window.addEventListener("keydown", handleKeyDown);

function handleKeyDown(e) {
  switch (e.key) {
    case "ArrowUp": {
      direction = "n";
      break;
    }
    case "ArrowRight": {
      direction = "e";
      break;
    }
    case "ArrowDown": {
      direction = "s";
      break;
    }
    case "ArrowLeft": {
      direction = "o";
      break;
    }
  }
}

function move() {
  if (!updateSnakePosition()) {
    drawMap();
    drawSnake();
    drawApple();
    drawScore();

    setTimeout(() => {
      requestAnimationFrame(move);
    }, 500 - speed);
  } else {
    drawGameOver();
  }
}

function updateSnakePosition() {
  let head;
  switch (direction) {
    case "e": {
      head = [snake[0][0] + 1, snake[0][1]];
      break;
    }
    case "o": {
      head = [snake[0][0] - 1, snake[0][1]];
      break;
    }
    case "n": {
      head = [snake[0][0], snake[0][1] - 1];
      break;
    }
    case "s": {
      head = [snake[0][0], snake[0][1] + 1];
      break;
    }
  }

  snake.unshift(head);
  if (head[0] === apple[0] && head[1] === apple[1]) {
    generateApple();
  } else {
    snake.pop();
  }
  return gameOver();
}

function generateApple() {
  score++;
  speed = score * 20;
  const [x, y] = [
    Math.trunc(Math.random() * 19),
    Math.trunc(Math.random() * 19),
  ];
  for (let body of snake) {
    if (body[0] === x && body[1] === y) {
      return generateApple();
    }
  }
  apple = [x, y];
}

function gameOver() {
  if (
    snake[0][0] > 19 ||
    snake[0][0] < 0 ||
    snake[0][1] > 19 ||
    snake[0][1] < 0
  ) {
    return true;
  } else {
    const [head, ...body] = snake;
    for (let bodyElem of body) {
      if (bodyElem[0] === head[0] && bodyElem[1] === head[1]) {
        return true;
      }
    }
  }
}

appleImage.onload = () => {
  requestAnimationFrame(move);
};
