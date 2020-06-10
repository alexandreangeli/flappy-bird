class Bot {
  constructor() {
    this.bird = new Bird();

    this.inputNumber = 3;
    this.nodeNumber = 3;

    this.inputFactors = [];
    while (this.inputFactors.length != this.inputNumber) {
      let inputFactor = [];
      while (inputFactor.length != this.nodeNumber) {
        inputFactor.push(randomIntFromInterval(-1000, 1000));
      }
      this.inputFactors.push(inputFactor);
    }

    this.nodeFactors = [];
    while (this.nodeFactors.length != this.nodeNumber) {
      this.nodeFactors.push(randomIntFromInterval(-1000, 1000));
    }
  }

  action(pipePairs) {
    let nextPair = pipePairs.find((pair) => {
      let topPipe = pair.pipes[0];
      return topPipe.x + topPipe.width > this.bird.x - this.bird.radius;
    });

    let nextTopPipe = nextPair.pipes[0];
    let distanceX = nextTopPipe.x + nextTopPipe.width / 2 - this.bird.x;
    let distanceYTop = nextTopPipe.height - this.bird.y;
    let distanceYBottom =
      nextTopPipe.height + nextPair.voidHeight - this.bird.y;

    let inputs = [distanceX, distanceYTop, distanceYBottom];

    let nodes = [];
    for (let node = 0; node < this.nodeNumber; node++) {
      var nodeValue = 0;
      for (let input = 0; input < this.inputNumber; input++) {
        nodeValue += inputs[input] * this.inputFactors[input][node];
      }
      nodes.push(nodeValue > 0 ? nodeValue : 0);
    }

    let nodeFinal =
      nodes[0] * this.nodeFactors[0] +
      nodes[1] * this.nodeFactors[1] +
      nodes[2] * this.nodeFactors[2];
    if (nodeFinal > 0) {
      this.bird.jump();
    }
  }

  mutate() {
    let mutationFactor = randomIntFromInterval(1, 200) / 100;

    let newInputFactors = [];
    this.inputFactors.forEach((inputFactor) => {
      let newInputFactor = [];
      inputFactor.forEach((factor) => {
        newInputFactor.push(
          factor +
            randomIntFromInterval(
              Math.floor(-factor * mutationFactor),
              Math.floor(factor * mutationFactor)
            )
        );
      });
      newInputFactors.push(newInputFactor);
    });
    this.inputFactors = newInputFactors;

    let newNodeFactors = [];
    this.nodeFactors.forEach((nodeFactor) => {
      newNodeFactors.push(
        nodeFactor +
          randomIntFromInterval(
            Math.floor(-nodeFactor * mutationFactor),
            Math.floor(nodeFactor * mutationFactor)
          )
      );
    });
    this.nodeFactors = newNodeFactors;
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}