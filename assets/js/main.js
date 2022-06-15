const slides = document.querySelectorAll('.slide');
const indicatorsContainer = document.querySelector('#indicators-control');
const indicators = document.querySelectorAll('.indicator');
const pauseBtn = document.querySelector('#pause-btn');
const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');

const slidesCount = slides.length;

let currentSlide = 0;
let isPlaying = true;
let timerID = null;
let interval = 2000;

function gotoNth(n) {
  console.log(n);
  slides[currentSlide].classList.toggle('active');
  indicators[currentSlide].classList.toggle('active');
  currentSlide = (n + slidesCount) % slidesCount;
  slides[currentSlide].classList.toggle('active');
  indicators[currentSlide].classList.toggle('active');
}

const gotoPrev = () => gotoNth(currentSlide - 1);

const gotoNext = () => gotoNth(currentSlide + 1);

function pause() {
  if (isPlaying) {
    clearInterval(timerID);
    pauseBtn.innerHTML = 'Play';
    isPlaying = false;
  }
}

function play() {
  timerID = setInterval(gotoNext, interval);
  pauseBtn.innerHTML = 'Pause';
  isPlaying = true;
}

const pausePlay = () => isPlaying ? pause() : play();

function prev() {
  pause();
  gotoPrev();
}
function next() {
  pause();
  gotoNext();
}

function indicate(e) {
  const target = e.target;

  if (target && target.classList.contains('indicator')) {
  pause();
  gotoNth(+target.dataset.slideTo);
  }
}

pauseBtn.addEventListener('click', pausePlay);
prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);
indicatorsContainer.addEventListener('click',indicate);

timerID = setInterval(gotoNext, interval);