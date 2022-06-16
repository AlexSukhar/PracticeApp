function Carousel() {
  this.container = document.querySelector("#carousel");
  this.slides = this.container.querySelectorAll(".slide");
  this.indicatorsContainer = this.container.querySelector(
    "#indicators-container"
  );
  this.indicators = this.indicatorsContainer.querySelectorAll(".indicator");
  this.controlsContainer = this.controlsContainer.querySelector(
    "#controls-container"
  );
  this.pauseBtn = this.controlsContainer.querySelector("#pause-btn");
  this.prevBtn = this.controlsContainer.querySelector("#prev-btn");
  this.nextBtn = this.controlsContainer.querySelector("#next-btn");

  this.SLIDES_COUNT = this.slides.length;
  this.CODE_LEFT_ARROW = "ArrowLeft";
  this.CODE_RIGHT_ARROW = "ArrowRight";
  this.CODE_SPACE = "Space";
  this.FA_PAUSE = '<i class="far fa-pause-circle"></i>';
  this.FA_PLAY = '<i class="far fa-play-circle"></i>';

  this.currentSlide = 0;
  this.isPlaying = true;
  this.timerID = null;
  this.swipeStartX = null;
  this.swipeEndX = null;
  this.interval = 2000;
}

Carousel.prototype = {
  gotoNth(n) {
    console.log(n);
    this.slides[this.currentSlide].classList.toggle("active");
    this.indicators[this.currentSlide].classList.toggle("active");
    this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;
    this.slides[this.currentSlide].classList.toggle("active");
    this.indicators[this.currentSlide].classList.toggle("active");
  },

  gotoPrev() {
    this.gotoNth(this.currentSlide - 1);
  },

  gotoNext() {
    this.gotoNth(this.currentSlide + 1);
  },

  pause() {
    if (this.isPlaying) {
      clearInterval(this.timerID);
      this.pauseBtn.innerHTML = this.FA_PLAY;
      this.isPlaying = false;
    }
  },

  play() {
    this.timerID = setInterval(this.gotoNext, this.interval);
    this.pauseBtn.innerHTML = this.FA_PAUSE;
    this.isPlaying = true;
  },

  pausePlay() {
    this.isPlaying ? this.pause() : this.play();
  },

  prev() {
    this.pause();
    this.gotoPrev();
  },

  next() {
    this.pause();
    this.gotoNext();
  },

  indicate(e) {
    const target = e.target;

    if (target && target.classList.contains("indicator")) {
      this.pause();
      this.gotoNth(+target.dataset.slideTo);
    }
  },

  pressKey(e) {
    if (e.code === this.CODE_LEFT_ARROW) prev();
    if (e.code === this.CODE_RIGHT_ARROW) next();
    if (e.code === this.CODE_SPACE) pausePlay();
  },

  swipeStart(e) {
    this.swipeStartX = e.changedTouches[0].pageX;
  },

  swipeEnd(e) {
    this.swipeEndX = e.changedTouches[0].pageX;
    this.swipeStartX - this.swipeEndX > 100 && this.next();
    this.swipeStartX - this.swipeEndX < -100 && this.prev();
  },

  initListeners() {
    this.pauseBtn.addEventListener("click", this.pausePlay);
    this.prevBtn.addEventListener("click", this.prev);
    this.nextBtn.addEventListener("click", this.next);
    this.indicatorsContainer.addEventListener("click", this.indicate);
    this.container.addEventListener("touchstart", this.swipeStart);
    this.container.addEventListener("touchend", this.swipeEnd);
    document.addEventListener("keydown", this.pressKey);
  },

  init() {
    this.initListeners();
    this.timerID = setInterval(this.gotoNext, this.interval);
  },
};
