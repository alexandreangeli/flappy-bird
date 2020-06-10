class BotGroup {
  constructor() {
    this.population = 50;
    this.topBot = null;
    this.bots = [];
    while (this.bots.length != this.population) {
      this.bots.push(new Bot());
    }
  }
}
