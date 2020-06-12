class PipeGenerator {
  constructor() {
    this.pipeInterval = 2000;
    this.pipePairs = [];
    this.pipePairs.push(new PipePair());
    this.interval = setInterval(
      () => this.pipePairs.push(new PipePair()),
      2800
    );
  }

  draw() {
    this.pipePairs.forEach((pipePair) => {
      pipePair.draw();
    });
  }
}
