import "./style.scss";

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

const drawMap = () => {
  ctx.fillStyle = "#2c3e50";
  ctx.fillRect(0, 0, 800, 800);
};

const drawSnake = () => {
  ctx.fillStyle = "#27ae60";
  for (let body of snake) {
    ctx.fillRect(body[0] * gridElem, body[1] * gridElem, gridElem, gridElem);
  }
};

const drawApple = () => {
  ctx.fillStyle = "#e74c3c";
  ctx.fillRect(apple[0] * gridElem, apple[1] * gridElem, gridElem, gridElem);
};

const drawScore = () => {
  ctx.fillStyle = "#ecf0f1";
  ctx.font = "40px Consolas";
  ctx.textBaseline = "top";
  ctx.fillText(score, gridElem, gridElem);
};

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
    }, 800 - speed);
  } else {
    alert(`Perdu ! Votre score est: ${score}`);
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
  speed = score * 15;
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

requestAnimationFrame(move);
