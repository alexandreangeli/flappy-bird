var imgBird = new Image();
imgBird.src = "../images/bird.png";

class Bird {
  constructor() {
    this.radius = 25;

    this.x0 = window.canvas.width * 0.3;
    this.y0 = playableHeight / 2;
    this.xSpeed = 0;
    this.x = this.x0;
    this.y = this.y0;

    this.yMax = playableHeight - this.radius;
    this.yMin = this.radius;

    this.gravity = 0.5;
    this.gravitySpeed = 0;
    this.maxGravitySpeed = 15;

    this.jumpSpeed = -10;

    this.dead = false;
    this.yWhenDied = null;

    this.tired = false;
    this.flying = false;
  }

  move() {
    this.x += this.xSpeed;

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

  draw() {
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
      imgBird,
      -this.radius,
      -this.radius,
      this.radius * 2,
      this.radius * 2
    );
    window.ctx.restore();
  }

  jump() {
    if (!this.flying) {
      this.gravitySpeed = this.jumpSpeed;
    }
  }

  fly() {
    if (!this.flying && !this.tired) {
      let gravity = this.gravity;
      this.gravitySpeed = 0;
      this.gravity = 0;
      this.flying = true;
      setTimeout(() => {
        this.flying = false;
        this.tired = true;
        this.gravity = gravity;
        setTimeout(() => {
          this.tired = false;
        }, 1750);
      }, 5500);
    }
  }

  checkCollision() {
    if (!this.dead) {
      if (this.y + this.radius >= playableHeight) {
        this.xSpeed = window.pipeXSpeed;
        this.dead = true;
        this.yWhenDied = this.y;
      } else {
        for (let pipePair of pipeGenerator.pipePairs) {
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
              this.xSpeed = window.pipeXSpeed;
              this.dead = true;
              this.yWhenDied = this.y;
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
