class Bird {
  constructor() {
    this.color = "orange";
    this.radius = 15;

    this.x0 = 20;
    this.y0 = window.canvas.height / 2;
    this.x = this.x0;
    this.y = this.y0;

    this.yMax = window.canvas.height - this.radius;
    this.yMin = this.radius;

    this.gravity = 0.25;
    this.gravitySpeed = 0;

    this.jumpSpeed = -5;

    this.died_at = null;
  }

  draw() {
    if (!this.died_at) {
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

      window.ctx.beginPath();
      window.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      window.ctx.fillStyle = this.color;
      window.ctx.fill();
      window.ctx.closePath();
    }
  }

  jump() {
    this.gravitySpeed = this.jumpSpeed;
  }

  checkCollision(pipePairs, ticks) {
    if (!this.died_at) {
      for (let pipePair of pipePairs) {
        for (let pipe of pipePair.pipes) {
          if (
            collisionDetection(
              {
                x: this.x,
                y: this.y,
                r: this.radius,
              },
              {
                x: pipe.x,
                y: pipe.y,
                h: pipe.height,
                w: pipe.width,
              }
            )
          ) {
            this.died_at = ticks;
          }
        }
      }
    }
  }
}

function collisionDetection(circle, rect) {
  var distX = Math.abs(circle.x - rect.x - rect.w / 2);
  var distY = Math.abs(circle.y - rect.y - rect.h / 2);

  if (distX > rect.w / 2 + circle.r) {
    return false;
  }
  if (distY > rect.h / 2 + circle.r) {
    return false;
  }

  if (distX <= rect.w / 2) {
    return { y: true, x: false };
  }
  if (distY <= rect.h / 2) {
    return { y: false, x: true };
  }

  var dx = distX - rect.w / 2;
  var dy = distY - rect.h / 2;
  return dx * dx + dy * dy <= circle.r * circle.r
    ? { y: true, x: true }
    : { y: false, x: false };
}
