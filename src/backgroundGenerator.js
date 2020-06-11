class BackgroundGenerator {
  constructor() {
    var background2 = new Background(0);
    var background1 = new Background(0, (i) => {
      background2.x = i.target.width + background1.x;
    });

    this.backgrounds = [background1, background2];
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
