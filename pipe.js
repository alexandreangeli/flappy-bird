class Pipe {
  constructor(x, y, height) {
    this.color = "green";

    this.x0 = x;
    this.y0 = y;
    this.x = this.x0;
    this.y = this.y0;

    this.width = 50;
    this.height = height;

    this.dx = -2.5;

    this.yMax = window.canvas.height - this.radius;
    this.yMin = this.radius;

    this.gravity = 0.098;
    this.gravitySpeed = 0;
  }

  draw() {
    this.x += this.dx;

    window.ctx.beginPath();
    window.ctx.rect(this.x, this.y, this.width, this.height);
    window.ctx.fillStyle = this.color;
    window.ctx.fill();
    window.ctx.closePath();
  }
}
