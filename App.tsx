// FIX: Replaced placeholder content with the full implementation for the App component.
import React, { useState, useCallback } from 'react';
import GameScreen from './components/GameScreen';
import StartScreen from './components/StartScreen';
import GameOverScreen from './components/GameOverScreen';
import LoadingSpinner from './components/LoadingSpinner';
import { getNextStep } from './services/geminiService';
import type { GameStep, Achievement, Difficulty } from './types';
import { checkAchievements, allAchievements } from './services/achievements';
import AchievementToast from './components/AchievementToast';
import AchievementsModal from './components/AchievementsModal';
import { audioService } from './services/audioService';

type GameState = 'start' | 'playing' | 'loading' | 'gameover' | 'error';

function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [currentStep, setCurrentStep] = useState<GameStep | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isProblemSolved, setIsProblemSolved] = useState(false);
  const [isChoicesLoading, setIsChoicesLoading] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');

  // Achievements state
  const [achievements, setAchievements] = useState<Achievement[]>(allAchievements);
  const [unlockedAchievement, setUnlockedAchievement] = useState<Achievement | null>(null);
  const [isAchievementsModalOpen, setIsAchievementsModalOpen] = useState(false);
  const [stats, setStats] = useState({ problemsSolved: 0, questsCompleted: 0 });

  const handleStart = useCallback(async (selectedDifficulty: Difficulty) => {
    audioService.playStartSound();
    setGameState('loading');
    setError(null);
    setDifficulty(selectedDifficulty);
    try {
      const firstStep = await getNextStep(undefined, selectedDifficulty);
      setCurrentStep(firstStep);
      setGameState('playing');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setGameState('error');
    }
  }, []);

  const handleRestart = () => {
    setCurrentStep(null);
    setUserAnswer('');
    setFeedback('');
    setIsProblemSolved(false);
    setError(null);
    setGameState('start');
    const newStats = { ...stats, questsCompleted: stats.questsCompleted + 1 };
    setStats(newStats);
    const newlyUnlocked = checkAchievements(newStats, achievements);
    if (newlyUnlocked) {
        setUnlockedAchievement(newlyUnlocked);
        setAchievements(prev => prev.map(a => a.id === newlyUnlocked.id ? { ...a, unlocked: true } : a));
        setTimeout(() => setUnlockedAchievement(null), 4000); // Hide toast after 4s
    }
  };

  const handleAnswerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentStep) return;

    if (parseInt(userAnswer, 10) === currentStep.correctAnswer) {
      audioService.playCorrectSound();
      setFeedback('Correct! The path is clear.');
      setIsProblemSolved(true);
      
      const newStats = { ...stats, problemsSolved: stats.problemsSolved + 1 };
      setStats(newStats);

      const newlyUnlocked = checkAchievements(newStats, achievements);
      if (newlyUnlocked) {
        setUnlockedAchievement(newlyUnlocked);
        setAchievements(prev => prev.map(a => a.id === newlyUnlocked.id ? { ...a, unlocked: true } : a));
        setTimeout(() => setUnlockedAchievement(null), 4000); // Hide toast after 4s
      }

    } else {
      audioService.playIncorrectSound();
      setFeedback('Not quite! Try another calculation.');
    }
  };

  const handleChoiceSelect = async (choice: string) => {
    audioService.playChoiceSound();
    setIsChoicesLoading(true);
    setUserAnswer('');
    setFeedback('');
    setIsProblemSolved(false);
    try {
      const nextStep = await getNextStep(choice, difficulty);
      setCurrentStep(nextStep);
      if (nextStep.choices.length === 0) {
        audioService.playGameOverSound();
        setGameState('gameover');
      } else {
        setGameState('playing');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setGameState('error');
    } finally {
      setIsChoicesLoading(false);
    }
  };

  const renderContent = () => {
    switch (gameState) {
      case 'start':
        return <StartScreen onStart={handleStart} />;
      case 'loading':
        return <div className="flex items-center justify-center h-full"><LoadingSpinner /></div>;
      case 'playing':
        if (!currentStep) return <div className="text-center text-red-500">Error: Game step is missing.</div>;
        return (
          <GameScreen
            step={currentStep}
            onChoiceSelect={handleChoiceSelect}
            isLoading={isChoicesLoading}
            userAnswer={userAnswer}
            setUserAnswer={setUserAnswer}
            feedback={feedback}
            handleAnswerSubmit={handleAnswerSubmit}
            isProblemSolved={isProblemSolved}
          />
        );
      case 'gameover':
        return <GameOverScreen onRestart={handleRestart} message={currentStep?.story || 'Your quest is complete!'} />;
      case 'error':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center text-red-700">
            <h2 className="text-2xl font-bold mb-4">An Error Occurred</h2>
            <p className="mb-4">{error}</p>
            <button onClick={() => handleStart(difficulty)} className="px-6 py-2 bg-red-500 text-white rounded">
              Try Again
            </button>
          </div>
        );
      default:
        return <StartScreen onStart={handleStart} />;
    }
  };

  return (
    <main className="container mx-auto p-4 md:p-8 h-screen bg-amber-50/50 font-serif text-stone-900">
      <div className="bg-white/70 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-2xl border border-stone-200 h-full overflow-hidden relative">
        <header className="flex justify-between items-center mb-4 border-b-2 border-amber-800/20 pb-2">
            <h1 className="text-3xl md:text-4xl font-bold text-amber-900" style={{fontFamily: "'Cinzel Decorative', cursive", textShadow: '1px 1px 1px rgba(0,0,0,0.1)'}}>
              Aethelgard's Echoes
            </h1>
            <button
              onClick={() => setIsAchievementsModalOpen(true)}
              className="p-2 rounded-full hover:bg-amber-200/50 transition"
              aria-label="View Achievements"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-700" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
            </button>
        </header>

        <div className="h-[calc(100%-60px)]">
          {renderContent()}
        </div>
        
        {unlockedAchievement && <AchievementToast achievement={unlockedAchievement} />}
        
        {isAchievementsModalOpen && (
          <AchievementsModal 
            achievements={achievements} 
            onClose={() => setIsAchievementsModalOpen(false)}
          />
        )}
      </div>
    </main>
  );
}

export default App;