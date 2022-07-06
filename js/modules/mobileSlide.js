export default function mobileSlide() {
  const slideContainer = document.querySelector(".specialties ul");
  const slideItemsPositions = Array.from(
    slideContainer.querySelectorAll("li")
  ).map((item) => item.offsetLeft - (window.innerWidth - item.offsetWidth) / 2);
  const lastIndex = slideItemsPositions.length - 1;
  let index = { current: 0, next: 1, prev: null };
  const position = { start: 0, current: 0, last: 0, y: scrollY };

  function increaseIndex() {
    index = {
      current: slideItemsPositions[index.next] ? index.next : lastIndex,
      next:
        index.next === lastIndex || index.current === lastIndex
          ? null
          : index.next + 1,
      prev: index.current === lastIndex ? lastIndex - 1 : index.current,
    };
  }

  function decreaseIndex() {
    index = {
      current: slideItemsPositions[index.prev] ? index.prev : 0,
      next: index.current === 0 ? index.next : index.current,
      prev: index.prev === 0 || index.current === 0 ? null : index.prev - 1,
    };
  }

  function changeSlide() {
    if (position.current < -80) {
      increaseIndex();
    }
    if (position.current > 80) {
      decreaseIndex();
    }

    const distance = slideItemsPositions[index.current];
    position.last = -distance;
    slideContainer.style.transform = `translate3d(${-distance}px, 0, 0)`;
  }

  function start(event) {
    const x = event.changedTouches[0].clientX;
    position.start = x;
    position.y = scrollY;
    slideContainer.addEventListener("touchmove", move);
  }

  function move(event) {
    if (scrollY !== position.y) {
      slideContainer.removeEventListener("touchmove", move);
      changeSlide();
    }

    const newX = event.changedTouches[0].clientX;
    position.current = newX - position.start;

    slideContainer.style.transform = `translate3d(${
      position.last + position.current
    }px, 0, 0)`;
  }

  function end() {
    position.last = position.current + position.last;
    changeSlide();
    slideContainer.removeEventListener("touchmove", move);
  }

  slideContainer.addEventListener("touchstart", start);
  slideContainer.addEventListener("touchend", end);
}
