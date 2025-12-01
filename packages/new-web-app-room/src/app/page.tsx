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

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Orange Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 animate-pulse-breathing"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-orange-300/30 via-transparent to-orange-700/30 animate-pulse-breathing-reverse"></div>
      
      {/* Calculator */}
      <div className="relative z-10 bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
        <div className="w-80 max-w-full">
          {/* Display */}
          <div className="bg-black/20 rounded-2xl p-6 mb-6 backdrop-blur-sm">
            <div className="text-right text-4xl font-light text-white font-mono overflow-hidden">
              {display}
            </div>
          </div>

          {/* Button Grid */}
          <div className="grid grid-cols-4 gap-3">
            {/* Row 1 */}
            <button
              onClick={clear}
              className="col-span-2 bg-orange-200/20 hover:bg-orange-200/30 text-white rounded-xl p-4 text-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm"
            >
              Clear
            </button>
            <button
              onClick={clearEntry}
              className="bg-orange-200/20 hover:bg-orange-200/30 text-white rounded-xl p-4 text-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm"
            >
              CE
            </button>
            <button
              onClick={() => inputOperation('÷')}
              className="bg-orange-600/40 hover:bg-orange-600/60 text-white rounded-xl p-4 text-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm"
            >
              ÷
            </button>

            {/* Row 2 */}
            <button
              onClick={() => inputNumber('7')}
              className="bg-white/10 hover:bg-white/20 text-white rounded-xl p-4 text-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm"
            >
              7
            </button>
            <button
              onClick={() => inputNumber('8')}
              className="bg-white/10 hover:bg-white/20 text-white rounded-xl p-4 text-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm"
            >
              8
            </button>
            <button
              onClick={() => inputNumber('9')}
              className="bg-white/10 hover:bg-white/20 text-white rounded-xl p-4 text-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm"
            >
              9
            </button>
            <button
              onClick={() => inputOperation('×')}
              className="bg-orange-600/40 hover:bg-orange-600/60 text-white rounded-xl p-4 text-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm"
            >
              ×
            </button>

            {/* Row 3 */}
            <button
              onClick={() => inputNumber('4')}
              className="bg-white/10 hover:bg-white/20 text-white rounded-xl p-4 text-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm"
            >
              4
            </button>
            <button
              onClick={() => inputNumber('5')}
              className="bg-white/10 hover:bg-white/20 text-white rounded-xl p-4 text-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm"
            >
              5
            </button>
            <button
              onClick={() => inputNumber('6')}
              className="bg-white/10 hover:bg-white/20 text-white rounded-xl p-4 text-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm"
            >
              6
            </button>
            <button
              onClick={() => inputOperation('-')}
              className="bg-orange-600/40 hover:bg-orange-600/60 text-white rounded-xl p-4 text-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm"
            >
              −
            </button>

            {/* Row 4 */}
            <button
              onClick={() => inputNumber('1')}
              className="bg-white/10 hover:bg-white/20 text-white rounded-xl p-4 text-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm"
            >
              1
            </button>
            <button
              onClick={() => inputNumber('2')}
              className="bg-white/10 hover:bg-white/20 text-white rounded-xl p-4 text-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm"
            >
              2
            </button>
            <button
              onClick={() => inputNumber('3')}
              className="bg-white/10 hover:bg-white/20 text-white rounded-xl p-4 text-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm"
            >
              3
            </button>
            <button
              onClick={() => inputOperation('+')}
              className="bg-orange-600/40 hover:bg-orange-600/60 text-white rounded-xl p-4 text-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm"
            >
              +
            </button>

            {/* Row 5 */}
            <button
              onClick={() => inputNumber('0')}
              className="col-span-2 bg-white/10 hover:bg-white/20 text-white rounded-xl p-4 text-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm"
            >
              0
            </button>
            <button
              onClick={inputDecimal}
              className="bg-white/10 hover:bg-white/20 text-white rounded-xl p-4 text-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm"
            >
              .
            </button>
            <button
              onClick={performCalculation}
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl p-4 text-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
            >
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

