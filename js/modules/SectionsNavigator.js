import debounce from "./debounce.js";

export default function handleNavigation() {
  const nav = document.querySelector(".entrance nav");
  const links = Array.from(nav.querySelectorAll("li a"));
  const sections = Array.from(document.querySelectorAll("body > section"));
  const faqSection = sections.find((sect) => sect.id === "faq");
  const questions = Array.from(faqSection.querySelectorAll("ul li"));
  const bar = nav.querySelector("svg .bar");
  const buttons = Array.from(document.querySelectorAll(".buttonContainer"));
  buttons.pop();
  bar.setAttribute("y", nav.clientHeight - 1);

  let sectionsScrollHeights = setHeights(sections);

  function setHeights(array) {
    return array.map((el) => {
      return [
        el.offsetTop - nav.clientHeight < 0
          ? 0
          : el.offsetTop - nav.clientHeight,
        el.offsetTop + el.clientHeight - 1 - nav.clientHeight,
      ];
    });
  }

  function checkScrollHeight() {
    sectionsScrollHeights = setHeights(sections);
    const yPos = Math.ceil(scrollY);

    const sectionIndex = sectionsScrollHeights.findIndex(
      (height) => yPos < height[1] && yPos >= height[0]
    );

    const activeSection = sections[sectionIndex];

    if (activeSection) {
      activateSection(activeSection);
    }

    if (yPos > sections[0].clientHeight / 3) {
      nav.classList.add("toggle-color");
    } else {
      nav.classList.remove("toggle-color");
    }
  }

  function scrollToSection(event) {
    const link = event.currentTarget;
    const yPos = Math.ceil(scrollY);
    const sectionIndex = sections.findIndex(
      (section) => section.id === link.id
    );

    bar.setAttribute(
      "style",
      `transform: translateX(${
        Math.floor(link.getBoundingClientRect().left) + 80
      }px)`
    );

    scrollTo(0, sectionsScrollHeights[sectionIndex][0]);
    if (yPos === sectionsScrollHeights[sectionIndex][0])
      activateSection(sections[sectionIndex]);
  }

  function updateFAQHeight() {
    setTimeout(() => {
      sectionsScrollHeights = setHeights(sections);
    }, 250);
  }

  function activateSection(section) {
    section.classList.add("active");

    links.forEach((link) => {
      link.classList.remove("active");
      if (link.id === section.id) {
        link.classList.add("active");
        bar.setAttribute(
          "style",
          `transform: translate3d(${
            link.getBoundingClientRect().left + 80
          }px, 0, 0)`
        );
      }
    });

    if (section === sections[0]) {
      bar.setAttribute(
        "style",
        "transform: translate3d(-80px, 0, 0); transition: transform 0.5s"
      );
    }
  }

  // Mobile stuff
  const sandwichContainer = document.querySelector(".svg-sandwich-container");
  const mobileMenu = document.querySelector(".entrance nav ul");

  sandwichContainer.addEventListener("click", (event) => {
    const container = event.currentTarget;
    container.classList.toggle("active");
    mobileMenu.classList.toggle("show-menu");
  });

  onresize = debounce(() => {
    sectionsScrollHeights = setHeights(sections);
  }, 25);

  document.addEventListener("scroll", debounce(checkScrollHeight, 50));
  links.forEach((link) =>
    link.addEventListener("click", (event) => {
      scrollToSection(event);
      sandwichContainer.classList.toggle("active");
      mobileMenu.classList.toggle("show-menu");
    })
  );
  questions.forEach((question) =>
    question.addEventListener("click", updateFAQHeight)
  );
  buttons.forEach((btn) =>
    btn.addEventListener("click", () => {
      const isToContactSection =
        btn.querySelector("button").innerText === "Entrar em contato";
      if (isToContactSection) {
        scrollTo(0, sectionsScrollHeights[sections.length - 1][0]);
      } else {
        scrollTo(0, sectionsScrollHeights[sections.length - 2][0]);
      }
    })
  );
}
