import React, { useEffect, useState } from 'react';
import { Sparkles, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { audio } from '../utils/audio';
import { NeonButton } from './ui/NeonButton';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

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

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center h-full text-center gap-6 p-5 cursor-pointer"
      onClick={handleTap}
    >
      <motion.div 
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="text-[80px] drop-shadow-[0_10px_20px_rgba(138,43,226,0.6)]"
      >
        🧠
      </motion.div>

      <div>
        <h1 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-[#00f2fe] via-[#4facfe] to-[#00e676] drop-shadow-[0_0_20px_rgba(0,242,254,0.3)] mb-2">
          GuessWhat
        </h1>
        <p className="text-white/60 text-lg">
          Викторина сравнений & фактов
        </p>
      </div>

      <div className="w-[80%] h-2.5 bg-white/10 rounded-full overflow-hidden border border-white/20 mt-4 shadow-inner">
        <motion.div 
          className="h-full bg-gradient-to-r from-[#ff0844] via-[#ffb199] to-[#00f2fe] shadow-[0_0_12px_#00f2fe] rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
      </div>

      <div className="mt-4">
        <NeonButton onClick={handleTap}>
          <Play fill="currentColor" size={20} />
          Нажми для старта
        </NeonButton>
      </div>

      <div className="flex items-center gap-1.5 text-white/50 text-sm mt-auto">
        <Sparkles size={14} color="#00f2fe" />
        Уровень 1: Кто тяжелее?
      </div>
    </motion.div>
  );
};
