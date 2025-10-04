// FIX: Replaced placeholder content with type definitions for GameStep and Achievement.
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface GameStep {
  story: string;
  problem: string;
  correctAnswer: number;
  choices: string[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  icon: string;
}