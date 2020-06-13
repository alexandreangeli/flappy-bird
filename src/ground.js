class Ground {
  constructor(x) {
    this.img = new Image();
    this.img.src = "../images/ground.png";
    this.height = groundHeight;
    this.width = groundWidth;
    this.x = x;
    this.y = window.canvas.height - this.height;
    this.xSpeed = window.pipeXSpeed;
  }

  move() {
    this.x += this.xSpeed;
  }

  draw() {
    window.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
