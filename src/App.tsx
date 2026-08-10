import React, { useState } from 'react';
import { ScreenType, GameStats, LevelInfo, GameItem } from './types';
import { INITIAL_LEVELS } from './data/levels';
import { SplashScreen } from './components/SplashScreen';
import { StartMenu } from './components/StartMenu';
import { LevelSelect } from './components/LevelSelect';
import { GameLevel } from './components/GameLevel';
import { LevelLockedModal } from './components/LevelLockedModal';
import { audio } from './utils/audio';

import { LEVEL1_DATA } from './data/level1';
import { LEVEL2_DATA } from './data/level2';
import { LEVEL3_DATA } from './data/level3';
import { LEVEL4_DATA } from './data/level4';
import { LEVEL5_DATA } from './data/level5';
import { LEVEL6_DATA } from './data/level6';
import { LEVEL7_DATA } from './data/level7';
import { LEVEL8_DATA } from './data/level8';
import { LEVEL9_DATA } from './data/level9';
import { LEVEL10_DATA } from './data/level10';

import './styles/index.css';

const getLevelData = (levelId: number): GameItem[] => {
  switch (levelId) {
    case 1: return LEVEL1_DATA;
    case 2: return LEVEL2_DATA;
    case 3: return LEVEL3_DATA;
    case 4: return LEVEL4_DATA;
    case 5: return LEVEL5_DATA;
    case 6: return LEVEL6_DATA;
    case 7: return LEVEL7_DATA;
    case 8: return LEVEL8_DATA;
    case 9: return LEVEL9_DATA;
    case 10: return LEVEL10_DATA;
    default: return LEVEL1_DATA;
  }
};

export const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('splash');
  const [levels, setLevels] = useState<LevelInfo[]>(INITIAL_LEVELS);
  const [isMuted, setIsMuted] = useState(false);
  const [lockedModalLevel, setLockedModalLevel] = useState<LevelInfo | null>(null);
  const [activeLevelId, setActiveLevelId] = useState<number>(1);

  const [stats, setStats] = useState<GameStats>({
    totalScore: 0,
    starsEarned: 0,
    levelsCompleted: 0
  });

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
    setStats(prev => ({
      totalScore: prev.totalScore + Math.max(0, gainedScore),
      starsEarned: Math.max(prev.starsEarned, stars),
      levelsCompleted: Math.max(prev.levelsCompleted, 1)
    }));

    setLevels(prev => prev.map(lvl => {
      if (lvl.id === activeLevelId) {
        return {
          ...lvl,
          stars: Math.max(lvl.stars, stars),
          highScore: Math.max(lvl.highScore, gainedScore)
        };
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

      {currentScreen === 'splash' && (
        <SplashScreen onFinish={() => setCurrentScreen('menu')} />
      )}

      {currentScreen === 'menu' && (
        <StartMenu
          onStartGame={() => handleSelectLevel(1)}
          onOpenLevelSelect={() => setCurrentScreen('level-select')}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          stats={stats}
        />
      )}

      {currentScreen === 'level-select' && (
        <LevelSelect
          levels={levels}
          onSelectLevel={handleSelectLevel}
          onBack={() => setCurrentScreen('menu')}
        />
      )}

      {currentScreen === 'game-level' && (
        <GameLevel
          levelInfo={activeLevelInfo}
          levelData={activeLevelData}
          onBack={() => setCurrentScreen('menu')}
          onLevelComplete={handleLevelComplete}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />
      )}

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
