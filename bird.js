class Bird {
  constructor() {
    this.color = "orange";
    this.radius = 15;

    this.x0 = 20;
    this.y0 = canvas.height / 2;
    this.x = this.x0;
    this.y = this.y0;

    this.yMax = canvas.height - this.radius;
    this.yMin = this.radius;

    this.gravity = 0.25;
    this.gravitySpeed = 0;

    this.jumpSpeed = -5;
  }

  draw() {
    this.gravitySpeed += this.gravity;
    this.y += this.gravitySpeed;

    if (this.y <= this.yMin) {
      this.y = this.yMin;
      this.gravitySpeed = 0;
    }

    if (this.y > this.yMax) {
      this.y = this.yMax;
      this.gravitySpeed = 0;
    }

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  jump() {
    this.gravitySpeed = this.jumpSpeed;
  }
}
