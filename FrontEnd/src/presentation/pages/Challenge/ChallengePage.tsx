import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGame } from '../../context/GameContext';
import { AppLayout } from '../../components/layout/AppLayout';
import { CutsceneIntro } from '../../components/cutscene/CutsceneIntro';
import { InvestigationPanel } from '../../components/challenge/InvestigationPanel';
import { ResolutionPanel } from '../../components/challenge/ResolutionPanel';
import { ResultPanel } from '../../components/challenge/ResultPanel';
import { GrimoireHints } from '../../components/challenge/GrimoireHints';
import type { Challenge } from '../../../domain/entities/Challenge';
import type { NPC } from '../../../domain/entities/NPC';
import type { Spell } from '../../../domain/entities/Spell';
import { challengeRepository } from '../../../infrastructure/repositories/mock.repositories';
import { npcRepository } from '../../../infrastructure/repositories/mock.repositories';

type ChallengePhase = 'intro' | 'investigation' | 'resolution' | 'result';

/**
 * ChallengePage — Fluxo completo de desafio
 * Fases: Intro → Investigação → Resolução → Resultado
 */
export const ChallengePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state, completeChallenge } = useGame();

  const [phase, setPhase] = useState<ChallengePhase>('intro');
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [npc, setNpc] = useState<NPC | null>(null);
  const [spellReward, setSpellReward] = useState<Spell | null>(null);
  const [challengeResult, setChallengeResult] = useState<boolean | null>(null);
  const [showHints, setShowHints] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!id) return;
      setLoading(true);
      try {
        const [ch, npcData] = await Promise.all([
          challengeRepository.getChallengeById(id),
          challengeRepository.getChallengeById(id).then((c) => npcRepository.getNPCById(c.npcId)),
        ]);
        setChallenge(ch);
        setNpc(npcData);
        const spell = state.spells.find((s) => s.id === ch.spellRewardId) ?? null;
        setSpellReward(spell);
      } catch (err) {
        console.error('Erro ao carregar desafio:', err);
        navigate('/progression');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const handleIntroComplete = () => setPhase('investigation');
  const handleInvestigationComplete = () => setPhase('resolution');

  const handleSubmit = async (_answer: string, isCorrect: boolean) => {
    setChallengeResult(isCorrect);
    setPhase('result');

    if (isCorrect && challenge) {
      await completeChallenge(challenge.id, challenge.spellRewardId, challenge.xpReward);
    }
  };

  const handleRetry = () => {
    setChallengeResult(null);
    setPhase('resolution');
  };

  const handleContinue = () => {
    navigate('/progression')
    fetch("http://localhost:5219/users")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log("Error: " + error))
    console.log("To aqui viu")
  };

  if (loading) {
    return (
      <AppLayout>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80vh',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <div className="magic-spinner" />
          <span style={{ fontFamily: 'var(--font-pixel)', fontSize: 9, color: 'var(--color-text-muted)' }}>
            Preparando o feitiço...
          </span>
        </div>
      </AppLayout>
    );
  }

  if (!challenge || !npc) return null;

  return (
    <AppLayout>
      <div
        style={{
          maxWidth: 720,
          margin: '0 auto',
          padding: '24px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        {/* Barra de fases */}
        <PhaseBar currentPhase={phase} />

        {/* Fase A: Introdução */}
        {phase === 'intro' && (
          <CutsceneIntro
            npc={npc}
            npcExpression="worried"
            mageState="idle"
            onComplete={handleIntroComplete}
          />
        )}

        {/* Botão avançar fase B */}
        {phase === 'intro' && (
          <button
            className="pixel-btn pixel-btn--primary"
            onClick={handleIntroComplete}
            style={{ width: '100%' }}
          >
            🔍 Investigar o Problema
          </button>
        )}

        {/* Fase B: Investigação */}
        {phase === 'investigation' && (
          <>
            <InvestigationPanel
              title={challenge.title}
              description={challenge.problemDescription}
              items={challenge.investigationItems}
              mathExpression={challenge.mathExpressionLatex}
            />
            <button
              className="pixel-btn pixel-btn--accent"
              onClick={handleInvestigationComplete}
              style={{ width: '100%' }}
            >
              ⚡ Resolver o Desafio
            </button>
          </>
        )}

        {/* Fase C: Resolução */}
        {phase === 'resolution' && (
          <ResolutionPanel
            challenge={challenge}
            onSubmit={handleSubmit}
            onOpenHints={() => setShowHints(true)}
          />
        )}

        {/* Fase D: Resultado */}
        {phase === 'result' && challengeResult !== null && spellReward && (
          <ResultPanel
            success={challengeResult}
            npc={npc}
            spellReward={spellReward}
            xpReward={challenge.xpReward}
            onRetry={handleRetry}
            onContinue={handleContinue}
            onOpenHints={() => setShowHints(true)}
          />
        )}

        {/* Grimório de Dicas */}
        {showHints && (
          <GrimoireHints hints={challenge.hints} onClose={() => setShowHints(false)} />
        )}

        {/* Botão voltar */}
        {phase !== 'result' && (
          <button
            className="pixel-btn pixel-btn--ghost"
            onClick={() => navigate(-1)}
            style={{ alignSelf: 'flex-start', fontSize: 10 }}
          >
            ← Voltar
          </button>
        )}
      </div>
    </AppLayout>
  );
};

function PhaseBar({ currentPhase }: { currentPhase: ChallengePhase }) {
  const phases: { key: ChallengePhase; label: string; icon: string }[] = [
    { key: 'intro', label: 'Introdução', icon: '💬' },
    { key: 'investigation', label: 'Investigação', icon: '🔍' },
    { key: 'resolution', label: 'Resolução', icon: '⚡' },
    { key: 'result', label: 'Resultado', icon: '🏆' },
  ];

  const currentIdx = phases.findIndex((p) => p.key === currentPhase);

  return (
    <div
      style={{
        display: 'flex',
        gap: 0,
        background: 'var(--color-bg-panel)',
        border: '2px solid var(--color-primary)',
        borderRadius: 4,
        overflow: 'hidden',
      }}
    >
      {phases.map((phase, idx) => {
        const isActive = phase.key === currentPhase;
        const isDone = idx < currentIdx;

        return (
          <div
            key={phase.key}
            style={{
              flex: 1,
              padding: '10px 4px',
              textAlign: 'center',
              background: isActive
                ? 'var(--color-primary)'
                : isDone
                ? 'rgba(123,47,190,0.3)'
                : 'transparent',
              borderRight: idx < phases.length - 1 ? '1px solid var(--color-text-muted)' : 'none',
              transition: 'background 0.3s',
            }}
          >
            <div style={{ fontSize: 14, marginBottom: 2 }}>{phase.icon}</div>
            <div
              style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: 7,
                color: isActive
                  ? 'white'
                  : isDone
                  ? 'var(--color-primary-light)'
                  : 'var(--color-text-muted)',
              }}
            >
              {phase.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
