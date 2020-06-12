const pipeXSpeed = -2.5;

class Pipe {
  constructor(x, height, isAtTop) {
    this.isAtTop = isAtTop;
    this.img = new Image();
    this.img.onload = (i) => {
      this.y = this.isAtTop
        ? this.height - i.target.height
        : playableHeight - this.height;

      this.height = i.target.height;
    };

    this.img.src = this.isAtTop
      ? "../images/top-pipe.png"
      : "../images/bottom-pipe.png";

    this.color = "green";

    this.x0 = x;
    this.x = this.x0;

    this.width = 150;
    this.height = height;

    this.xSpeed = pipeXSpeed;
  }

  draw() {
    this.x += this.xSpeed;

    window.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
