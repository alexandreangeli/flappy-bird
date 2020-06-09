class PipePair {
  constructor() {
    this.voidHeight = 100;

    this.pipeWidth = 50;

    this.minY = 200;

    this.voidY = randomIntFromInterval(this.minY, canvas.height - this.minY);

    this.pipes = [
      new Pipe(canvas.width, 0, this.pipeWidth, this.voidY),
      new Pipe(
        canvas.width,
        this.voidY + this.voidHeight,
        this.pipeWidth,
        canvas.height - this.voidHeight - this.voidY
      ),
    ];
  }

  draw() {
    this.pipes[0].draw();
    this.pipes[1].draw();
  }
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
