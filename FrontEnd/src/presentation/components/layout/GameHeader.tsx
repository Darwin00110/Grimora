import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../context/GameContext';
import '../../styles/components.css';

/**
 * GameHeader — Barra superior da aplicação
 * Exibe logo, stats do jogador e navegação principal
 */
export const GameHeader: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useGame();
  const player = state.player;

  const xpPercent = player
    ? Math.min((player.stats.experience / player.stats.experienceToNextLevel) * 100, 100)
    : 0;

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'rgba(13,10,30,0.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: '2px solid var(--color-primary)',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
      }}
    >
      {/* Logo Grimora + Chapéu */}
      <button
        onClick={() => navigate('/')}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
        title="Voltar ao início"
      >
        <img
          src="/assets/images/hat.png"
          alt="Chapéu Grimora"
          style={{
            height: 38,
            objectFit: 'contain',
            filter: 'drop-shadow(0 0 8px rgba(123,47,190,0.8))',
          }}
        />
        <img
          src="/assets/images/logo.png"
          alt="Grimora"
          style={{
            height: 36,
            objectFit: 'contain',
            filter: 'drop-shadow(0 0 8px rgba(123,47,190,0.6))',
          }}
        />
      </button>

      {/* Stats do jogador */}
      {player && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1, maxWidth: 400 }}>
          {/* Level */}
          <div
            style={{
              background: 'var(--color-primary)',
              borderRadius: '50%',
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-pixel)',
              fontSize: 9,
              color: 'white',
              border: '2px solid var(--color-accent)',
              flexShrink: 0,
              boxShadow: 'var(--shadow-glow-purple)',
            }}
          >
            {player.stats.level}
          </div>

          {/* XP Bar */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 9,
                fontFamily: 'var(--font-pixel)',
                color: 'var(--color-text-muted)',
                marginBottom: 4,
              }}
            >
              {player.stats.experience} / {player.stats.experienceToNextLevel} XP
            </div>
            <div className="xp-bar-container">
              <div
                className="xp-bar-fill"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
          </div>

          {/* MP */}
          <div
            style={{
              fontSize: 10,
              fontFamily: 'var(--font-pixel)',
              color: '#7EB8FF',
              whiteSpace: 'nowrap',
            }}
          >
            💧 {player.stats.magicPoints}
          </div>
        </div>
      )}

      {/* Navegação */}
      <nav style={{ display: 'flex', gap: 8 }}>
        <button
          className="pixel-btn pixel-btn--ghost"
          style={{ padding: '8px 12px', fontSize: 14 }}
          onClick={() => navigate('/progression')}
          title="Progressão"
        >
          🗺️
        </button>
        <button
          className="pixel-btn pixel-btn--ghost"
          style={{ padding: '8px 12px', fontSize: 14 }}
          onClick={() => navigate('/spellbook')}
          title="Grimório de Magias"
        >
          📖
        </button>
      </nav>
    </header>
  );
};
