import React, { useState } from 'react';
import type { HintLevel } from '../../../domain/entities/Challenge';

interface GrimoireHintsProps {
  hints: HintLevel[];
  onClose: () => void;
}

/**
 * GrimoireHints — Grimório de Dicas
 * Exibe dicas em 3 níveis: Observação → Raciocínio → Direcionamento
 * As dicas NÃO revelam a resposta direta.
 */
export const GrimoireHints: React.FC<GrimoireHintsProps> = ({ hints, onClose }) => {
  const [revealedLevels, setRevealedLevels] = useState<number[]>([1]);

  const revealNext = () => {
    const nextLevel = Math.max(...revealedLevels) + 1;
    if (nextLevel <= 3) {
      setRevealedLevels((prev) => [...prev, nextLevel]);
    }
  };

  const levelColors = {
    1: { color: '#00B8D9', border: '#0097A7', label: '👁️ Observação' },
    2: { color: '#7B2FBE', border: '#5B1F8E', label: '🧠 Raciocínio' },
    3: { color: '#FF9800', border: '#E65100', label: '🗺️ Direcionamento' },
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.85)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="animate-bounce-in"
        style={{
          background: 'var(--color-bg-panel)',
          border: '3px solid var(--color-accent)',
          borderRadius: 4,
          padding: 32,
          maxWidth: 500,
          width: '100%',
          boxShadow: 'var(--shadow-panel), var(--shadow-glow-gold)',
          position: 'relative',
        }}
      >
        {/* Cabeçalho */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>📖</div>
          <h2
            style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: 12,
              color: 'var(--color-accent)',
              letterSpacing: 2,
            }}
          >
            Grimório de Dicas
          </h2>
        </div>

        {/* Aviso */}
        <div
          style={{
            background: 'rgba(0,0,0,0.4)',
            border: '1px solid var(--color-text-muted)',
            borderRadius: 2,
            padding: '8px 12px',
            marginBottom: 20,
            fontSize: 12,
            color: 'var(--color-text-secondary)',
            textAlign: 'center',
          }}
        >
          ⚠️ As dicas orientam seu pensamento, mas não entregam a resposta!
        </div>

        {/* Dicas reveladas */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {hints.map((hint) => {
            const isRevealed = revealedLevels.includes(hint.level);
            const cfg = levelColors[hint.level];

            return (
              <div
                key={hint.level}
                className={isRevealed ? 'animate-page-enter' : ''}
                style={{
                  border: `2px solid ${isRevealed ? cfg.border : 'var(--color-text-muted)'}`,
                  borderRadius: 2,
                  overflow: 'hidden',
                  opacity: isRevealed ? 1 : 0.4,
                  transition: 'all 0.3s',
                }}
              >
                <div
                  style={{
                    background: isRevealed ? cfg.color : 'var(--color-bg-dark)',
                    padding: '8px 16px',
                    fontFamily: 'var(--font-pixel)',
                    fontSize: 9,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  Nível {hint.level} — {cfg.label}
                </div>
                {isRevealed && (
                  <div
                    style={{
                      padding: '12px 16px',
                      background: 'var(--color-bg-dark)',
                      color: 'var(--color-text-primary)',
                      lineHeight: 1.6,
                      fontSize: 15,
                    }}
                  >
                    {hint.text}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Botão de revelar próxima dica */}
        {Math.max(...revealedLevels) < 3 && (
          <button
            className="pixel-btn pixel-btn--primary"
            onClick={revealNext}
            style={{ width: '100%', marginTop: 16 }}
          >
            📖 Revelar Próxima Dica
          </button>
        )}

        {/* Fechar */}
        <button
          className="pixel-btn pixel-btn--ghost"
          onClick={onClose}
          style={{ width: '100%', marginTop: 8 }}
        >
          ✕ Fechar Grimório
        </button>
      </div>
    </div>
  );
};
