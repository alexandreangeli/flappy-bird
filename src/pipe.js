class Pipe {
  constructor(x, height, isAtTop) {
    this.isAtTop = isAtTop;
    this.img = new Image();
    this.img.onload = (i) => {
      this.y = this.isAtTop
        ? this.height - i.target.height
        : window.canvas.height - this.height;

      this.width = i.target.width;
      this.height = i.target.height;
    };

    this.img.src = this.isAtTop
      ? "../images/top-pipe.png"
      : "../images/bottom-pipe.png";

    this.color = "green";

    this.x0 = x;
    this.x = this.x0;

    this.width = 50;
    this.height = height;

    this.dx = -2.5;
  }

  draw() {
    this.x += this.dx;

    window.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
