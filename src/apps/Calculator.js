import React, { useState } from 'react';

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
    switch (operation) {
      case '+': return firstValue + secondValue;
      case '-': return firstValue - secondValue;
      case '*': return firstValue * secondValue;
      case '/': return firstValue / secondValue;
      default: return secondValue;
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

  const handleButton = (value) => {
    if (value === 'AC') clear();
    else if (value === '=') calculate();
    else if (['+', '-', '*', '/'].includes(value)) performOperation(value);
    else if (value === '.') inputDecimal();
    else inputDigit(value);
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