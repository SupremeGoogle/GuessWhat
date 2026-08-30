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

/** Единственный источник правды для счётчиков в меню (`GameStats`).
 *
 * До этой функции `stats` в `App.tsx` вёлся отдельным аккумулятором и разъехался
 * с тем, что подписан рядом в UI: `starsEarned` считался через `Math.max(prev,
 * stars)` — то есть держал максимум звёзд за одно прохождение *любого* уровня,
 * а не «общее число звёзд» (сумму лучших результатов по всем уровням), как
 * подписано в меню. `totalScore` суммировал `gainedScore` каждого завершения
 * уровня — то есть рос при каждом перепрохождении, превращая «очки» в
 * «сколько раз вообще доиграл», а не в сумму личных рекордов.
 *
 * `levels` уже хранит корректные per-level `stars`/`highScore` (оба
 * обновляются через `Math.max` в `handleLevelComplete` и переживают
 * перезагрузку через `mergeLevelsWithProgress`) — они и есть источник
 * правды. `stats` теперь всегда пересчитывается из `levels`, а не ведётся
 * отдельно, поэтому по построению не может разойтись с ним:
 * - `starsEarned` — сумма лучших `stars` по всем уровням;
 * - `totalScore` — сумма рекордов (`highScore`) по всем уровням;
 * - `levelsCompleted` — число уровней хотя бы с одной звездой (побочно
 *   исправлено: раньше застревало на 1 навсегда через тот же `Math.max`). */
export function computeStats(levels: LevelInfo[]): GameStats {
  return levels.reduce<GameStats>(
    (acc, level) => ({
      totalScore: acc.totalScore + level.highScore,
      starsEarned: acc.starsEarned + level.stars,
      levelsCompleted: acc.levelsCompleted + (level.stars > 0 ? 1 : 0)
    }),
    { totalScore: 0, starsEarned: 0, levelsCompleted: 0 }
  );
}

/** Максимум звёзд за уровень. Дублирует значение, зашитое в
 * `getStarsForScore` (`src/components/GameLevel.tsx`) — там оно не
 * экспортируется как константа, а выведено из формы функции (третий, самый
 * высокий порог). Если максимум там когда-нибудь изменится, нужно поправить
 * и здесь. */
const MAX_LEVEL_STARS = 3;

/** Уровень, который открывает кнопка «Играть»/«Продолжить» на главном
 * экране: первый разблокированный уровень, ещё не пройденный на максимум
 * звёзд, а если такого нет — самый старший разблокированный (весь прогресс
 * пройден на максимум, добавить нечего — открываем последний доступный).
 * `levels` уже отсортирован по `id` (см. `src/data/levels.ts`), поэтому
 * `find` возвращает действительно первый по порядку. */
export function getContinueLevelId(levels: LevelInfo[]): number {
  const unlocked = levels.filter(lvl => lvl.isUnlocked);
  if (unlocked.length === 0) return 1;

  const nextUnfinished = unlocked.find(lvl => lvl.stars < MAX_LEVEL_STARS);
  if (nextUnfinished) return nextUnfinished.id;

  return unlocked.reduce((last, lvl) => (lvl.id > last.id ? lvl : last)).id;
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
