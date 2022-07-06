import setSlide from "./modules/slides.js";
import handleNavigation from "./modules/SectionsNavigator.js";
import send from "./modules/sendMail.js";
import responsive from "./modules/responsive.js";
import mobileSlide from "./modules/mobileSlide.js";

// Responsiveness
responsive();

// Testimonials slide
setSlide(".testimonial-slide");
setSlide(".portrait-slide");

// Sections indicator
handleNavigation();

// FAQ listing
const faqList = Array.from(document.querySelectorAll(".faq ul li"));

function handleFAQ(event) {
  const btn = event.currentTarget;
  const li = btn.parentElement;
  const content = li.querySelector(".content");
  const h2Height = content.querySelector("h2").clientHeight;
  const pHeight = content.querySelector("p").clientHeight;

  li.classList.toggle("active");
  if (li.classList.contains("active")) {
    content.style.height = h2Height + pHeight + 24 + "px";
  } else {
    content.style.height = h2Height + "px";
  }
}

faqList.forEach((li) => {
  const content = li.querySelector(".content");
  const initialHeight = content.querySelector("h2").clientHeight;
  content.style.height = initialHeight + "px";

  li.querySelector("button").addEventListener("click", handleFAQ);
});

// E-mail sending
send();

// Mobile slide
mobileSlide();
