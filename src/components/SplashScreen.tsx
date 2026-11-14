import React, { useEffect, useState } from 'react';
import { Sparkles, Play } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { audio } from '../utils/audio';
import { NeonButton } from './ui/NeonButton';

interface SplashScreenProps {
  onFinish: () => void;
}

const RING_R = 47;
const RING_C = 2 * Math.PI * RING_R;

const SPARKS = [
  { t: '12%', l: '18%', d: 0 },
  { t: '20%', l: '82%', d: 0.8 },
  { t: '46%', l: '8%', d: 1.5 },
  { t: '58%', l: '90%', d: 2.1 },
  { t: '78%', l: '24%', d: 0.4 },
  { t: '88%', l: '70%', d: 1.2 },
];

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onFinish, 400);
          return 100;
        }
        return prev + 5;
      });
    }, 40);

    return () => clearInterval(timer);
  }, [onFinish]);

  const handleTap = () => {
    audio.playClick();
    onFinish();
  };

  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: 'easeOut' as const },
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
      transition={{ duration: 0.5 }}
      className="splash-stage flex flex-col items-center justify-center h-full text-center gap-7 px-6 py-10 cursor-pointer"
      onClick={handleTap}
    >
      <div className="splash-orb splash-orb--purple" aria-hidden="true" />
      <div className="splash-orb splash-orb--cyan" aria-hidden="true" />
      <div className="splash-orb splash-orb--pink" aria-hidden="true" />
      {SPARKS.map((p, i) => (
        <span key={i} className="splash-spark" aria-hidden="true" style={{ top: p.t, left: p.l, animationDelay: `${p.d}s` }} />
      ))}

      <motion.div
        initial={reduce ? false : { scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 160, damping: 14 }}
      >
        <div className="splash-logo">
          <svg className="splash-ring" viewBox="0 0 100 100" aria-hidden="true">
            <circle className="splash-ring-track" cx="50" cy="50" r={RING_R} />
            <circle
              className={`splash-ring-fill${progress >= 100 ? ' is-done' : ''}`}
              cx="50"
              cy="50"
              r={RING_R}
              strokeDasharray={RING_C}
              strokeDashoffset={RING_C * (1 - Math.min(progress, 100) / 100)}
            />
          </svg>
          <motion.span
            animate={reduce ? undefined : { scale: [1, 1.08, 1], rotate: [0, 4, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="text-[72px] leading-none drop-shadow-[0_8px_18px_rgba(138,43,226,0.7)]"
          >
            🧠
          </motion.span>
        </div>
      </motion.div>

      <motion.div {...rise(0.15)}>
        <h1 className="splash-title text-5xl font-black tracking-tight mb-2">GuessWhat</h1>
        <p className="text-white/75 text-lg">Викторина сравнений & фактов</p>
      </motion.div>

      <motion.div {...rise(0.3)} className="w-[78%] flex flex-col gap-2" aria-hidden="true">
        <div className="splash-track">
          <div className="splash-fill" style={{ width: `${progress}%`, transition: 'width 0.1s linear' }} />
        </div>
        <div className="splash-status">
          <span>{progress < 100 ? 'Загружаем вопросы…' : 'Готово!'}</span>
          <span>{Math.min(progress, 100)}%</span>
        </div>
      </motion.div>

      <motion.div {...rise(0.45)}>
        <NeonButton onClick={handleTap} className="min-h-[56px] px-10">
          <Play fill="currentColor" size={20} />
          Нажми для старта
        </NeonButton>
      </motion.div>

      <div className="splash-chip mt-auto tap-hint">
        <Sparkles size={14} color="#00f2fe" />
        Уровень 1: Кто тяжелее?
      </div>
    </motion.div>
  );
};
