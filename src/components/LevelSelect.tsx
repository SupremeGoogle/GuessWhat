import React from 'react';
import { ArrowLeft, Lock, Star, Sparkles, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { LevelInfo } from '../types';
import { audio } from '../utils/audio';

interface LevelSelectProps {
  levels: LevelInfo[];
  onSelectLevel: (levelId: number) => void;
  onBack: () => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
} as any;

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
} as any;

export const LevelSelect: React.FC<LevelSelectProps> = ({
  levels,
  onSelectLevel,
  onBack
}) => {
  const handleCardClick = (level: LevelInfo) => {
    audio.playClick();
    onSelectLevel(level.id);
  };

  // Раньше подпись была захардкожена как «Уровень 1 открыт!» — верно только
  // для самого первого запуска. Уровни 1–11 разблокированы по умолчанию (см.
  // src/data/levels.ts), а дальше игрок открывает новые уровни прохождением
  // текущих (UNLOCK_NEXT_LEVEL_STARS в App.tsx), так что число открытых
  // уровней меняется и с самого старта, и по ходу игры — считаем его от
  // актуального списка `levels`, а не пишем текст заранее.
  const unlockedCount = levels.filter(lvl => lvl.isUnlocked).length;

  const totalStars = levels.reduce((n, l) => n + (l.isUnlocked ? l.stars : 0), 0);
  const maxStars = levels.length * 3;
  const starPercent = maxStars ? Math.round((totalStars / maxStars) * 100) : 0;
  const starsLeft = maxStars - totalStars;
  // «Следующий» уровень — первый открытый без звёзд: подсвечиваем, куда играть дальше.
  const nextLevel = levels.find(l => l.isUnlocked && l.stars === 0);
  const nextId = nextLevel?.id;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative h-full overflow-hidden"
    >
      <div className="splash-orb splash-orb--purple" aria-hidden="true" />
      <div className="splash-orb splash-orb--cyan" aria-hidden="true" />
      <div className="splash-orb splash-orb--pink" aria-hidden="true" />
      <div className="flex flex-col h-full p-5 overflow-y-auto">
      <div className="menu-bar mb-4 shrink-0">
        <button className="menu-icon-btn" onClick={onBack} title="Назад" aria-label="Назад в меню">
          <ArrowLeft size={22} />
        </button>
        <h2 className="level-heading">Выбор уровня</h2>
        <div className="menu-stat" aria-label={`Звёзд собрано ${totalStars} из ${maxStars}`}>
          <Star size={16} fill="var(--accent-gold)" color="var(--accent-gold)" />
          {totalStars}
        </div>
      </div>

      <div className="menu-progress shrink-0 mb-5" style={{ marginTop: 0 }}>
        <div className="level-hero">
          <div className="level-hero-score" aria-label={`Звёзд собрано ${totalStars} из ${maxStars}`}>
            <Star size={26} fill="var(--accent-gold)" color="var(--accent-gold)" className="level-hero-star" />
            <span className="level-hero-num">{totalStars}</span>
            <span className="level-hero-max">/ {maxStars}</span>
          </div>
          <div className="level-hero-meta">
            <span className="flex items-center gap-1.5">
              <Sparkles size={14} color="var(--accent-gold)" aria-hidden="true" />
              Открыто {unlockedCount} из {levels.length}
            </span>
            <span>{starsLeft > 0 ? `Ещё ${starsLeft} ⭐ до идеала` : 'Все звёзды собраны!'}</span>
          </div>
        </div>
        <div className="splash-track" role="progressbar" aria-valuemin={0} aria-valuemax={maxStars} aria-valuenow={totalStars} aria-label="Собрано звёзд">
          <motion.div
            className="splash-fill"
            initial={{ width: 0 }}
            animate={{ width: `${starPercent}%` }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        </div>
        {nextLevel && (
          <button type="button" className="level-continue" onClick={() => handleCardClick(nextLevel)}
            aria-label={`Продолжить: уровень ${nextLevel.id}, ${nextLevel.title}`}>
            <span className="level-continue-icon" aria-hidden="true">{nextLevel.icon}</span>
            <span className="flex-1 min-w-0">
              <span className="level-continue-label block">Дальше · уровень {nextLevel.id}</span>
              <span className="level-continue-name block truncate">{nextLevel.title}</span>
            </span>
            <Play size={20} fill="currentColor" aria-hidden="true" />
          </button>
        )}
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-3 gap-3 pb-6"
      >
        {levels.map((lvl) => {
          const isNext = lvl.id === nextId;
          return (
            <motion.div key={lvl.id} variants={item}>
              <div
                onClick={() => handleCardClick(lvl)}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
                    e.preventDefault();
                    handleCardClick(lvl);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={lvl.isUnlocked ? `Уровень ${lvl.id}, ${lvl.title}, открыт, звёзд ${lvl.stars} из 3` : `Уровень ${lvl.id}, ${lvl.title}, заблокирован`}
                className={`level-tile ${lvl.isUnlocked ? 'is-open' : 'is-locked'} ${isNext ? 'is-next' : ''} ${lvl.isUnlocked && lvl.stars >= 3 ? 'is-perfect' : ''}`}
              >
                <span className="level-num">{lvl.id}</span>
                {isNext && <span className="level-flag">Играть</span>}
                {lvl.isUnlocked ? (
                  <span className="level-medal"><span className="level-icon">{lvl.icon}</span></span>
                ) : (
                  <span className="level-medal level-medal--locked"><Lock size={24} className="level-lock" /></span>
                )}
                <div className="level-title">{lvl.title}</div>
                <div className="level-stars" aria-hidden="true">
                  {[1, 2, 3].map(s => (
                    <Star
                      key={s}
                      size={15}
                      className={lvl.isUnlocked && s <= lvl.stars ? 'level-star-on' : ''}
                      style={{ '--i': s } as React.CSSProperties}
                      fill={lvl.isUnlocked && s <= lvl.stars ? 'var(--accent-gold)' : 'none'}
                      color={lvl.isUnlocked && s <= lvl.stars ? 'var(--accent-gold)' : 'rgba(255,255,255,0.4)'}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      </div>
    </motion.div>
  );
};
