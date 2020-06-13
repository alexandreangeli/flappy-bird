window.pipeXSpeed = -2.5;
class PipePair {
  constructor(x, longPipe) {
    this.voidHeight = this.player ? 250 : longPipe ? 80 : 200;
    this.minVoidY = Math.max(70, playableHeight / 2 - 350);
    this.maxVoidY = playableHeight - this.minVoidY - this.voidHeight;

    this.voidY = randomIntFromInterval(this.minVoidY, this.maxVoidY);
    this.behindBird = false;

    this.pipesWidth = longPipe && !this.player ? 250 : 150;
    this.xSpeed = window.pipeXSpeed;
    this.ySpeed = longPipe ? 0 : randomFloatFromInterval(-2, 2, 2);

    this.pipes = [
      new Pipe(x, this.pipesWidth, this.voidY, true),
      new Pipe(
        x,
        this.pipesWidth,
        playableHeight - this.voidHeight - this.voidY,
        false
      ),
    ];
  }

  draw() {
    for (let pipe of this.pipes) {
      pipe.x += this.xSpeed;
      pipe.y += this.ySpeed;
      let voidY = pipe.isAtTop
        ? pipe.y + pipe.height
        : pipe.y - this.voidHeight;
      if (
        (this.ySpeed < 0 && voidY < this.minVoidY) ||
        (this.ySpeed > 0 && voidY > this.maxVoidY)
      ) {
        this.ySpeed *= -1;
      }
      window.ctx.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
    }
  }
}
