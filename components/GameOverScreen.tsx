import React from 'react';

interface GameOverScreenProps {
  onRestart: () => void;
  message: string;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ onRestart, message }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 fade-in">
      <h2 className="text-4xl font-bold text-amber-900 mb-4" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.2)'}}>The Adventure Concludes</h2>
       <div className="text-lg text-stone-700 max-w-2xl mb-8 p-4 bg-amber-100/50 border-2 border-amber-800/20 rounded-lg">
        {message}
      </div>
      <button
        onClick={onRestart}
        className="mt-4 px-10 py-5 bg-gradient-to-b from-amber-600 to-amber-800 text-white font-bold text-2xl rounded-lg shadow-[0_5px_#6b460d] hover:shadow-[0_3px_#6b460d] border-b-2 border-amber-900 transform transition-all duration-150 ease-in-out hover:-translate-y-0.5 active:translate-y-1 active:shadow-none"
      >
        Start a New Quest
      </button>
    </div>
  );
};

export default GameOverScreen;