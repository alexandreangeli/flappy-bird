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
      score.draw();
      if (player && player.bird.died_at) {
        gameOver();
      }
    } else {
      botGroup.bots.forEach((bot) => {
        bot.bird.move();
        bot.bird.draw();
        bot.bird.checkCollision(pipeGenerator.pipePairs, ticks);
        score.update(bot.bird, pipeGenerator.pipePairs);
        score.draw();
        bot.action(pipeGenerator.pipePairs);
      });

      if (!botGroup.bots.find((bot) => !bot.bird.died_at)) {
        gameIsOver = true;
        let bestBot = botGroup.bots.find(
          (b) =>
            b.bird.died_at ==
            Math.max(...botGroup.bots.map((b) => b.bird.died_at))
        );
        if (
          botGroup.bots[botGroup.population - 1].bird.color != "blue" &&
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
          botGroup.bots.forEach((bot, index) => {
            bot.inputFactors = JSON.parse(
              JSON.stringify(botGroup.topBot.inputFactors)
            );
            bot.nodeFactors = JSON.parse(
              JSON.stringify(botGroup.topBot.nodeFactors)
            );
            bot.bird = new Bird();
            if (index != botGroup.population - 1) {
              bot.mutate();
              bot.bird.img.src = bot.bird.basicBirdSrc;
            } else {
              bot.bird.img.src = bot.bird.topBirdSrc;
            }
          });
        }

        start(false, botGroup);
      }
    }

    if (!gameIsOver) {
      requestAnimationFrame(draw);
    } else {
      clearInterval(pipeGenerator.interval);
    }
  }

  draw();
}
