class Background {
  constructor(x, onLoadFunction) {
    this.img = new Image();
    this.img.src = "../images/background.png";
    this.img.onload = (i) => {
      this.width = i.target.width;
      this.height = i.target.height;
      if (onLoadFunction) {
        onLoadFunction(i);
      }
    };
    this.x = x;
    this.y = 0;
    this.dx = -1;
  }

  move() {
    this.x += this.dx;
  }

  draw() {
    window.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.width,
      window.canvas.height
    );
  }
}
