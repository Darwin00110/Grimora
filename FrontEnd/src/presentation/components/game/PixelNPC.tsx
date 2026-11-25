import React from 'react';
import type { NPC, NPCExpression } from '../../../domain/entities/NPC';
import '../../styles/pixel-characters.css';

export type NPCAction = 'idle' | 'talking' | 'presenting' | 'worried' | 'happy';

export interface PixelNPCProps {
  npc: NPC;
  expression?: NPCExpression;
  action?: NPCAction;
  isTalking?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  flipHorizontal?: boolean;
  className?: string;
}

const SIZE_MAP: Record<'sm' | 'md' | 'lg' | 'xl', number> = {
  sm: 64,
  md: 96,
  lg: 136,
  xl: 184,
};

const VALID_NPCS = ['npc_padeiro', 'npc_jardineira', 'npc_arquiteto', 'npc_aprendiz'];

/**
 * PixelNPC — Renderizador Pixel Art dos NPCs com suporte a animações canônicas:
 * - idle: postura natural respirando
 * - talking: boca em movimento e cabeça reagindo à fala
 * - presenting: braço apontando para o problema matemático com faíscas explicativas
 * - worried: mãos apreensivas e gota de suor
 * - happy: braços abertos, sorriso amplo e comemoração
 */
export const PixelNPC: React.FC<PixelNPCProps> = ({
  npc,
  expression = 'neutral',
  action,
  isTalking = false,
  size = 'md',
  flipHorizontal = false,
  className = '',
}) => {
  // Converter npc-padeiro para npc_padeiro
  const rawKey = npc.id.replace('-', '_');
  const npcKey = VALID_NPCS.includes(rawKey) ? rawKey : 'npc_aprendiz';

  // Determinar ação efetiva
  let effectiveAction: NPCAction = action ?? 'idle';

  if (!action) {
    if (isTalking) {
      effectiveAction = 'talking';
    } else if (expression === 'worried' || expression === 'sad') {
      effectiveAction = 'worried';
    } else if (expression === 'happy' || expression === 'excited' || expression === 'grateful') {
      effectiveAction = 'happy';
    } else if (expression === 'surprised') {
      effectiveAction = 'worried';
    } else {
      effectiveAction = 'idle';
    }
  }

  const spriteSrc = `/assets/images/npcs/${npcKey}_${effectiveAction}.png`;
  const pixelSize = SIZE_MAP[size];

  return (
    <div
      className={`npc-pixel-container ${className}`}
      data-action={effectiveAction}
      style={{
        transform: flipHorizontal ? 'scaleX(-1)' : undefined,
        transformOrigin: 'bottom center',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        userSelect: 'none',
      }}
    >
      <img
        src={spriteSrc}
        alt={`${npc.name} (${effectiveAction})`}
        width={pixelSize}
        height={pixelSize}
        className="npc-pixel-img"
        style={{
          width: `${pixelSize}px`,
          height: `${pixelSize}px`,
          imageRendering: 'pixelated',
        }}
        draggable={false}
      />

      {/* Sombra de chão */}
      <div
        className="npc-ground-shadow"
        style={{
          width: `${Math.round(pixelSize * 0.45)}px`,
        }}
      />

      {/* Ícone contextual flutuante acima do NPC */}
      {effectiveAction === 'presenting' && (
        <div
          className="npc-thought-bubble animate-bounce-in"
          style={{
            position: 'absolute',
            top: -24,
            right: flipHorizontal ? undefined : -12,
            left: flipHorizontal ? -12 : undefined,
            background: 'rgba(13,10,30,0.92)',
            border: `2px solid ${npc.accentColor}`,
            borderRadius: 4,
            padding: '2px 8px',
            fontSize: 14,
            pointerEvents: 'none',
            boxShadow: `0 0 10px ${npc.accentColor}66`,
            animation: 'float 2s ease-in-out infinite',
          }}
        >
          💡 ❓
        </div>
      )}

      {effectiveAction === 'talking' && (
        <div
          style={{
            position: 'absolute',
            top: -12,
            right: flipHorizontal ? undefined : -8,
            left: flipHorizontal ? -8 : undefined,
            fontSize: 12,
            pointerEvents: 'none',
            animation: 'speech-pulse 0.8s ease-in-out infinite',
          }}
        >
          💬
        </div>
      )}
    </div>
  );
};
