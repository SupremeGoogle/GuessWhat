import React from 'react';
import { Play, Volume2, VolumeX, Trophy, Star, Grid } from 'lucide-react';
import { motion } from 'framer-motion';
import { audio } from '../utils/audio';
import { GameStats, LevelInfo } from '../types';
import { NeonButton } from './ui/NeonButton';

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

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.4, ease: [0.175, 0.885, 0.32, 1.275] }}
      className="flex flex-col justify-between h-full p-5 pb-8"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between p-3.5 px-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg mb-4">
        <div className="flex items-center gap-1.5 bg-black/30 border border-white/15 px-3.5 py-1.5 rounded-full font-bold text-sm shadow-inner">
          <Star size={16} fill="#ffd700" color="#ffd700" />
          <span>{stats.starsEarned}</span>
        </div>
        <div className="flex items-center gap-1.5 bg-black/30 border border-white/15 px-3.5 py-1.5 rounded-full font-bold text-sm shadow-inner">
          <Trophy size={16} color="#00f2fe" />
          <span>{stats.totalScore}</span>
        </div>
        <motion.button 
          whileHover={{ y: -2, backgroundColor: 'rgba(255,255,255,0.15)' }}
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 flex items-center justify-center bg-white/10 border border-white/15 rounded-xl transition-colors"
          onClick={onToggleMute}
          title="Звук"
          aria-label={isMuted ? 'Включить звук' : 'Выключить звук'}
          aria-pressed={isMuted}
        >
          {isMuted ? <VolumeX size={18} color="#ff0844" /> : <Volume2 size={18} color="#00e676" />}
        </motion.button>
      </div>

      {/* Main Center Content */}
      <div className="flex flex-col items-center text-center gap-4 my-auto">
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="text-7xl drop-shadow-[0_10px_20px_rgba(0,242,254,0.4)]"
        >
          🧠
        </motion.div>

        <h1 className="text-5xl font-black leading-tight bg-clip-text text-transparent bg-gradient-to-br from-[#00f2fe] via-[#4facfe] to-[#00e676] drop-shadow-[0_0_20px_rgba(0,242,254,0.3)]">
          GuessWhat
        </h1>

        <p className="text-white/60 text-base max-w-[280px]">
          Интеллектуальная игра соревнований и неожиданных фактов
        </p>

        <div className="flex flex-col gap-3 w-full max-w-[280px] mt-4">
          <NeonButton onClick={handleStart} className="w-full">
            <Play fill="currentColor" size={22} />
            {hasProgress ? `ПРОДОЛЖИТЬ Уровень ${continueLevelId}` : 'ИГРАТЬ'}
          </NeonButton>

          <NeonButton variant="secondary" onClick={handleLevels} className="w-full py-3.5 text-base font-bold">
            <Grid size={18} color="#00f2fe" />
            Выбор уровней (30)
          </NeonButton>
        </div>
      </div>

      {/* Bottom Info Banner */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-3 px-4 flex items-center justify-between text-sm mt-4">
        <span className="text-white/60">Доступно сейчас:</span>
        <span className="font-extrabold text-[#00f2fe]">{unlockedCount} уровней</span>
      </div>
    </motion.div>
  );
};
