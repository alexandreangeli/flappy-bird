class GroundGenerator {
  constructor() {
    var ground2 = new Ground(0);
    var ground1 = new Ground(0, (i) => {
      ground2.x = i.target.width + ground1.x;
    });

    this.grounds = [ground1, ground2];
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
