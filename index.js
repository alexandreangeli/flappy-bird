window.canvas = document.querySelector("canvas");
window.ctx = window.canvas.getContext("2d");

window.canvas.width = window.innerWidth - 2;
window.canvas.height = window.innerHeight;
if (window.canvas.width > 500) {
  window.canvas.width = 500;
}
if (window.canvas.height > 700) {
  window.canvas.height = 700;
}

function start(humanPlaying, botGroup) {
  let ticks = 0;
  if (document.getElementById("startButtons"))
    document.getElementById("startButtons").remove();

  if (humanPlaying) {
    var score = new Score();
    var player = new Player();
  } else if (!botGroup) {
    botGroup = new BotGroup();
  }

  var pipePairs = [];
  pipePairs.push(new PipePair());
  let interval = setInterval(() => pipePairs.push(new PipePair()), 2000);

  function checkScore() {
    for (let pipePair of pipePairs) {
      let pipe = pipePair.pipes[0];
      if (
        !pipe.behindBird &&
        pipe.x + pipe.width < player.bird.x - player.bird.radius
      ) {
        pipe.behindBird = true;
        score.value++;
      }
    }
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
      ticks++;
      window.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);

      if (humanPlaying && player.bird.died_at) {
        gameOver();
      }

      pipePairs.forEach((pipePair) => {
        pipePair.draw();
      });

      if (humanPlaying) {
        player.bird.draw();
        player.bird.checkCollision(pipePairs, ticks);

        score.draw();
        checkScore();
      } else {
        botGroup.bots.forEach((bot) => {
          bot.bird.draw();
          bot.bird.checkCollision(pipePairs, ticks);
          bot.action(pipePairs);
        });
        if (!botGroup.bots.find((bot) => !bot.bird.died_at)) {
          gameIsOver = true;
          let bestBot = botGroup.bots.find(
            (b) =>
              b.bird.died_at ==
              Math.max(...botGroup.bots.map((b) => b.bird.died_at))
          );
          if (
            botGroup.bots.filter((b) => b.bird.died_at == bestBot.bird.died_at)
              .length == botGroup.population
          ) {
            botGroup = new BotGroup();
          } else {
            if (
              !botGroup.topBot ||
              botGroup.topBot.bird.died_at < bestBot.bird.died_at
            ) {
              botGroup.topBot = JSON.parse(JSON.stringify(bestBot));
            }
            botGroup.bots.forEach((bot) => {
              bot.inputFactors = JSON.parse(
                JSON.stringify(botGroup.topBot.inputFactors)
              );
              bot.nodeFactors = JSON.parse(
                JSON.stringify(botGroup.topBot.nodeFactors)
              );
              bot.mutate();
              bot.bird = new Bird();
            });
          }
          clearInterval(interval);

          start(false, botGroup);
        }
      }

      requestAnimationFrame(draw);
    }
  }

  draw();
}
