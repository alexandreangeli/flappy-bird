class PipeGenerator {
  constructor() {
    this.pipePairs = [];
    this.pipePairs.push(new PipePair(window.canvas.width + 100, false));

    this.pipeNumber = 1;
    this.distanceBetweenPipes = 300;
  }

  draw() {
    this.pipePairs.forEach((pipePair) => {
      pipePair.draw();
    });

    if (this.pipePairs.filter((pair) => !pair.behindBird).length < 5) {
      this.pipeNumber++;

      let lastPipeX = this.pipePairs[this.pipePairs.length - 1].pipes[0].x;
      let lastPipeWidth = this.pipePairs[this.pipePairs.length - 1].pipes[0]
        .width;

      this.pipePairs.push(
        new PipePair(
          lastPipeX + lastPipeWidth + this.distanceBetweenPipes,
          this.pipeNumber % 3 == 0
        )
      );
    }
  }
}
