import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Volume2, VolumeX, Flame, Star, RotateCcw, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { GameItem, PairComparison, LevelInfo } from '../types';
import { audio } from '../utils/audio';
import { GlassCard } from './ui/GlassCard';
import { NeonButton } from './ui/NeonButton';

interface GameLevelProps {
  levelInfo: LevelInfo;
  levelData: GameItem[];
  onBack: () => void;
  onLevelComplete: (score: number, stars: number) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const GameLevel: React.FC<GameLevelProps> = ({
  levelInfo,
  levelData,
  onBack,
  onLevelComplete,
  isMuted,
  onToggleMute
}) => {
  const TOTAL_ROUNDS = 10;
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [currentPair, setCurrentPair] = useState<PairComparison | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [floatingScore, setFloatingScore] = useState<{ text: string; type: 'plus' | 'minus'; id: number } | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({});

  const generateNewPair = useCallback(() => {
    const shuffled = [...levelData].sort(() => 0.5 - Math.random());
    const itemA = shuffled[0];
    let itemB = shuffled[1];

    // Пары с одинаковым значением ломают сравнение: itemA всегда считается
    // "верным", а игрок, выбравший itemB с тем же весом/скоростью, штрафуется
    // за фактически правильный ответ. Ищем в перетасованном списке первого
    // кандидата с другим значением.
    let candidateIndex = 2;
    while (itemB.value === itemA.value && candidateIndex < shuffled.length) {
      itemB = shuffled[candidateIndex];
      candidateIndex += 1;
    }

    const isAMax = itemA.value >= itemB.value;
    const isAMin = itemA.value <= itemB.value;
    let correctItemId = '';
    
    if (levelInfo.comparisonType === 'max') {
      correctItemId = isAMax ? itemA.id : itemB.id;
    } else {
      correctItemId = isAMin ? itemA.id : itemB.id;
    }

    setCurrentPair({ itemA, itemB, correctItemId });
    setSelectedId(null);
    setIsRevealed(false);
  }, [levelData, levelInfo.comparisonType]);

  useEffect(() => {
    generateNewPair();
  }, [generateNewPair]);

  const handleCardClick = (item: GameItem) => {
    if (isRevealed || !currentPair) return;

    const isCorrect = item.id === currentPair.correctItemId;
    setSelectedId(item.id);
    setIsRevealed(true);

    if (isCorrect) {
      audio.playCorrect();
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
      setFloatingScore({ text: '+1', type: 'plus', id: Date.now() });
    } else {
      audio.playWrong();
      setScore(prev => prev - 2);
      setStreak(0);
      setFloatingScore({ text: '-2', type: 'minus', id: Date.now() });
    }

    setTimeout(() => {
      if (round >= TOTAL_ROUNDS) {
        const finalScore = score + (isCorrect ? 1 : -2);
        let stars = 1;
        if (finalScore >= 8) stars = 3;
        else if (finalScore >= 4) stars = 2;

        setIsFinished(true);
        audio.playVictory();
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        onLevelComplete(finalScore, stars);
      } else {
        setRound(prev => prev + 1);
        generateNewPair();
      }
    }, 1400);
  };

  const handleRestart = () => {
    audio.playClick();
    setRound(1);
    setScore(0);
    setStreak(0);
    setIsFinished(false);
    generateNewPair();
  };

  const handleImageError = (id: string) => {
    setImageErrorMap(prev => ({ ...prev, [id]: true }));
  };

  if (!currentPair) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col justify-between h-full p-4 overflow-hidden"
    >
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between p-3.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg mb-4 shrink-0">
        <motion.button 
          whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.15)" }}
          whileTap={{ scale: 0.9 }}
          className="w-11 h-11 flex items-center justify-center bg-white/10 border border-white/15 rounded-xl transition-colors shrink-0"
          onClick={onBack} 
          title="Выход"
        >
          <ArrowLeft size={22} />
        </motion.button>

        <div className="text-center px-2 min-w-0">
          <div className="text-[11px] text-white/50 uppercase tracking-wider font-bold truncate">
            Уровень {levelInfo.id} • Задание {round}/{TOTAL_ROUNDS}
          </div>
          <div className="text-base sm:text-lg font-black text-[#00f2fe] truncate drop-shadow-md">
            {levelInfo.title} {levelInfo.icon}
          </div>
        </div>

