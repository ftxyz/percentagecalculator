// Tab switching functionality
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.calculator-section');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });
}

// General function for switching tabs
function switchTab(targetTab) {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.calculator-section');
    
    // Remove all active states
    tabBtns.forEach(b => b.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));
    
    // Add active state
    const targetBtn = document.querySelector(`[data-tab="${targetTab}"]`);
    if (targetBtn) {
        targetBtn.classList.add('active');
    }
    const targetSection = document.getElementById(targetTab);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Clear results
    clearAllResults();
    
    // Scroll to calculator area
    document.querySelector('.calculator-tabs').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
}

// Clear all results
function clearAllResults() {
    const results = document.querySelectorAll('.result-text');
    const formulas = document.querySelectorAll('.result-formula');
    
    results.forEach(result => {
        result.textContent = 'Calculation result will be displayed here';
    });
    
    formulas.forEach(formula => {
        formula.textContent = '';
    });
}

// Calculate percentage of a number
function calculatePercentOf() {
    const value = parseFloat(document.getElementById('percent-value').value);
    const percent = parseFloat(document.getElementById('percent-rate').value);
    
    if (isNaN(value) || isNaN(percent)) {
        showError('percent-of-result', 'Please enter valid numbers');
        return;
    }
    
    const result = (value * percent) / 100;
    
    showResult('percent-of-result', 
        `${percent}% of ${formatNumber(value)} is ${formatNumber(result)}`,
        `Calculation: ${formatNumber(value)} × ${percent} ÷ 100 = ${formatNumber(result)}`
    );
}

// Calculate proportion percentage
function calculatePercentageOf() {
    const part = parseFloat(document.getElementById('part-value').value);
    const total = parseFloat(document.getElementById('total-value').value);
    
    if (isNaN(part) || isNaN(total)) {
        showError('percentage-of-result', 'Please enter valid numbers');
        return;
    }
    
    if (total === 0) {
        showError('percentage-of-result', 'Total value cannot be zero');
        return;
    }
    
    const percentage = (part / total) * 100;
    
    showResult('percentage-of-result',
        `${formatNumber(part)} is ${formatNumber(percentage)}% of ${formatNumber(total)}`,
        `Calculation: (${formatNumber(part)} ÷ ${formatNumber(total)}) × 100% = ${formatNumber(percentage)}%`
    );
}

// Calculate percentage change
function calculatePercentageChange() {
    const oldValue = parseFloat(document.getElementById('old-value').value);
    const newValue = parseFloat(document.getElementById('new-value').value);
    
    if (isNaN(oldValue) || isNaN(newValue)) {
        showError('percentage-change-result', 'Please enter valid numbers');
        return;
    }
    
    if (oldValue === 0) {
        showError('percentage-change-result', 'Original value cannot be zero');
        return;
    }
    
    const change = ((newValue - oldValue) / oldValue) * 100;
    const changeType = change >= 0 ? 'increased' : 'decreased';
    const absChange = Math.abs(change);
    
    showResult('percentage-change-result',
        `From ${formatNumber(oldValue)} to ${formatNumber(newValue)} ${changeType} by ${formatNumber(absChange)}%`,
        `Calculation: ((${formatNumber(newValue)} - ${formatNumber(oldValue)}) ÷ ${formatNumber(oldValue)}) × 100% = ${formatNumber(change)}%`
    );
}

// Format number display
function formatNumber(num) {
    if (Number.isInteger(num)) {
        return num.toString();
    } else {
        return parseFloat(num.toFixed(4)).toString();
    }
}

// Display result
function showResult(elementId, text, formula) {
    const resultDiv = document.getElementById(elementId);
    const resultText = resultDiv.querySelector('.result-text');
    const resultFormula = resultDiv.querySelector('.result-formula');
    
    resultText.textContent = text;
    resultFormula.textContent = formula;
    
    resultDiv.classList.add('show');
}

// Display error
function showError(elementId, message) {
    const resultDiv = document.getElementById(elementId);
    const resultText = resultDiv.querySelector('.result-text');
    const resultFormula = resultDiv.querySelector('.result-formula');
    
    resultText.textContent = 'Error: ' + message;
    resultFormula.textContent = '';
    
    resultDiv.classList.add('show');
}

// Back to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Keyboard event listeners
function initKeyboardEvents() {
    const inputs = document.querySelectorAll('input[type="number"]');
    
    inputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const section = input.closest('.calculator-section');
                const button = section.querySelector('button');
                button.click();
            }
        });
    });
}

// Input validation
function initInputValidation() {
    const inputs = document.querySelectorAll('input[type="number"]');
    
    inputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const value = e.target.value;
            if (value && !/^-?\d*\.?\d*$/.test(value)) {
                e.target.value = value.replace(/[^\d.-]/g, '');
            }
        });
    });
}

// Initialize after page load
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initKeyboardEvents();
    initInputValidation();
});

// Add copy functionality
function addCopyFunctionality() {
    const results = document.querySelectorAll('.result');
    
    results.forEach(result => {
        result.addEventListener('click', () => {
            const text = result.querySelector('.result-text').textContent;
            if (text && !text.includes('Calculation result will be displayed here') && !text.includes('Error:')) {
                navigator.clipboard.writeText(text).then(() => {
                    const originalText = result.querySelector('.result-text').textContent;
                    result.querySelector('.result-text').textContent = 'Copied to clipboard!';
                    setTimeout(() => {
                        result.querySelector('.result-text').textContent = originalText;
                    }, 1500);
                });
            }
        });
    });
}

// Initialize language switcher
function initLanguageSwitcher() {
    const langBtn = document.querySelector('.current-lang');
    const dropdown = document.querySelector('.lang-dropdown');
    
    if (langBtn && dropdown) {
        langBtn.addEventListener('click', () => {
            dropdown.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.language-menu')) {
                dropdown.classList.remove('show');
            }
        });
    }
}

// Initialize after page load
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initKeyboardEvents();
    initInputValidation();
    addCopyFunctionality();
    initLanguageSwitcher();
}); 