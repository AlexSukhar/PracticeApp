function Carousel() {
  this.container = document.querySelector("#carousel");
  this.slides = this.container.querySelectorAll(".slide");


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
  _initControls() {
    const controls = document.createElement('div');
    const PAUSE = '<span id="pause-btn" class="control"><i class="far fa-pause-circle"></i></span>'
    const PREV = '<span id="prev-btn" class="control"><i class="fas fa-angle-left"></i></span>'
    const NEXT = '<span id="next-btn" class="control"><i class="fas fa-angle-right"></i></span>'

    controls.setAttribute('class', 'controls');
    controls.innerHTML = PAUSE + PREV + NEXT;

    this.container.appendChild(controls);

    this.pauseBtn = this.container.querySelector("#pause-btn");
    this.prevBtn = this.container.querySelector("#prev-btn");
    this.nextBtn = this.container.querySelector("#next-btn");
  },

  _initIndicators() {
    const indicators = document.createElement('div');

    indicators.setAttribute('class', 'indicators');

    for (let i = 0, n = this.SLIDES_COUNT; i < n; i++) {
      const indicator = document.createElement('div');

      indicator.setAttribute('class', 'indicator');
      indicator.dataset.slideTo = `${i}`;
      i === 0 && indicator.classList.add('active');

      indicators.appendChild(indicator);
    }

    this.container.appendChild(indicators);

    this.indContainer = this.container.querySelector('.indicators');
    this.indItems = this.container.querySelectorAll('.indicator');

    //   <div id="indicators-container" class="indicators">
    //   <div class="indicator active" data-slide-to="0"></div>
    //   <div class="indicator" data-slide-to="1"></div>
    //   <div class="indicator" data-slide-to="2"></div>
    //   <div class="indicator" data-slide-to="3"></div>
    //   <div class="indicator" data-slide-to="4"></div>
    // </div>
  },

  _initListeners() {
    this.pauseBtn.addEventListener("click", this.pausePlay.bind(this));
    this.prevBtn.addEventListener("click", this.prev.bind(this));
    this.nextBtn.addEventListener("click", this.next.bind(this));
    this.indContainer.addEventListener("click", this.indicate.bind(this));
    this.container.addEventListener("touchstart", this.swipeStart.bind(this));
    this.container.addEventListener("touchend", this.swipeEnd.bind(this));
    document.addEventListener("keydown", this.pressKey.bind(this));
  },

  gotoNth(n) {
    this.slides[this.currentSlide].classList.toggle("active");
    this.indItems[this.currentSlide].classList.toggle("active");
    this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;
    this.slides[this.currentSlide].classList.toggle("active");
    this.indItems[this.currentSlide].classList.toggle("active");
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
    this.timerID = setInterval(() => this.gotoNext(), this.interval);
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
    if (e.code === this.CODE_LEFT_ARROW) this.prev();
    if (e.code === this.CODE_RIGHT_ARROW) this.next();
    if (e.code === this.CODE_SPACE) this.pausePlay();
  },

  swipeStart(e) {
    this.swipeStartX = e.changedTouches[0].pageX;
  },

  swipeEnd(e) {
    this.swipeEndX = e.changedTouches[0].pageX;
    this.swipeStartX - this.swipeEndX > 100 && this.next();
    this.swipeStartX - this.swipeEndX < -100 && this.prev();
  },

  init() {
    this._initControls();
    this._initIndicators();
    this._initListeners();
    this.timerID = setInterval(() => this.gotoNext(), this.interval);
  },
};
