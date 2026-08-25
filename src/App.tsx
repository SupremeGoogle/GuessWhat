import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ScreenType, LevelInfo, GameItem } from './types';
import { INITIAL_LEVELS } from './data/levels';
import { SplashScreen } from './components/SplashScreen';
import { StartMenu } from './components/StartMenu';
import { LevelSelect } from './components/LevelSelect';
import { GameLevel } from './components/GameLevel';
import { LevelLockedModal } from './components/LevelLockedModal';
import { audio } from './utils/audio';
import { loadProgress, saveProgress, mergeLevelsWithProgress, computeStats } from './lib/storage';

import { LEVEL1_DATA } from './data/level1';
import { SPEEDS_DATA } from './data/speeds';
import { LEVEL3_DATA } from './data/level3';
import { LEVEL4_DATA } from './data/level4';
import { LEVEL5_DATA } from './data/level5';
import { LEVEL6_DATA } from './data/level6';
import { LEVEL7_DATA } from './data/level7';
import { LEVEL8_DATA } from './data/level8';
import { LEVEL9_DATA } from './data/level9';
import { LEVEL10_DATA } from './data/level10';
import { LEVEL11_DATA } from './data/level11';
import { LEVEL12_DATA } from './data/level12';

import './styles/index.css';

const getLevelData = (levelId: number): GameItem[] => {
  switch (levelId) {
    case 1: return LEVEL1_DATA;
    case 2: return SPEEDS_DATA;
    case 3: return LEVEL3_DATA;
    case 4: return LEVEL4_DATA;
    case 5: return LEVEL5_DATA;
    case 6: return LEVEL6_DATA;
    case 7: return LEVEL7_DATA;
    case 8: return LEVEL8_DATA;
    case 9: return LEVEL9_DATA;
    case 10: return LEVEL10_DATA;
    case 11: return LEVEL11_DATA;
    case 12: return LEVEL12_DATA;
    default: return LEVEL1_DATA;
  }
};

// Разблокировка следующего уровня требует хотя бы 2 звёзд за пройденный.
const UNLOCK_NEXT_LEVEL_STARS = 2;

export const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('splash');
  // Прогресс (звёзды, рекорды, разблокировки) переживает перезагрузку страницы:
  // при первом рендере подмешиваем сохранённые данные из localStorage поверх
  // актуального списка уровней (см. `src/lib/storage.ts`).
  const [levels, setLevels] = useState<LevelInfo[]>(() =>
    mergeLevelsWithProgress(INITIAL_LEVELS, loadProgress()?.levels)
  );
  const [isMuted, setIsMuted] = useState(false);
  const [lockedModalLevel, setLockedModalLevel] = useState<LevelInfo | null>(null);
  const [activeLevelId, setActiveLevelId] = useState<number>(1);

  // Счётчики в меню — не отдельное состояние, а всегда пересчитываются из
  // `levels` (см. `computeStats`), поэтому по построению не могут разойтись
  // с тем, что подписано в UI: «звёзды» — сумма лучших `stars` по уровням,
  // «очки» — сумма рекордов `highScore` по уровням.
  const stats = useMemo(() => computeStats(levels), [levels]);

  // Сохраняем прогресс при каждом изменении звёзд/рекордов/уровней — не только
  // при выходе из игры, чтобы случайное закрытие вкладки его не стёрло.
  useEffect(() => {
    saveProgress(stats, levels);
  }, [stats, levels]);

  const handleToggleMute = () => {
    const muted = audio.toggleMute();
    setIsMuted(muted);
  };

  const handleSelectLevel = (levelId: number) => {
    const targetLevel = levels.find(l => l.id === levelId);
    if (!targetLevel) return;

    if (targetLevel.isUnlocked) {
      setActiveLevelId(levelId);
      setCurrentScreen('game-level');
    } else {
      setLockedModalLevel(targetLevel);
    }
  };

  const handleLevelComplete = (gainedScore: number, stars: number) => {
    // Счётчики меню (`stats`) больше не обновляются здесь напрямую — они
    // пересчитываются из per-level `stars`/`highScore` ниже (см. `computeStats`).
    setLevels(prev => prev.map(lvl => {
      if (lvl.id === activeLevelId) {
        return {
          ...lvl,
          stars: Math.max(lvl.stars, stars),
          highScore: Math.max(lvl.highScore, gainedScore)
        };
      }
      // Пройденный с ≥2 звёзд уровень открывает следующий по id — работает
      // для любого уровня, а не только для перехода 1 → 2.
      if (lvl.id === activeLevelId + 1 && stars >= UNLOCK_NEXT_LEVEL_STARS) {
        return { ...lvl, isUnlocked: true };
      }
      return lvl;
    }));
  };

  const activeLevelInfo = levels.find(l => l.id === activeLevelId) || levels[0];
  const activeLevelData = getLevelData(activeLevelId);

  return (
    <div className="app-container">
      {/* Background ambient lighting */}
      <div className="ambient-glow orb-1"></div>
      <div className="ambient-glow orb-2"></div>
      <div className="ambient-glow orb-3"></div>

      <AnimatePresence mode="wait">
        {currentScreen === 'splash' && (
          <SplashScreen key="splash" onFinish={() => setCurrentScreen('menu')} />
        )}

        {currentScreen === 'menu' && (
          <StartMenu
            key="menu"
            onStartGame={() => handleSelectLevel(1)}
            onOpenLevelSelect={() => setCurrentScreen('level-select')}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            stats={stats}
          />
        )}

        {currentScreen === 'level-select' && (
          <LevelSelect
            key="level-select"
            levels={levels}
            onSelectLevel={handleSelectLevel}
            onBack={() => setCurrentScreen('menu')}
          />
        )}

        {currentScreen === 'game-level' && (
          <GameLevel
            key="game-level"
            levelInfo={activeLevelInfo}
            levelData={activeLevelData}
            onBack={() => setCurrentScreen('menu')}
            onLevelComplete={handleLevelComplete}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
          />
        )}
      </AnimatePresence>

      {/* Modal for Locked Levels */}
      <LevelLockedModal
        level={lockedModalLevel}
        onClose={() => setLockedModalLevel(null)}
        onPlayLevel1={() => {
          setLockedModalLevel(null);
          handleSelectLevel(1);
        }}
      />
    </div>
  );
};

export default App;
