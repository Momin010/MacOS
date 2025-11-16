import React, { useState } from 'react';
import { evaluate, sqrt, pow, sin, cos, tan, log, ln, exp, pi, e } from 'mathjs';

function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState([]);

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculateResult(currentValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(newValue);
      setHistory([...history, `${currentValue} ${operation} ${inputValue} = ${newValue}`]);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const currentValue = previousValue || 0;
      const newValue = calculateResult(currentValue, inputValue, operation);
      setDisplay(String(newValue));
      setHistory([...history, `${currentValue} ${operation} ${inputValue} = ${newValue}`]);
      setPreviousValue(null);
      setOperation(null);
    }
    setWaitingForOperand(true);
  };

  const calculateResult = (firstValue, secondValue, operation) => {
    try {
      const expression = `${firstValue} ${operation} ${secondValue}`;
      return evaluate(expression);
    } catch (error) {
      return NaN;
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const buttons = [
    ['AC', '±', '%', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
  ];

  const scientificButtons = [
    ['sin', 'cos', 'tan', 'sqrt'],
    ['log', 'ln', 'exp', 'x^y'],
    ['π', 'e', 'n!', '1/x']
  ];

  const handleButton = (value) => {
    if (value === 'AC') clear();
    else if (value === '=') calculate();
    else if (['+', '-', '*', '/'].includes(value)) performOperation(value);
    else if (value === '.') inputDecimal();
    else if (['sin', 'cos', 'tan', 'sqrt', 'log', 'ln', 'exp', 'x^y', 'π', 'e', 'n!', '1/x'].includes(value)) performFunction(value);
    else inputDigit(value);
  };

  const performFunction = (func) => {
    const value = parseFloat(display);
    let result;

    try {
      switch (func) {
        case 'sin':
          result = sin(value * Math.PI / 180);
          break;
        case 'cos':
          result = cos(value * Math.PI / 180);
          break;
        case 'tan':
          result = tan(value * Math.PI / 180);
          break;
        case 'sqrt':
          result = sqrt(value);
          break;
        case 'log':
          result = log(value, 10);
          break;
        case 'ln':
          result = ln(value);
          break;
        case 'exp':
          result = exp(value);
          break;
        case 'x^y':
          setOperation('^');
          setPreviousValue(value);
          setWaitingForOperand(true);
          return;
        case 'π':
          result = pi;
          break;
        case 'e':
          result = e;
          break;
        case 'n!':
          result = evaluate(`${value}!`);
          break;
        case '1/x':
          result = 1 / value;
          break;
      }

      if (result !== undefined) {
        setDisplay(result.toString());
        setHistory([...history, `${func}(${value}) = ${result}`]);
      }
    } catch (error) {
      setDisplay('Error');
    }
  };

  return (
    <div className="calculator">
      <div className="calculator-display">{display}</div>
      <div className="calculator-buttons">
        {buttons.map((row, rowIndex) => (
          <div key={rowIndex} className="button-row">
            {row.map(btn => (
              <button
                key={btn}
                className={`btn ${btn === '0' ? 'zero' : ''} ${['+', '-', '*', '/', '='].includes(btn) ? 'operator' : ''} ${btn === '=' ? 'equals' : ''}`}
                onClick={() => handleButton(btn)}
              >
                {btn}
              </button>
            ))}
          </div>
        ))}
        {scientificButtons.map((row, rowIndex) => (
          <div key={`sci-${rowIndex}`} className="button-row">
            {row.map(btn => (
              <button
                key={btn}
                className="btn function"
                onClick={() => handleButton(btn)}
              >
                {btn}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="calculator-history">
        <h4>History</h4>
        <div className="history-list">
          {history.map((item, index) => (
            <div key={index} className="history-item">{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calculator;