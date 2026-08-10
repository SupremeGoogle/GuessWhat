import React from 'react';
import { ArrowLeft, Lock, Star, Sparkles } from 'lucide-react';
import { LevelInfo } from '../types';
import { audio } from '../utils/audio';

interface LevelSelectProps {
  levels: LevelInfo[];
  onSelectLevel: (levelId: number) => void;
  onBack: () => void;
}

export const LevelSelect: React.FC<LevelSelectProps> = ({
  levels,
  onSelectLevel,
  onBack
}) => {
  const handleCardClick = (level: LevelInfo) => {
    audio.playClick();
    onSelectLevel(level.id);
  };

  return (
    <div className="screen">
      {/* Header */}
      <div className="app-header">
        <button className="icon-btn" onClick={onBack} title="Назад">
          <ArrowLeft size={22} />
        </button>
        <h2 style={{ fontSize: '20px', fontWeight: 800 }}>Выбор уровня</h2>
        <div style={{ width: '44px' }}></div>
      </div>

      <div style={{ marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '14px' }}>
        <Sparkles size={16} color="#ffd700" />
        Всего 30 уровней. Уровень 1 открыт!
      </div>

      {/* Grid */}
      <div className="level-grid">
        {levels.map((lvl) => (
          <div
            key={lvl.id}
            className={`level-card ${lvl.isUnlocked ? 'unlocked' : 'locked'}`}
            onClick={() => handleCardClick(lvl)}
          >
            {lvl.isUnlocked && <span className="badge-active">Открыт</span>}

            {!lvl.isUnlocked ? (
              <Lock size={24} color="#a0aec0" style={{ marginBottom: '4px' }} />
            ) : (
              <span className="level-icon">{lvl.icon}</span>
            )}

            <div className="level-num" style={{ color: lvl.isUnlocked ? '#fff' : '#718096' }}>
              #{lvl.id}
            </div>

            <div className="level-title-sm">
              {lvl.title}
            </div>

            {lvl.isUnlocked && (
              <div style={{ display: 'flex', gap: '2px', marginTop: '4px' }}>
                {[1, 2, 3].map(s => (
                  <Star
                    key={s}
                    size={12}
                    fill={s <= lvl.stars ? '#ffd700' : 'none'}
                    color={s <= lvl.stars ? '#ffd700' : '#4a5568'}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
