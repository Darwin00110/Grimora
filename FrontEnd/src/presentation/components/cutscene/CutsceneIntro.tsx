import React, { useState } from 'react';
import { PixelMage } from '../game/PixelMage';
import { PixelNPC, type NPCAction } from '../game/PixelNPC';
import { DialogueBox } from './DialogueBox';
import type { NPC, NPCExpression } from '../../../domain/entities/NPC';
import type { PlayerState } from '../../../domain/entities/Player';

interface CutsceneIntroProps {
  npc: NPC;
  npcExpression: NPCExpression;
  mageState: PlayerState;
  onComplete: () => void;
  backgroundScene?: React.ReactNode;
}

/**
 * CutsceneIntro — Etapa A do fluxo de missão
 * Cutscene animada e interativa com o NPC e o Mago Aprendiz:
 * - O NPC fala com animação labial sincronizada com a digitação
 * - Ao relatar o enigma, o NPC gesticula apresentando o problema
 * - Um holograma animado central surge demonstrando o problema matematicamente
 */
export const CutsceneIntro: React.FC<CutsceneIntroProps> = ({
  npc,
  npcExpression,
  mageState,
  onComplete,
  backgroundScene,
}) => {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  // Determinar a ação do NPC sincronizada com o diálogo
  // - Se estiver no passo 1 ou 2 (onde detalha os números): 'presenting'
  // - Se estiver digitando: 'talking'
  // - Se a expressão do diálogo for preocupada: 'worried'
  // - Senão: 'idle'
  const isProblemStep = dialogueIndex === 1 || dialogueIndex === 2;

  let npcAction: NPCAction = 'idle';
  if (isProblemStep) {
    npcAction = 'presenting';
  } else if (isTyping) {
    npcAction = 'talking';
  } else if (npc.introDialogues[dialogueIndex]?.expression === 'worried') {
    npcAction = 'worried';
  } else if (npc.introDialogues[dialogueIndex]?.expression === 'happy') {
    npcAction = 'happy';
  }

  // Estado do mago: se o NPC estiver apresentando o problema, mago concentra!
  const currentMageState: PlayerState = isProblemStep ? 'concentrating' : mageState;

  return (
    <div
      className="animate-page-enter"
      style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 20 }}
    >
      {/* ── CENA ANIMADA ── */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          minHeight: 260,
          background: 'radial-gradient(ellipse at 50% 100%, #1f143d 0%, #0d0a1e 100%)',
          border: '2px solid var(--color-primary)',
          borderRadius: 6,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          padding: '0 32px 20px',
          boxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.7)',
        }}
      >
        {/* Background cenográfico */}
        {backgroundScene || <CutsceneSceneBackdrop npcId={npc.id} />}

        {/* NPC — lado esquerdo (três-quartos virado para o mago) */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 2 }}>
          <div
            style={{
              background: 'rgba(13, 10, 30, 0.85)',
              padding: '4px 12px',
              borderRadius: 3,
              border: `1px solid ${npc.accentColor}`,
              fontSize: 10,
              fontFamily: 'var(--font-pixel)',
              color: npc.accentColor,
              whiteSpace: 'nowrap',
              boxShadow: `0 0 8px ${npc.accentColor}44`,
            }}
          >
            {npc.name} <span style={{ fontSize: 9, opacity: 0.7 }}>({npc.title})</span>
          </div>

          <PixelNPC
            npc={npc}
            expression={npc.introDialogues[dialogueIndex]?.expression ?? npcExpression}
            action={npcAction}
            isTalking={isTyping && !isProblemStep}
            size="lg"
          />
        </div>

        {/* ── CUTSCENE ANIMADA DO PROBLEMA (Centro da cena) ── */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            bottom: 30,
            transform: 'translateX(-50%)',
            zIndex: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pointerEvents: 'none',
          }}
        >
          {isProblemStep ? (
            <AnimatedProblemCutscene npcId={npc.id} />
          ) : (
            <div
              style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: 8,
                color: 'var(--color-text-muted)',
                background: 'rgba(0,0,0,0.5)',
                padding: '6px 14px',
                borderRadius: 12,
                border: '1px solid rgba(123, 47, 190, 0.3)',
                letterSpacing: 1,
              }}
            >
              ✦ Missão Narrativa ✦
            </div>
          )}
        </div>

        {/* Mago Aprendiz — lado direito (virado para o NPC com flipHorizontal) */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 2 }}>
          <div
            style={{
              background: 'rgba(13, 10, 30, 0.85)',
              padding: '4px 12px',
              borderRadius: 3,
              border: '1px solid var(--color-primary)',
              fontSize: 10,
              fontFamily: 'var(--font-pixel)',
              color: 'var(--color-primary-light)',
              whiteSpace: 'nowrap',
              boxShadow: '0 0 8px rgba(123, 47, 190, 0.4)',
            }}
          >
            Aprendiz
          </div>

          <PixelMage
            state={currentMageState}
            size="lg"
            flipHorizontal
            showMagicEffect={isProblemStep}
          />
        </div>
      </div>

      {/* Caixa de Diálogo sincronizada */}
      <DialogueBox
        speakerName={npc.name}
        dialogues={npc.introDialogues}
        onComplete={onComplete}
        onDialogueStep={(idx, typing) => {
          setDialogueIndex(idx);
          setIsTyping(typing);
        }}
      />
    </div>
  );
};

