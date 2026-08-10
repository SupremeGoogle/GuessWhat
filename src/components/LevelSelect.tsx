import React from 'react';
import { ArrowLeft, Lock, Star, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { LevelInfo } from '../types';
import { audio } from '../utils/audio';
import { GlassCard } from './ui/GlassCard';

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

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col h-full p-5 overflow-y-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl mb-4 shadow-lg shrink-0">
        <motion.button 
          whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.15)" }}
          whileTap={{ scale: 0.9 }}
          className="w-11 h-11 flex items-center justify-center bg-white/10 border border-white/15 rounded-xl transition-colors"
          onClick={onBack} 
          title="Назад"
        >
          <ArrowLeft size={22} />
        </motion.button>
        <h2 className="text-xl font-extrabold text-white">Выбор уровня</h2>
        <div className="w-11"></div>
      </div>

      <div className="flex items-center gap-2 text-white/60 text-sm mb-4 shrink-0 px-2">
        <Sparkles size={16} color="#ffd700" />
        Всего 30 уровней. Уровень 1 открыт!
      </div>

      {/* Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-3 gap-4 pb-6"
      >
        {levels.map((lvl) => (
          <motion.div key={lvl.id} variants={item}>
            <GlassCard
              active={lvl.isUnlocked}
              onClick={() => handleCardClick(lvl)}
              className={lvl.isUnlocked ? "cursor-pointer hover:-translate-y-1 hover:shadow-lg" : "opacity-60 grayscale cursor-not-allowed"}
            >
              {lvl.isUnlocked && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-br from-[#00e676] to-[#00b359] text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-[0_4px_10px_rgba(0,230,118,0.4)] uppercase">
                  Открыт
                </span>
              )}

              {!lvl.isUnlocked ? (
                <Lock size={24} className="text-white/40 mb-1" />
              ) : (
                <span className="text-3xl mb-1 drop-shadow-md">{lvl.icon}</span>
              )}

              <div className={`text-2xl font-black font-heading ${lvl.isUnlocked ? 'text-white' : 'text-white/40'}`}>
                #{lvl.id}
              </div>

              <div className="text-[11px] text-center font-bold opacity-90 truncate w-full mt-1">
                {lvl.title}
              </div>

              {lvl.isUnlocked && (
                <div className="flex gap-0.5 mt-1">
                  {[1, 2, 3].map(s => (
                    <Star
                      key={s}
                      size={10}
                      fill={s <= lvl.stars ? '#ffd700' : 'none'}
                      color={s <= lvl.stars ? '#ffd700' : 'rgba(255,255,255,0.3)'}
                    />
                  ))}
                </div>
              )}
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};
