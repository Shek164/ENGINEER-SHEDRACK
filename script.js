
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

document.getElementById('calculate-btn').addEventListener('click', function( console.log("📟 Sizing calculations processed successfully.");) {
    
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
    // Structure: [Conductor Area in mm², Max Allowable Continuous Amperage Capacitor)
    
    // Optimized Key-Value Map Definition: Area Key (mm²) => Continuous Current Capacity Limit (Amps)
    const safeCableCapacityMap = new Map([
        [1.5, 16], [2.5, 22], [4.0, 30], [6.0, 38], [10.0, 52],
        [16.0, 69], [25.0, 91], [35.0, 111], [50.0, 133], [70.0, 169],
        [95.0, 205], [120.0, 237]
    ]);

    // Efficiently locate the smallest compliant conductor size using an iterator loop
    let recommendedCableSize = 120.0; // Fail-safe default set to global maximum safety limit

    for (const [conductorArea, currentLimit] of safeCableCapacityMap.entries()) {
        if (currentLimit >= designCurrent) {
            recommendedCableSize = conductorArea;
            break; // Immediately exit the execution thread once compliance limits match
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
// --- SIMULATED SCADA/TELEMETRY STREAM ENGINE ---
let breakerClosed = true;

setInterval(() => {
    if (!breakerClosed) return; // Freeze metrics if breaker trips

    // Inject microscopic real-world grid oscillations (+/- small values)
    const baseV = 240 + (Math.random() * 4 - 2);
    const baseKW = 12 + (Math.random() * 6);
    const baseHZ = 50 + (Math.random() * 0.1 - 0.05);

    document.getElementById('dash-v1').textContent = baseV.toFixed(1);
    document.getElementById('dash-kw').textContent = baseKW.toFixed(1);
    document.getElementById('dash-hz').textContent = baseHZ.toFixed(2);
}, 2500); // Refreshes every 2.5 seconds to mimic an active network socket connection

// Emergency Trip Handler
document.getElementById('toggle-breaker-btn').addEventListener('click', function() {
    breakerClosed = !breakerClosed;
    const badge = document.getElementById('dash-status');
    
    if (breakerClosed) {
        badge.textContent = "CLOSED / SAFE";
        badge.className = "dash-badge status-closed";
        this.textContent = "Emergency Trip Breaker";
        this.style.backgroundColor = "#ef4444";
    } else {
        badge.textContent = "TRIPPED / ALARM";
        badge.className = "dash-badge status-tripped";
        this.textContent = "Reset Network Breaker";
        this.style.backgroundColor = "#10b981";
        
        // Zero metrics instantly upon breaker mechanical separation
        document.getElementById('dash-v1').textContent = "0.0";
        document.getElementById('dash-kw').textContent = "0.0";
        document.getElementById('dash-hz').textContent = "0.00";
    }
});
"Connect Power Factor calculations and active IoT background simulator engine"
// =========================================================================
// 💾 PRODUCTION DATA PERSISTENCE COMPONENT (LOCALSTORAGE SYSTEM)
// Architecture: Automated State Recovery Lifecycle
// =========================================================================

// Function to securely pack and cache current input parameters into browser memory
function saveEngineeringStateToCache() {
    const statePayload = {
        loadPower: document.getElementById('load-power').value,
        routeLength: document.getElementById('route-length').value,
        phaseType: document.getElementById('phase-type').value,
        pfKw: document.getElementById('pf-kw').value,
        pfInitial: document.getElementById('pf-initial').value,
        pfTarget: document.getElementById('pf-target').value
    };
    
    // Convert object payload to JSON string and store securely in local storage node
    localStorage.setItem('shedrack_toolkit_state', JSON.stringify(statePayload));
}

// Function to scan, unpack, and populate cached variables back into DOM nodes upon launch
function recoverEngineeringStateFromCache() {
    const serializedData = localStorage.getItem('shedrack_toolkit_state');
    
    if (!serializedData) return; // Terminate execution gracefully if cache node is empty
    
    try {
        const decodedState = JSON.parse(serializedData);
        
        // Re-populate Cable sizing parameters
        if (decodedState.loadPower) document.getElementById('load-power').value = decodedState.loadPower;
        if (decodedState.routeLength) document.getElementById('route-length').value = decodedState.routeLength;
        if (decodedState.phaseType) document.getElementById('phase-type').value = decodedState.phaseType;
        
        // Re-populate Power Factor parameters
        if (decodedState.pfKw) document.getElementById('pf-kw').value = decodedState.pfKw;
        if (decodedState.pfInitial) document.getElementById('pf-initial').value = decodedState.pfInitial;
        if (decodedState.pfTarget) document.getElementById('pf-target').value = decodedState.pfTarget;
        
        console.log("⚡ [Shedrack Engine Hub]: Application state payload recovered from localStorage successfully.");
    } catch (error) {
        console.error("🚨 Error processing cached state string reconstruction:", error);
    }
}

// Attach event listeners to all input form elements to save data automatically as the user changes inputs
const allTargetInputElements = document.querySelectorAll('.input-group input, .input-group select');
allTargetInputElements.forEach(elementNode => {
    elementNode.addEventListener('input', saveEngineeringStateToCache);
    elementNode.addEventListener('change', saveEngineeringStateToCache);
});

// Initialize automatic state recovery sequence immediately when the DOM tree mounts live
document.addEventListener('DOMContentLoaded', recoverEngineeringStateFromCache);
// =========================================================================
// 📊 THREE-PHASE LOAD VECTOR BALANCER ENGINE
// =========================================================================
document.getElementById('balancer-calculate-btn').addEventListener('click', function() {
    // 1. Scraping and parsing current vector inputs
    const ia = parseFloat(document.getElementById('current-ia').value);
    const ib = parseFloat(document.getElementById('current-ib').value);
    const ic = parseFloat(document.getElementById('current-ic').value);

    // Guard fallback constraint verification
    if (isNaN(ia) || isNaN(ib) || isNaN(ic) || ia < 0 || ib < 0 || ic < 0) {
        alert("🚨 Engineering Input Constraint: Please enter valid positive numeric current values for all three phases.");
        return;
    }

    // 2. Complex Three-Phase Vector Math Execution
    // Standard trigonometric displacement equation components simplified for 120-degree shifts:
    const neutralCurrentSquared = (ia * ia) + (ib * ib) + (ic * ic) - ((ia * ib) + (ib * ic) + (ic * ia));
    
    // Guard against microscopic floating point rounding calculation artifacts drops below absolute zero
    const resultantNeutralCurrent = neutralCurrentSquared > 0 ? Math.sqrt(neutralCurrentSquared) : 0;

    // 3. Grid Imbalance Threshold Math Check
    const currentsArray = [ia, ib, ic];
    const maxLineCurrent = Math.max(...currentsArray);
    const minLineCurrent = Math.min(...currentsArray);
    const deviation = maxLineCurrent - minLineCurrent;

    // 4. Update the Dashboard Interface Nodes
    const outNeutral = document.getElementById('out-neutral-current');
    const outDeviation = document.getElementById('out-max-deviation');
    const outStatus = document.getElementById('out-balancer-status');

    outNeutral.textContent = resultantNeutralCurrent.toFixed(2);
    outDeviation.textContent = deviation.toFixed(2);

    // 5. System Flag Evaluation Warning Matrix
    // If neutral current climbs past 15 Amperes, trigger an active phase imbalance warning
    if (resultantNeutralCurrent > 15.00) {
        outStatus.textContent = "⚠️ UNBALANCED / HIGH THERMAL STRESS";
        outStatus.style.color = "#ef4444"; // Alarm Warning Alert Red
        outNeutral.style.color = "#ef4444";
    } else {
        outStatus.textContent = "✅ OPTIMIZED SYSTEM LOAD BALANCE";
        outStatus.style.color = "#10b981"; // Stable Clean Green 
        outNeutral.style.color = "#1e293b";
    }

    // Unhide output screen container box element nodes
    document.getElementById('balancer-results').classList.remove('hidden');
});
// =========================================================================
// 🔋 SOLAR BATTERY STORAGE & AUTONOMY CALCULATOR ENGINE
// =========================================================================
document.getElementById('battery-calculate-btn').addEventListener('click', function() {
    // 1. Gather input parameters
    const totalWh = parseFloat(document.getElementById('bat-load').value);
    const autonomyDays = parseFloat(document.getElementById('bat-autonomy').value);
    const chemistry = document.getElementById('bat-chemistry').value;

    // Guard constraint verification
    if (isNaN(totalWh) || isNaN(autonomyDays) || totalWh <= 0 || autonomyDays <= 0) {
        alert("🚨 Input Error: Please provide valid positive numeric values for load demand and backup days.");
        return;
    }

    // 2. Determine Depth of Discharge (DoD) based on selected battery chemistry
    // Lead-Acid/GEL should not exceed 50% drain, while Lithium handles 80% safely
    const depthOfDischarge = (chemistry === 'gel') ? 0.50 : 0.80;
    const nominalBankVoltage = 24; // Standard off-grid distribution voltage reference

    // 3. Complete Storage Math Formulations
    const grossWhStorageRequired = (totalWh * autonomyDays) / depthOfDischarge;
    const totalBankAhCapacity = grossWhStorageRequired / nominalBankVoltage;

    // 4. Inject calculations to viewport DOM elements
    const outTotalWh = document.getElementById('out-total-wh');
    const outBankAh = document.getElementById('out-bank-ah');
    const outStatus = document.getElementById('out-battery-health-status');

    outTotalWh.textContent = grossWhStorageRequired.toFixed(1);
    outBankAh.textContent = totalBankAhCapacity.toFixed(1);

    // 5. Present dynamic system metrics
    if (chemistry === 'gel') {
        outStatus.textContent = "🛡️ Safety Margin Factored (50% Lead-Acid DoD Safeguard active)";
        outStatus.style.color = "#0070f3";
    } else {
        outStatus.textContent = "🚀 High-Efficiency Performance Profile (80% Lithium DoD active)";
        outStatus.style.color = "#10b981";
    }

    // Reveal output results block container
    document.getElementById('battery-results').classList.remove('hidden');
});
