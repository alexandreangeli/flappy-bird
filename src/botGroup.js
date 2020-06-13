class BotGroup {
  constructor() {
    this.population = 500;
    this.quantityToKeep = Math.max(2, Math.floor(this.population * 0.2));
    this.quantityToMutate = Math.floor(this.population * 0.4);
    this.quantityToBreed =
      this.population - this.quantityToKeep - this.quantityToMutate;

    this.mutationModifyChance = 0.2;
    this.mutationMixPercentage = 0.5;
    this.mutatationOffspringMutationChance = 0.4;

    this.generation = 1;
    this.maxScore = 0;

    this.bots = [];
    while (this.bots.length != this.population) {
      this.bots.push(new Bot());
    }
  }

  drawMaxScore() {
    window.ctx.font = "16px Arial";
    window.ctx.fillStyle = "black";
    window.ctx.fillText("Max score: " + this.maxScore, 8, 40);
  }

  drawGeneration() {
    window.ctx.font = "16px Arial";
    window.ctx.fillStyle = "black";
    window.ctx.fillText("Generation: " + this.generation, 8, 60);
  }

  getMixFromArrays(bot1, bot2) {
    let mix = new Bot();

    let inputLength = bot1.inputFactors.length;
    let inputLengthLength = bot1.inputFactors[0].length;
    let totalEntries = inputLength * inputLengthLength;
    let numToTake =
      totalEntries - Math.floor(totalEntries * this.mutationMixPercentage);

    let idx1 = randomArrayFromInterval(numToTake, 0, totalEntries - 1);
    let idx2 = randomArrayFromInterval(
      totalEntries,
      0,
      totalEntries - 1
    ).filter((x) => !idx1.includes(x));

    idx1.forEach((val) => {
      if (!mix.inputFactors[Math.floor(val / inputLengthLength)]) {
        mix.inputFactors[Math.floor(val / inputLengthLength)] = [];
      }

      mix.inputFactors[Math.floor(val / inputLengthLength)][
        val % inputLengthLength
      ] =
        bot1.inputFactors[Math.floor(val / inputLengthLength)][
          val % inputLengthLength
        ];
    });

    idx2.forEach((val) => {
      if (!mix.inputFactors[Math.floor(val / inputLengthLength)]) {
        mix.inputFactors[Math.floor(val / inputLengthLength)] = [];
      }

      mix.inputFactors[Math.floor(val / inputLengthLength)][
        val % inputLengthLength
      ] =
        bot2.inputFactors[Math.floor(val / inputLengthLength)][
          val % inputLengthLength
        ];
    });

    let nodeLength = bot1.nodeFactors.length;
    let nodeLengthLength = bot1.nodeFactors[0].length;
    totalEntries = nodeLength * nodeLengthLength;
    numToTake =
      totalEntries - Math.floor(totalEntries * this.mutationMixPercentage);

    idx1 = randomArrayFromInterval(numToTake, 0, totalEntries - 1);
    idx2 = randomArrayFromInterval(totalEntries, 0, totalEntries - 1).filter(
      (x) => !idx1.includes(x)
    );

    idx1.forEach((val) => {
      if (!mix.nodeFactors[Math.floor(val / nodeLengthLength)]) {
        mix.nodeFactors[Math.floor(val / nodeLengthLength)] = [];
      }

      mix.nodeFactors[Math.floor(val / nodeLengthLength)][
        val % nodeLengthLength
      ] =
        bot1.nodeFactors[Math.floor(val / nodeLengthLength)][
          val % nodeLengthLength
        ];
    });

    idx2.forEach((val) => {
      if (!mix.nodeFactors[Math.floor(val / nodeLengthLength)]) {
        mix.nodeFactors[Math.floor(val / nodeLengthLength)] = [];
      }

      mix.nodeFactors[Math.floor(val / nodeLengthLength)][
        val % nodeLengthLength
      ] =
        bot2.nodeFactors[Math.floor(val / nodeLengthLength)][
          val % nodeLengthLength
        ];
    });

    return mix;
  }

  modifyBot(bot) {
    for (let i = 0; i < bot.inputFactors.length; i++) {
      for (let j = 0; j < bot.inputFactors[i].length; j++) {
        if (Math.random() < this.mutationModifyChance) {
          bot.inputFactors[i][j] = randomFloatFromInterval(-0.5, 0.5, 2);
        }
      }
    }

    for (let i = 0; i < bot.nodeFactors.length; i++) {
      for (let j = 0; j < bot.nodeFactors[i].length; j++) {
        if (Math.random() < this.mutationModifyChance) {
          bot.nodeFactors[i][j] = randomFloatFromInterval(-0.5, 0.5, 2);
        }
      }
    }

    return bot;
  }

  nextGeneration() {
    this.generation++;

    let bestBotToWorse = this.bots.sort(function (a, b) {
      if (a.bird.x > b.bird.x) return -1;
      if (a.bird.x < b.bird.x) return 1;

      let nextPipePair = pipeGenerator.pipePairs.find(
        (pair) =>
          pair.pipes[0].x + pair.pipes[0].width > a.bird.x - a.bird.radius
      );
      let nextPipePairVoidCenter =
        nextPipePair.pipes[1].y + nextPipePair.voidHeight / 2;
      let aDistanceToVoidCenter = Math.abs(
        a.bird.yWhenDied - nextPipePairVoidCenter
      );
      let bDistanceToVoidCenter = Math.abs(
        b.bird.yWhenDied - nextPipePairVoidCenter
      );

      if (aDistanceToVoidCenter > bDistanceToVoidCenter) return 1;
      if (aDistanceToVoidCenter < bDistanceToVoidCenter) return -1;
    });

    let botsToKeep = bestBotToWorse.slice(0, this.quantityToKeep);
    bestBotToWorse = bestBotToWorse.slice(this.quantityToKeep);

    let botsToMutate = bestBotToWorse.slice(0, this.quantityToMutate);
    bestBotToWorse = bestBotToWorse.slice(this.quantityToMutate);

    let botsToBreed = bestBotToWorse.slice(0, this.quantityToBreed);
    bestBotToWorse = bestBotToWorse.slice(this.quantityToBreed);

    for (let botNumber = 0; botNumber < botsToMutate.length; botNumber++) {
      botsToMutate[botNumber] = this.modifyBot(botsToMutate[botNumber]);
    }

    for (let botNumber = 0; botNumber < botsToBreed.length; botNumber++) {
      let goodBotsToBreed = randomArrayFromInterval(
        2,
        0,
        botsToKeep.length - 1
      );
      botsToBreed[botNumber] = this.getMixFromArrays(
        botsToKeep[goodBotsToBreed[0]],
        botsToKeep[goodBotsToBreed[1]]
      );
      if (Math.random() < this.mutatationOffspringMutationChance) {
        this.modifyBot(botsToBreed[botNumber]);
      }
    }

    this.bots = [...botsToKeep, ...botsToMutate, ...botsToBreed];

    this.bots.forEach((bot, index) => {
      bot.bird = new Bird();
      bot.bird.img.src = bot.bird.basicBirdSrc;
    });

    if (window.score.value > this.maxScore) {
      this.maxScore = score.value;
    }
  }
}
