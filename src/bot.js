class Bot {
  constructor() {
    this.bird = new Bird();

    this.inputNumber = 5;
    this.nodeNumber = 5;
    this.outputNumber = 2;
    this.bias = randomFloatFromInterval(-0.5, 0.5, 2)

    this.inputFactors = [];
    while (this.inputFactors.length != this.inputNumber) {
      let inputFactor = [];
      while (inputFactor.length != this.nodeNumber) {
        inputFactor.push(randomFloatFromInterval(-0.5, 0.5, 2));
      }
      this.inputFactors.push(inputFactor);
    }

    this.nodeFactors = [];
    while (this.nodeFactors.length != this.nodeNumber) {
      let nodeFactor = [];
      while (nodeFactor.length != this.outputNumber) {
        nodeFactor.push(randomFloatFromInterval(-0.5, 0.5, 2));
      }
      this.nodeFactors.push(nodeFactor);
    }
  }

  getInputs() {
    let nextPair =
      pipeGenerator.pipePairs.find((pair) => !pair.behindBird) ||
      pipeGenerator.pipePairs
        .slice()
        .reverse()
        .find((pair) => pair.behindBird);

    let nextTopPipe = nextPair.pipes[0];
    let nextBottomPipe = nextPair.pipes[1];

    let distanceXLeft = nextTopPipe.x - this.bird.x;
    let distanceXRight = nextTopPipe.x + nextTopPipe.width - this.bird.x;
    let distanceYTop = nextTopPipe.y + nextTopPipe.height - this.bird.y;
    let distanceYBottom = nextBottomPipe.y - this.bird.y;

    let inputs = [
      distanceXLeft,
      distanceXRight,
      distanceYTop,
      distanceYBottom,
      this.bias,
    ];
    if (inputs.length != this.inputNumber) {
      throw "Wrong input length";
    }

    return inputs;
  }

  getOutputs() {
    let outputs = [() => this.bird.jump(), () => this.bird.fly()];
    if (outputs.length != this.outputNumber) {
      throw "Wrong output length";
    }
    return outputs;
  }

  action(pipePairs) {
    if (!this.bird.dead) {
      let inputs = this.getInputs();
      let outputs = this.getOutputs();

      let nodes = [];
      for (let node = 0; node < this.nodeNumber; node++) {
        var nodeValue = 0;
        for (let input = 0; input < this.inputNumber; input++) {
          nodeValue += inputs[input] * this.inputFactors[input][node];
        }
        nodes.push(sigmoid(nodeValue));
      }

      let outputsNodes = [];
      for (let outputNode = 0; outputNode < this.outputNumber; outputNode++) {
        var outPutNodeValue = 0;
        for (let node = 0; node < this.nodeNumber; node++) {
          outPutNodeValue += nodes[node] * this.nodeFactors[node][outputNode];
        }
        outputsNodes.push(sigmoid(outPutNodeValue));
      }

      outputsNodes.forEach((outputNode, index) => {
        if (outputNode > 0.5) {
          outputs[index]();
        }
      });
    }
  }
}
