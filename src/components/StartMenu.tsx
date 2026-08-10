import React from 'react';
import { Play, Volume2, VolumeX, Trophy, Star, Grid } from 'lucide-react';
import { audio } from '../utils/audio';
import { GameStats } from '../types';

interface StartMenuProps {
  onStartGame: () => void;
  onOpenLevelSelect: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  stats: GameStats;
}

export const StartMenu: React.FC<StartMenuProps> = ({
  onStartGame,
  onOpenLevelSelect,
  isMuted,
  onToggleMute,
  stats
}) => {
  const handleStart = () => {
    audio.playClick();
    onStartGame();
  };

  const handleLevels = () => {
    audio.playClick();
    onOpenLevelSelect();
  };

  return (
    <div className="screen" style={{ justifyContent: 'space-between', paddingBottom: '30px' }}>
      {/* Header bar */}
      <div className="app-header">
        <div className="stat-pill">
          <Star size={18} fill="#ffd700" color="#ffd700" />
          <span>{stats.starsEarned}</span>
        </div>
        <div className="stat-pill">
          <Trophy size={18} color="#00f2fe" />
          <span>{stats.totalScore} очков</span>
        </div>
        <button className="icon-btn" onClick={onToggleMute} title="Звук">
          {isMuted ? <VolumeX size={20} color="#ff0844" /> : <Volume2 size={20} color="#00e676" />}
        </button>
      </div>

      {/* Main Center Content */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '16px', margin: 'auto 0' }}>
        <div style={{ fontSize: '72px', filter: 'drop-shadow(0 10px 20px rgba(0,242,254,0.4))' }}>
          🧠
        </div>

        <h1 className="gradient-text title-glow" style={{ fontSize: '46px', fontWeight: 900, lineHeight: 1.1 }}>
          GuessWhat
        </h1>

        <p style={{ color: 'var(--text-muted)', fontSize: '16px', maxWidth: '280px' }}>
          Интеллектуальная игра соревнований и неожиданных фактов
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '100%', maxWidth: '280px', marginTop: '16px' }}>
          <button className="btn-primary" style={{ width: '100%', fontSize: '22px' }} onClick={handleStart}>
            <Play fill="currentColor" size={24} />
            ИГРАТЬ
          </button>

          <button
            onClick={handleLevels}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '24px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white',
              fontFamily: 'var(--font-heading)',
              fontSize: '18px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <Grid size={20} color="#00f2fe" />
            Выбор уровней (30)
          </button>
        </div>
      </div>

      {/* Bottom Info Banner */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '14px'
        }}
      >
        <span style={{ color: 'var(--text-muted)' }}>Текущий уровень:</span>
        <span style={{ fontWeight: 800, color: 'var(--accent-cyan)' }}>Уровень 1: Кто тяжелее?</span>
      </div>
    </div>
  );
};
