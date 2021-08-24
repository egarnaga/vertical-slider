const sliderContainer = document.querySelector('.slider__container');
const slideRight = document.querySelector('.slider__slide-right');
const slideLeft = document.querySelector('.slider__slide-left');
const upButton = document.querySelector('.slider__button-up');
const downButton = document.querySelector('.slider__button-down');
const slidesLength = slideRight.querySelectorAll('div').length;

const leftItems =  document.getElementById('slide-left');
const rightItems =  document.getElementById('slide-right');

const sliderHeight = sliderContainer.clientHeight;
let isEnabled = true;
const slidesRight = document.getElementsByClassName('slider__item-right');
const firstRight = slidesRight[0];
const lastRight = slidesRight[slidesLength - 1];
const cloneFirstRight = firstRight.cloneNode(true);
const cloneLastRight = lastRight.cloneNode(true);

document.getElementById('slide-right').appendChild(cloneFirstRight);
document.getElementById('slide-right').insertBefore(cloneLastRight, firstRight);

const slidesLeft = document.getElementsByClassName('slider__item-left');
const firstLeft = slidesLeft[0];
const lastLeft = slidesLeft[slidesLength - 1];

document.getElementById('slide-left').appendChild(firstLeft.cloneNode(true));
document.getElementById('slide-left').insertBefore(lastLeft.cloneNode(true), firstLeft);

let activeSlideIndex = 0;

slideLeft.style.top = `-${(slidesLength) * 100}vh`;
slideRight.style.top = `-${(slidesLength - (slidesLength - 1)) * 100}vh`;

upButton.addEventListener('click', () => changeSlide ('up'));
downButton.addEventListener('click', () => changeSlide ('down'));

sliderContainer.addEventListener('mousewheel', onWheel);

function onWheel(e) {
  e = e || window.event;
  if (e.deltaY > 0) {
    changeSlide ('up');
  } else {
    changeSlide ('down');
  }
}

leftItems.classList.add('shift');
rightItems.classList.add('shift');

rightItems.addEventListener('transitionend', checkIndex);
leftItems.addEventListener('transitionend', checkIndex);

const changeSlide = (direction) => {
  leftItems.classList.add('shift');
  rightItems.classList.add('shift');

  if (isEnabled) {
    if (direction === 'up') {
      activeSlideIndex++;
  } else if (direction === 'down') {
      activeSlideIndex--;
      if (activeSlideIndex < 0) {
        slideRight.style.transform = `translateY(${sliderHeight}px)`;
      }
    }
  }

  slideRight.style.transform = `translateY(-${activeSlideIndex * sliderHeight}px)`;
  slideLeft.style.transform = `translateY(${activeSlideIndex * sliderHeight}px)`;
  isEnabled = false;
}

function checkIndex() {
  leftItems.classList.remove('shift');
  rightItems.classList.remove('shift');

  if (activeSlideIndex == -1) {
    activeSlideIndex = slidesLength - 1;
    slideRight.style.transform = `translateY(-${activeSlideIndex * sliderHeight}px)`;
    slideLeft.style.transform = `translateY(${activeSlideIndex * sliderHeight}px)`;
  }

  if (activeSlideIndex == slidesLength) {
    activeSlideIndex = 0;
    slideRight.style.transform = `translateY(-${activeSlideIndex * sliderHeight}px)`;
    slideLeft.style.transform = `translateY(${activeSlideIndex * sliderHeight}px)`;
  }

  isEnabled = true;
}