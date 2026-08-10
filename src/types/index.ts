export interface Animal {
  id: string;
  nameRu: string;
  nameEn: string;
  weightKg: number;
  weightDisplay: string;
  emoji: string;
  imageUri: string;
  category: string;
  funFact: string;
}

export interface PairComparison {
  itemA: Animal;
  itemB: Animal;
  correctItemId: string;
}

export interface LevelInfo {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  isUnlocked: boolean;
  stars: number;
  highScore: number;
  category: string;
}

export type ScreenType = 'splash' | 'menu' | 'level-select' | 'level-1' | 'level-locked';

export interface GameStats {
  totalScore: number;
  starsEarned: number;
  levelsCompleted: number;
}
