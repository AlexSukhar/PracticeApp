class Carousel {
  constructor(params) {
    const settings = this._initConfig(params);

    this.container = document.querySelector(settings.containerID);
    this.slides = this.container.querySelectorAll(settings.slideID);
    this.isPlaying = settings.isPlaying;
    this.interval = settings.interval;
  }

  _initConfig(objectParams) {

  //   const defaultSettings = {
  //     interval: 1000,
  //     containerID: '#carousel',
  //     slideID: '.item',
  //     isPlaying: true,
  //   };
  //   if (typeof objectParams !== undefined) {
  //     defaultSettings.interval = objectParams.interval || defaultSettings.interval;
  //     defaultSettings.containerID = objectParams.containerID || defaultSettings.containerID;
  //     defaultSettings.slideID = objectParams.slideID || defaultSettings.slideID;
  //     defaultSettings.isPlaying = objectParams.isPlaying || defaultSettings.isPlaying;
  //   }
  //   return defaultSettings;
  }

  _initProps() {
    this.SLIDES_COUNT = this.slides.length;
    this.CODE_LEFT_ARROW = "ArrowLeft";
    this.CODE_RIGHT_ARROW = "ArrowRight";
    this.CODE_SPACE = "Space";
    this.FA_PAUSE = '<i class="far fa-pause-circle"></i>';
    this.FA_PLAY = '<i class="far fa-play-circle"></i>';

    this.currentSlide = 0;

  }
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
  }

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
  }

  _initListeners() {
    this.pauseBtn.addEventListener("click", this.pausePlay.bind(this));
    this.prevBtn.addEventListener("click", this.prev.bind(this));
    this.nextBtn.addEventListener("click", this.next.bind(this));
    this.indContainer.addEventListener("click", this._indicate.bind(this));
    document.addEventListener("keydown", this._pressKey.bind(this));
  }

  _gotoNth(n) {
    this.slides[this.currentSlide].classList.toggle("active");
    this.indItems[this.currentSlide].classList.toggle("active");
    this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;
    this.slides[this.currentSlide].classList.toggle("active");
    this.indItems[this.currentSlide].classList.toggle("active");
  }

  _gotoPrev() {
    this._gotoNth(this.currentSlide - 1);
  }

  _gotoNext() {
    this._gotoNth(this.currentSlide + 1);
  }

  _pause() {
    if (this.isPlaying) {
      clearInterval(this.timerID);
      this.pauseBtn.innerHTML = this.FA_PLAY;
      this.isPlaying = false;
    }
  }

  _play() {
    this.timerID = setInterval(() => this._gotoNext(), this.interval);
    this.pauseBtn.innerHTML = this.FA_PAUSE;
    this.isPlaying = true;
  }

  _indicate(e) {
    const target = e.target;

    if (target && target.classList.contains("indicator")) {
      this._pause();
      this._gotoNth(+target.dataset.slideTo);
    }
  }

  _pressKey(e) {
    if (e.code === this.CODE_LEFT_ARROW) this.prev();
    if (e.code === this.CODE_RIGHT_ARROW) this.next();
    if (e.code === this.CODE_SPACE) this.pausePlay();
  }
  pausePlay() {
    this.isPlaying ? this._pause() : this._play();
  }

  prev() {
    this._pause();
    this._gotoPrev();
  }

  next() {
    this._pause();
    this._gotoNext();
  }


  init() {
    this._initProps();
    this._initControls();
    this._initIndicators();
    this._initListeners();
    this.timerID = setInterval(() => this._gotoNext(), this.interval);
  }
}

