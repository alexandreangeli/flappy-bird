window.canvas = document.querySelector("canvas");
window.ctx = window.canvas.getContext("2d");

window.canvas.width = window.innerWidth - 3;
window.canvas.height = window.innerHeight;
var playableHeight = window.canvas.height;

function start(player, botGroup) {
  window.player = player;

  if (document.getElementById("startButtons"))
    document.getElementById("startButtons").remove();

  let ticks = 0;

  var groundGenerator = new GroundGenerator();
  var backgroundGenerator = new BackgroundGenerator();
  var pipeGenerator = new PipeGenerator();
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
    ticks++;

    window.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);

    backgroundGenerator.draw();
    pipeGenerator.draw();
    groundGenerator.draw();

    if (player) {
      player.bird.move();
      player.bird.draw();
      player.bird.checkCollision(pipeGenerator.pipePairs, ticks);

      score.update(player.bird, pipeGenerator.pipePairs);

      if (player && player.bird.died_at) {
        gameOver();
      }
    } else {
      botGroup.bots.forEach((bot) => {
        bot.bird.move();
        bot.bird.draw();
        bot.bird.checkCollision(pipeGenerator.pipePairs, ticks);
        score.update(bot.bird, pipeGenerator.pipePairs);
        bot.action(pipeGenerator.pipePairs);
      });
      botGroup.drawMaxScore();
      botGroup.drawGeneration();

      if (!botGroup.bots.find((bot) => !bot.bird.died_at)) {
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
