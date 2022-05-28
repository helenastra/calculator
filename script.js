class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clearDisplay()
}

clearDisplay() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
}

clearRecent() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
}

appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
}

chooseOperation(operation) {
    if (this.currentOperand === '') {
        return
    }
    if (this.previousOperand !== '') {
        this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
}

compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) {
        return
    }
    switch (this.operation) {
        case '+':
            computation = prev + current
            break
        case '-':
            computation = prev - current
            break
        case '×':
            computation = prev * current
            break
        case '÷':
            computation = prev / current
            break
        default: 
            return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
}

updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand
    this.previousOperandTextElement.innerText = this.previousOperand
}
}

//declarations
const numberButtons = document.querySelectorAll('.num')
const operationButtons = document.querySelectorAll('.operation')
const deleteButton = document.querySelector('.delete')
const clearButton = document.querySelector('.clear')
const equalButton = document.querySelector('.equal')
const previousOperandTextElement = document.querySelector('.previous-operand')
const currentOperandTextElement = document.querySelector('.current-operand')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

//event listeners
numberButtons.forEach(number => number.addEventListener('click', () => {
    calculator.appendNumber(number.innerText)
    calculator.updateDisplay()
}))

operationButtons.forEach(operation => operation.addEventListener('click', () => {
    calculator.chooseOperation(operation.innerText)
    calculator.updateDisplay()
}))

deleteButton.addEventListener('click', () => {
    calculator.clearRecent()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', () => {
    calculator.clearDisplay()
    calculator.updateDisplay()
})

equalButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

