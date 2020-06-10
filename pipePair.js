class PipePair {
  constructor() {
    this.voidHeight = 120;
    this.minY = 150;

    this.behindBird = false;

    this.voidY = randomIntFromInterval(
      this.minY - this.voidHeight,
      window.canvas.height - this.minY
    );

    this.pipes = [
      new Pipe(window.canvas.width, 0, this.voidY),
      new Pipe(
        window.canvas.width,
        this.voidY + this.voidHeight,
        window.canvas.height - this.voidHeight - this.voidY
      ),
    ];
  }

  draw() {
    this.pipes[0].draw();
    this.pipes[1].draw();
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
