// Funcionalidad de cambio de pestañas
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

// Función general para cambiar pestañas
function switchTab(targetTab) {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.calculator-section');
    
    // Eliminar todos los estados activos
    tabBtns.forEach(b => b.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));
    
    // Agregar estado activo
    const targetBtn = document.querySelector(`[data-tab="${targetTab}"]`);
    if (targetBtn) {
        targetBtn.classList.add('active');
    }
    const targetSection = document.getElementById(targetTab);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Limpiar resultados
    clearAllResults();
    
    // Desplazarse al área de calculadora
    document.querySelector('.calculator-tabs').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
}

// Limpiar todos los resultados
function clearAllResults() {
    const results = document.querySelectorAll('.result-text');
    const formulas = document.querySelectorAll('.result-formula');
    
    results.forEach(result => {
        result.textContent = 'El resultado del cálculo se mostrará aquí';
    });
    
    formulas.forEach(formula => {
        formula.textContent = '';
    });
}

// Calcular porcentaje de un número
function calculatePercentOf() {
    const value = parseFloat(document.getElementById('percent-value').value);
    const percent = parseFloat(document.getElementById('percent-rate').value);
    
    if (isNaN(value) || isNaN(percent)) {
        showError('percent-of-result', 'Por favor ingrese números válidos');
        return;
    }
    
    const result = (value * percent) / 100;
    
    showResult('percent-of-result', 
        `${percent}% de ${formatNumber(value)} es ${formatNumber(result)}`,
        `Cálculo: ${formatNumber(value)} × ${percent} ÷ 100 = ${formatNumber(result)}`
    );
}

// Calcular porcentaje de proporción
function calculatePercentageOf() {
    const part = parseFloat(document.getElementById('part-value').value);
    const total = parseFloat(document.getElementById('total-value').value);
    
    if (isNaN(part) || isNaN(total)) {
        showError('percentage-of-result', 'Por favor ingrese números válidos');
        return;
    }
    
    if (total === 0) {
        showError('percentage-of-result', 'El valor total no puede ser cero');
        return;
    }
    
    const percentage = (part / total) * 100;
    
    showResult('percentage-of-result',
        `${formatNumber(part)} es ${formatNumber(percentage)}% de ${formatNumber(total)}`,
        `Cálculo: (${formatNumber(part)} ÷ ${formatNumber(total)}) × 100% = ${formatNumber(percentage)}%`
    );
}

// Calcular cambio porcentual
function calculatePercentageChange() {
    const oldValue = parseFloat(document.getElementById('old-value').value);
    const newValue = parseFloat(document.getElementById('new-value').value);
    
    if (isNaN(oldValue) || isNaN(newValue)) {
        showError('percentage-change-result', 'Por favor ingrese números válidos');
        return;
    }
    
    if (oldValue === 0) {
        showError('percentage-change-result', 'El valor original no puede ser cero');
        return;
    }
    
    const change = ((newValue - oldValue) / oldValue) * 100;
    const changeType = change >= 0 ? 'aumentó' : 'disminuyó';
    const absChange = Math.abs(change);
    
    showResult('percentage-change-result',
        `De ${formatNumber(oldValue)} a ${formatNumber(newValue)} ${changeType} en ${formatNumber(absChange)}%`,
        `Cálculo: ((${formatNumber(newValue)} - ${formatNumber(oldValue)}) ÷ ${formatNumber(oldValue)}) × 100% = ${formatNumber(change)}%`
    );
}

// Formatear visualización de números
function formatNumber(num) {
    if (Number.isInteger(num)) {
        return num.toString();
    } else {
        return parseFloat(num.toFixed(4)).toString();
    }
}

// Mostrar resultado
function showResult(elementId, text, formula) {
    const resultDiv = document.getElementById(elementId);
    const resultText = resultDiv.querySelector('.result-text');
    const resultFormula = resultDiv.querySelector('.result-formula');
    
    resultText.textContent = text;
    resultFormula.textContent = formula;
    
    resultDiv.classList.add('show');
}

// Mostrar error
function showError(elementId, message) {
    const resultDiv = document.getElementById(elementId);
    const resultText = resultDiv.querySelector('.result-text');
    const resultFormula = resultDiv.querySelector('.result-formula');
    
    resultText.textContent = 'Error: ' + message;
    resultFormula.textContent = '';
    
    resultDiv.classList.add('show');
}

// Volver arriba
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Oyentes de eventos de teclado
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

// Validación de entrada
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

// Agregar funcionalidad de copia
function addCopyFunctionality() {
    const results = document.querySelectorAll('.result');
    
    results.forEach(result => {
        result.addEventListener('click', () => {
            const text = result.querySelector('.result-text').textContent;
            if (text && !text.includes('El resultado del cálculo se mostrará aquí') && !text.includes('Error:')) {
                navigator.clipboard.writeText(text).then(() => {
                    const originalText = result.querySelector('.result-text').textContent;
                    result.querySelector('.result-text').textContent = '¡Copiado al portapapeles!';
                    setTimeout(() => {
                        result.querySelector('.result-text').textContent = originalText;
                    }, 1500);
                });
            }
        });
    });
}

// Inicializar selector de idioma
function initLanguageSwitcher() {
    const langBtn = document.querySelector('.current-lang');
    const dropdown = document.querySelector('.lang-dropdown');
    
    if (langBtn && dropdown) {
        langBtn.addEventListener('click', () => {
            dropdown.classList.toggle('show');
        });
        
        // Cerrar menú desplegable al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.language-menu')) {
                dropdown.classList.remove('show');
            }
        });
    }
}

// Inicializar después de cargar la página
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initKeyboardEvents();
    initInputValidation();
    addCopyFunctionality();
    initLanguageSwitcher();
}); 