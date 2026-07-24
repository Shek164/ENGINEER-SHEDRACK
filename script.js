
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
/**
 * =========================================================================
 * ⚡ PRO-LEVEL INDUSTRIAL ELECTRICAL CALCULATOR ENGINE
 * Architecture: Optimized Multi-Dimensional Matrix Array Search
 * Author: Shedrack Waema (@Shek164)
 * License: Open Source (MIT / Apache 2.0)
 * =========================================================================
 */

document.getElementById('calculate-btn').addEventListener('click', function() {
    
    // 1. DOM Input Elements Scrape & Sanitization
    const kwInput = document.getElementById('load-power');
    const lengthInput = document.getElementById('route-length');
    const phaseInput = document.getElementById('phase-type');
    
    const kw = parseFloat(kwInput.value);
    const length = parseFloat(lengthInput.value);
    const phase = phaseInput.value;
    
    // Fallback Verification: Ensure strictly positive inputs
    if (isNaN(kw) || isNaN(length) || kw <= 0 || length <= 0) {
        alert("🚨 Engineering Logic Constraint Error: Please provide valid positive numeric values for both Load Power and Route Length parameters.");
        return;
    }

    // 2. Constants & Variables Declaration
    let voltage = (phase === 'single') ? 240 : 415;
    let powerFactor = 0.85; // Standard industrial inductive load factor assumption
    let designCurrent = 0;

    // 3. Design Current (Ib) Computation Logic
    if (phase === 'single') {
        // Single Phase Equation: P / (V * PF)
        designCurrent = (kw * 1000) / (voltage * powerFactor);
    } else {
        // Three Phase Equation: P / (sqrt(3) * V_line * PF)
        designCurrent = (kw * 1000) / (Math.sqrt(3) * voltage * powerFactor);
    }

    // 4. Standard Copper Cable Cross-Section Reference Matrix (BS 7671 Regulations)
    // Structure: [Conductor Area in mm², Max Allowable Continuous Amperage Capacity]
    const standardCableMatrix = [
        [1.5, 16],   // Index 0
        [2.5, 22],   // Index 1
        [4.0, 30],   // Index 2
        [6.0, 38],   // Index 3
        [10.0, 52],  // Index 4
        [16.0, 69],  // Index 5
        [25.0, 91],  // Index 6
        [35.0, 111], // Index 7
        [50.0, 133], // Index 8
        [70.0, 169], // Index 9
        [95.0, 205], // Index 10
        [120.0, 237] // Index 11
    ];

    // 5. Explicit Nested Element Search Loop
    // Resolves previous parsing bug by directly targeting index properties
    let recommendedCableSize = 120.0; // Default fallback to absolute maximum matrix bounds
    let sizeFound = false;

    for (let i = 0; i < standardCableMatrix.length; i++) {
        let areaSlot = standardCableMatrix[i][0];       // Extracts mm² value
        let currentCapacitySlot = standardCableMatrix[i][1]; // Extracts Maximum Safe Amperage

        if (currentCapacitySlot >= designCurrent) {
            recommendedCableSize = areaSlot;
            sizeFound = true;
            break; // Terminate execution cycle immediately once safety bounds are matched
        }
    }

    // 6. Voltage Drop (Vd) Calculation Framework
    // Evaluates millivolt per Ampere per meter parameter (mV/A/m approach)
    let mvAm = 4.4; // Average factor representation for copper resistance
    let calculatedVoltageDrop = (designCurrent * length * mvAm) / 1000;
    let voltageDropPercentage = (calculatedVoltageDrop / voltage) * 100;

    // 7. Dynamic UI State Management & Data Pipeline Insertion
    const resultsContainer = document.getElementById('calc-results');
    const outCurrent = document.getElementById('out-current');
    const outSize = document.getElementById('out-size');
    const outDrop = document.getElementById('out-drop');

    outCurrent.textContent = designCurrent.toFixed(2);
    outSize.textContent = recommendedCableSize.toFixed(1);
    outDrop.textContent = voltageDropPercentage.toFixed(2);

    // Flagging System: Visually alert user if calculations cross standard 4% threshold constraints
    if (voltageDropPercentage > 4.00) {
        outDrop.style.color = "#ef4444"; // Red highlight alarm
        outDrop.textContent += " (⚠️ Exceeds standard 4% regulatory voltage criteria!)";
    } else {
        outDrop.style.color = "#10b981"; // Stable Green standard highlight
    }

    // Remove fallback utility classes to render findings instantly viewable
    resultsContainer.classList.remove('hidden');
});

