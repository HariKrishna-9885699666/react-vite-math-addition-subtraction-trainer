import { Question } from '../types';

export const generateRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateQuestion = (id: number): Question => {
  // Mix of 2-digit (10-99) and 3-digit (100-999) numbers
  const use3Digit = Math.random() > 0.5;
  const num1 = use3Digit ? generateRandomNumber(100, 999) : generateRandomNumber(10, 99);
  const num2 = use3Digit ? generateRandomNumber(100, 999) : generateRandomNumber(10, 99);
  
  // Random operation
  const operation: '+' | '-' = Math.random() > 0.5 ? '+' : '-';
  
  // For subtraction, ensure positive result
  let firstNum = num1;
  let secondNum = num2;
  
  if (operation === '-' && num1 < num2) {
    firstNum = num2;
    secondNum = num1;
  }
  
  const correctAnswer = operation === '+' ? firstNum + secondNum : firstNum - secondNum;
  
  return {
    id,
    num1: firstNum,
    num2: secondNum,
    operation,
    correctAnswer,
  };
};

export const generateQuestions = (count: number = 10): Question[] => {
  return Array.from({ length: count }, (_, index) => generateQuestion(index + 1));
};