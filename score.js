class Score {
  constructor() {
    this.value = 0;
  }

  draw() {
    window.ctx.font = "16px Arial";
    window.ctx.fillStyle = "#0095DD";
    window.ctx.fillText("Score: " + this.value, 8, 20);
  }
}
