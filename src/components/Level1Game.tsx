import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Volume2, VolumeX, Flame, Star, RotateCcw, CheckCircle2, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ANIMALS_DATA } from '../data/animals';
import { Animal, PairComparison } from '../types';
import { audio } from '../utils/audio';

interface Level1GameProps {
  onBack: () => void;
  onLevelComplete: (score: number, stars: number) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const Level1Game: React.FC<Level1GameProps> = ({
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

  // Helper to generate random pair from 20 animals
  const generateNewPair = useCallback(() => {
    const shuffled = [...ANIMALS_DATA].sort(() => 0.5 - Math.random());
    const itemA = shuffled[0];
    const itemB = shuffled[1];
    const correctItemId = itemA.weightKg >= itemB.weightKg ? itemA.id : itemB.id;

    setCurrentPair({ itemA, itemB, correctItemId });
    setSelectedId(null);
    setIsRevealed(false);
  }, []);

  useEffect(() => {
    generateNewPair();
  }, [generateNewPair]);

  const handleCardClick = (animal: Animal) => {
    if (isRevealed || !currentPair) return;

    const isCorrect = animal.id === currentPair.correctItemId;
    setSelectedId(animal.id);
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

    // Next round after 1.4 seconds
    setTimeout(() => {
      if (round >= TOTAL_ROUNDS) {
        // Level Finished
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
    <div className="screen" style={{ justifyContent: 'space-between' }}>
      {/* Top Navigation Bar */}
      <div className="app-header">
        <button className="icon-btn" onClick={onBack} title="Выход">
          <ArrowLeft size={22} />
        </button>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Уровень 1 • Задание {round}/{TOTAL_ROUNDS}
          </div>
          <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--accent-cyan)' }}>
            Кто тяжелее? ⚖️
          </div>
        </div>

        <button className="icon-btn" onClick={onToggleMute}>
          {isMuted ? <VolumeX size={20} color="#ff0844" /> : <Volume2 size={20} color="#00e676" />}
        </button>
      </div>

      {/* Score Stats Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-around', background: 'rgba(0,0,0,0.3)', padding: '10px 16px', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800 }}>
          <Star size={18} fill="#ffd700" color="#ffd700" />
          <span>Очки: <strong style={{ color: score >= 0 ? '#00e676' : '#ff0844', fontSize: '18px' }}>{score}</strong></span>
        </div>

        {streak > 1 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#ffb199', fontWeight: 800, animation: 'popIn 0.3s' }}>
            <Flame size={18} fill="#ff0844" color="#ff0844" />
            <span>Серия x{streak}!</span>
          </div>
        )}
      </div>

      {/* Floating Score Popups (+1 / -2) */}
      {floatingScore && (
        <div
          key={floatingScore.id}
          className={`floating-score ${floatingScore.type}`}
          style={{ top: '40%', left: '50%', transform: 'translate(-50%, -50%)' }}
        >
          {floatingScore.text}
        </div>
      )}

      {/* Gameplay Battle Arena */}
      <div className="game-arena">
        {/* Card A */}
        {renderAnimalCard(
          currentPair.itemA,
          currentPair.correctItemId,
          selectedId,
          isRevealed,
          handleCardClick,
          imageErrorMap[currentPair.itemA.id],
          handleImageError
        )}

        <div className="vs-badge">VS</div>

        {/* Card B */}
        {renderAnimalCard(
          currentPair.itemB,
          currentPair.correctItemId,
          selectedId,
          isRevealed,
          handleCardClick,
          imageErrorMap[currentPair.itemB.id],
          handleImageError
        )}
      </div>

      {/* Victory Modal Overlay */}
      {isFinished && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div style={{ fontSize: '64px' }}>🏆</div>
            <h2 className="gradient-text" style={{ fontSize: '32px', fontWeight: 900 }}>
              Уровень Пройден!
            </h2>

            <div className="stars-container">
              <Star className="star active" size={36} fill="#ffd700" color="#ffd700" />
              <Star className={`star ${score >= 4 ? 'active' : ''}`} size={36} fill={score >= 4 ? '#ffd700' : 'none'} color={score >= 4 ? '#ffd700' : '#4a5568'} />
              <Star className={`star ${score >= 8 ? 'active' : ''}`} size={36} fill={score >= 8 ? '#ffd700' : 'none'} color={score >= 8 ? '#ffd700' : '#4a5568'} />
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '14px 20px', borderRadius: '16px', width: '100%', fontSize: '18px' }}>
              <div>Финишный счет: <strong style={{ color: '#00e676', fontSize: '24px' }}>{score} очков</strong></div>
            </div>

            <div style={{ display: 'flex', gap: '12px', width: '100%', marginTop: '10px' }}>
              <button className="btn-primary" style={{ flex: 1, padding: '14px' }} onClick={handleRestart}>
                <RotateCcw size={20} />
                Еще раз
              </button>
              <button className="btn-primary" style={{ flex: 1, padding: '14px', background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)' }} onClick={onBack}>
                <CheckCircle2 size={20} />
                Меню
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Render Helper for Individual Animal Card
function renderAnimalCard(
  animal: Animal,
  correctItemId: string,
  selectedId: string | null,
  isRevealed: boolean,
  onClick: (animal: Animal) => void,
  hasImageError: boolean,
  onError: (id: string) => void
) {
  const isSelected = selectedId === animal.id;
  const isCorrect = animal.id === correctItemId;

  let stateClass = '';
  if (isRevealed) {
    if (isSelected && isCorrect) stateClass = 'correct';
    else if (isSelected && !isCorrect) stateClass = 'wrong';
    else if (!isSelected && isCorrect) stateClass = 'correct';
  }

  return (
    <div
      className={`animal-card ${stateClass}`}
      onClick={() => onClick(animal)}
    >
      <div className="animal-img-wrapper">
        {animal.imageUri && !hasImageError ? (
          <img
            src={animal.imageUri}
            alt={animal.nameRu}
            className="animal-img"
            onError={() => onError(animal.id)}
          />
        ) : (
          <div className="animal-emoji-fallback">{animal.emoji}</div>
        )}
      </div>

      <div className="animal-name">
        {animal.emoji} {animal.nameRu}
      </div>

      {isRevealed ? (
        <div className="weight-reveal">
          ⚖️ {animal.weightDisplay}
        </div>
      ) : (
        <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
          Нажми, если думаешь, что он тяжелее!
        </div>
      )}
    </div>
  );
}
