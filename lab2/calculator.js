window.onload = function () { 
    let a = ''
    let b = ''
    let expressionResult = ''
    let selectedOperation = null
    let isEngineeringMode = false

    outputElement = document.getElementById("result")
    engineeringModeToolbar = document.querySelector(".engineering-mode-toolbar")

    digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')

    function formatNumber(numStr) {
        // Если пользователь вводит число с точкой, например "0." — показываем как есть
        if (numStr.endsWith('.')) return numStr;
    
        // убираем точку и минус для подсчета длины
        const pureStr = numStr.replace('.', '').replace('-', '');
    
        if (pureStr.length > 16) {
            return Number(numStr).toExponential(6);
        }
    
        return Number(numStr).toString();
    }
    
    
    

    function onDigitButtonClicked(digit) {
        let current = selectedOperation ? b : a;
    
        if (digit === '.' && current.includes('.')) return;
    
        if (digit === '.' && current === '') {
            current = '0.';
        } else {
            current += digit;
        }
    
        // Ограничение на дробную часть
        if (current.includes('.')) {
            const [intPart, decPart] = current.split('.');
            if (decPart.length > 50) return;
        }
    
        if (!selectedOperation) {
            a = current;
            outputElement.innerHTML = formatNumber(a);
        } else {
            b = current;
            outputElement.innerHTML = formatNumber(b);
        }
    }
    
    
    
    

    digitButtons.forEach(button => {
        button.onclick = function () {
            const digitValue = button.innerHTML
            onDigitButtonClicked(digitValue)
        }
    });

    function performOperation() {
        if (a !== '' && b !== '' && selectedOperation) {
            switch (selectedOperation) {
                case 'x':
                    a = (+a * +b).toString()
                    break;
                case '+':
                    a = (+a + +b).toString()
                    break;
                case '-':
                    a = (+a - +b).toString()
                    break;
                case '/':
                    a = (+a / +b).toString()
                    break;
            }
            b = ''
            outputElement.innerHTML = formatNumber(a);  // Форматируем перед выводом
        }
    }

    document.getElementById("btn_op_mult").onclick = function () {
        if (a === '') return
        performOperation()
        selectedOperation = 'x'
    }
    document.getElementById("btn_op_plus").onclick = function () {
        if (a === '') return
        performOperation()
        selectedOperation = '+'
    }
    document.getElementById("btn_op_minus").onclick = function () {
        if (a === '') return
        performOperation()
        selectedOperation = '-'
    }
    document.getElementById("btn_op_div").onclick = function () {
        if (a === '') return
        performOperation()
        selectedOperation = '/'
    }

    document.getElementById("btn_op_clear").onclick = function () {
        a = ''
        b = ''
        selectedOperation = ''
        expressionResult = ''
        outputElement.innerHTML = 0
    }

    document.getElementById("btn_op_equal").onclick = function () {
        performOperation()
        selectedOperation = null
    }

    document.getElementById("btn_op_f").onclick = function () {
        isEngineeringMode = !isEngineeringMode
        engineeringModeToolbar.style.display = isEngineeringMode ? 'flex' : 'none'
    }

    document.getElementById("btn_op_square").onclick = function () {
        a = (Math.pow(+a, 2)).toString()
        outputElement.innerHTML = formatNumber(a);  // Форматируем перед выводом
    }

    document.getElementById("btn_op_sqrt").onclick = function () {
        a = (Math.sqrt(+a)).toString()
        outputElement.innerHTML = formatNumber(a);  // Форматируем перед выводом
    }

    document.getElementById("btn_op_backspace").onclick = function () {
        a = a.slice(0, -1)
        outputElement.innerHTML = formatNumber(a) || '0';  // Форматируем перед выводом
    }

    document.getElementById("btn_op_fact").onclick = function () {
        const factorial = (n) => {
            if (n < 0) return 'Ошибка'
            if (n === 0 || n === 1) return 1
            let res = 1
            for (let i = 2; i <= n; i++) {
                res *= i
            }
            return res
        }

        a = factorial(+a).toString()
        outputElement.innerHTML = formatNumber(a);  // Форматируем перед выводом
    }

    document.getElementById("btn_op_000").onclick = function () {
        if (selectedOperation) {
            b += "000";
            outputElement.innerHTML = formatNumber(b);
        } else {
            a += "000";
            outputElement.innerHTML = formatNumber(a);
        }
    }
    
    
    
    

    document.getElementById("btn_op_div10").onclick = function () {
        a = (+a / 10).toString()
        outputElement.innerHTML = formatNumber(a);  // Форматируем перед выводом
    }

    document.getElementById("btn_op_sin").onclick = function () {
        a = Math.sin(+a).toString()
        outputElement.innerHTML = formatNumber(a);  // Форматируем перед выводом
    }

    document.getElementById("btn_op_cos").onclick = function () {
        a = Math.cos(+a).toString()
        outputElement.innerHTML = formatNumber(a);  // Форматируем перед выводом
    }

    document.getElementById("btn_op_plusminus").onclick = function () {
        if (a !== '') {
            a = (-1 * +a).toString()
            outputElement.innerHTML = formatNumber(a);  // Форматируем перед выводом
        }
    }

    document.getElementById("btn_op_percent").onclick = function () {
        if (a !== '') {
            a = (+a / 100).toString()
            outputElement.innerHTML = formatNumber(a);  // Форматируем перед выводом
        }
    }

    document.getElementById("theme-toggle").onclick = function () {
        document.body.classList.toggle("light-theme")
    }

    document.getElementById("about-me-link").onclick = function () {
        window.location.href = "about.html"
    }

    document.getElementById("about-lab-link").onclick = function () {
        window.location.href = "lab.html"
    }
}
