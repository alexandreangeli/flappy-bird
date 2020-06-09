var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 2;
canvas.height = window.innerHeight;

if (canvas.width > 500) {
  canvas.width = 500;
}
if (canvas.height > 700) {
  canvas.height = 700;
}

var score = new Score();
var bird = new Bird();
var pipePairs = [];
pipePairs.push(new PipePair());
setInterval(() => {
  pipePairs.push(new PipePair());
}, 2000);

document.addEventListener("click", onClickHandler, false);
document.addEventListener("touchend", onClickHandler, false);

function onClickHandler(e) {
  e.preventDefault();
  bird.jump();
}

function collisionDetection(circle, rect) {
  var distX = Math.abs(circle.x - rect.x - rect.w / 2);
  var distY = Math.abs(circle.y - rect.y - rect.h / 2);

  if (distX > rect.w / 2 + circle.r) {
    return false;
  }
  if (distY > rect.h / 2 + circle.r) {
    return false;
  }

  if (distX <= rect.w / 2) {
    return { y: true, x: false };
  }
  if (distY <= rect.h / 2) {
    return { y: false, x: true };
  }

  var dx = distX - rect.w / 2;
  var dy = distY - rect.h / 2;
  return dx * dx + dy * dy <= circle.r * circle.r
    ? { y: true, x: true }
    : { y: false, x: false };
}

let gameIsOver = false;
function gameOver() {
  if (!gameIsOver) {
    gameIsOver = true;
    setTimeout(() => {
      alert("GAME OVER");
      document.location.reload();
    }, 50);
  }
}

function draw() {
  if (!gameIsOver) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    score.draw();
    bird.draw();

    pipePairs.forEach((pipePair) => {
      pipePair.draw();
    });

    requestAnimationFrame(draw);

    for (let pipePair of pipePairs) {
      for (let pipe of pipePair.pipes) {
        if (
          collisionDetection(
            {
              x: bird.x,
              y: bird.y,
              r: bird.radius,
            },
            {
              x: pipe.x,
              y: pipe.y,
              h: pipe.height,
              w: pipe.width,
            }
          )
        ) {
          gameOver();
        }
      }
    }
  }
}

draw();
