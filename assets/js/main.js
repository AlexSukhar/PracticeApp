const slide = document.querySelectorAll('.slide');

let currentSlide = 0;

function func() {
  slide[currentSlide].className = 'slide';
  currentSlide = (currentSlide + 1) % 5
  slide[currentSlide].className = 'slide active';
}


setInterval(func,2000)