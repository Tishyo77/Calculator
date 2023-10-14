import React, { useState } from 'react';
import './Calculator.css';

function App() 
{
  const [display, setDisplay] = useState('0');
  const [operator, setOperator] = useState(null);
  const [prevValue, setPrevValue] = useState(null);

  const handleNumberClick = (number) => 
  {
    setDisplay(display === '0' ? number : display + number);
  };

  const handleOperatorClick = (op) => 
  {
    if (prevValue === null) 
    {
      setPrevValue(parseFloat(display));
      setDisplay('0');
      setOperator(op);
    } 
    else 
    {
      const result = calculate(prevValue, parseFloat(display), operator);
      setPrevValue(result);
      setDisplay('0');
      setOperator(op);
    }
  };

  const handleEqualClick = () => 
  {
    if (prevValue !== null) 
    {
      const result = calculate(prevValue, parseFloat(display), operator);
      setPrevValue(result);
      setDisplay(result.toString());
      setOperator(null);
    }
  };

  const handleClear = () => 
  {
    setDisplay('0');
    setOperator(null);
    setPrevValue(null);
  };

  const calculate = (a, b, op) => 
  {
    switch (op) 
    {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '/':
        return a / b;
      default:
        return b;
    }
  };

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="buttons">
        {[7, 8, 9, '+', 4, 5, 6, '-', 1, 2, 3, '*', 0, 'C', '=', '/'].map((item, index) => 
        (
          <button key={index} onClick={() => 
          {
            if (typeof item === 'number' || item === 0) 
              handleNumberClick(item.toString());
            else if (item === 'C') 
              handleClear();
            else if (item === '=') 
              handleEqualClick();
            else
              handleOperatorClick(item);
          }}>{item}</button>
        ))}
      </div>
    </div>
  );
}

export default App;
