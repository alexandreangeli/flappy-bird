class BotGroup {
  constructor() {
    this.population = 100;
    this.topBot = null;
    this.bots = [];
    while (this.bots.length != this.population) {
      this.bots.push(new Bot());
    }
  }
}