/**
 * AnimatedProblemCutscene — Pequena cutscene animada central mostrando
 * visualmente os elementos do problema matemático quando o NPC explica a situação
 */
function AnimatedProblemCutscene({ npcId }: { npcId: string }) {
  if (npcId === 'npc-padeiro') {
    return (
      <div
        className="animate-bounce-in"
        style={{
          background: 'rgba(18, 12, 38, 0.95)',
          border: '2px solid #FFD700',
          borderRadius: 8,
          padding: '12px 18px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          boxShadow: '0 0 20px rgba(255, 215, 0, 0.4), inset 0 0 15px rgba(0,0,0,0.6)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: 8,
            color: '#FFD700',
            letterSpacing: 1,
          }}
        >
          🥖 O Enigma das Fornadas
        </span>

        {/* Animação de sacos e fornadas */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', margin: '4px 0' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: 20, animation: 'float 2s ease-in-out infinite' }}>🔥 6</span>
            <span style={{ fontSize: 7, fontFamily: 'var(--font-pixel)', color: '#A98FCC' }}>fornadas</span>
          </div>

          <span style={{ fontSize: 16, fontFamily: 'var(--font-pixel)', color: '#FFD700' }}>×</span>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: 20, animation: 'float 2.2s ease-in-out infinite alternate' }}>🌾 4</span>
            <span style={{ fontSize: 7, fontFamily: 'var(--font-pixel)', color: '#A98FCC' }}>sacos</span>
          </div>

          <span style={{ fontSize: 16, fontFamily: 'var(--font-pixel)', color: '#FFD700' }}>=</span>

          <div
            style={{
              width: 32,
              height: 32,
              border: '2px dashed #00E676',
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 16,
              color: '#00E676',
              fontFamily: 'var(--font-pixel)',
              animation: 'pulse-glow 1.5s infinite',
            }}
          >
            ?
          </div>
        </div>

        <div style={{ fontSize: 9, color: 'var(--color-text-secondary)' }}>
          Quantos sacos de farinha no total?
        </div>
      </div>
    );
  }

  if (npcId === 'npc-jardineira') {
    return (
      <div
        className="animate-bounce-in"
        style={{
          background: 'rgba(12, 28, 20, 0.95)',
          border: '2px solid #00E676',
          borderRadius: 8,
          padding: '12px 18px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          boxShadow: '0 0 20px rgba(0, 230, 118, 0.4), inset 0 0 15px rgba(0,0,0,0.6)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: 8,
            color: '#00E676',
            letterSpacing: 1,
          }}
        >
          🌸 Partilha do Jardim Mágico
        </span>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center', margin: '4px 0' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: 20, animation: 'float 2s ease-in-out infinite' }}>🌺 48</span>
            <span style={{ fontSize: 7, fontFamily: 'var(--font-pixel)', color: '#A98FCC' }}>flores</span>
          </div>

          <span style={{ fontSize: 16, fontFamily: 'var(--font-pixel)', color: '#00E676' }}>÷</span>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: 20, animation: 'float 2.4s ease-in-out infinite alternate' }}>🪴 6</span>
            <span style={{ fontSize: 7, fontFamily: 'var(--font-pixel)', color: '#A98FCC' }}>canteiros</span>
          </div>

          <span style={{ fontSize: 16, fontFamily: 'var(--font-pixel)', color: '#00E676' }}>=</span>

          <div
            style={{
              width: 32,
              height: 32,
              border: '2px dashed #FFD700',
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 16,
              color: '#FFD700',
              fontFamily: 'var(--font-pixel)',
              animation: 'pulse-glow 1.5s infinite',
            }}
          >
            ?
          </div>
        </div>

        <div style={{ fontSize: 9, color: 'var(--color-text-secondary)' }}>
          Quantas flores em cada canteiro?
        </div>
      </div>
    );
  }

  if (npcId === 'npc-arquiteto') {
    return (
      <div
        className="animate-bounce-in"
        style={{
          background: 'rgba(18, 24, 45, 0.95)',
          border: '2px solid #4488FF',
          borderRadius: 8,
          padding: '12px 18px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          boxShadow: '0 0 20px rgba(68, 136, 255, 0.4), inset 0 0 15px rgba(0,0,0,0.6)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: 8,
            color: '#7EB8FF',
            letterSpacing: 1,
          }}
        >
          🏰 As Torres Exponenciais
        </span>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center', margin: '4px 0' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: 20, animation: 'float 1.8s ease-in-out infinite' }}>🏰 3</span>
            <span style={{ fontSize: 7, fontFamily: 'var(--font-pixel)', color: '#A98FCC' }}>torres</span>
          </div>

          <span style={{ fontSize: 14, fontFamily: 'var(--font-pixel)', color: '#7EB8FF' }}>× 3 andares × 3</span>

          <span style={{ fontSize: 16, fontFamily: 'var(--font-pixel)', color: '#7EB8FF' }}>=</span>

          <div
            style={{
              width: 32,
              height: 32,
              border: '2px dashed #7EB8FF',
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 16,
              color: '#7EB8FF',
              fontFamily: 'var(--font-pixel)',
              animation: 'pulse-glow 1.5s infinite',
            }}
          >
            ?
          </div>
        </div>

        <div style={{ fontSize: 9, color: 'var(--color-text-secondary)' }}>
          Cálculo exponencial: 3³ janelas
        </div>
      </div>
    );
  }

  // Fallback genérico
  return (
    <div
      className="animate-bounce-in"
      style={{
        background: 'rgba(20, 15, 40, 0.95)',
        border: '2px solid var(--color-accent)',
        borderRadius: 8,
        padding: '10px 16px',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: 20, marginBottom: 4 }}>📜 ⚡</div>
      <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 8, color: 'var(--color-accent)' }}>
        Enigma Matemático
      </div>
    </div>
  );
}

