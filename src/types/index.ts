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

/** Счётчики для меню. Всегда производные от per-level `LevelInfo.stars` /
 * `LevelInfo.highScore` (см. `computeStats` в `src/lib/storage.ts`), а не
 * отдельное состояние — иначе они расходятся с тем, что подписано в UI. */
export interface GameStats {
  /** Сумма рекордов (`highScore`) по всем уровням, а не очки за одну игру. */
  totalScore: number;
  /** Сумма лучших `stars` по всем уровням, а не звёзды за одно прохождение. */
  starsEarned: number;
  /** Число уровней хотя бы с одной звездой. */
  levelsCompleted: number;
}
