import { GameStats, LevelInfo } from '../types';

/**
 * Ключ версионирован (`v1`): при несовместимом изменении формата сохранения
 * достаточно завести `v2` — старые записи в localStorage у пользователей
 * просто перестанут распознаваться `isStoredProgress` и будут проигнорированы
 * вместо падения на рантайме.
 */
const STORAGE_KEY = 'guesswhat:progress:v1';
const STORAGE_VERSION = 1;

/** Часть `LevelInfo`, которая реально является прогрессом игрока и должна
 * переживать перезагрузку страницы. Остальные поля (title, icon, category…)
 * приходят из `INITIAL_LEVELS` и могут меняться между версиями игры. */
export interface StoredLevelProgress {
  id: number;
  stars: number;
  highScore: number;
  isUnlocked: boolean;
}

export interface StoredProgress {
  version: typeof STORAGE_VERSION;
  stats: GameStats;
  levels: StoredLevelProgress[];
}

function isStoredLevelProgress(value: unknown): value is StoredLevelProgress {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === 'number' &&
    typeof v.stars === 'number' &&
    typeof v.highScore === 'number' &&
    typeof v.isUnlocked === 'boolean'
  );
}

function isStoredProgress(value: unknown): value is StoredProgress {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  if (v.version !== STORAGE_VERSION) return false;
  if (!v.stats || typeof v.stats !== 'object') return false;
  const stats = v.stats as Record<string, unknown>;
  if (
    typeof stats.totalScore !== 'number' ||
    typeof stats.starsEarned !== 'number' ||
    typeof stats.levelsCompleted !== 'number'
  ) {
    return false;
  }
  return Array.isArray(v.levels) && v.levels.every(isStoredLevelProgress);
}

/** Читает сохранённый прогресс. Возвращает `null`, если localStorage
 * недоступен (приватный режим, SSR), пуст, повреждён или сохранён в
 * несовместимом формате — во всех этих случаях вызывающий код должен
 * откатиться на значения по умолчанию. */
export function loadProgress(): StoredProgress | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return isStoredProgress(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

/** Сохраняет прогресс. Ошибки (недоступный localStorage, переполненная
 * квота) намеренно проглатываются — потеря сохранения не должна ронять игру. */
export function saveProgress(stats: GameStats, levels: LevelInfo[]): void {
  try {
    const payload: StoredProgress = {
      version: STORAGE_VERSION,
      stats,
      levels: levels.map(({ id, stars, highScore, isUnlocked }) => ({
        id,
        stars,
        highScore,
        isUnlocked
      }))
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Прогресс просто не переживёт эту сессию — не критично для игры.
  }
}

/** Накладывает сохранённый прогресс на актуальный список уровней из
 * `INITIAL_LEVELS`. Работает по `id`, поэтому переживает добавление новых
 * уровней в игру между сессиями. `isUnlocked` берётся как «или» с исходным
 * значением, чтобы новый уровень, открытый по умолчанию в свежей версии
 * игры, не оказался внезапно заблокирован старой записью в localStorage. */
export function mergeLevelsWithProgress(
  initialLevels: LevelInfo[],
  saved: StoredLevelProgress[] | undefined
): LevelInfo[] {
  if (!saved || saved.length === 0) return initialLevels;
  const progressById = new Map(saved.map(entry => [entry.id, entry]));

  return initialLevels.map(level => {
    const progress = progressById.get(level.id);
    if (!progress) return level;
    return {
      ...level,
      stars: Math.max(level.stars, progress.stars),
      highScore: Math.max(level.highScore, progress.highScore),
      isUnlocked: level.isUnlocked || progress.isUnlocked
    };
  });
}
