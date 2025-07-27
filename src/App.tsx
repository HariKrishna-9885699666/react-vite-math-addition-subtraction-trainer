import { useState, useCallback } from 'react';
import { NameEntryScreen } from './components/NameEntryScreen';
import { LandingScreen } from './components/LandingScreen';
import { QuestionScreen } from './components/QuestionScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { generateQuestions } from './utils/mathGenerator';
import { Question, Screen } from './types';
import UserProfileModal from './components/UserProfileModal';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('name-entry');
  const [studentName, setStudentName] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleNameSubmit = useCallback((name: string) => {
    setStudentName(name);
    setCurrentScreen('landing');
  }, []);

  const startGame = useCallback(() => {
    const newQuestions = generateQuestions(10);
    setQuestions(newQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setCurrentScreen('game');
  }, []);

  const handleAnswer = useCallback((answer: number, carryValues: { hundreds?: number; tens?: number }) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].userAnswer = answer;
    updatedQuestions[currentQuestionIndex].carryValues = carryValues;
    
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
    
    setQuestions(updatedQuestions);
    
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setCurrentScreen('results');
    }
  }, [questions, currentQuestionIndex]);

  const goBackToNameEntry = useCallback(() => {
    setCurrentScreen('name-entry');
    setStudentName('');
  }, []);

  const goBackToLanding = useCallback(() => {
    setCurrentScreen('landing');
  }, []);

  const goBackToGame = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      setCurrentScreen('landing');
    }
  }, [currentQuestionIndex]);

  const restart = useCallback(() => {
    setCurrentScreen('name-entry');
    setStudentName('');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
  }, []);

  return (
    <div className="font-sans antialiased">
      {currentScreen === 'name-entry' && (
        <NameEntryScreen onNameSubmit={handleNameSubmit} />
      )}
      
      {currentScreen === 'landing' && (
        <LandingScreen
          studentName={studentName}
          onStart={startGame}
          onBack={goBackToNameEntry}
        />
      )}
      
      {currentScreen === 'game' && questions.length > 0 && (
        <QuestionScreen
          question={questions[currentQuestionIndex]}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
          onBack={goBackToGame}
        />
      )}
      
      {currentScreen === 'results' && (
        <ResultsScreen
          questions={questions}
          score={score}
          studentName={studentName}
          onRestart={restart}
          onBack={goBackToLanding}
        />
      )}
        <UserProfileModal />
    </div>
  );
}

export default App;