class Calculator {
    previousOperandTextElement: HTMLDivElement;
    currentOperandTextElement: HTMLDivElement;
    operation: string | null = null;

    constructor(
        previousOperandTextElement: HTMLDivElement,
        currentOperandTextElement: HTMLDivElement
    ) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.allClear();
    }

    allClear(): void {
        this.previousOperandTextElement.innerText = '';
        this.currentOperandTextElement.innerText = '0';
        this.operation = null;
    }

    delete(): void {
        const currentText = this.currentOperandTextElement.innerText;

        if (currentText.length > 1) {
            this.currentOperandTextElement.innerText = currentText.slice(0, -1);
        } else {
            this.currentOperandTextElement.innerText = '0';
        }
    }

    appendNumber(number: string): void {
        const currentText = this.currentOperandTextElement.innerText;

        if (currentText === '0' && number !== '0') {
            this.currentOperandTextElement.innerText = number;
        } else if (currentText.length < 9) { 
            this.currentOperandTextElement.innerText += number;
        }
    }

    choseOperation(operation: string): void {
        if (this.currentOperandTextElement.innerText !== '0') {
            this.previousOperandTextElement.innerText = this.currentOperandTextElement.innerText;
            this.currentOperandTextElement.innerText = '0';
            this.operation = operation;
        }
    }

    compute(): void {
        if (this.operation) {
            let computation: number;
            const prev = Number(this.previousOperandTextElement.innerText);
            const current = Number(this.currentOperandTextElement.innerText);

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
    }
}

const numberButtons = document.querySelectorAll<HTMLButtonElement>("[data-number]");
const operationButtons = document.querySelectorAll<HTMLButtonElement>("[data-operation]");
const allClearButton = document.querySelector('[data-all-clear]') as HTMLButtonElement;
const deleteButton = document.querySelector('[data-delete]') as HTMLButtonElement;
const equalsButton = document.querySelector('[data-equals]') as HTMLButtonElement;
const previousOperandTextElement = document.querySelector('[data-previous-operand]') as HTMLDivElement;
const currentOperandTextElement = document.querySelector('[data-current-operand]') as HTMLDivElement;

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(number => {
    number.addEventListener('click', (): void => {
        calculator.appendNumber(number.innerText);
    });
});

operationButtons.forEach(operation => {
    operation.addEventListener('click', (): void => {
        calculator.choseOperation(operation.innerText);
    });
});

allClearButton.addEventListener('click', (): void => {
    calculator.allClear();
});

deleteButton.addEventListener('click', (): void => {
    calculator.delete();
});

equalsButton.addEventListener('click', (): void => {
    calculator.compute();
});