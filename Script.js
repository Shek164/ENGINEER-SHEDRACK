/* ======================================
   SHEDRACK WAEMA PORTFOLIO
   script.js
====================================== */

// =======================
// Typing Animation
// =======================

const titles = [
    "Electrical Engineer",
    "Software Developer",
    "Technology Enthusiast",
    "Problem Solver"
];

const heading = document.querySelector(".hero h2");

let titleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeWriter() {

    const current = titles[titleIndex];

    if (!deleting) {
        heading.textContent = current.substring(0, charIndex++);
    } else {
        heading.textContent = current.substring(0, charIndex--);
    }

    let speed = deleting ? 60 : 120;

    if (!deleting && charIndex > current.length) {
        deleting = true;
        speed = 1500;
    }

    if (deleting && charIndex < 0) {
        deleting = false;
        titleIndex++;

        if (titleIndex >= titles.length) {
            titleIndex = 0;
        }
    }

    setTimeout(typeWriter, speed);

}

typeWriter();


// =======================
// Scroll Reveal
// =======================

const sections = document.querySelectorAll("section");

const reveal = () => {

    sections.forEach(section => {

        const top = section.getBoundingClientRect().top;

        if (top < window.innerHeight - 120) {

            section.style.opacity = "1";
            section.style.transform = "translateY(0)";

        }

    });

};

sections.forEach(section => {

    section.style.opacity = "0";
    section.style.transform = "translateY(60px)";
    section.style.transition = ".8s";

});

window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);


// =======================
// Scroll Progress Bar
// =======================

const progress = document.createElement("div");

progress.style.position = "fixed";
progress.style.top = "0";
progress.style.left = "0";
progress.style.height = "4px";
progress.style.background = "#38bdf8";
progress.style.width = "0";
progress.style.zIndex = "9999";

document.body.appendChild(progress);

window.addEventListener("scroll", () => {

    const total =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const current =
        document.documentElement.scrollTop;

    progress.style.width =
        (current / total) * 100 + "%";

});


// =======================
// Back To Top Button
// =======================

const topBtn = document.createElement("button");

topBtn.innerHTML = "↑";

topBtn.style.position = "fixed";
topBtn.style.right = "25px";
topBtn.style.bottom = "25px";
topBtn.style.width = "55px";
topBtn.style.height = "55px";
topBtn.style.borderRadius = "50%";
topBtn.style.border = "none";
topBtn.style.background = "#38bdf8";
topBtn.style.color = "#0f172a";
topBtn.style.fontSize = "22px";
topBtn.style.cursor = "pointer";
topBtn.style.display = "none";
topBtn.style.boxShadow = "0 10px 25px rgba(0,0,0,.4)";

document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";

    }

});

topBtn.onclick = () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

};


// =======================
// Active Navigation
// =======================

const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        if (window.scrollY >= section.offsetTop - 150) {

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


// =======================
// Footer Year
// =======================

const footer = document.querySelector("footer p");

footer.innerHTML =
`© ${new Date().getFullYear()} Shedrack Waema | Electrical Engineer & Software Developer`;


// =======================
// Console Welcome Message
// =======================

console.log(
"%cWelcome to Shedrack Waema's Portfolio",
"color:#38bdf8;font-size:18px;font-weight:bold;"
);