"Add core logic for Cable Calculator"
// --- OHM'S LAW MATRIX CALCULATION LOGIC ---
document.getElementById('ohms-calculate-btn').addEventListener('click', function() {
    // 1. Gather all four parameter states
    let v = parseFloat(document.getElementById('ohms-v').value);
    let i = parseFloat(document.getElementById('ohms-i').value);
    let r = parseFloat(document.getElementById('ohms-r').value);
    let p = parseFloat(document.getElementById('ohms-p').value);

    // 2. Count how many valid parameters the user actually entered
    let inputsCount = 0;
    if (!isNaN(v) && v > 0) inputsCount++;
    if (!isNaN(i) && i > 0) inputsCount++;
    if (!isNaN(r) && r > 0) inputsCount++;
    if (!isNaN(p) && p > 0) inputsCount++;

    // Fallback Verification: Check constraints
    if (inputsCount < 2) {
        alert("🚨 Engineering Logic Error: You must fill in exactly TWO fields to calculate the missing values.");
        return;
    }

    // 3. Mathematical Condition Matrix Loop (Solving for all variations)
    // Run equations continuously until all values are resolved
    for (let loop = 0; loop < 2; loop++) {
        // Case A: Solve using Voltage and Current
        if (!isNaN(v) && !isNaN(i)) {
            if (isNaN(r)) r = v / i;
            if (isNaN(p)) p = v * i;
        }
        // Case B: Solve using Voltage and Resistance
        if (!isNaN(v) && !isNaN(r)) {
            if (isNaN(i)) i = v / r;
            if (isNaN(p)) p = (v * v) / r;
        }
        // Case C: Solve using Voltage and Power
        if (!isNaN(v) && !isNaN(p)) {
            if (isNaN(i)) i = p / v;
            if (isNaN(r)) r = (v * v) / p;
        }
        // Case D: Solve using Current and Resistance
        if (!isNaN(i) && !isNaN(r)) {
            if (isNaN(v)) v = i * r;
            if (isNaN(p)) p = (i * i) * r;
        }
        // Case E: Solve using Current and Power
        if (!isNaN(i) && !isNaN(p)) {
            if (isNaN(v)) v = p / i;
            if (isNaN(r)) r = p / (i * i);
        }
        // Case F: Solve using Resistance and Power
        if (!isNaN(r) && !isNaN(p)) {
            if (isNaN(v)) v = Math.sqrt(p * r);
            if (isNaN(i)) i = Math.sqrt(p / r);
        }
    }

    // 4. Inject final calculations to the Viewport UI
    document.getElementById('out-ohms-v').textContent = v.toFixed(2);
    document.getElementById('out-ohms-i').textContent = i.toFixed(2);
    document.getElementById('out-ohms-r').textContent = r.toFixed(2);
    document.getElementById('out-ohms-p').textContent = p.toFixed(2);

    // Reveal UI container block
    document.getElementById('ohms-results').classList.remove('hidden');
});
// --- POWER FACTOR CORRECTION MOTOR ---
document.getElementById('pf-calculate-btn').addEventListener('click', function() {
    const kw = parseFloat(document.getElementById('pf-kw').value);
    const pf1 = parseFloat(document.getElementById('pf-initial').value);
    const pf2 = parseFloat(document.getElementById('pf-target').value);

    if (isNaN(kw) || isNaN(pf1) || isNaN(pf2) || kw <= 0 || pf1 <= 0 || pf1 >= 1 || pf2 <= 0 || pf2 > 1) {
        alert("🚨 Input Error: Ensure Power Factor parameters sit safely strictly between 0 and 1.");
        return;
    }

    // Trigonometric Engineering Calculations: QC = P * (tan(acos(PF1)) - tan(acos(PF2)))
    const angle1 = Math.acos(pf1);
    const angle2 = Math.acos(pf2);
    
    const kvarRequired = kw * (Math.tan(angle1) - Math.tan(angle2));

    document.getElementById('out-kvar').textContent = kvarRequired.toFixed(2);
    document.getElementById('out-angle1').textContent = (angle1 * (180 / Math.PI)).toFixed(1);
    document.getElementById('out-angle2').textContent = (angle2 * (180 / Math.PI)).toFixed(1);
    document.getElementById('pf-results').classList.remove('hidden');
});
