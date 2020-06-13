class BackgroundGenerator {
  constructor() {
    var background1 = new Background(0);
    var background2 = new Background(backgroundWidth);
    var background3 = new Background(backgroundWidth * 2);
    var background4 = new Background(backgroundWidth * 3);
    var background5 = new Background(backgroundWidth * 4);

    this.backgrounds = [
      background1,
      background2,
      background3,
      background4,
      background5,
    ];
  }

  draw() {
    if (!this.backgrounds.find((b) => !b.width)) {
      this.backgrounds.forEach((background) => {
        background.move();
      });

      var backgroundsEnding = Math.max(
        ...this.backgrounds.map((b) => b.x + b.width)
      );

      this.backgrounds.forEach((background) => {
        if (background.x + background.width <= 0) {
          background.x = backgroundsEnding;
        }
        background.draw();
      });
    }
  }
}
