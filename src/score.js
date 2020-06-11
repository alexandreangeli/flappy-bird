class Score {
  constructor() {
    this.value = 0;
    window.score = this;
  }

  draw() {
    window.ctx.font = "16px Arial";
    window.ctx.fillStyle = "black";
    window.ctx.fillText("Score: " + this.value, 8, 20);
  }

  update(bird, pipePairs) {
    for (let pipePair of pipePairs) {
      let pipe = pipePair.pipes[0];
      if (!pipePair.behindBird && pipe.x + pipe.width < bird.x - bird.radius) {
        pipePair.behindBird = true;
        this.value++;
      }
    }
  }
}
