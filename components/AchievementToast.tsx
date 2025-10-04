// FIX: Replaced placeholder content with the full implementation for the AchievementToast component.
import React from 'react';
import type { Achievement } from '../types';

interface AchievementToastProps {
  achievement: Achievement;
}

const AchievementToast: React.FC<AchievementToastProps> = ({ achievement }) => {
  return (
    <div
      className="fixed bottom-5 right-5 bg-gradient-to-br from-amber-400 to-amber-600 text-white p-4 rounded-lg shadow-2xl border-2 border-amber-300 flex items-center gap-4 animate-toast-in"
      role="alert"
    >
      <div className="text-4xl">{achievement.icon}</div>
      <div>
        <h3 className="font-bold text-lg">Achievement Unlocked!</h3>
        <p className="text-sm">{achievement.name}</p>
      </div>
    </div>
  );
};

export default AchievementToast;
