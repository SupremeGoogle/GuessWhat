import React, { useState } from 'react';
import { ScreenType, GameStats, LevelInfo } from './types';
import { INITIAL_LEVELS } from './data/levels';
import { SplashScreen } from './components/SplashScreen';
import { StartMenu } from './components/StartMenu';
import { LevelSelect } from './components/LevelSelect';
import { Level1Game } from './components/Level1Game';
import { LevelLockedModal } from './components/LevelLockedModal';
import { audio } from './utils/audio';
import './styles/index.css';

export const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('splash');
  const [levels, setLevels] = useState<LevelInfo[]>(INITIAL_LEVELS);
  const [isMuted, setIsMuted] = useState(false);
  const [lockedModalLevel, setLockedModalLevel] = useState<LevelInfo | null>(null);

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
      if (levelId === 1) {
        setCurrentScreen('level-1');
      }
    } else {
      setLockedModalLevel(targetLevel);
    }
  };

  const handleLevel1Complete = (gainedScore: number, stars: number) => {
    setStats(prev => ({
      totalScore: prev.totalScore + Math.max(0, gainedScore),
      starsEarned: Math.max(prev.starsEarned, stars),
      levelsCompleted: Math.max(prev.levelsCompleted, 1)
    }));

    setLevels(prev => prev.map(lvl => {
      if (lvl.id === 1) {
        return {
          ...lvl,
          stars: Math.max(lvl.stars, stars),
          highScore: Math.max(lvl.highScore, gainedScore)
        };
      }
      return lvl;
    }));
  };

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
          onStartGame={() => setCurrentScreen('level-1')}
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

      {currentScreen === 'level-1' && (
        <Level1Game
          onBack={() => setCurrentScreen('menu')}
          onLevelComplete={handleLevel1Complete}
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
          setCurrentScreen('level-1');
        }}
      />
    </div>
  );
};

export default App;
