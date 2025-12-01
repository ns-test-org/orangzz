'use client';

import { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const clearEntry = () => {
    setDisplay('0');
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const buttons = [
    { label: 'C', onClick: clear, className: 'bg-orange-600 hover:bg-orange-700 text-white font-bold' },
    { label: 'CE', onClick: clearEntry, className: 'bg-orange-600 hover:bg-orange-700 text-white font-bold' },
    { label: '÷', onClick: () => inputOperation('÷'), className: 'bg-orange-500 hover:bg-orange-600 text-white font-bold' },
    { label: '×', onClick: () => inputOperation('×'), className: 'bg-orange-500 hover:bg-orange-600 text-white font-bold' },
    
    { label: '7', onClick: () => inputNumber('7'), className: 'bg-orange-200 hover:bg-orange-300 text-orange-900 font-semibold' },
    { label: '8', onClick: () => inputNumber('8'), className: 'bg-orange-200 hover:bg-orange-300 text-orange-900 font-semibold' },
    { label: '9', onClick: () => inputNumber('9'), className: 'bg-orange-200 hover:bg-orange-300 text-orange-900 font-semibold' },
    { label: '-', onClick: () => inputOperation('-'), className: 'bg-orange-500 hover:bg-orange-600 text-white font-bold' },
    
    { label: '4', onClick: () => inputNumber('4'), className: 'bg-orange-200 hover:bg-orange-300 text-orange-900 font-semibold' },
    { label: '5', onClick: () => inputNumber('5'), className: 'bg-orange-200 hover:bg-orange-300 text-orange-900 font-semibold' },
    { label: '6', onClick: () => inputNumber('6'), className: 'bg-orange-200 hover:bg-orange-300 text-orange-900 font-semibold' },
    { label: '+', onClick: () => inputOperation('+'), className: 'bg-orange-500 hover:bg-orange-600 text-white font-bold' },
    
    { label: '1', onClick: () => inputNumber('1'), className: 'bg-orange-200 hover:bg-orange-300 text-orange-900 font-semibold' },
    { label: '2', onClick: () => inputNumber('2'), className: 'bg-orange-200 hover:bg-orange-300 text-orange-900 font-semibold' },
    { label: '3', onClick: () => inputNumber('3'), className: 'bg-orange-200 hover:bg-orange-300 text-orange-900 font-semibold' },
    { label: '=', onClick: performCalculation, className: 'bg-orange-600 hover:bg-orange-700 text-white font-bold row-span-2' },
    
    { label: '0', onClick: () => inputNumber('0'), className: 'bg-orange-200 hover:bg-orange-300 text-orange-900 font-semibold col-span-2' },
    { label: '.', onClick: inputDecimal, className: 'bg-orange-200 hover:bg-orange-300 text-orange-900 font-semibold' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
      {/* Animated background grid */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-full bg-orange-300 animate-pulse"
              style={{
                left: `${(i + 1) * 5}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: '3s'
              }}
            />
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute w-full h-px bg-orange-300 animate-pulse"
              style={{
                top: `${(i + 1) * 5}%`,
                animationDelay: `${i * 0.15}s`,
                animationDuration: '3s'
              }}
            />
          ))}
        </div>
      </div>

      {/* Calculator */}
      <div className="relative z-10 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-sm w-full border border-orange-200">
        <h1 className="text-2xl font-bold text-orange-800 text-center mb-6">Calculator</h1>
        
        {/* Display */}
        <div className="bg-orange-900 rounded-xl p-6 mb-6 shadow-inner">
          <div className="text-right text-3xl font-mono text-orange-100 min-h-[3rem] flex items-center justify-end overflow-hidden">
            {display}
          </div>
        </div>

        {/* Button Grid */}
        <div className="grid grid-cols-4 gap-3">
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={button.onClick}
              className={`
                ${button.className}
                h-16 rounded-xl text-xl transition-all duration-200 
                transform hover:scale-105 active:scale-95 
                shadow-lg hover:shadow-xl
                ${button.label === '=' ? 'row-span-2' : ''}
                ${button.label === '0' ? 'col-span-2' : ''}
              `}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

