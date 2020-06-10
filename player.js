class Player {
  constructor() {
    this.bird = new Bird();

    document.addEventListener(
      "click",
      (e) => this.onClickHandler(e, this),
      false
    );
    document.addEventListener(
      "touchend",
      (e) => this.onClickHandler(e, this),
      false
    );
  }
  onClickHandler(e, bird) {
    e.preventDefault();
    this.bird.jump();
  }
}
