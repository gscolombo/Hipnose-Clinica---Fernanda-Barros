import debounce from "./debounce.js";

export default function responsive() {
  const nav = document.querySelector(".entrance nav");
  const sandwichContainer = document.querySelector(".svg-sandwich-container");
  const entranceSubResume = document.querySelector(".entrance-sub-resume");
  const presentation = document.querySelector(".hipnoterapy-presentation");
  presentation.style.marginTop =
    Math.ceil(entranceSubResume.clientHeight - 0.15 * innerHeight) + "px";

  const mobileMenu = document.querySelector(".entrance nav ul");
  mobileMenu.style.top = nav.clientHeight + 1 + "px";

  if (window.innerWidth > 1024) {
    sandwichContainer.style.display = "none";
  } else {
    sandwichContainer.style.display = "flex";
  }

  onresize = debounce(() => {
    presentation.style.marginTop =
      Math.ceil(entranceSubResume.clientHeight - 0.15 * innerHeight) + "px";
    mobileMenu.style.top = nav.clientHeight + 1 + "px";

    if (window.innerWidth > 1024) {
      sandwichContainer.style.display = "none";
    } else {
      sandwichContainer.style.display = "flex";
    }
  }, 50);
}
