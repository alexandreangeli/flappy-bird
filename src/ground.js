class Ground {
  constructor(x, onLoadFunction) {
    this.img = new Image();
    this.img.src = "../images/ground.png";
    this.img.onload = (i) => {
      this.width = i.target.width;
      this.y = window.canvas.height - this.height;
      if (onLoadFunction) {
        onLoadFunction(i);
      }
    };
    this.x = x;
    this.xSpeed = window.pipeXSpeed;
    this.height = 60;
    playableHeight = window.canvas.height - this.height;
  }

  move() {
    this.x += this.xSpeed;
  }

  draw() {
    window.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
