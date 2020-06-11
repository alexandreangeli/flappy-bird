class Score {
  constructor() {
    this.value = 0;
  }

  draw() {
    window.ctx.font = "16px Arial";
    window.ctx.fillStyle = "#0095DD";
    window.ctx.fillText("Score: " + this.value, 8, 20);
  }

  update(bird, pipePairs) {
    for (let pipePair of pipePairs) {
      let pipe = pipePair.pipes[0];
      if (!pipe.behindBird && pipe.x + pipe.width < bird.x - bird.radius) {
        pipe.behindBird = true;
        this.value++;
      }
    }
  }
}
