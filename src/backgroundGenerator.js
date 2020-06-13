class BackgroundGenerator {
  constructor() {
    var background5 = new Background(0);
    var background4 = new Background(0, (i) => {
      background5.x = i.target.width + background4.x;
    });
    var background3 = new Background(0, (i) => {
      background4.x = i.target.width + background3.x;
    });
    var background2 = new Background(0, (i) => {
      background3.x = i.target.width + background2.x;
    });
    var background1 = new Background(0, (i) => {
      background2.x = i.target.width + background1.x;
    });

    this.backgrounds = [background1, background2, background3, background4];
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
