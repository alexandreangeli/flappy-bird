var backgroundWidth = 0;
var backgroundHeight = 0;
let imgBackground = new Image();
imgBackground.src = "../images/background.png";
imgBackground.onload = (i) => {
  backgroundWidth = i.target.width;
  backgroundHeight = i.target.height;
};

class Background {
  constructor(x) {
    this.height = backgroundHeight;
    this.width = backgroundWidth;
    this.x = x;
    this.y = 0;
    this.xSpeed = -0.5;
  }

  move() {
    this.x += this.xSpeed;
  }

  draw() {
    window.ctx.drawImage(
      imgBackground,
      this.x,
      this.y,
      this.width,
      playableHeight
    );
  }
}
