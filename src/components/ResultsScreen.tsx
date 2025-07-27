import React from 'react';
import { Question } from '../types';
import { Trophy, RotateCcw, CheckCircle, XCircle, ArrowLeft, User } from 'lucide-react';

interface ResultsScreenProps {
  questions: Question[];
  score: number;
  studentName: string;
  onRestart: () => void;
  onBack: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  questions,
  score,
  studentName,
  onRestart,
  onBack,
}) => {
  const percentage = Math.round((score / questions.length) * 100);
  
  const getEncouragementMessage = () => {
    if (percentage === 100) return "Perfect! Outstanding work! 🌟";
    if (percentage >= 80) return "Excellent job! Keep it up! 🎉";
    if (percentage >= 60) return "Good work! You're improving! 👍";
    return "Keep practicing! You're doing great! 💪";
  };

  const getScoreColor = () => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-orange-600";
  };

  const formatNumber = (num: number) => {
    const str = num.toString().padStart(3, '0');
    return {
      hundreds: str[0] === '0' ? '' : str[0],
      tens: str[1] === '0' && str[0] === '0' ? '' : str[1],
      ones: str[2]
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 max-w-4xl w-full relative">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 p-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-8 mt-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-6">
            <Trophy className="w-10 h-10 text-yellow-600" />
          </div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <User className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              {studentName}'s Math Report
            </h2>
          </div>
          <p className="text-lg text-gray-600 mb-4">
            {getEncouragementMessage()}
          </p>
          <div className={`text-4xl md:text-5xl font-bold ${getScoreColor()}`}>
            {score}/{questions.length}
          </div>
          <div className={`text-lg ${getScoreColor()}`}>
            {percentage}% Correct
          </div>
        </div>

        {/* Detailed Review Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
            Detailed Answer Review
          </h3>
          <div className="space-y-6 max-h-96 overflow-y-auto">
            {questions.map((question, index) => {
              const isCorrect = question.userAnswer === question.correctAnswer;
              const userDigits = formatNumber(question.userAnswer || 0);
              const correctDigits = formatNumber(question.correctAnswer);
              const num1Digits = formatNumber(question.num1);
              const num2Digits = formatNumber(question.num2);
              
              return (
                <div
                  key={question.id}
                  className={`p-6 rounded-xl border-2 ${
                    isCorrect
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-600" />
                      )}
                      <span className="font-bold text-lg">
                        Problem {index + 1}
                      </span>
                    </div>
                    <div className={`font-bold text-lg ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                      {isCorrect ? 'Correct!' : 'Incorrect'}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Problem Display */}
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-3">Problem:</h4>
                      <div className="bg-white border border-gray-300 rounded-lg overflow-hidden max-w-xs">
                        {/* Header */}
                        <div className="grid grid-cols-3 bg-gray-100 text-xs">
                          <div className="border-r border-gray-300 p-2 text-center font-bold">H</div>
                          <div className="border-r border-gray-300 p-2 text-center font-bold">T</div>
                          <div className="p-2 text-center font-bold">O</div>
                        </div>
                        {/* First number */}
                        <div className="grid grid-cols-3 border-b border-gray-300">
                          <div className="border-r border-gray-300 p-2 text-center bg-blue-50">
                            <span className="font-bold text-blue-600">{num1Digits.hundreds}</span>
                          </div>
                          <div className="border-r border-gray-300 p-2 text-center bg-blue-50">
                            <span className="font-bold text-blue-600">{num1Digits.tens}</span>
                          </div>
                          <div className="p-2 text-center bg-blue-50">
                            <span className="font-bold text-blue-600">{num1Digits.ones}</span>
                          </div>
                        </div>
                        {/* Second number with operation */}
                        <div className="grid grid-cols-3 border-b-2 border-gray-400">
                          <div className="border-r border-gray-300 p-2 text-center bg-blue-50 relative">
                            <div className="absolute left-1 top-1/2 transform -translate-y-1/2">
                              <span className="text-blue-500 font-bold text-lg">
                                {question.operation}
                              </span>
                            </div>
                            <span className="font-bold text-blue-600">{num2Digits.hundreds}</span>
                          </div>
                          <div className="border-r border-gray-300 p-2 text-center bg-blue-50">
                            <span className="font-bold text-blue-600">{num2Digits.tens}</span>
                          </div>
                          <div className="p-2 text-center bg-blue-50">
                            <span className="font-bold text-blue-600">{num2Digits.ones}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Answer Comparison */}
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-3">Your Answer vs Correct:</h4>
                      <div className="space-y-3">
                        <div className="bg-white border border-gray-300 rounded-lg overflow-hidden max-w-xs">
                          <div className="bg-yellow-50 p-2 text-center text-sm font-semibold">Your Answer</div>
                          <div className="grid grid-cols-3">
                            <div className="border-r border-gray-300 p-2 text-center">
                              <span className={`font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                {userDigits.hundreds}
                              </span>
                            </div>
                            <div className="border-r border-gray-300 p-2 text-center">
                              <span className={`font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                {userDigits.tens}
                              </span>
                            </div>
                            <div className="p-2 text-center">
                              <span className={`font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                {userDigits.ones}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {!isCorrect && (
                          <div className="bg-white border border-gray-300 rounded-lg overflow-hidden max-w-xs">
                            <div className="bg-green-50 p-2 text-center text-sm font-semibold">Correct Answer</div>
                            <div className="grid grid-cols-3">
                              <div className="border-r border-gray-300 p-2 text-center">
                                <span className="font-bold text-green-600">{correctDigits.hundreds}</span>
                              </div>
                              <div className="border-r border-gray-300 p-2 text-center">
                                <span className="font-bold text-green-600">{correctDigits.tens}</span>
                              </div>
                              <div className="p-2 text-center">
                                <span className="font-bold text-green-600">{correctDigits.ones}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onRestart}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-2xl text-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
        >
          <RotateCcw className="w-6 h-6" />
          Practice Again
        </button>

        <div className="mt-4 text-center text-xs text-gray-400">
          Great job practicing, {studentName}! Keep up the excellent work!
        </div>
      </div>
    </div>
  );
};