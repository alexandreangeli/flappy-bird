class Bird {
  constructor() {
    this.radius = 25;

    this.x0 = window.canvas.width * 0.3;
    this.y0 = playableHeight / 2;
    this.x = this.x0;
    this.y = this.y0;

    this.yMax = playableHeight - this.radius;
    this.yMin = this.radius;

    this.gravity = 0.8;
    this.gravitySpeed = 0;
    this.maxGravitySpeed = 15;

    this.jumpSpeed = -8;

    this.died_at = null;

    this.img = new Image();
    this.basicBirdSrc = "../images/bird.png";
    this.topBirdSrc = "../images/top-bird.png";

    this.img.src = this.basicBirdSrc;
  }

  move() {
    if (!this.died_at) {
      this.gravitySpeed += this.gravity;
      this.y += this.gravitySpeed;
      if (this.gravitySpeed > this.maxGravitySpeed) {
        this.gravitySpeed = this.maxGravitySpeed;
      }

      if (this.y <= this.yMin) {
        this.y = this.yMin;
        this.gravitySpeed = 0;
      }

      if (this.y > this.yMax) {
        this.y = this.yMax;
        this.gravitySpeed = 0;
      }
    }
  }

  draw() {
    if (!this.died_at) {
      var rotation = -30 + (this.gravitySpeed * 90) / this.maxGravitySpeed;
      if (rotation > 90) {
        rotation = 90;
      }
      if (rotation < -30) {
        rotation = -30;
      }
      window.ctx.save();
      window.ctx.translate(this.x, this.y);
      window.ctx.rotate((rotation * Math.PI) / 180);
      window.ctx.drawImage(
        this.img,
        -this.radius,
        -this.radius,
        this.radius * 2,
        this.radius * 2
      );
      window.ctx.restore();
    }
  }

  jump() {
    this.gravitySpeed = this.jumpSpeed;
  }

  checkCollision(pipePairs, ticks) {
    if (!this.died_at) {
      if (this.y + this.radius >= playableHeight) {
        this.died_at = ticks;
      } else {
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

  var xSpeed = distX - rect.w / 2;
  var ySpeed = distY - rect.h / 2;
  return xSpeed * xSpeed + ySpeed * ySpeed <= circle.r * circle.r
    ? { y: true, x: true }
    : { y: false, x: false };
}