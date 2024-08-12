var Calculator = /** @class */ (function () {
    function Calculator(previousOperandTextElement, currentOperandTextElement) {
        this.operation = null;
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.allClear();
    }
    Calculator.prototype.allClear = function () {
        this.previousOperandTextElement.innerText = '';
        this.currentOperandTextElement.innerText = '0';
        this.operation = null;
    };
    Calculator.prototype.delete = function () {
        var currentText = this.currentOperandTextElement.innerText;
        if (currentText.length > 1) {
            this.currentOperandTextElement.innerText = currentText.slice(0, -1);
        }
        else {
            this.currentOperandTextElement.innerText = '0';
        }
    };
    Calculator.prototype.appendNumber = function (number) {
        var currentText = this.currentOperandTextElement.innerText;
        if (currentText === '0' && number !== '0') {
            this.currentOperandTextElement.innerText = number;
        }
        else if (currentText.length < 9) {
            this.currentOperandTextElement.innerText += number;
        }
    };
    Calculator.prototype.choseOperation = function (operation) {
        if (this.currentOperandTextElement.innerText !== '0') {
            this.previousOperandTextElement.innerText = this.currentOperandTextElement.innerText;
            this.currentOperandTextElement.innerText = '0';
            this.operation = operation;
        }
    };
    Calculator.prototype.compute = function () {
        if (this.operation) {
            var computation = void 0;
            var prev = Number(this.previousOperandTextElement.innerText);
            var current = Number(this.currentOperandTextElement.innerText);
            switch (this.operation) {
                case '+':
                    computation = prev + current;
                    break;
                case '-':
                    computation = prev - current;
                    break;
                case '×':
                    computation = prev * current;
                    break;
                case '/':
                    if (current === 0) {
                        alert('Cannot divide by zero');
                        return;
                    }
                    computation = prev / current;
                    break;
                case '%':
                    computation = prev % current;
                    break;
                default:
                    return;
            }
            this.currentOperandTextElement.innerText = computation.toString();
            this.previousOperandTextElement.innerText = '';
            this.operation = null;
        }
    };
    return Calculator;
}());
var numberButtons = document.querySelectorAll("[data-number]");
var operationButtons = document.querySelectorAll("[data-operation]");
var allClearButton = document.querySelector('[data-all-clear]');
var deleteButton = document.querySelector('[data-delete]');
var equalsButton = document.querySelector('[data-equals]');
var previousOperandTextElement = document.querySelector('[data-previous-operand]');
var currentOperandTextElement = document.querySelector('[data-current-operand]');
var calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);
numberButtons.forEach(function (number) {
    number.addEventListener('click', function () {
        calculator.appendNumber(number.innerText);
    });
});
operationButtons.forEach(function (operation) {
    operation.addEventListener('click', function () {
        calculator.choseOperation(operation.innerText);
    });
});
allClearButton.addEventListener('click', function () {
    calculator.allClear();
});
deleteButton.addEventListener('click', function () {
    calculator.delete();
});
equalsButton.addEventListener('click', function () {
    calculator.compute();
});
