import React, { useState } from 'react';
import type { Difficulty } from '../types';

interface StartScreenProps {
  onStart: (difficulty: Difficulty) => void;
}

const difficultyLevels: { id: Difficulty; name: string; description: string }[] = [
    { id: 'easy', name: 'Easy', description: '1-digit × 1-digit' },
    { id: 'medium', name: 'Medium', description: '2-digit × 1-digit' },
    { id: 'hard', name: 'Hard', description: '2-digit × 2-digit' },
];

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);

  const handleStartClick = () => {
    if (selectedDifficulty) {
      onStart(selectedDifficulty);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 fade-in">
      <h2 className="text-4xl font-bold text-amber-900 mb-4" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.2)'}}>Welcome, Adventurer!</h2>
      <p className="text-lg text-stone-700 max-w-2xl mb-8">
        The enchanted kingdom of Aethelgard awaits! Your quest is to navigate its magical lands, but be warned - mystical puzzles block your path. Use your multiplication skills to solve them and forge your destiny.
      </p>

      <div className="mb-8">
        <h3 className="text-2xl font-bold text-amber-800 mb-4">Choose Your Challenge</h3>
        <div className="flex justify-center gap-4">
          {difficultyLevels.map((level) => (
            <button
              key={level.id}
              onClick={() => setSelectedDifficulty(level.id)}
              className={`px-6 py-3 rounded-lg border-b-4 transform transition-all duration-150 ease-in-out text-white font-bold
                ${selectedDifficulty === level.id 
                  ? 'bg-amber-700 border-amber-900 shadow-inner' 
                  : 'bg-stone-500 border-stone-700 hover:bg-stone-600 hover:-translate-y-px'
                }`}
            >
              <span className="text-xl">{level.name}</span>
              <span className="block text-xs opacity-80">{level.description}</span>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleStartClick}
        disabled={!selectedDifficulty}
        className="px-10 py-5 bg-gradient-to-b from-amber-600 to-amber-800 text-white font-bold text-2xl rounded-lg shadow-[0_5px_#6b460d] hover:shadow-[0_3px_#6b460d] border-b-2 border-amber-900 transform transition-all duration-150 ease-in-out hover:-translate-y-0.5 active:translate-y-1 active:shadow-none disabled:bg-stone-400 disabled:shadow-none disabled:cursor-not-allowed disabled:border-stone-500"
      >
        Begin Your Quest
      </button>
    </div>
  );
};

export default StartScreen;