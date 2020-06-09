class Score {
  constructor() {
    this.value = 0;
  }

  draw() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + this.value, 8, 20);
  }
}