        <motion.button 
          whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.15)" }}
          whileTap={{ scale: 0.9 }}
          className="w-11 h-11 flex items-center justify-center bg-white/10 border border-white/15 rounded-xl transition-colors shrink-0"
          onClick={onToggleMute}
        >
          {isMuted ? <VolumeX size={18} color="#ff0844" /> : <Volume2 size={18} color="#00e676" />}
        </motion.button>
      </div>

      {/* Score Stats Bar */}
      <div className="flex items-center justify-around bg-black/30 py-2.5 px-4 rounded-2xl border border-white/10 shadow-inner shrink-0 mb-4">
        <div className="flex items-center gap-1.5 font-extrabold text-base">
          <Star size={18} fill="#ffd700" color="#ffd700" className="drop-shadow-md" />
          <span>Очки: <strong className={score >= 0 ? 'text-[#00e676]' : 'text-[#ff0844]'}>{score}</strong></span>
        </div>

        <AnimatePresence>
          {streak > 1 && (
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="flex items-center gap-1 text-[#ffb199] font-extrabold"
            >
              <Flame size={18} fill="#ff0844" color="#ff0844" className="drop-shadow-[0_0_10px_rgba(255,8,68,0.8)]" />
              <span>Серия x{streak}!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Score Popups */}
      <AnimatePresence>
        {floatingScore && (
          <motion.div
            key={floatingScore.id}
            initial={{ opacity: 0, y: 0, scale: 0.5 }}
            animate={{ opacity: [0, 1, 1, 0], y: -100, scale: [0.5, 1.4, 1.2, 1] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-5xl font-black pointer-events-none z-50 ${
              floatingScore.type === 'plus' ? 'text-[#00e676] drop-shadow-[0_0_20px_#00e676]' : 'text-[#ff0844] drop-shadow-[0_0_20px_#ff0844]'
            }`}
          >
            {floatingScore.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gameplay Battle Arena */}
      <div className="flex flex-col flex-1 justify-center gap-4 relative py-2">
        {renderItemCard(
          currentPair.itemA,
          currentPair.correctItemId,
          selectedId,
          isRevealed,
          handleCardClick,
          imageErrorMap[currentPair.itemA.id],
          handleImageError,
          levelInfo,
          "top"
        )}

        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="self-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-[#ff0844] to-[#ffb199] w-14 h-14 rounded-full flex items-center justify-center font-black font-heading text-xl shadow-[0_0_25px_rgba(255,8,68,0.7)] border-4 border-[#0b071e] z-10 text-white"
        >
          VS
        </motion.div>

        {renderItemCard(
          currentPair.itemB,
          currentPair.correctItemId,
          selectedId,
          isRevealed,
          handleCardClick,
          imageErrorMap[currentPair.itemB.id],
          handleImageError,
          levelInfo,
          "bottom"
        )}
      </div>

      {/* Victory Modal Overlay */}
      <AnimatePresence>
        {isFinished && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            className="absolute inset-0 bg-[#0b071e]/85 z-50 flex items-center justify-center p-5"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[32px] p-8 flex flex-col items-center text-center gap-6 shadow-[0_25px_60px_rgba(0,0,0,0.9),inset_0_2px_20px_rgba(255,255,255,0.05)]"
            >
              <div className="text-7xl drop-shadow-2xl">🏆</div>
              <h2 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-br from-[#00f2fe] to-[#4facfe] drop-shadow-md">
                Уровень Пройден!
              </h2>

              <div className="flex gap-4 text-5xl">
                <motion.div initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.1, type: "spring" }}>
                  <Star size={48} fill="#ffd700" color="#ffd700" className="drop-shadow-[0_0_15px_#ffd700]" />
                </motion.div>
                <motion.div initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.3, type: "spring" }}>
                  <Star size={48} fill={score >= 4 ? '#ffd700' : 'none'} color={score >= 4 ? '#ffd700' : 'rgba(255,255,255,0.2)'} className={score >= 4 ? "drop-shadow-[0_0_15px_#ffd700]" : ""} />
                </motion.div>
                <motion.div initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.5, type: "spring" }}>
                  <Star size={48} fill={score >= 8 ? '#ffd700' : 'none'} color={score >= 8 ? '#ffd700' : 'rgba(255,255,255,0.2)'} className={score >= 8 ? "drop-shadow-[0_0_15px_#ffd700]" : ""} />
                </motion.div>
              </div>

              <div className="bg-black/30 py-4 px-6 rounded-2xl w-full text-lg border border-white/10 shadow-inner">
                <div className="text-white/80">Финишный счет: <strong className="text-[#00e676] text-2xl drop-shadow-md ml-2">{score} очков</strong></div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
                <NeonButton className="flex-1 py-3.5 text-base" onClick={handleRestart}>
                  <RotateCcw size={18} />
                  Еще раз
                </NeonButton>
                <NeonButton variant="secondary" className="flex-1 py-3.5 text-base" onClick={onBack}>
                  <CheckCircle2 size={18} />
                  Меню
                </NeonButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

function resolveAssetUrl(path: string): string {
  if (path.startsWith('http')) return path;
  return import.meta.env.BASE_URL.replace(/\/$/, '') + path;
}

function renderItemCard(
  item: GameItem,
  correctItemId: string,
  selectedId: string | null,
  isRevealed: boolean,
  onClick: (item: GameItem) => void,
  hasImageError: boolean,
  onError: (id: string) => void,
  levelInfo: LevelInfo,
  position: "top" | "bottom"
) {
  const isSelected = selectedId === item.id;
  const isCorrect = item.id === correctItemId;

  let stateClasses = "border-white/15 hover:border-[#00f2fe]/60 bg-gradient-to-br from-white/10 to-white/5";
  let animationProps = {};

  if (isRevealed) {
    if ((isSelected && isCorrect) || (!isSelected && isCorrect)) {
      stateClasses = "border-[#00e676] bg-gradient-to-br from-[#00e676]/30 to-[#00e676]/10 shadow-[0_0_40px_rgba(0,230,118,0.6),inset_0_0_20px_rgba(0,230,118,0.2)]";
      animationProps = { scale: [1, 1.04, 1], transition: { duration: 0.5 } };
    } else if (isSelected && !isCorrect) {
      stateClasses = "border-[#ff0844] bg-gradient-to-br from-[#ff0844]/30 to-[#ff0844]/10 shadow-[0_0_40px_rgba(255,8,68,0.6),inset_0_0_20px_rgba(255,8,68,0.2)]";
      animationProps = { x: [0, -12, 12, -12, 12, 0], transition: { duration: 0.5 } };
    }
  }

  return (
    <motion.div
      layoutId={item.id + position} // to smoothly animate out/in on new rounds if Framer Motion supports it across renders
      animate={animationProps}
      whileTap={!isRevealed ? { scale: 0.95 } : {}}
      className={`flex-1 rounded-[28px] border-2 backdrop-blur-xl flex flex-col items-center justify-between p-3.5 relative overflow-hidden cursor-pointer transition-colors shadow-2xl ${stateClasses}`}
      onClick={() => onClick(item)}
    >
      <div className="w-full h-[140px] rounded-[20px] overflow-hidden relative bg-black/40 shadow-inner group">
        {item.imageUri && !hasImageError ? (
          <img
            src={resolveAssetUrl(item.imageUri)}
            alt={item.nameRu}
            className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-110"
            onError={() => onError(item.id)}
          />
        ) : (
          <div 
            className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#8a2be2]/40 to-[#00f2fe]/40 drop-shadow-lg"
            style={{ fontSize: '72px' }}
          >
            {item.emoji}
          </div>
        )}
      </div>

      <div className="text-[22px] font-extrabold mt-2.5 text-center drop-shadow-md leading-tight text-white px-2">
        {item.emoji} {item.nameRu}
      </div>

      <div className="h-12 flex items-center justify-center w-full">
        {isRevealed ? (
          <motion.div 
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="text-lg font-black text-white bg-gradient-to-r from-[#00f2fe]/50 to-[#8a2be2]/50 px-5 py-1.5 rounded-full border border-white/40 shadow-[0_8px_20px_rgba(0,0,0,0.4),inset_0_2px_10px_rgba(255,255,255,0.2)] drop-shadow-md flex items-center gap-1.5"
          >
            <span className="opacity-80">{levelInfo.icon}</span> {item.displayValue}
          </motion.div>
        ) : (
          <div className="text-[12px] text-white/50 text-center font-medium px-4">
            Нажми, если думаешь, что это верный ответ!
          </div>
        )}
      </div>
    </motion.div>
  );
}
