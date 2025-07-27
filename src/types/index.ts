export interface Question {
  id: number;
  num1: number;
  num2: number;
  operation: '+' | '-';
  correctAnswer: number;
  userAnswer?: number;
  carryValues?: {
    hundreds?: number;
    tens?: number;
  };
}

export interface GameState {
  currentQuestionIndex: number;
  questions: Question[];
  isComplete: boolean;
  score: number;
  studentName: string;
}

export type Screen = 'name-entry' | 'landing' | 'game' | 'results';