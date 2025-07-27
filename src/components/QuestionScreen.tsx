import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { ArrowRight, CheckCircle, Plus, Minus, ArrowLeft } from 'lucide-react';

interface QuestionScreenProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answer: number, carryValues: { hundreds?: number; tens?: number }) => void;
  onBack: () => void;
}

export const QuestionScreen: React.FC<QuestionScreenProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  onBack,
}) => {
  const [carryHundreds, setCarryHundreds] = useState('');
  const [carryTens, setCarryTens] = useState('');
  const [hundredsInput, setHundredsInput] = useState('');
  const [tensInput, setTensInput] = useState('');
  const [onesInput, setOnesInput] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [question.id]);

  useEffect(() => {
    // Reset inputs when question changes
    setCarryHundreds('');
    setCarryTens('');
    setHundredsInput('');
    setTensInput('');
    setOnesInput('');
  }, [question.id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hundreds = parseInt(hundredsInput || '0', 10);
    const tens = parseInt(tensInput || '0', 10);
    const ones = parseInt(onesInput || '0', 10);
    const answer = hundreds * 100 + tens * 10 + ones;
    
    const carryValues = {
      hundreds: carryHundreds ? parseInt(carryHundreds, 10) : undefined,
      tens: carryTens ? parseInt(carryTens, 10) : undefined,
    };
    
    onAnswer(answer, carryValues);
  };

  const formatNumber = (num: number) => {
    const str = num.toString().padStart(3, '0');
    return {
      hundreds: str[0] === '0' ? '' : str[0],
      tens: str[1] === '0' && str[0] === '0' ? '' : str[1],
      ones: str[2]
    };
  };

  const num1Digits = formatNumber(question.num1);
  const num2Digits = formatNumber(question.num2);

  // Check if all required fields are filled
  const isValidInput = onesInput !== '' && (tensInput !== '' || question.num1 < 10) && 
                      (hundredsInput !== '' || question.num1 < 100);


  // Helper for up/down buttons (for answer digits)
  const handleDigitChange = (value: string, setter: (val: string) => void, direction: 'up' | 'down') => {
    let num = value === '' ? 0 : parseInt(value, 10);
    if (direction === 'up') {
      num = (num + 1) % 10;
    } else {
      num = (num - 1 + 10) % 10;
    }
    setter(num.toString());
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className={`bg-white rounded-3xl shadow-2xl p-6 md:p-10 max-w-2xl w-full transition-all duration-300 relative ${
        isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
      }`}>
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 p-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        {/* Progress Bar */}
        <div className="mb-8 mt-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Question {questionNumber} of {totalQuestions}
            </span>
            <span className="text-sm font-medium text-blue-600">
              {Math.round((questionNumber / totalQuestions) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Place Value Table */}
        <div className="mb-8">
          <div className="bg-white border-2 border-gray-400 rounded-lg overflow-hidden mx-auto max-w-md">
            {/* Carry Row with Up/Down Buttons */}
            <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-300">
              {/* Carry Hundreds */}
              <div className="border-r border-gray-300 p-2 text-center flex flex-col items-center justify-center gap-0.5">
                <div className="text-xs text-gray-500 mb-1">Carry</div>
                <button
                  type="button"
                  className="w-6 h-6 flex items-center justify-center bg-blue-100 rounded-full hover:bg-blue-200 mb-0.5"
                  onClick={() => handleDigitChange(carryHundreds, setCarryHundreds, 'up')}
                  tabIndex={-1}
                  aria-label="Increase carry hundreds"
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 15l-6-6-6 6"/></svg>
                </button>
                <div className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center bg-white text-sm font-bold select-none">
                  {carryHundreds || ''}
                </div>
                <button
                  type="button"
                  className="w-6 h-6 flex items-center justify-center bg-blue-100 rounded-full hover:bg-blue-200 mt-0.5"
                  onClick={() => handleDigitChange(carryHundreds, setCarryHundreds, 'down')}
                  tabIndex={-1}
                  aria-label="Decrease carry hundreds"
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
                </button>
              </div>
              {/* Carry Tens */}
              <div className="border-r border-gray-300 p-2 text-center flex flex-col items-center justify-center gap-0.5">
                <div className="text-xs text-gray-500 mb-1">Carry</div>
                <button
                  type="button"
                  className="w-6 h-6 flex items-center justify-center bg-blue-100 rounded-full hover:bg-blue-200 mb-0.5"
                  onClick={() => handleDigitChange(carryTens, setCarryTens, 'up')}
                  tabIndex={-1}
                  aria-label="Increase carry tens"
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 15l-6-6-6 6"/></svg>
                </button>
                <div className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center bg-white text-sm font-bold select-none">
                  {carryTens || ''}
                </div>
                <button
                  type="button"
                  className="w-6 h-6 flex items-center justify-center bg-blue-100 rounded-full hover:bg-blue-200 mt-0.5"
                  onClick={() => handleDigitChange(carryTens, setCarryTens, 'down')}
                  tabIndex={-1}
                  aria-label="Decrease carry tens"
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
                </button>
              </div>
              {/* Carry Ones (empty) */}
              <div className="p-2 text-center flex flex-col items-center justify-center gap-0.5">
                <div className="text-xs text-gray-500 mb-1">Carry</div>
                <div className="w-8 h-8"></div>
              </div>
            </div>

            {/* Header Row */}
            <div className="grid grid-cols-3 bg-gray-100 border-b border-gray-300">
              <div className="border-r border-gray-300 p-4 text-center font-bold text-lg text-gray-700">
                Hundreds
              </div>
              <div className="border-r border-gray-300 p-4 text-center font-bold text-lg text-gray-700">
                Tens
              </div>
              <div className="p-4 text-center font-bold text-lg text-gray-700">
                Ones
              </div>
            </div>

            {/* First Number Row */}
            <div className="grid grid-cols-3 border-b border-gray-300">
              <div className="border-r border-gray-300 p-4 text-center">
                <div className="w-12 h-12 border-2 border-gray-300 rounded flex items-center justify-center mx-auto bg-blue-50">
                  <span className="text-2xl font-bold text-blue-600">
                    {num1Digits.hundreds}
                  </span>
                </div>
              </div>
              <div className="border-r border-gray-300 p-4 text-center">
                <div className="w-12 h-12 border-2 border-gray-300 rounded flex items-center justify-center mx-auto bg-blue-50">
                  <span className="text-2xl font-bold text-blue-600">
                    {num1Digits.tens}
                  </span>
                </div>
              </div>
              <div className="p-4 text-center">
                <div className="w-12 h-12 border-2 border-gray-300 rounded flex items-center justify-center mx-auto bg-blue-50">
                  <span className="text-2xl font-bold text-blue-600">
                    {num1Digits.ones}
                  </span>
                </div>
              </div>
            </div>

            {/* Operation Row */}
            <div className="grid grid-cols-3 border-b-2 border-gray-400">
              <div className="border-r border-gray-300 p-4 text-center relative">
                <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
                  {question.operation === '+' ? (
                    <Plus className="w-8 h-8 text-blue-500" />
                  ) : (
                    <Minus className="w-8 h-8 text-red-500" />
                  )}
                </div>
                <div className="w-12 h-12 border-2 border-gray-300 rounded flex items-center justify-center mx-auto bg-blue-50">
                  <span className="text-2xl font-bold text-blue-600">
                    {num2Digits.hundreds}
                  </span>
                </div>
              </div>
              <div className="border-r border-gray-300 p-4 text-center">
                <div className="w-12 h-12 border-2 border-gray-300 rounded flex items-center justify-center mx-auto bg-blue-50">
                  <span className="text-2xl font-bold text-blue-600">
                    {num2Digits.tens}
                  </span>
                </div>
              </div>
              <div className="p-4 text-center">
                <div className="w-12 h-12 border-2 border-gray-300 rounded flex items-center justify-center mx-auto bg-blue-50">
                  <span className="text-2xl font-bold text-blue-600">
                    {num2Digits.ones}
                  </span>
                </div>
              </div>
            </div>

            {/* Answer Row with Up/Down Buttons */}
            <div className="grid grid-cols-3 bg-yellow-50">
              {/* Hundreds */}
              <div className="border-r border-gray-300 p-4 text-center flex flex-col items-center justify-center gap-1">
                <button
                  type="button"
                  className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full hover:bg-blue-200 mb-1"
                  onClick={() => handleDigitChange(hundredsInput, setHundredsInput, 'up')}
                  tabIndex={-1}
                  aria-label="Increase hundreds"
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 15l-6-6-6 6"/></svg>
                </button>
                <div className="w-12 h-12 border-2 border-gray-400 rounded flex items-center justify-center bg-white text-2xl font-bold select-none">
                  {hundredsInput || ''}
                </div>
                <button
                  type="button"
                  className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full hover:bg-blue-200 mt-1"
                  onClick={() => handleDigitChange(hundredsInput, setHundredsInput, 'down')}
                  tabIndex={-1}
                  aria-label="Decrease hundreds"
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
                </button>
              </div>
              {/* Tens */}
              <div className="border-r border-gray-300 p-4 text-center flex flex-col items-center justify-center gap-1">
                <button
                  type="button"
                  className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full hover:bg-blue-200 mb-1"
                  onClick={() => handleDigitChange(tensInput, setTensInput, 'up')}
                  tabIndex={-1}
                  aria-label="Increase tens"
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 15l-6-6-6 6"/></svg>
                </button>
                <div className="w-12 h-12 border-2 border-gray-400 rounded flex items-center justify-center bg-white text-2xl font-bold select-none">
                  {tensInput || ''}
                </div>
                <button
                  type="button"
                  className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full hover:bg-blue-200 mt-1"
                  onClick={() => handleDigitChange(tensInput, setTensInput, 'down')}
                  tabIndex={-1}
                  aria-label="Decrease tens"
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
                </button>
              </div>
              {/* Ones */}
              <div className="p-4 text-center flex flex-col items-center justify-center gap-1">
                <button
                  type="button"
                  className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full hover:bg-blue-200 mb-1"
                  onClick={() => handleDigitChange(onesInput, setOnesInput, 'up')}
                  tabIndex={-1}
                  aria-label="Increase ones"
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 15l-6-6-6 6"/></svg>
                </button>
                <div className="w-12 h-12 border-2 border-gray-400 rounded flex items-center justify-center bg-white text-2xl font-bold select-none">
                  {onesInput || ''}
                </div>
                <button
                  type="button"
                  className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full hover:bg-blue-200 mt-1"
                  onClick={() => handleDigitChange(onesInput, setOnesInput, 'down')}
                  tabIndex={-1}
                  aria-label="Decrease ones"
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-6 text-center">
          <p className="text-sm text-gray-600 mb-2">
            Fill in all answer boxes to continue
          </p>
          <p className="text-xs text-gray-500">
            Use carry boxes if you need to regroup
          </p>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!isValidInput}
          className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-200 transform active:scale-95 flex items-center justify-center gap-3 ${
            isValidInput
              ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl hover:scale-105'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {questionNumber === totalQuestions ? (
            <>
              <CheckCircle className="w-6 h-6" />
              Finish Practice
            </>
          ) : (
            <>
              <ArrowRight className="w-6 h-6" />
              Next Question
            </>
          )}
        </button>
      </div>
    </div>
  );
};