function CutsceneSceneBackdrop({ npcId }: { npcId: string }) {
  const getThemeGradient = () => {
    switch (npcId) {
      case 'npc-padeiro':
        return 'linear-gradient(180deg, #1f1208 0%, #2e1a0b 50%, #150a04 100%)';
      case 'npc-jardineira':
        return 'linear-gradient(180deg, #0a1f12 0%, #102e1b 50%, #05140b 100%)';
      case 'npc-arquiteto':
        return 'linear-gradient(180deg, #0d152a 0%, #14203e 50%, #080d1a 100%)';
      default:
        return 'linear-gradient(180deg, #0d0a1e 0%, #1a1035 60%, #231845 100%)';
    }
  };

  return (
    <div style={{ position: 'absolute', inset: 0, background: getThemeGradient(), pointerEvents: 'none' }}>
      {/* Estrelas cintilantes */}
      {[...Array(14)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: `${Math.random() * 55}%`,
            left: `${(i / 14) * 100}%`,
            width: i % 3 === 0 ? 3 : 2,
            height: i % 3 === 0 ? 3 : 2,
            background: '#FFD700',
            opacity: 0.5 + Math.random() * 0.5,
            animation: `stars-twinkle ${1.2 + Math.random() * 2}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}

      {/* Piso de pedra em pixel art */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 18,
          background: 'repeating-linear-gradient(90deg, #231845 0px, #231845 12px, #1a1035 12px, #1a1035 24px)',
          borderTop: '2px solid #3D2A6A',
        }}
      />
    </div>
  );
}
