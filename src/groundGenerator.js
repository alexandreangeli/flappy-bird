class GroundGenerator {
  constructor() {
    var ground1 = new Ground(0);
    var ground2 = new Ground(groundWidth);
    var ground3 = new Ground(groundWidth * 2);
    var ground4 = new Ground(groundWidth * 3);
    var ground5 = new Ground(groundWidth * 4);

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
