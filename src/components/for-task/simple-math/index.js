class GeneratorExpressions {
  constructor(allowedSymbols) {
    this.maxMultiplyResult = 250;
    this.allowedSymbols = allowedSymbols.split(' ');
  }

  // eslint-disable-next-line class-methods-use-this
  getRandomInt(min, max) {
    return min + Math.floor((Math.random() * (max - min)));
  }

  // eslint-disable-next-line class-methods-use-this
  getDenominator(numerator, denominator) {
    let result = denominator;
    while (result !== 1) {
      if (numerator % result === 0 && denominator < numerator) {
        break;
      }
      result -= 1;
    }
    return result;
  }

  getFactor(number, factor) {
    const biggerThanOne = 5;
    let result = factor * biggerThanOne;
    while (result !== 1) {
      if (Math.abs(number * result) <= this.maxMultiplyResult) {
        break;
      }
      result -= 1;
    }
    return result;
  }

  getExpression() {
    const symbol = this.allowedSymbols[this.getRandomInt(0, this.allowedSymbols.length)];
    let a = this.getRandomInt(0, 100);
    let b = this.getRandomInt(0, 100);
    switch (symbol) {
      case '+':
        return { expected: a + b, expression: `${a} + ${b}` };
      case '-':
        return { expected: a - b, expression: `${a} - ${b}` };
      case '*':
        b = this.getFactor(a, b);
        return { expected: a * b, expression: `${a} * ${b}` };
      case '/':
        b = this.getDenominator(a, b);
        return { expected: a / b, expression: `${a} / ${b}` };
      case '**':
        a = this.getRandomInt(1, 20);
        b = this.getRandomInt(1, 3);
        return { expected: a ** b, expression: `${a} ** ${b}` };
      case '%':
        return { expected: a % b, expression: `${a} % ${b}` };
      default:
        return { expected: null, expression: null };
    }
  }
}


export default { GeneratorExpressions };
