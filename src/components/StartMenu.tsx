import React from 'react';
import { Play, Volume2, VolumeX, Trophy, Star, Grid } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { audio } from '../utils/audio';
import { GameStats, LevelInfo } from '../types';

interface StartMenuProps {
  onStartGame: () => void;
  onOpenLevelSelect: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  stats: GameStats;
  levels: LevelInfo[];
  /** Уровень, который откроет кнопка «Играть»/«Продолжить» — см.
   * `getContinueLevelId` в `src/lib/storage.ts`. */
  continueLevelId: number;
}

export const StartMenu: React.FC<StartMenuProps> = ({
  onStartGame,
  onOpenLevelSelect,
  isMuted,
  onToggleMute,
  stats,
  levels,
  continueLevelId
}) => {
  // Раньше это число было захардкожено текстом («11 уровней») и переставало
  // соответствовать реальному состоянию `levels` при любой правке
  // разблокировок — тот же класс бага, что уже чинили в `LevelSelect.tsx`
  // (см. «Хардкоженная надпись "Уровень 1 открыт!"», 2026-08-26).
  const unlockedCount = levels.filter(lvl => lvl.isUnlocked).length;
  // Пока у игрока нет ни одной звезды ни на одном уровне — это новый игрок
  // без прогресса: кнопка одноразово подписана «ИГРАТЬ» и ведёт на уровень 1
  // (в этом состоянии `continueLevelId` и так всегда равен 1). Как только
  // появляется хотя бы одна звезда, кнопка становится «ПРОДОЛЖИТЬ» и ведёт на
  // первый неоконченный уровень.
  const hasProgress = stats.starsEarned > 0;
  const handleStart = () => {
    audio.playClick();
    onStartGame();
  };

  const handleLevels = () => {
    audio.playClick();
    onOpenLevelSelect();
  };

  const reduce = useReducedMotion();
  const total = levels.length || 1;
  const rise = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.08 * i, duration: 0.45, ease: 'easeOut' as const }
        };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col justify-between h-full p-5 pb-8"
    >
      {/* Header bar */}
      <motion.div {...rise(0)} className="menu-bar">
        <div className="menu-stat" aria-label={`Звёзды: ${stats.starsEarned}`}>
          <Star size={18} fill="var(--accent-gold)" color="var(--accent-gold)" />
          <span>{stats.starsEarned}</span>
        </div>
        <div className="menu-stat" aria-label={`Очки: ${stats.totalScore}`}>
          <Trophy size={18} color="var(--accent-cyan)" />
          <span>{stats.totalScore}</span>
        </div>
        <motion.button
          whileTap={{ scale: 0.92 }}
          className="menu-icon-btn"
          onClick={onToggleMute}
          aria-label={isMuted ? 'Включить звук' : 'Выключить звук'}
          aria-pressed={isMuted}
        >
          {isMuted ? <VolumeX size={20} color="#ff6b8a" /> : <Volume2 size={20} color="var(--accent-green)" />}
        </motion.button>
      </motion.div>

      {/* Hero */}
      <div className="flex flex-col items-center text-center gap-3 my-auto">
        <motion.div {...rise(1)} className="splash-logo menu-logo">
          <motion.span
            aria-hidden="true"
            className="text-6xl"
            animate={reduce ? undefined : { y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            🧠
          </motion.span>
        </motion.div>

        <motion.h1 {...rise(2)} className="splash-title text-5xl font-black leading-tight mt-3">
          GuessWhat
        </motion.h1>

        <motion.p {...rise(3)} className="menu-tagline">
          Интеллектуальная игра соревнований и неожиданных фактов
        </motion.p>

        <motion.div {...rise(4)} className="flex flex-col gap-3 w-full max-w-[300px] mt-5">
          <button onClick={handleStart} className="menu-cta">
            <Play fill="currentColor" size={22} />
            <span>{hasProgress ? `ПРОДОЛЖИТЬ · Уровень ${continueLevelId}` : 'ИГРАТЬ'}</span>
          </button>

          <button onClick={handleLevels} className="menu-secondary">
            <Grid size={18} color="var(--accent-cyan)" />
            <span>Выбор уровней ({levels.length})</span>
          </button>
        </motion.div>
      </div>

      {/* Bottom progress card */}
      <motion.div {...rise(5)} className="menu-progress">
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/70">Открыто уровней</span>
          <span className="font-extrabold text-[color:var(--accent-cyan)]">
            {unlockedCount} / {levels.length}
          </span>
        </div>
        <div
          className="splash-track mt-2.5"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={levels.length}
          aria-valuenow={unlockedCount}
          aria-label="Открытые уровни"
        >
          <div className="splash-fill" style={{ width: `${Math.round((unlockedCount / total) * 100)}%` }} />
        </div>
      </motion.div>
    </motion.div>
  );
};
