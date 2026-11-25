import React from 'react';
import type { PlayerState } from '../../../domain/entities/Player';
import '../../styles/pixel-characters.css';

export interface PixelMageProps {
  state?: PlayerState;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  expression?: 'neutral' | 'happy' | 'sad' | 'surprised' | 'excited';
  showMagicEffect?: boolean;
  className?: string;
  flipHorizontal?: boolean;
}

const SIZE_MAP: Record<'sm' | 'md' | 'lg' | 'xl', number> = {
  sm: 56,
  md: 88,
  lg: 128,
  xl: 180,
};

/**
 * PixelMage — Sprite Pixel Art detalhado do Mago Aprendiz
 * Renderizado a partir do design canônico em 32x32 com escala nearest-neighbor.
 * Estados:
 *   - idle: postura natural com respiração mágica
 *   - walking: passo rítmico e capa/cachecol em movimento
 *   - concentrating: olhos focados e orbe energizando
 *   - casting: raio de magia pura disparando do cajado e olhos brilhando
 *   - success: comemoração, bochechas coradas, sorriso e estrelas douradas
 *   - failure: olhos tristes, gota de suor e cajado baixo
 *   - scorched: chamuscado após explosão, tons de cinza/cinzas, olhos em X e fumaça subindo
 */
export const PixelMage: React.FC<PixelMageProps> = ({
  state = 'idle',
  size = 'md',
  expression = 'neutral',
  showMagicEffect = false,
  className = '',
  flipHorizontal = false,
}) => {
  // Ajuste fino do estado visual se for idle com expressão específica
  let effectiveState: PlayerState = state;
  if (state === 'idle') {
    if (expression === 'happy' || expression === 'excited') {
      effectiveState = 'success';
    } else if (expression === 'sad') {
      effectiveState = 'failure';
    }
  }

  // Mapeamento de sprites
  let spriteSrc = `/assets/images/player_${effectiveState}.png`;
  if (effectiveState === 'scorched') {
    spriteSrc = '/assets/images/player_dizzy.png';
  }

  const pixelSize = SIZE_MAP[size];

  return (
    <div
      className={`player-pixel-container ${className}`}
      data-state={effectiveState}
      style={{
        transform: flipHorizontal ? 'scaleX(-1)' : undefined,
        transformOrigin: 'bottom center',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <img
        src={spriteSrc}
        alt={`Mago Aprendiz (${effectiveState})`}
        width={pixelSize}
        height={pixelSize}
        className="player-pixel-img"
        style={{
          width: `${pixelSize}px`,
          height: `${pixelSize}px`,
          imageRendering: 'pixelated',
        }}
        draggable={false}
      />

      {/* Sombra de chão */}
      <div
        className="player-ground-shadow"
        style={{
          width: `${Math.round(pixelSize * 0.55)}px`,
        }}
      />

      {/* Estrelinhas giratórias de tontura se estiver dizzy ou scorched */}
      {(effectiveState === 'dizzy' || effectiveState === 'scorched') && (
        <div
          className="dizzy-stars-container"
          style={{
            position: 'absolute',
            top: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
            display: 'flex',
            gap: '8px',
            fontSize: '14px',
            animation: 'dizzy-wobble 1.2s ease-in-out infinite alternate',
          }}
        >
          <span style={{ animation: 'dizzy-spin 1.4s linear infinite', color: '#FFD700' }}>✦</span>
          <span style={{ animation: 'dizzy-spin 1.8s linear infinite reverse', color: '#FFF' }}>✧</span>
          <span style={{ animation: 'dizzy-spin 1.2s linear infinite', color: '#FFD700' }}>✦</span>
        </div>
      )}

      {/* Brilho extra se showMagicEffect estiver ativo */}
      {(showMagicEffect || effectiveState === 'casting') && (
        <div
          style={{
            position: 'absolute',
            top: '15%',
            right: flipHorizontal ? undefined : '12%',
            left: flipHorizontal ? '12%' : undefined,
            fontSize: 16,
            animation: 'stars-twinkle 0.8s ease-in-out infinite',
            pointerEvents: 'none',
            filter: 'drop-shadow(0 0 6px #64f0ff)',
          }}
        >
          ✨
        </div>
      )}
    </div>
  );
};
