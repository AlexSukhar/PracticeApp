const slides = document.querySelectorAll('.slide');
const pauseBtn = document.querySelector('#pause-btn');
const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');

const slidesCount = slides.length;

let currentSlide = 0;
let isPlaying = true;
let timerID = null;
let interval = 2000;

function gotoNth(n) {
  slides[currentSlide].classList.toggle('active');
  currentSlide = (n + slidesCount) % slidesCount;
  slides[currentSlide].classList.toggle('active');
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
  gotoPrev();
  pause();
}
function next() {
  gotoNext();
  pause();
}


pauseBtn.addEventListener('click', pausePlay);
prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);

timerID = setInterval(gotoNext, interval);