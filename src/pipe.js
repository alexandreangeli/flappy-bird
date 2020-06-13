class Pipe {
  constructor(x, width, heightInScreen, isAtTop) {
    this.isAtTop = isAtTop;
    this.img = new Image();
    this.img.onload = (i) => {
      this.y = this.isAtTop
        ? this.heightInScreen - i.target.height
        : playableHeight - this.heightInScreen;

      this.height = i.target.height;
    };

    this.img.src = this.isAtTop
      ? "../images/top-pipe.png"
      : "../images/bottom-pipe.png";

    this.color = "green";

    this.x0 = x;
    this.x = this.x0;

    this.width = width;
    this.heightInScreen = heightInScreen;
  }
}
