import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../context/GameContext';
import { AppLayout } from '../../components/layout/AppLayout';
import type { World, Stage, NodeStatus } from '../../../domain/entities/Progression';

/**
 * ProgressionPage — Mapa visual de progressão
 * Hierarquia: Mundo → Estágios → Etapas
 * Inspirado em Duolingo, com identidade Grimora
 */
export const ProgressionPage: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useGame();
  const [selectedWorld, setSelectedWorld] = useState<World | null>(
    state.worlds.find((w) => w.status !== 'locked') ?? null
  );

  return (
    <AppLayout>
      <div
        style={{
          maxWidth: 900,
          margin: '0 auto',
          padding: '32px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        {/* Título */}
        <div className="animate-page-enter" style={{ textAlign: 'center' }}>
          <h1
            style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: 12,
              color: 'var(--color-accent)',
              letterSpacing: 2,
              marginBottom: 8,
            }}
          >
            🗺️ Mapa de Progressão
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 13 }}>
            Escolha um mundo e explore seus desafios
          </p>
        </div>

        {/* Seletor de Mundos */}
        <div
          className="animate-page-enter"
          style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8 }}
        >
          {state.worlds.map((world) => (
            <button
              key={world.id}
              onClick={() => world.status !== 'locked' && setSelectedWorld(world)}
              style={{
                flexShrink: 0,
                background:
                  selectedWorld?.id === world.id
                    ? world.themeColor
                    : 'var(--color-bg-panel)',
                border: `2px solid ${world.status === 'locked' ? 'var(--color-text-muted)' : world.themeColor}`,
                borderRadius: 4,
                padding: '12px 20px',
                cursor: world.status === 'locked' ? 'not-allowed' : 'pointer',
                opacity: world.status === 'locked' ? 0.4 : 1,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                transition: 'all 0.2s',
                minWidth: 160,
              }}
            >
              <span style={{ fontSize: 24 }}>{world.iconEmoji}</span>
              <div style={{ textAlign: 'left' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-pixel)',
                    fontSize: 8,
                    color:
                      selectedWorld?.id === world.id
                        ? 'white'
                        : world.status === 'locked'
                        ? 'var(--color-text-muted)'
                        : world.themeColor,
                  }}
                >
                  {world.title}
                </div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>
                  {world.status === 'locked' ? '🔒 Bloqueado' : world.subtitle}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Mapa do Mundo Selecionado */}
        {selectedWorld && (
          <div
            className="animate-page-enter"
            style={{
              background: selectedWorld.backgroundGradient,
              border: `2px solid ${selectedWorld.themeColor}`,
              borderRadius: 4,
              padding: 24,
              minHeight: 500,
              position: 'relative',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: 10,
                color: selectedWorld.themeColor,
                marginBottom: 24,
                textAlign: 'center',
                textShadow: `0 0 10px ${selectedWorld.themeColor}`,
              }}
            >
              {selectedWorld.iconEmoji} {selectedWorld.title}
            </h2>

            {/* Caminho de progressão */}
            <ProgressionPath world={selectedWorld} onSelectChallenge={(id) => navigate(`/challenge/${id}`)} />
          </div>
        )}

        {!selectedWorld && (
          <div
            style={{
              textAlign: 'center',
              padding: 60,
              color: 'var(--color-text-muted)',
              fontFamily: 'var(--font-pixel)',
              fontSize: 10,
            }}
          >
            Selecione um mundo para ver o mapa
          </div>
        )}
      </div>
    </AppLayout>
  );
};

interface ProgressionPathProps {
  world: World;
  onSelectChallenge: (challengeId: string) => void;
}

function ProgressionPath({ world, onSelectChallenge }: ProgressionPathProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center' }}>
      {world.stages.map((stage, stageIdx) => (
        <StageSection
          key={stage.id}
          stage={stage}
          isFirst={stageIdx === 0}
          onSelectChallenge={onSelectChallenge}
        />
      ))}
    </div>
  );
}

interface StageSectionProps {
  stage: Stage;
  isFirst: boolean;
  onSelectChallenge: (challengeId: string) => void;
}

function StageSection({ stage, isFirst: _isFirst, onSelectChallenge }: StageSectionProps) {
  const statusColors: Record<NodeStatus, string> = {
    locked: 'var(--color-text-muted)',
    available: 'var(--color-primary)',
    'in-progress': 'var(--color-accent)',
    completed: 'var(--color-success)',
  };

  return (
    <div style={{ width: '100%', maxWidth: 600 }}>
      {/* Cabeçalho do estágio */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 16,
          padding: '8px 16px',
          background: 'rgba(0,0,0,0.4)',
          border: `1px solid ${statusColors[stage.status]}`,
          borderRadius: 2,
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: statusColors[stage.status],
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: 8,
            color: statusColors[stage.status],
            letterSpacing: 1,
          }}
        >
          {stage.title}
        </span>
        {stage.status === 'locked' && <span style={{ marginLeft: 'auto' }}>🔒</span>}
      </div>

      {/* Nós do caminho */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 24,
          alignItems: 'center',
          justifyContent: 'center',
          padding: '8px 0',
          position: 'relative',
        }}
      >
        {/* Linha conectora */}
        {stage.steps.length > 1 && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '10%',
              right: '10%',
              height: 2,
              background:
                stage.status === 'locked'
                  ? 'var(--color-text-muted)'
                  : `repeating-linear-gradient(90deg, ${statusColors[stage.status]} 0px, ${statusColors[stage.status]} 8px, transparent 8px, transparent 16px)`,
              zIndex: 0,
              opacity: 0.4,
            }}
          />
        )}

        {stage.steps.map((step, stepIdx) => {
          const stepColor = statusColors[step.status];
          const isClickable = step.status === 'available' || step.status === 'in-progress';

          return (
            <div
              key={step.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                position: 'relative',
                zIndex: 1,
              }}
            >
              {/* Nó */}
              <button
                className={`progress-node progress-node--${step.status}`}
                onClick={() => isClickable && onSelectChallenge(step.challengeId)}
                disabled={!isClickable}
                title={step.title}
              >
                {step.status === 'completed'
                  ? '✓'
                  : step.status === 'locked'
                  ? '🔒'
                  : stepIdx + 1}
              </button>

              {/* Label */}
              <div
                style={{
                  fontFamily: 'var(--font-pixel)',
                  fontSize: 7,
                  color: stepColor,
                  textAlign: 'center',
                  maxWidth: 80,
                  lineHeight: 1.4,
                }}
              >
                {step.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
