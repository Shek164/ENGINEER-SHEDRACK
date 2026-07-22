
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
/* Animated Counters */

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){

const counter = entry.target;

const target = +counter.dataset.target;

let count = 0;

const update = () => {

count += target / 100;

if(count < target){

counter.innerText = Math.floor(count);

requestAnimationFrame(update);

}else{

counter.innerText = target;

}

};

update();

counterObserver.unobserve(counter);

}

});

});

counters.forEach(counter=>{

counterObserver.observe(counter);

});

/* Contact Form */

const form=document.querySelector(".contact-form");

if(form){

form.addEventListener("submit",(e)=>{

e.preventDefault();

alert("Thank you for your message!");

});
/* ===== Loader ===== */

window.addEventListener("load",()=>{

setTimeout(()=>{

document.getElementById("loader").style.display="none";

},1200);

});

/* ===== Mobile Menu ===== */

const menu=document.querySelector(".menu-btn");

const nav=document.getElementById("navbar");

if(menu){

menu.onclick=()=>{

nav.classList.toggle("active");

};

}

/* ===== Close Menu After Clicking ===== */

document.querySelectorAll("#navbar a").forEach(link=>{

link.onclick=()=>{

nav.classList.remove("active");

};

});
}
// --- ELECTRICAL CABLE CALCULATOR ALGORITHM ---
document.getElementById('calculate-btn').addEventListener('click', function() {
    // 1. Gather User Data Input
    const kw = parseFloat(document.getElementById('load-power').value);
    const length = parseFloat(document.getElementById('route-length').value);
    const phase = document.getElementById('phase-type').value;
    
    if (isNaN(kw) || isNaN(length) || kw <= 0 || length <= 0) {
        alert("Please enter valid positive numbers for load power and routing distance.");
        return;
    }

    // 2. Technical Constants Configuration
    let voltage = phase === 'single' ? 240 : 415;
    let powerFactor = 0.85; // Standard industrial inductive load factor
    let designCurrent = 0;

    if (phase === 'single') {
        designCurrent = (kw * 1000) / (voltage * powerFactor);
    } else {
        designCurrent = (kw * 1000) / (Math.sqrt(3) * voltage * powerFactor);
    }

    // 3. Copper Cross-Section Matrix Lookup Array [mm², Max Allowable Amps]
    const standardCableMatrix = [
        [1.5, 16], [2.5, 22], [4.0, 30], [6.0, 38], 
        [10.0, 52], [16.0, 69], [25.0, 91], [35.0, 111], 
        [50.0, 133], [70.0, 169], [95.0, 205], [120.0, 237]
    ];

    // Find the ideal safe cross-sectional area based on design current
    let recommendedCable = standardCableMatrix[standardCableMatrix.length - 1][0]; // Fallback to maximum size
    for (let i = 0; i < standardCableMatrix.length; i++) {
        if (standardCableMatrix[i][1] >= designCurrent) {
            recommendedCable = standardCableMatrix[i][0];
            break;
        }
    }

    // 4. Evaluate Theoretical Voltage Drop Constraints (mv/A/m approach)
    let mvAm = 4.4; // Approximated factor for standard copper conductor impedance
    let voltageDrop = (designCurrent * length * mvAm) / 1000;
    let percentageDrop = (voltageDrop / voltage) * 100;

    // 5. Present Outputs Dynamically to Interface Viewport
    document.getElementById('out-current').textContent = designCurrent.toFixed(2);
    document.getElementById('out-size').textContent = recommendedCable.toFixed(1);
    document.getElementById('out-drop').textContent = percentageDrop.toFixed(2);
    
    // Reveal results display element
    document.getElementById('calc-results').classList.remove('hidden');
});
