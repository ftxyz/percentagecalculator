// 标签切换功能
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

// 切换标签的通用函数
function switchTab(targetTab) {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.calculator-section');
    
    // 移除所有活动状态
    tabBtns.forEach(b => b.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));
    
    // 添加活动状态
    const targetBtn = document.querySelector(`[data-tab="${targetTab}"]`);
    if (targetBtn) {
        targetBtn.classList.add('active');
    }
    const targetSection = document.getElementById(targetTab);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // 清空结果
    clearAllResults();
    
    // 滚动到计算器区域
    document.querySelector('.calculator-tabs').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
}

// 清空所有结果
function clearAllResults() {
    const results = document.querySelectorAll('.result-text');
    const formulas = document.querySelectorAll('.result-formula');
    
    results.forEach(result => {
        result.textContent = '计算结果将在这里显示';
    });
    
    formulas.forEach(formula => {
        formula.textContent = '';
    });
}

// 计算一个数的百分比
function calculatePercentOf() {
    const value = parseFloat(document.getElementById('percent-value').value);
    const percent = parseFloat(document.getElementById('percent-rate').value);
    
    if (isNaN(value) || isNaN(percent)) {
        showError('percent-of-result', '请输入有效的数字');
        return;
    }
    
    const result = (value * percent) / 100;
    
    showResult('percent-of-result', 
        `${formatNumber(value)} 的 ${percent}% 是 ${formatNumber(result)}`,
        `计算过程：${formatNumber(value)} × ${percent} ÷ 100 = ${formatNumber(result)}`
    );
}

// 计算占比百分比
function calculatePercentageOf() {
    const part = parseFloat(document.getElementById('part-value').value);
    const total = parseFloat(document.getElementById('total-value').value);
    
    if (isNaN(part) || isNaN(total)) {
        showError('percentage-of-result', '请输入有效的数字');
        return;
    }
    
    if (total === 0) {
        showError('percentage-of-result', '总值不能为0');
        return;
    }
    
    const percentage = (part / total) * 100;
    
    showResult('percentage-of-result',
        `${formatNumber(part)} 占 ${formatNumber(total)} 的 ${formatNumber(percentage)}%`,
        `计算过程：(${formatNumber(part)} ÷ ${formatNumber(total)}) × 100% = ${formatNumber(percentage)}%`
    );
}

// 计算百分比变化
function calculatePercentageChange() {
    const oldValue = parseFloat(document.getElementById('old-value').value);
    const newValue = parseFloat(document.getElementById('new-value').value);
    
    if (isNaN(oldValue) || isNaN(newValue)) {
        showError('percentage-change-result', '请输入有效的数字');
        return;
    }
    
    if (oldValue === 0) {
        showError('percentage-change-result', '原始值不能为0');
        return;
    }
    
    const change = ((newValue - oldValue) / oldValue) * 100;
    const changeType = change >= 0 ? '增长' : '减少';
    const absChange = Math.abs(change);
    
    showResult('percentage-change-result',
        `从 ${formatNumber(oldValue)} 到 ${formatNumber(newValue)} ${changeType}了 ${formatNumber(absChange)}%`,
        `计算过程：((${formatNumber(newValue)} - ${formatNumber(oldValue)}) ÷ ${formatNumber(oldValue)}) × 100% = ${formatNumber(change)}%`
    );
}

// 格式化数字显示
function formatNumber(num) {
    if (Number.isInteger(num)) {
        return num.toString();
    } else {
        return parseFloat(num.toFixed(4)).toString();
    }
}

// 显示结果
function showResult(elementId, text, formula) {
    const resultDiv = document.getElementById(elementId);
    const resultText = resultDiv.querySelector('.result-text');
    const resultFormula = resultDiv.querySelector('.result-formula');
    
    resultText.textContent = text;
    resultFormula.textContent = formula;
    
    resultDiv.classList.add('show');
}

// 显示错误
function showError(elementId, message) {
    const resultDiv = document.getElementById(elementId);
    const resultText = resultDiv.querySelector('.result-text');
    const resultFormula = resultDiv.querySelector('.result-formula');
    
    resultText.textContent = '错误：' + message;
    resultFormula.textContent = '';
    
    resultDiv.classList.add('show');
}

// 回到顶部
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 键盘事件监听
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

// 输入验证
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

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initKeyboardEvents();
    initInputValidation();
});

// 添加复制结果功能
function addCopyFunctionality() {
    const results = document.querySelectorAll('.result');
    
    results.forEach(result => {
        result.addEventListener('click', () => {
            const text = result.querySelector('.result-text').textContent;
            if (text && !text.includes('计算结果将在这里显示') && !text.includes('错误：')) {
                navigator.clipboard.writeText(text).then(() => {
                    const originalText = result.querySelector('.result-text').textContent;
                    result.querySelector('.result-text').textContent = '已复制到剪贴板！';
                    setTimeout(() => {
                        result.querySelector('.result-text').textContent = originalText;
                    }, 1500);
                });
            }
        });
    });
}

// 初始化语言切换器
function initLanguageSwitcher() {
    const langBtn = document.querySelector('.current-lang');
    const dropdown = document.querySelector('.lang-dropdown');
    
    if (langBtn && dropdown) {
        langBtn.addEventListener('click', () => {
            dropdown.classList.toggle('show');
        });
        
        // 点击外部关闭下拉菜单
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.language-menu')) {
                dropdown.classList.remove('show');
            }
        });
    }
}

// 在页面加载完成后添加复制功能
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initKeyboardEvents();
    initInputValidation();
    addCopyFunctionality();
    initLanguageSwitcher();
});