class Pipe {
  constructor(x, y, width, height) {
    this.color = "green";

    this.x0 = x;
    this.y0 = y;
    this.x = this.x0;
    this.y = this.y0;

    this.width = width;
    this.height = height;

    this.dx = -2.5;

    this.yMax = canvas.height - this.radius;
    this.yMin = this.radius;

    this.gravity = 0.098;
    this.gravitySpeed = 0;
  }

  draw() {
    this.x += this.dx;

    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}
