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
}
