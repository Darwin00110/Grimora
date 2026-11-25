import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../context/GameContext';
import { AppLayout } from '../../components/layout/AppLayout';
import { PixelMage } from '../../components/game/PixelMage';

/**
 * AcademyPage — Tela do hub da Academia
 * Ponto central de navegação para mundos, missões e coleções
 */
export const AcademyPage: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useGame();
  const player = state.player;

  const unlockedSpells = state.spells.filter((s) => s.unlocked).length;
  const totalSpells = state.spells.length;

  return (
    <AppLayout>
      <div
        style={{
          maxWidth: 800,
          margin: '0 auto',
          padding: '32px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 32,
        }}
      >
        {/* Saudação */}
        <div
          className="animate-page-enter"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            background: 'linear-gradient(135deg, var(--color-bg-panel), var(--color-bg-card))',
            border: '2px solid var(--color-primary)',
            borderRadius: 4,
            padding: 24,
          }}
        >
          <PixelMage state="idle" size="lg" expression="happy" />
          <div>
            <div
              style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: 10,
                color: 'var(--color-accent)',
                marginBottom: 8,
              }}
            >
              Academia Grimora
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: 12,
                color: 'var(--color-text-primary)',
                marginBottom: 12,
                lineHeight: 1.6,
              }}
            >
              Olá, {player?.name ?? 'Aprendiz'}!
            </h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 14, lineHeight: 1.6 }}>
              Nível {player?.stats.level ?? 1} · {unlockedSpells}/{totalSpells} feitiços
            </p>
          </div>
        </div>

        {/* Grid de opções */}
        <div
          className="animate-page-enter"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 16,
          }}
        >
          <AcademyCard
            emoji="🗺️"
            title="Mapa de Missões"
            description="Explore mundos e complete desafios matemáticos"
            color="var(--color-primary)"
            onClick={() => navigate('/progression')}
          />
          <AcademyCard
            emoji="📖"
            title="Grimório"
            description="Veja os feitiços que você já aprendeu"
            color="var(--color-accent)"
            onClick={() => navigate('/spellbook')}
          />
          <AcademyCard
            emoji="⚡"
            title="Desafio Rápido"
            description="Entre direto em um desafio demonstrativo"
            color="var(--color-success)"
            onClick={() => navigate('/challenge/challenge-1')}
          />
        </div>

        {/* Mundos disponíveis */}
        <div>
          <h2
            style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: 10,
              color: 'var(--color-text-secondary)',
              letterSpacing: 2,
              marginBottom: 16,
            }}
          >
            🌍 Mundos de Conhecimento
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {state.worlds.map((world) => (
              <button
                key={world.id}
                onClick={() => world.status !== 'locked' && navigate('/progression')}
                style={{
                  background:
                    world.status === 'locked'
                      ? 'rgba(0,0,0,0.3)'
                      : 'linear-gradient(135deg, var(--color-bg-panel), var(--color-bg-card))',
                  border: `2px solid ${world.status === 'locked' ? 'var(--color-text-muted)' : world.themeColor}`,
                  borderRadius: 4,
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  cursor: world.status === 'locked' ? 'not-allowed' : 'pointer',
                  opacity: world.status === 'locked' ? 0.5 : 1,
                  textAlign: 'left',
                  transition: 'all 0.2s',
                  boxShadow:
                    world.status !== 'locked'
                      ? `0 0 12px ${world.themeColor}44`
                      : 'none',
                }}
              >
                <span style={{ fontSize: 32 }}>{world.iconEmoji}</span>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-pixel)',
                      fontSize: 10,
                      color: world.status === 'locked' ? 'var(--color-text-muted)' : world.themeColor,
                      marginBottom: 4,
                    }}
                  >
                    {world.title}
                  </div>
                  <div style={{ color: 'var(--color-text-secondary)', fontSize: 12 }}>
                    {world.subtitle}
                  </div>
                </div>
                <div style={{ marginLeft: 'auto', fontSize: 20 }}>
                  {world.status === 'locked' ? '🔒' : world.status === 'completed' ? '✅' : '▶'}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

interface AcademyCardProps {
  emoji: string;
  title: string;
  description: string;
  color: string;
  onClick: () => void;
}

function AcademyCard({ emoji, title, description, color, onClick }: AcademyCardProps) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'var(--color-bg-panel)',
        border: `2px solid ${color}`,
        borderRadius: 4,
        padding: 20,
        cursor: 'pointer',
        textAlign: 'center',
        transition: 'all 0.2s',
        boxShadow: `0 0 10px ${color}33`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-4px)';
        (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 20px ${color}66`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 10px ${color}33`;
      }}
    >
      <div style={{ fontSize: 40, marginBottom: 12 }}>{emoji}</div>
      <div
        style={{
          fontFamily: 'var(--font-pixel)',
          fontSize: 9,
          color,
          marginBottom: 8,
          letterSpacing: 1,
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
        {description}
      </div>
    </button>
  );
}
