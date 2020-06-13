var backgroundWidth = 0;
var pipeImgHeight = 0;

var imgTopPipe = new Image();
imgTopPipe.src = "../images/top-pipe.png";

var imgBottomPipe = new Image();
imgBottomPipe.src = "../images/bottom-pipe.png";
imgBottomPipe.onload = (i) => {
  pipeImgHeight = i.target.height;
};

class Pipe {
  constructor(x, width, heightInScreen, isAtTop) {
    this.isAtTop = isAtTop;
    this.img = new Image();

    this.y = this.isAtTop
      ? heightInScreen - pipeImgHeight
      : playableHeight - heightInScreen;

    this.height = pipeImgHeight;

    this.x0 = x;
    this.x = this.x0;

    this.width = width;
  }
}
