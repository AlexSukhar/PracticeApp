const slide = document.querySelectorAll('.slide');
const pauseButton = document.querySelector('#pause');
const prevButton = document.querySelector('#prev');
const nextButton = document.querySelector('#next');


let currentSlide = 0;
let isPlaying = true;
let timerID = null;
let interval = 1000

function gotoNth(n) {
  slide[currentSlide].className = 'slide';
  currentSlide = (n + 5) % 5;
  slide[currentSlide].className = 'slide active';
}

function prevSlide() {
  gotoNth(currentSlide - 1)
}

function nextSlide() {
  gotoNth(currentSlide + 1)
}

function nextAndPause() {
  nextSlide();
  onlyPause();
}
function prevAndPause() {
  prevSlide();
  onlyPause();
}

function onlyPause() {
  if (isPlaying) {
    clearInterval(timerID);
    pauseButton.innerHTML = 'Play';
    isPlaying = false;
  }
}

function onlyPlay() {
  timerID = setInterval(nextSlide, interval);
  pauseButton.innerHTML = 'Pause';
  isPlaying = true;
}

function pauseSlideshow() {
  if (isPlaying) {
   onlyPause();
  } else {
    onlyPlay();
  }
}

pauseButton.addEventListener('click', pauseSlideshow);
prevButton.addEventListener('click', prevAndPause);
nextButton.addEventListener('click', nextAndPause);

timerID = setInterval(gotoNext, interval);