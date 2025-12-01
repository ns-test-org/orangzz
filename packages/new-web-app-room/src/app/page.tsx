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
      {/* Animated Green Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-green-500 to-green-600 animate-pulse-breathing"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-green-300/30 via-transparent to-green-700/30 animate-pulse-breathing-reverse"></div>
      
      {/* Calculator */}
      <div className="relative z-10 bg-green-800/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-green-400/50">
        <div className="w-80 max-w-full">
          {/* Display */}
          <div className="bg-black/90 rounded-2xl p-6 mb-6 backdrop-blur-sm border border-green-400/30">
            <div className="text-right text-4xl font-light text-green-100 font-mono overflow-hidden">
              {display}
            </div>
          </div>

          {/* Button Grid */}
          <div className="grid grid-cols-4 gap-3">
            {/* Row 1 */}
            <button
              onClick={clear}
              className="col-span-2 bg-purple-500 hover:bg-purple-600 text-white rounded-xl p-4 text-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm border border-purple-400/50"
            >
              Clear
            </button>
            <button
              onClick={clearEntry}
              className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl p-4 text-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm border border-purple-400/50"
            >
              CE
            </button>
            <button
              onClick={() => inputOperation('÷')}
              className="bg-green-600/40 hover:bg-green-600/60 text-white rounded-xl p-4 text-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm"
            >
              ÷
            </button>

            {/* Row 2 */}
            <button
              onClick={() => inputNumber('7')}
              className="bg-green-700/60 hover:bg-green-600/70 text-white rounded-xl p-4 text-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm border border-green-500/30"
            >
              7
            </button>
            <button
              onClick={() => inputNumber('8')}
              className="bg-green-700/60 hover:bg-green-600/70 text-white rounded-xl p-4 text-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm border border-green-500/30"
            >
              8
            </button>
            <button
              onClick={() => inputNumber('9')}
              className="bg-green-700/60 hover:bg-green-600/70 text-white rounded-xl p-4 text-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm border border-green-500/30"
            >
              9
            </button>
            <button
              onClick={() => inputOperation('×')}
              className="bg-green-600/40 hover:bg-green-600/60 text-white rounded-xl p-4 text-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm"
            >
              ×
            </button>

            {/* Row 3 */}
            <button
              onClick={() => inputNumber('4')}
              className="bg-green-700/60 hover:bg-green-600/70 text-white rounded-xl p-4 text-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm border border-green-500/30"
            >
              4
            </button>
            <button
              onClick={() => inputNumber('5')}
              className="bg-green-700/60 hover:bg-green-600/70 text-white rounded-xl p-4 text-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm border border-green-500/30"
            >
              5
            </button>
            <button
              onClick={() => inputNumber('6')}
              className="bg-green-700/60 hover:bg-green-600/70 text-white rounded-xl p-4 text-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm border border-green-500/30"
            >
              6
            </button>
            <button
              onClick={() => inputOperation('-')}
              className="bg-green-600/40 hover:bg-green-600/60 text-white rounded-xl p-4 text-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm"
            >
              −
            </button>

            {/* Row 4 */}
            <button
              onClick={() => inputNumber('1')}
              className="bg-green-700/60 hover:bg-green-600/70 text-white rounded-xl p-4 text-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm border border-green-500/30"
            >
              1
            </button>
            <button
              onClick={() => inputNumber('2')}
              className="bg-green-700/60 hover:bg-green-600/70 text-white rounded-xl p-4 text-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm border border-green-500/30"
            >
              2
            </button>
            <button
              onClick={() => inputNumber('3')}
              className="bg-green-700/60 hover:bg-green-600/70 text-white rounded-xl p-4 text-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm border border-green-500/30"
            >
              3
            </button>
            <button
              onClick={() => inputOperation('+')}
              className="bg-green-600/40 hover:bg-green-600/60 text-white rounded-xl p-4 text-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm"
            >
              +
            </button>

            {/* Row 5 */}
            <button
              onClick={() => inputNumber('0')}
              className="col-span-2 bg-green-700/60 hover:bg-green-600/70 text-white rounded-xl p-4 text-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm border border-green-500/30"
            >
              0
            </button>
            <button
              onClick={inputDecimal}
              className="bg-green-700/60 hover:bg-green-600/70 text-white rounded-xl p-4 text-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm border border-green-500/30"
            >
              .
            </button>
            <button
              onClick={performCalculation}
              className="bg-green-500 hover:bg-green-600 text-white rounded-xl p-4 text-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
            >
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}














