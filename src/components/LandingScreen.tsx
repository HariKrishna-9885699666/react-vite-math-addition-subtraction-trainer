import React from 'react';
import { Calculator, Play, ArrowLeft } from 'lucide-react';

interface LandingScreenProps {
  studentName: string;
  onStart: () => void;
  onBack: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({ studentName, onStart, onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full text-center">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 p-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
            <Calculator className="w-10 h-10 text-blue-600" />
          </div>
          <p className="text-lg text-blue-600 font-medium mb-2">
            Hello, {studentName}! 👋
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Math Practice
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Addition & Subtraction
          </p>
          <p className="text-sm text-gray-500">
            Practice with 10 fun problems!
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Addition & Subtraction with Place Value
          </p>
        </div>
        
        <button
          onClick={onStart}
          className="group bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl w-full flex items-center justify-center gap-3"
        >
          <Play className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          Start Practice
        </button>
        
        <div className="mt-6 text-xs text-gray-400">
          Mobile-friendly • Kid-safe • Fun learning
        </div>
      </div>
    </div>
  );
};