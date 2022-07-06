export default function setSlide(className) {
  const slide = document.querySelector(className);
  const [prev, next] = Array.from(slide.querySelectorAll("button"));
  const figures = Array.from(slide.querySelectorAll("figure"));
  let index = { current: 0, prev: figures.length - 1, next: 1 };

  function updateIndex(direction) {
    if (direction === "previous") {
      index = {
        current: index.prev,
        prev: index.prev - 1 >= 0 ? index.prev - 1 : figures.length - 1,
        next: figures[index.prev + 1] ? index.prev + 1 : 0,
      };
    } else if (direction === "next") {
      index = {
        current: index.next,
        prev: index.next === 0 ? figures.length - 1 : index.current,
        next: index.next === figures.length - 1 ? 0 : index.next + 1,
      };
    }
  }

  function slideLeft(e) {
    const currentFigure = figures[index.current];
    const previousFigure = figures[index.prev];

    currentFigure.style.animation = "FadeInFromRight 0.25s reverse forwards";
    previousFigure.style.animation = "FadeInFromLeft 0.25s forwards";

    setTimeout(() => {
      currentFigure.classList.remove("active");
      previousFigure.classList.add("active");
      updateIndex("previous");
      setTimeout(() => {
        currentFigure.style.animation = "";
        previousFigure.style.animation = "";
      }, 250);
    }, 250);
  }

  function slideRight(e) {
    const currentFigure = figures[index.current];
    const nextFigure = figures[index.next];

    currentFigure.style.animation = "FadeInFromLeft 0.25s reverse forwards";
    nextFigure.style.animation = "FadeInFromRight 0.25s forwards";

    setTimeout(() => {
      currentFigure.classList.remove("active");
      nextFigure.classList.add("active");
      updateIndex("next");
      setTimeout(() => {
        currentFigure.style.animation = "";
        nextFigure.style.animation = "";
      }, 250);
    }, 250);
  }

  prev.addEventListener("click", slideLeft);
  next.addEventListener("click", slideRight);
}
