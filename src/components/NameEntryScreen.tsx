import React, { useState } from 'react';
import { User, ArrowRight } from 'lucide-react';

interface NameEntryScreenProps {
  onNameSubmit: (name: string) => void;
}

export const NameEntryScreen: React.FC<NameEntryScreenProps> = ({ onNameSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onNameSubmit(name.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <User className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Welcome!
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Let's start your math practice
          </p>
          <p className="text-sm text-gray-500">
            Please enter your name to begin
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-2xl focus:border-green-500 focus:outline-none text-center font-medium"
            maxLength={20}
            autoFocus
          />
          
          <button
            type="submit"
            disabled={!name.trim()}
            className={`group w-full py-4 px-8 rounded-2xl text-lg font-bold transition-all duration-200 transform active:scale-95 flex items-center justify-center gap-3 ${
              name.trim()
                ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl hover:scale-105'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            Continue
          </button>
        </form>
        
        <div className="mt-6 text-xs text-gray-400">
          Your name will appear on your practice report
        </div>
      </div>
    </div>
  );
};