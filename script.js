let currentInput = "0";
let calculationDone = false;

const outputEl = document.getElementById("output");
const historyEl = document.getElementById("history");
const modalEl = document.getElementById("modal");
const aboutBtn = document.getElementById("about-btn");

function updateDisplay() {
    outputEl.innerText = currentInput;
}

function appendValue(val) {
    if (calculationDone && !isNaN(val)) {
        currentInput = val;
        calculationDone = false;
    } else {
        if (currentInput === "0" && val !== "." && !isNaN(val)) {
            currentInput = val;
        } else {
            currentInput += val;
        }
        calculationDone = false;
    }
    updateDisplay();
}

function clearAll() {
    currentInput = "0";
    historyEl.innerText = "";
    calculationDone = false;
    updateDisplay();
}

function deleteLast() {
    if (calculationDone) return;
    currentInput = currentInput.slice(0, -1);
    if (currentInput === "" || currentInput === "-") {
        currentInput = "0";
    }
    updateDisplay();
}

function toggleSign() {
    try {
        if (currentInput === "0") return;
        if (currentInput.startsWith("-")) {
            currentInput = currentInput.slice(1);
        } else {
            currentInput = "-" + currentInput;
        }
        updateDisplay();
    } catch {
        showError();
    }
}

function calculateSquareRoot() {
    try {
        const val = eval(currentInput);
        if (val < 0) {
            currentInput = "Помилка";
        } else {
            historyEl.innerText = `√(${currentInput})`;
            currentInput = Math.sqrt(val).toString();
            calculationDone = true;
        }
        updateDisplay();
    } catch {
        showError();
    }
}

function computeResult() {
    try {
        historyEl.innerText = currentInput;
        // Заміна відображення та обчислення виразу
        let sanitized = currentInput.replace(/÷/g, "/").replace(/×/g, "*");
        let res = Function('"use strict";return (' + sanitized + ')')();
        
        if (!isFinite(res)) {
            currentInput = "Помилка";
        } else {
            currentInput = Number.isInteger(res) ? res.toString() : parseFloat(res.toFixed(8)).toString();
        }
        calculationDone = true;
        updateDisplay();
    } catch {
        showError();
    }
}

function showError() {
    currentInput = "Помилка";
    updateDisplay();
    calculationDone = true;
}

// Управління модальним вікном
aboutBtn.onclick = () => modalEl.style.display = "flex";
function closeModal() {
    modalEl.style.display = "none";
}
window.onclick = (e) => {
    if (e.target === modalEl) closeModal();
};
