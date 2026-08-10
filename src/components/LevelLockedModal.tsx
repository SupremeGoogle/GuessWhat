import React from 'react';
import { Lock, Sparkles, X } from 'lucide-react';
import { LevelInfo } from '../types';

interface LevelLockedModalProps {
  level: LevelInfo | null;
  onClose: () => void;
  onPlayLevel1: () => void;
}

export const LevelLockedModal: React.FC<LevelLockedModalProps> = ({
  level,
  onClose,
  onPlayLevel1
}) => {
  if (!level) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '360px' }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ fontSize: '56px', background: 'rgba(255,255,255,0.08)', borderRadius: '50%', width: '90px', height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Lock size={44} color="#ff0844" />
        </div>

        <h3 style={{ fontSize: '24px', fontWeight: 900 }}>
          Уровень #{level.id} Заблокирован
        </h3>

        <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
          Тема: <strong style={{ color: '#00f2fe' }}>{level.title}</strong>
        </p>

        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px 16px', borderRadius: '16px', fontSize: '14px', textAlign: 'left', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', color: '#ffd700', fontWeight: 700 }}>
            <Sparkles size={16} /> Требование для открытия:
          </div>
          Пройди Уровень 1 ("Кто тяжелее?"), чтобы разблокировать этот и следующие уровни!
        </div>

        <button
          className="btn-primary"
          style={{ width: '100%', marginTop: '10px' }}
          onClick={onPlayLevel1}
        >
          Играть в Уровень 1 🚀
        </button>
      </div>
    </div>
  );
};
