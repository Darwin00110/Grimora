import React, { useState, useEffect, useRef } from 'react';
import type { NPC } from '../../../domain/entities/NPC';
import type { Spell } from '../../../domain/entities/Spell';
import { PixelMage } from '../game/PixelMage';
import { PixelNPC } from '../game/PixelNPC';
import { DialogueBox } from '../cutscene/DialogueBox';

interface ResultPanelProps {
  success: boolean;
  npc: NPC;
  spellReward: Spell;
  xpReward: number;
  onRetry: () => void;
  onContinue: () => void;
  onOpenHints: () => void;
}

/**
 * ResultPanel — Etapa D do fluxo de missão
 * Apresenta animação de sucesso ou falha
 */
export const ResultPanel: React.FC<ResultPanelProps> = ({
  success,
  npc,
  spellReward,
  xpReward,
  onRetry,
  onContinue,
  onOpenHints,
}) => {
  /* ── Fases principais ── */
  const [phase, setPhase] = useState<'animation' | 'dialogue' | 'reward'>('animation');

  /* ── Fases do mago no fracasso ──
     knockback → (700 ms) → dizzy → (1 400 ms) → dialogue */
  const [magePhase, setMagePhase] = useState<'knockback' | 'dizzy'>('knockback');

  /* ── Explosão central visível só na fase knockback ── */
  const [showExplosion, setShowExplosion] = useState(!success);

  /* ref usado para limpar timers no unmount */
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const addTimer = (fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms);
    timersRef.current.push(t);
    return t;
  };

  useEffect(() => {
    if (success) {
      /* Sucesso: anima por 1 800 ms e vai para diálogo */
      addTimer(() => setPhase('dialogue'), 1800);
    } else {
      /* Fracasso: sequência  knockback → dizzy → dialogue */
      addTimer(() => setShowExplosion(false), 600);   /* some a explosão */
      addTimer(() => setMagePhase('dizzy'),   700);   /* muda para tontura */
      addTimer(() => setPhase('dialogue'),   2200);   /* abre diálogo */
    }
    return () => { timersRef.current.forEach(clearTimeout); timersRef.current = []; };
  }, [success]);

  const handleDialogueComplete = () => {
    if (success) setPhase('reward');
  };

  return (
    <div
      className="animate-page-enter"
      style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center' }}
    >
      {/* ── CENA DE ANIMAÇÃO ── */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          minHeight: 200,
          background: success
            ? 'linear-gradient(180deg, #001a0d 0%, #003320 60%, #001a0d 100%)'
            : 'linear-gradient(180deg, #1a0000 0%, #330000 60%, #1a0000 100%)',
          border: `2px solid ${success ? 'var(--color-success)' : 'var(--color-danger)'}`,
          borderRadius: 4,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-around',
          padding: '0 40px 24px',
        }}
      >
        {/* Efeito de fundo */}
        {success ? <SuccessBackground /> : <FailureBackground />}

        {/* NPC */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ fontSize: 10, fontFamily: 'var(--font-pixel)', color: npc.accentColor }}>
            {npc.name}
          </div>
          <PixelNPC
            npc={npc}
            expression={success ? 'excited' : 'surprised'}
            action={success ? 'happy' : 'worried'}
            size="lg"
          />
        </div>

        {/* Mago */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ fontSize: 10, fontFamily: 'var(--font-pixel)', color: 'var(--color-primary-light)' }}>
            Aprendiz
          </div>
          <PixelMage
            state={success ? 'success' : magePhase === 'knockback' ? 'knockback' : 'dizzy'}
            size="lg"
            expression={success ? 'happy' : 'sad'}
            showMagicEffect={success}
            flipHorizontal
          />
        </div>

        {/* ── Explosão central (knockback phase) ── */}
        {!success && showExplosion && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 20,
              pointerEvents: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Emoji central grande */}
            <div
              style={{
                fontSize: 72,
                animation: 'bounce-in 0.35s cubic-bezier(0.68,-0.55,0.265,1.55) forwards',
              }}
            >
              💥
            </div>
            {/* Anel de shockwave */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 20,
                height: 20,
                transform: 'translate(-50%, -50%)',
                borderRadius: '50%',
                border: '3px solid rgba(255,100,0,0.8)',
                animation: 'shockwave-ring 0.55s ease-out forwards',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 20,
                height: 20,
                transform: 'translate(-50%, -50%)',
                borderRadius: '50%',
                border: '2px solid rgba(255,220,80,0.6)',
                animation: 'shockwave-ring 0.55s ease-out 0.08s forwards',
              }}
            />
          </div>
        )}

        {/* ── Ícone de sucesso ── */}
        {success && phase === 'animation' && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: 64,
              animation: 'bounce-in 0.6s cubic-bezier(0.68,-0.55,0.265,1.55) forwards',
              zIndex: 10,
            }}
          >
            ✨
          </div>
        )}
      </div>

      {/* ── DIÁLOGOS ── */}
      {phase !== 'animation' && (
        <DialogueBox
          speakerName={npc.name}
          dialogues={success ? npc.successDialogues : npc.failureDialogues}
          onComplete={handleDialogueComplete}
        />
      )}

      {/* ── RECOMPENSA (apenas sucesso) ── */}
      {phase === 'reward' && success && (
        <div
          className="pixel-panel pixel-panel--gold animate-bounce-in"
          style={{ width: '100%', padding: 24, textAlign: 'center' }}
        >
          <div style={{ fontSize: 10, fontFamily: 'var(--font-pixel)', color: 'var(--color-accent)', marginBottom: 16 }}>
            🏆 Feitiço Aprendido!
          </div>

          {/* Card da magia */}
          <div
            style={{
              background: 'rgba(0,0,0,0.5)',
              border: '2px solid var(--color-accent)',
              borderRadius: 4,
              padding: 20,
              marginBottom: 16,
              display: 'inline-block',
              minWidth: 200,
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 8 }}>{spellReward.iconEmoji}</div>
            <div style={{ fontFamily: 'var(--font-pixel)', fontSize: 10, color: 'var(--color-accent)' }}>
              {spellReward.name}
            </div>
            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 8 }}>
              {spellReward.mathConcept}
            </div>
            {spellReward.formula && (
              <div
                style={{
                  fontFamily: 'var(--font-pixel)',
                  fontSize: 11,
                  color: 'var(--color-primary-light)',
                  marginTop: 8,
                  padding: '4px 8px',
                  background: 'rgba(123,47,190,0.2)',
                  borderRadius: 2,
                }}
              >
                {spellReward.formula}
              </div>
            )}
          </div>

          {/* XP */}
          <div style={{ marginBottom: 20 }}>
            <span
              style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: 11,
                color: 'var(--color-success)',
              }}
            >
              +{xpReward} XP
            </span>
            <span style={{ color: 'var(--color-text-muted)', marginLeft: 8, fontSize: 12 }}>
              adicionado ao grimório
            </span>
          </div>

          {/* Animação: feitiço indo para o grimório */}
          <div
            style={{
              fontSize: 24,
              animation: 'spell-fly 1.5s ease-out 0.5s forwards',
              display: 'inline-block',
            }}
          >
            {spellReward.iconEmoji} → 📖
          </div>

          <button
            className="pixel-btn pixel-btn--accent"
            onClick={onContinue}
            style={{ width: '100%', marginTop: 20 }}
          >
            ✨ Continuar Jornada
          </button>
        </div>
      )}

      {/* ── AÇÕES DE FALHA ── */}
      {phase !== 'animation' && !success && (
        <div style={{ display: 'flex', gap: 12, width: '100%' }}>
          <button
            className="pixel-btn pixel-btn--ghost"
            onClick={onOpenHints}
            style={{ flex: 1 }}
          >
            📖 Consultar Grimório
          </button>
          <button
            className="pixel-btn pixel-btn--primary"
            onClick={onRetry}
            style={{ flex: 2 }}
          >
            🔄 Tentar Novamente
          </button>
        </div>
      )}
    </div>
  );
};

function SuccessBackground() {
  return (
    <>
      {[...Array(16)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: `${10 + Math.random() * 60}%`,
            left: `${(i / 16) * 100}%`,
            fontSize: i % 4 === 0 ? 16 : 10,
            animation: `star-burst ${0.8 + Math.random()}s ease-out ${Math.random() * 0.5}s forwards`,
            opacity: 0,
          }}
        >
          ✦
        </div>
      ))}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(0,230,118,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
    </>
  );
}

function FailureBackground() {
  return (
    <>
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: `${20 + Math.random() * 50}%`,
            left: `${(i / 8) * 100}%`,
            fontSize: 14,
            animation: `magic-explosion 0.8s ease-out ${Math.random() * 0.3}s forwards`,
            opacity: 0,
            color: '#FF5252',
          }}
        >
          💥
        </div>
      ))}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(255,82,82,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
    </>
  );
}
