import React, { useEffect, useState } from 'react';
import { Sparkles, Play } from 'lucide-react';
import { audio } from '../utils/audio';

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
    <div className="screen splash-container" onClick={handleTap}>
      <div className="splash-logo">🧠</div>
      <div>
        <h1 className="gradient-text title-glow" style={{ fontSize: '42px', fontWeight: 900 }}>
          GuessWhat
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '6px', fontSize: '16px' }}>
          Викторина сравнений & фактов
        </p>
      </div>

      <div className="progress-bar-container" style={{ marginTop: '20px' }}>
        <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <button className="btn-primary" onClick={handleTap}>
          <Play fill="currentColor" size={20} />
          Нажми для старта
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: 0.6, fontSize: '13px', marginTop: 'auto' }}>
        <Sparkles size={14} color="#00f2fe" />
        Уровень 1: Кто тяжелее?
      </div>
    </div>
  );
};
