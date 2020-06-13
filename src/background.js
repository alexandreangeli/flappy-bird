class Background {
  constructor(x) {
    this.img = new Image();
    this.img.src = "../images/background.png";
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
    window.ctx.drawImage(this.img, this.x, this.y, this.width, playableHeight);
  }
}
