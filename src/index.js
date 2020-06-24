window.canvas = document.querySelector("canvas");
window.ctx = window.canvas.getContext("2d");

window.canvas.width = window.innerWidth - 3;
window.canvas.height = window.innerHeight;
var pipeGenerator;

function start(player, botGroup) {
  window.player = player;
  pipeGenerator = new PipeGenerator();

  var groundGenerator = new GroundGenerator();
  var backgroundGenerator = new BackgroundGenerator();

  if (document.getElementById("startButtons"))
    document.getElementById("startButtons").remove();

  var score = new Score();

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
    window.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);

    backgroundGenerator.draw();
    pipeGenerator.draw();
    groundGenerator.draw();

    if (player) {
      player.bird.move();
      player.bird.draw();
      player.bird.checkCollision();

      score.update(player.bird);

      if (player && player.bird.dead) {
        gameOver();
      }
    } else {
      botGroup.bots.forEach((bot) => {
        bot.bird.move();
        bot.bird.draw();
        bot.bird.checkCollision();
        score.update(bot.bird, pipeGenerator.pipePairs);
        bot.action();
      });
      botGroup.drawMaxScore();
      botGroup.drawGeneration();

      if (!botGroup.bots.find((bot) => !bot.bird.dead)) {
        gameIsOver = true;
        botGroup.nextGeneration();
        start(false, botGroup);
      }
    }

    score.draw();

    if (!gameIsOver) {
      requestAnimationFrame(draw);
    } else {
      clearInterval(pipeGenerator.interval);
    }
  }

  draw();
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomFloatFromInterval(min, max, decimals) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

function sigmoid(t) {
  return 1 / (1 + Math.pow(Math.E, -t));
}

function randomArrayFromInterval(length, min, max) {
  let randomArray = [];
  while (randomArray.length != length) {
    let randomNumber = randomIntFromInterval(min, max);
    if (!randomArray.includes(randomNumber)) {
      randomArray.push(randomNumber);
    }
  }
  return randomArray;
}
