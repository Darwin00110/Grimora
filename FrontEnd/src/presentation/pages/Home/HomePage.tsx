import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../../components/layout/AppLayout';
import { PixelMage } from '../../components/game/PixelMage';
import '../../styles/components.css';

/**
 * HomePage — Tela inicial da Academia de Magia Grimora
 */
export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AppLayout showHeader={false}>
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 24px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background decorativo */}
        <AcademyBackground />

        {/* Conteúdo principal */}
        <div
          className="animate-page-enter"
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 32,
            maxWidth: 600,
            width: '100%',
          }}
        >
          {/* Logo + Chapéu */}
          <div
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}
          >
            <img
              src="/assets/images/hat.png"
              alt="Chapéu Mágico"
              className="animate-float"
              style={{
                height: 120,
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 20px rgba(123,47,190,0.8))',
              }}
            />
            <img
              src="/assets/images/logo.png"
              alt="Grimora"
              style={{
                maxWidth: 320,
                width: '100%',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 16px rgba(123,47,190,0.6))',
              }}
            />
          </div>

          {/* Tagline */}
          <div
            style={{
              textAlign: 'center',
              fontFamily: 'var(--font-pixel)',
              fontSize: 9,
              color: 'var(--color-text-secondary)',
              letterSpacing: 2,
              lineHeight: 2,
            }}
          >
            Academia de Magia Matemática
            <br />
            <span style={{ color: 'var(--color-accent)', fontSize: 8 }}>
              onde os números são feitiços
            </span>
          </div>

          {/* Mago personagem */}
          <div style={{ position: 'relative' }}>
            <PixelMage state="idle" size="xl" expression="happy" />
            {/* Partículas mágicas flutuando */}
            {['✦', '★', '✧'].map((star, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: `${20 + i * 20}%`,
                  left: i % 2 === 0 ? '-40px' : 'auto',
                  right: i % 2 !== 0 ? '-40px' : 'auto',
                  color: 'var(--color-accent)',
                  fontSize: 12 + i * 4,
                  animation: `stars-twinkle ${1.5 + i * 0.5}s ease-in-out infinite`,
                  animationDelay: `${i * 0.3}s`,
                }}
              >
                {star}
              </div>
            ))}
          </div>

          {/* Painel de boas-vindas */}
          <div
            className="pixel-panel"
            style={{ width: '100%', padding: 24, textAlign: 'center' }}
          >
            <p
              style={{
                fontSize: 16,
                color: 'var(--color-text-secondary)',
                lineHeight: 1.8,
                marginBottom: 20,
              }}
            >
              Bem-vindo à Academia Grimora, jovem aprendiz!
              <br />
              Neste mundo, a{' '}
              <span style={{ color: 'var(--color-accent)', fontWeight: 'bold' }}>matemática</span>{' '}
              é a linguagem da magia.
              <br />
              Resolva desafios, aprenda feitiços e salve o reino!
            </p>

            <button
              className="pixel-btn pixel-btn--accent"
              onClick={() => navigate('/academy')}
              style={{ width: '100%', fontSize: 11, padding: '16px 24px' }}
            >
              🏰 Entrar na Academia
            </button>
          </div>

          {/* Links rápidos */}
          <div style={{ display: 'flex', gap: 12, width: '100%' }}>
            <button
              className="pixel-btn pixel-btn--primary"
              onClick={() => navigate('/progression')}
              style={{ flex: 1 }}
            >
              🗺️ Mapa
            </button>
            <button
              className="pixel-btn pixel-btn--ghost"
              onClick={() => navigate('/spellbook')}
              style={{ flex: 1 }}
            >
              📖 Grimório
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

function AcademyBackground() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
      {/* Torres da academia */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '5%',
          width: 60,
          height: 180,
          background: '#1a1035',
          borderTop: '3px solid #2d1b4e',
          opacity: 0.6,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '8%',
          width: 20,
          height: 220,
          background: '#231845',
          borderTop: '3px solid #3D2A6A',
          opacity: 0.6,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: '5%',
          width: 60,
          height: 160,
          background: '#1a1035',
          borderTop: '3px solid #2d1b4e',
          opacity: 0.6,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: '9%',
          width: 20,
          height: 200,
          background: '#231845',
          borderTop: '3px solid #3D2A6A',
          opacity: 0.6,
        }}
      />

      {/* Lua */}
      <div
        style={{
          position: 'absolute',
          top: '8%',
          right: '15%',
          width: 60,
          height: 60,
          background: '#FFF5CC',
          borderRadius: '50%',
          boxShadow: '0 0 30px rgba(255,245,204,0.4)',
          opacity: 0.7,
        }}
      />

      {/* Gradiente de céu */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(123,47,190,0.15) 0%, transparent 60%)',
        }}
      />
    </div>
  );
}
