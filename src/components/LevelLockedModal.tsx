import React from 'react';
import { Lock, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LevelInfo } from '../types';
import { NeonButton } from './ui/NeonButton';

interface LevelLockedModalProps {
  level: LevelInfo | null;
  /** Уровень, который реально откроет доступ к `level` — обычно предыдущий
   * по `id` уровень (цепочка `UNLOCK_NEXT_LEVEL_STARS` в `App.tsx`
   * разблокирует уровни строго по одному), а если и он ещё не открыт —
   * `continueLevelId` из `getContinueLevelId` уже указывает на первый
   * реально доступный шаг игрока к цели. */
  continueLevel: LevelInfo;
  onClose: () => void;
  onPlayContinue: () => void;
}

export const LevelLockedModal: React.FC<LevelLockedModalProps> = ({
  level,
  continueLevel,
  onClose,
  onPlayContinue
}) => {
  return (
    <AnimatePresence>
      {level && (
        <motion.div 
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          className="absolute inset-0 bg-[#0b071e]/85 z-50 flex items-center justify-center p-5"
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 30 }}
            className="w-full max-w-[360px] bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[32px] p-8 flex flex-col items-center text-center gap-5 shadow-[0_25px_60px_rgba(0,0,0,0.9),inset_0_2px_20px_rgba(255,255,255,0.05)] relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-2"
              aria-label="Закрыть"
            >
              <X size={20} />
            </button>

            <div className="w-[90px] h-[90px] bg-white/10 rounded-full flex items-center justify-center shadow-inner">
              <Lock size={44} color="#ff0844" className="drop-shadow-[0_0_15px_rgba(255,8,68,0.5)]" />
            </div>

            <h3 className="text-2xl font-black text-white">
              Уровень #{level.id} Заблокирован
            </h3>

            <p className="text-white/60 text-[15px]">
              Тема: <strong className="text-[#00f2fe]">{level.title}</strong>
            </p>

            <div className="bg-black/30 p-4 rounded-2xl text-[14px] text-left w-full border border-white/10 shadow-inner mt-2">
              <div className="flex items-center gap-2 mb-2 text-[#ffd700] font-extrabold">
                <Sparkles size={16} /> Требование для открытия:
              </div>
              <div className="text-white/80 leading-relaxed">
                Пройди Уровень {continueLevel.id} ("{continueLevel.title}"), чтобы разблокировать этот уровень!
              </div>
            </div>

            <NeonButton
              className="w-full mt-2"
              onClick={onPlayContinue}
            >
              Играть в Уровень {continueLevel.id} 🚀
            </NeonButton>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
