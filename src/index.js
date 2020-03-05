function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {

    const operations = (a, b, operator) => {
        switch (operator) {
            case '+': return +a + +b;
            case '-': return b - a;
            case '*': return a * b;
            case '/': if (a == 0) { throw "TypeError: Division by zero." }
                return b / a;
        }
    }

    if (expr.match(/[()]/g)) {
        if (expr.match(/\(/g) == null || expr.match(/\)/g) == null || expr.match(/\(/g).length !== expr.match(/\)/g).length) throw "ExpressionError: Brackets must be paired"
    }
    let numbers = expr.match(/\d+/g);
    let newExpr = expr.replace(/\s/g, "").replace(/\d+/g, 'n')
    let numbersStack = [];
    let operationStack = [];
    let priorities = {
        "+": 1,
        '-': 1,
        '*': 2,
        '/': 2
    }

    let counter = 0;
    for (let i = 0; i <= newExpr.length; i++) {

        if (i == newExpr.length) {
            if (operationStack.length !== 0) {
                while (operationStack.length !== 0)
                    numbersStack.push(operations(numbersStack.pop(), numbersStack.pop(), operationStack.pop()))
            }
            return numbersStack.pop()
        }

        if (newExpr[i] == 'n') {
            numbersStack.push(numbers[counter])
            counter++;
            continue;
        }

        if (newExpr[i] == '(') {
            operationStack.push(newExpr[i])
            continue;
        }

        if (operationStack.length == 0) {
            operationStack.push(newExpr[i])
            continue;
        }

        if (newExpr[i] !== ")") {     //если это +-*/ и это не закрывающаяся скобка
            if (operationStack[operationStack.length - 1] !== '(') {    //если последний элемент не открывающаяся скобка
                if (priorities[newExpr[i]] > priorities[operationStack[operationStack.length - 1]]) {   //если преоритет текущего больше того что в стэке
                    operationStack.push(newExpr[i])
                    continue;
                }
                else {
                    while (true) {
                        numbersStack.push(operations(numbersStack.pop(), numbersStack.pop(), operationStack.pop()))
                        if (priorities[newExpr[i]] == '(' || operationStack[operationStack.length - 1] == '(' || operationStack.length == 0 || priorities[newExpr[i]] > priorities[operationStack[operationStack.length - 1]]) {
                            operationStack.push(newExpr[i])
                            break
                        }
                    }
                }
            }
            else {  // если открывающаяся скобка, то просто пушим операцию
                operationStack.push(newExpr[i])
                continue;
            }
        }
        else {  //если встретили закрывающуюся скобку
            while (true) {
                numbersStack.push(operations(numbersStack.pop(), numbersStack.pop(), operationStack.pop()));

                if (operationStack[operationStack.length - 1] == '(') {
                    operationStack.pop();
                    break;
                }
            }
        }
    }
}

module.exports = {
    expressionCalculator
}