// FIX: Replaced placeholder content with the full implementation for the AchievementsModal component.
import React from 'react';
import type { Achievement } from '../types';

interface AchievementsModalProps {
  achievements: Achievement[];
  onClose: () => void;
}

const AchievementsModal: React.FC<AchievementsModalProps> = ({ achievements, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="achievements-heading"
    >
      <div
        className="bg-amber-50 rounded-2xl shadow-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-8 border-4 border-amber-700/50 animate-slide-up"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <div className="flex justify-between items-center mb-6">
          <h2 id="achievements-heading" className="text-3xl font-bold text-amber-900" style={{fontFamily: "'Cinzel Decorative', cursive"}}>
            Your Achievements
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-amber-200/50 transition-colors"
            aria-label="Close achievements modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <ul className="space-y-4">
          {achievements.map((ach) => (
            <li
              key={ach.id}
              className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${
                ach.unlocked
                  ? 'bg-amber-100/70 border-amber-600/50'
                  : 'bg-stone-200/50 border-stone-300/50 opacity-60'
              }`}
            >
              <span className={`text-4xl p-3 rounded-md ${ach.unlocked ? 'bg-amber-200' : 'bg-stone-300'}`}>{ach.icon}</span>
              <div>
                <h3 className={`font-bold text-lg ${ach.unlocked ? 'text-amber-900' : 'text-stone-700'}`}>{ach.name}</h3>
                <p className={`text-sm ${ach.unlocked ? 'text-stone-700' : 'text-stone-500'}`}>{ach.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AchievementsModal;
