class BotGroup {
  constructor() {
    this.population = 100;
    this.generation = 1;
    this.maxScore = 0;
    this.topBot = null;
    this.bots = [];
    while (this.bots.length != this.population) {
      this.bots.push(new Bot());
    }
  }

  drawMaxScore() {
    window.ctx.font = "16px Arial";
    window.ctx.fillStyle = "black";
    window.ctx.fillText("Max score: " + this.maxScore, 8, 40);
  }

  drawGeneration() {
    window.ctx.font = "16px Arial";
    window.ctx.fillStyle = "black";
    window.ctx.fillText("Generation: " + this.generation, 8, 60);
  }

  nextGeneration() {
    let bestBot = this.bots.find(
      (b) => b.bird.died_at == Math.max(...this.bots.map((b) => b.bird.died_at))
    );

    if (
      !this.topBot &&
      this.bots.filter((b) => b.bird.died_at == bestBot.bird.died_at).length ==
        this.population
    ) {
      this.bots = [];
      while (this.bots.length != this.population) {
        this.bots.push(new Bot());
      }
    } else {
      if (!this.topBot || this.topBot.bird.died_at < bestBot.bird.died_at) {
        this.topBot = JSON.parse(JSON.stringify(bestBot));
      }

      this.bots.forEach((bot, index) => {
        bot.inputFactors = JSON.parse(JSON.stringify(this.topBot.inputFactors));
        bot.nodeFactors = JSON.parse(JSON.stringify(this.topBot.nodeFactors));
        bot.bird = new Bird();
        if (index != this.population - 1) {
          bot.mutate();
          bot.bird.img.src = bot.bird.basicBirdSrc;
        } else {
          bot.bird.img.src = bot.bird.topBirdSrc;
        }
      });
    }
    this.generation++;
    if (window.score.value > this.maxScore) {
      this.maxScore = score.value;
    }
  }
}
