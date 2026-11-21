import React, { useEffect, useRef } from 'react';
import { Lock, Sparkles, Star, X } from 'lucide-react';
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
  /** Сколько звёзд нужно набрать в `continueLevel` (UNLOCK_NEXT_LEVEL_STARS). */
  requiredStars?: number;
  onClose: () => void;
  onPlayContinue: () => void;
}

export const LevelLockedModal: React.FC<LevelLockedModalProps> = ({
  level,
  continueLevel,
  requiredStars = 2,
  onClose,
  onPlayContinue
}) => {
  const ctaWrapRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Esc закрывает модалку; фокус уходит на главную кнопку (клавиатура/скринридер).
  useEffect(() => {
    if (!level) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current();
    };
    window.addEventListener('keydown', onKey);
    ctaWrapRef.current?.querySelector('button')?.focus();
    return () => window.removeEventListener('keydown', onKey);
  }, [level]);

  const earned = Math.min(continueLevel.stars ?? 0, 3);
  const left = Math.max(requiredStars - earned, 0);

  return (
    <AnimatePresence>
      {level && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lock-overlay"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Уровень ${level.id} заблокирован`}
            initial={{ scale: 0.92, y: 28, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 28, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className="lock-card"
            onClick={e => e.stopPropagation()}
          >
            <div className="lock-orb lock-orb--a" aria-hidden="true" />
            <div className="lock-orb lock-orb--b" aria-hidden="true" />
            <button onClick={onClose} className="lock-close" aria-label="Закрыть">
              <X size={22} />
            </button>

            <div className="lock-medal">
              <Lock size={44} />
            </div>

            <div className="lock-kicker">Уровень #{level.id}</div>
            <h3 className="lock-title">Пока закрыт</h3>

            <p className="lock-topic">
              Тема: <strong>{level.title}</strong>
            </p>

            <div className="lock-req">
              <div className="lock-req-head">
                <Sparkles size={16} /> Как открыть
              </div>
              <div className="lock-req-body">
                Пройди уровень {continueLevel.id} «<strong>{continueLevel.title}</strong>» минимум на {requiredStars} ⭐ — и этот откроется.
              </div>
              <div className="lock-stars" aria-hidden="true">
                {[0, 1, 2].map(i => (
                  <span
                    key={i}
                    className={
                      i < earned ? 'lock-star-slot is-earned' : i < requiredStars ? 'lock-star-slot is-needed' : 'lock-star-slot'
                    }
                    style={{ '--i': i } as React.CSSProperties}
                  >
                    <Star size={22} className={i < earned ? 'lock-star is-earned' : i < requiredStars ? 'lock-star is-needed' : 'lock-star'} />
                  </span>
                ))}
                <span className={earned > 0 ? 'lock-stars-note is-progress' : 'lock-stars-note'}>
                  {earned > 0 ? `есть ${earned}, ещё ${left}` : `нужно ${requiredStars} из 3`}
                </span>
              </div>
            </div>

            <div ref={ctaWrapRef} className="lock-cta-wrap">
              <NeonButton className="lock-cta" onClick={onPlayContinue}>
                Играть в уровень {continueLevel.id} 🚀
              </NeonButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
