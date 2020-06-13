var groundWidth = 0;
var groundHeight = 0;
var playableHeight = 0;
let imgGround = new Image();
imgGround.src = "../images/ground.png";
imgGround.onload = (i) => {
  groundWidth = i.target.width;
  groundHeight = i.target.height;
  playableHeight = window.canvas.height - groundHeight;
};

class Ground {
  constructor(x) {
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
    window.ctx.drawImage(imgGround, this.x, this.y, this.width, this.height);
  }
}
