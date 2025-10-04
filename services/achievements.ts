// FIX: Replaced placeholder content with the full implementation for the achievement service.
import type { Achievement } from '../types';

export const allAchievements: Achievement[] = [
  {
    id: 'first_step',
    name: 'First Steps',
    description: 'Solve your first puzzle.',
    unlocked: false,
    icon: '🎯',
  },
  {
    id: 'arithmancer_apprentice',
    name: "Arithmancer's Apprentice",
    description: 'Solve 5 puzzles correctly.',
    unlocked: false,
    icon: '🧮',
  },
  {
    id: 'master_multiplier',
    name: 'Master Multiplier',
    description: 'Solve 15 puzzles correctly.',
    unlocked: false,
    icon: '✨',
  },
  {
    id: 'quest_complete',
    name: 'Quest Complete',
    description: 'Finish an entire adventure.',
    unlocked: false,
    icon: '🏆',
  },
   {
    id: 'seasoned_explorer',
    name: 'Seasoned Explorer',
    description: 'Complete 3 adventures.',
    unlocked: false,
    icon: '🗺️',
  },
];

interface Stats {
  problemsSolved: number;
  questsCompleted: number;
}

export function checkAchievements(stats: Stats, currentAchievements: Achievement[]): Achievement | null {
  const checkList = [
    { id: 'first_step', condition: stats.problemsSolved >= 1 },
    { id: 'arithmancer_apprentice', condition: stats.problemsSolved >= 5 },
    { id: 'master_multiplier', condition: stats.problemsSolved >= 15 },
    { id: 'quest_complete', condition: stats.questsCompleted >= 1 },
    { id: 'seasoned_explorer', condition: stats.questsCompleted >= 3 },
  ];

  for (const check of checkList) {
    const achievement = currentAchievements.find(a => a.id === check.id);
    if (achievement && !achievement.unlocked && check.condition) {
      return { ...achievement, unlocked: true };
    }
  }

  return null;
}
