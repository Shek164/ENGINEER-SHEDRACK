
/* ======================================
   SHEDRACK WAEMA PORTFOLIO
   Premium JavaScript
====================================== */

// ===== Typing Animation =====

const roles = [
  "Electrical Engineer",
  "Software Developer",
  "Technology Enthusiast",
  "Problem Solver"
];

const roleElement = document.querySelector(".hero h2");

let roleIndex = 0;
let letterIndex = 0;
let deleting = false;

function typingAnimation() {
  const currentRole = roles[roleIndex];

  if (!deleting) {
    roleElement.textContent = currentRole.substring(0, letterIndex++);
  } else {
    roleElement.textContent = currentRole.substring(0, letterIndex--);
  }

  let speed = deleting ? 60 : 120;

  if (!deleting && letterIndex > currentRole.length) {
    deleting = true;
    speed = 1500;
  }

  if (deleting && letterIndex < 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }

  setTimeout(typingAnimation, speed);
}

typingAnimation();


// ===== Reveal Sections =====

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.2
});

document.querySelectorAll("section").forEach(section => {
  observer.observe(section);
});


// ===== Back to Top Button =====

const topButton = document.createElement("button");

topButton.innerHTML = "↑";
topButton.className = "top-btn";

document.body.appendChild(topButton);

window.addEventListener("scroll", () => {

  if (window.scrollY > 500) {

    topButton.classList.add("show");

  } else {

    topButton.classList.remove("show");

  }

});

topButton.onclick = () => {

  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });

};


// ===== Active Navigation =====

const navLinks = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach(section => {

    const sectionTop = section.offsetTop - 120;

    if (window.scrollY >= sectionTop) {

      current = section.getAttribute("id");

    }

  });

  navLinks.forEach(link => {

    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {

      link.classList.add("active");

    }

  });

});


// ===== Footer Year =====

const footer = document.querySelector("footer p");

if (footer) {

  footer.innerHTML =
    `© ${new Date().getFullYear()} Shedrack Waema | Electrical Engineer & Software Developer`;

}

console.log("Portfolio Loaded Successfully");
