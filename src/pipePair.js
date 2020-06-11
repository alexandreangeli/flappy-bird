class PipePair {
  constructor() {
    this.voidHeight = window.player ? 175 : 100;
    this.minY = Math.max(70, playableHeight / 2 - 350);

    this.behindBird = false;

    this.voidY = randomIntFromInterval(
      this.minY,
      playableHeight - this.minY - this.voidHeight
    );

    this.pipes = [
      new Pipe(window.canvas.width + 100, this.voidY, true),
      new Pipe(
        window.canvas.width + 100,
        playableHeight - this.voidHeight - this.voidY,
        false
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
