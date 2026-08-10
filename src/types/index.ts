export interface GameItem {
  id: string;
  nameRu: string;
  nameEn: string;
  value: number;
  displayValue: string;
  emoji: string;
  imageUri: string;
  category: string;
  funFact: string;
}

export interface PairComparison {
  itemA: GameItem;
  itemB: GameItem;
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
  property: string;
  unit: string;
  comparisonType: 'max' | 'min';
}

export type ScreenType = 'splash' | 'menu' | 'level-select' | 'game-level' | 'level-locked';

export interface GameStats {
  totalScore: number;
  starsEarned: number;
  levelsCompleted: number;
}
