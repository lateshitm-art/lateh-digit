import React from 'react';
import type { GameStep } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface GameScreenProps {
  step: GameStep;
  onChoiceSelect: (choice: string) => void;
  isLoading: boolean;
  userAnswer: string;
  setUserAnswer: (answer: string) => void;
  feedback: string;
  handleAnswerSubmit: (e: React.FormEvent) => void;
  isProblemSolved: boolean;
}

interface ChoiceButtonProps {
  choice: string;
  onClick: (choice: string) => void;
  disabled: boolean;
}

const ChoiceButton: React.FC<ChoiceButtonProps> = ({ choice, onClick, disabled }) => (
    <button
    onClick={() => onClick(choice)}
    disabled={disabled}
    className={`w-full text-left p-4 font-bold rounded-lg border-b-4 transform transition-all duration-150 ease-in-out
      ${
        disabled
          ? 'bg-stone-300 border-stone-400 text-stone-500 cursor-not-allowed shadow-inner'
          : 'bg-gradient-to-b from-amber-500 to-amber-600 border-amber-800 text-white hover:from-amber-400 hover:to-amber-500 hover:-translate-y-0.5 active:translate-y-0.5 active:border-b-2 shadow-lg hover:shadow-xl'
      }`}
  >
    <span className="flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
        {choice}
    </span>
  </button>
);


const GameScreen: React.FC<GameScreenProps> = ({
  step,
  onChoiceSelect,
  isLoading,
  userAnswer,
  setUserAnswer,
  feedback,
  handleAnswerSubmit,
  isProblemSolved,
}) => {
  const imageUrl = `https://picsum.photos/seed/${step.problem.replace(/\s/g, '')}/800/400`;

  return (
    <div className="grid md:grid-cols-2 gap-8 h-full fade-in">
      {/* Left Panel: Story and Image */}
      <div className="flex flex-col bg-gradient-to-b from-amber-50 to-amber-100 p-6 rounded-lg border-2 border-stone-300/50 shadow-inner overflow-y-auto max-h-[70vh]">
        <div className="p-2 bg-gradient-to-br from-amber-300 to-amber-500 rounded-md shadow-lg mb-4">
            <img src={imageUrl} alt="Adventure scene" className="w-full h-48 object-cover rounded-sm shadow-md"/>
        </div>
        <div className="prose max-w-none text-stone-800">
          <p className="text-lg leading-relaxed">{step.story}</p>
        </div>
      </div>

      {/* Right Panel: Problem and Choices */}
      <div className="flex flex-col justify-between">
        <div className="bg-gradient-to-br from-stone-200 to-stone-400 p-6 rounded-lg border-2 border-stone-500/50 shadow-lg">
          <h3 className="text-xl font-bold text-stone-800 mb-2" style={{textShadow: '1px 1px 1px #fff'}}>A Wild Puzzle Appears!</h3>
          <p className="text-stone-700 mb-4">To proceed, you must solve this ancient riddle:</p>
          <div className="text-center bg-stone-100 p-4 rounded-md border border-stone-300 mb-4 shadow-inner">
            <p className="text-3xl font-bold tracking-widest text-stone-900" style={{textShadow: '1px 1px 1px rgba(0,0,0,0.1)'}}>{step.problem}</p>
          </div>
          
          <form onSubmit={handleAnswerSubmit}>
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              disabled={isProblemSolved}
              placeholder="Your answer..."
              aria-label="Enter your answer for the math problem"
              className="w-full p-3 border-2 border-stone-400 bg-stone-50 rounded-md text-center text-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition disabled:bg-stone-300/50 disabled:cursor-not-allowed placeholder:text-stone-500/70"
            />
             {feedback && (
              <p className={`mt-2 text-center font-semibold flex items-center justify-center gap-2 ${isProblemSolved ? 'text-green-800' : 'text-red-800'}`}>
                {isProblemSolved ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                )}
                {feedback}
              </p>
            )}
            {!isProblemSolved && (
              <button type="submit" className="w-full mt-3 p-3 bg-gradient-to-b from-amber-700 to-amber-800 text-white font-bold rounded-lg shadow-[0_4px_#6b460d] hover:shadow-[0_2px_#6b460d] border-b-2 border-amber-900 transform transition-all duration-150 ease-in-out hover:-translate-y-0.5 active:translate-y-1 active:shadow-none">
                Solve Puzzle
              </button>
            )}
          </form>
        </div>

        <div className="mt-6 relative">
          <div className={`transition-opacity duration-500 ${isProblemSolved ? 'opacity-100' : 'opacity-25 pointer-events-none'}`}>
            <h3 className="text-xl font-bold text-stone-800 mb-3">What will you do?</h3>
            <div className="space-y-3">
              {step.choices.map((choice, index) => (
                <ChoiceButton key={index} choice={choice} onClick={onChoiceSelect} disabled={!isProblemSolved} />
              ))}
            </div>
          </div>
           {isLoading && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
                <LoadingSpinner />
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default GameScreen;