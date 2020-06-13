class GroundGenerator {
  constructor() {
    var ground5 = new Ground(0);
    var ground4 = new Ground(0, (i) => {
      ground5.x = i.target.width + ground4.x;
    });
    var ground3 = new Ground(0, (i) => {
      ground4.x = i.target.width + ground3.x;
    });
    var ground2 = new Ground(0, (i) => {
      ground3.x = i.target.width + ground2.x;
    });
    var ground1 = new Ground(0, (i) => {
      ground2.x = i.target.width + ground1.x;
    });

    this.grounds = [ground1, ground2, ground3, ground4, ground5];
  }

  draw() {
    if (!this.grounds.find((b) => !b.width)) {
      this.grounds.forEach((ground) => {
        ground.move();
      });

      var groundsEnding = Math.max(...this.grounds.map((b) => b.x + b.width));

      this.grounds.forEach((ground) => {
        if (ground.x + ground.width <= 0) {
          ground.x = groundsEnding;
        }
        ground.draw();
      });
    }
  }
}
