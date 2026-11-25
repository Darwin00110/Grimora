import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { AppLayout } from '../../components/layout/AppLayout';
import type { Spell, SpellCategory } from '../../../domain/entities/Spell';

const CATEGORY_LABELS: Record<SpellCategory, string> = {
  arithmetic: '🔢 Aritmética',
  algebra: '📜 Álgebra',
  geometry: '🔺 Geometria',
  fractions: '½ Frações',
  exponents: '⚡ Potências',
  equations: '⚖️ Equações',
  statistics: '📊 Estatística',
};

/**
 * SpellBookPage — Grimório do Jogador
 * Coleção de feitiços/conhecimentos matemáticos
 * Apresentado como um livro de magias
 */
export const SpellBookPage: React.FC = () => {
  const { state } = useGame();
  const [selectedCategory, setSelectedCategory] = useState<SpellCategory | 'all'>('all');
  const [selectedSpell, setSelectedSpell] = useState<Spell | null>(null);

  const categories: (SpellCategory | 'all')[] = [
    'all',
    ...Array.from(new Set(state.spells.map((s) => s.category))),
  ];

  const filteredSpells =
    selectedCategory === 'all'
      ? state.spells
      : state.spells.filter((s) => s.category === selectedCategory);

  const unlockedCount = state.spells.filter((s) => s.unlocked).length;

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
        {/* Cabeçalho do Grimório */}
        <div
          className="animate-page-enter"
          style={{
            textAlign: 'center',
            padding: 32,
            background: 'linear-gradient(135deg, var(--color-bg-panel), var(--color-bg-card))',
            border: '3px solid var(--color-accent)',
            borderRadius: 4,
            boxShadow: 'var(--shadow-glow-gold)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decoração de livro */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              background: 'repeating-linear-gradient(90deg, var(--color-accent) 0px, var(--color-accent) 8px, transparent 8px, transparent 16px)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 4,
              background: 'repeating-linear-gradient(90deg, var(--color-accent) 0px, var(--color-accent) 8px, transparent 8px, transparent 16px)',
            }}
          />

          <div style={{ fontSize: 48, marginBottom: 12 }}>📖</div>
          <h1
            style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: 13,
              color: 'var(--color-accent)',
              marginBottom: 8,
              letterSpacing: 2,
            }}
          >
            Grimório de Magias
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 14 }}>
            {unlockedCount} de {state.spells.length} feitiços aprendidos
          </p>

          {/* Barra de progresso da coleção */}
          <div style={{ maxWidth: 300, margin: '16px auto 0' }}>
            <div className="xp-bar-container">
              <div
                className="xp-bar-fill"
                style={{
                  width: `${(unlockedCount / state.spells.length) * 100}%`,
                  background: 'linear-gradient(90deg, var(--color-accent-dark), var(--color-accent))',
                }}
              />
            </div>
          </div>
        </div>

        {/* Filtros de categoria */}
        <div
          className="animate-page-enter"
          style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              className={`pixel-btn ${selectedCategory === cat ? 'pixel-btn--accent' : 'pixel-btn--ghost'}`}
              onClick={() => setSelectedCategory(cat)}
              style={{ fontSize: 10, padding: '8px 14px' }}
            >
              {cat === 'all' ? '📚 Todos' : CATEGORY_LABELS[cat as SpellCategory]}
            </button>
          ))}
        </div>

        {/* Grid de feitiços */}
        <div
          className="animate-page-enter"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: 16,
          }}
        >
          {filteredSpells.map((spell) => (
            <SpellCard
              key={spell.id}
              spell={spell}
              onClick={() => setSelectedSpell(spell)}
            />
          ))}
        </div>

        {/* Modal de detalhe do feitiço */}
        {selectedSpell && (
          <SpellDetailModal spell={selectedSpell} onClose={() => setSelectedSpell(null)} />
        )}
      </div>
    </AppLayout>
  );
};

interface SpellCardProps {
  spell: Spell;
  onClick: () => void;
}

function SpellCard({ spell, onClick }: SpellCardProps) {
  const rarityBorder: Record<string, string> = {
    common: '#4a4a6a',
    rare: '#4488ff',
    epic: '#aa44ff',
    legendary: '#ffbb00',
  };

  return (
    <button
      onClick={onClick}
      style={{
        background: spell.unlocked
          ? 'linear-gradient(135deg, var(--color-bg-panel), var(--color-bg-card))'
          : 'rgba(0,0,0,0.4)',
        border: `2px solid ${spell.unlocked ? rarityBorder[spell.rarity] : 'var(--color-text-muted)'}`,
        borderRadius: 4,
        padding: 20,
        cursor: spell.unlocked ? 'pointer' : 'default',
        textAlign: 'center',
        transition: 'all 0.2s',
        filter: spell.unlocked ? 'none' : 'grayscale(0.8)',
        opacity: spell.unlocked ? 1 : 0.5,
        boxShadow: spell.unlocked ? `0 0 10px ${rarityBorder[spell.rarity]}44` : 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        if (spell.unlocked) {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
          (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${rarityBorder[spell.rarity]}88`;
        }
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLElement).style.boxShadow = spell.unlocked
          ? `0 0 10px ${rarityBorder[spell.rarity]}44`
          : 'none';
      }}
    >
      {/* Lock overlay */}
      {!spell.unlocked && (
        <div
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            fontSize: 16,
          }}
        >
          🔒
        </div>
      )}

      <div style={{ fontSize: 40, marginBottom: 12, filter: spell.unlocked ? 'none' : 'grayscale(1)' }}>
        {spell.unlocked ? spell.iconEmoji : '❓'}
      </div>

      <div
        className={`rarity-badge rarity-badge--${spell.rarity}`}
        style={{ display: 'inline-block', marginBottom: 10 }}
      >
        {spell.rarity}
      </div>

      <div
        style={{
          fontFamily: 'var(--font-pixel)',
          fontSize: 8,
          color: spell.unlocked ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
          marginBottom: 8,
          lineHeight: 1.6,
        }}
      >
        {spell.unlocked ? spell.name : '???'}
      </div>

      {spell.unlocked && (
        <div style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>
          {spell.mathConcept}
        </div>
      )}
    </button>
  );
}

function SpellDetailModal({ spell, onClose }: { spell: Spell; onClose: () => void }) {
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
        className="animate-bounce-in pixel-panel pixel-panel--gold"
        style={{ maxWidth: 480, width: '100%', padding: 32 }}
      >
        {/* Ícone */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 64, marginBottom: 12 }}>{spell.iconEmoji}</div>
          <div className={`rarity-badge rarity-badge--${spell.rarity}`}>
            {spell.rarity}
          </div>
        </div>

        {/* Nome */}
        <h2
          style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: 11,
            color: 'var(--color-accent)',
            textAlign: 'center',
            marginBottom: 20,
            lineHeight: 1.6,
          }}
        >
          {spell.name}
        </h2>

        {/* Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <SpellDetailRow label="Conceito" value={spell.mathConcept} />
          <SpellDetailRow label="Categoria" value={CATEGORY_LABELS[spell.category]} />
          {spell.formula && (
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-pixel)',
                  fontSize: 8,
                  color: 'var(--color-text-muted)',
                  marginBottom: 6,
                }}
              >
                Fórmula
              </div>
              <div
                style={{
                  background: 'rgba(0,0,0,0.5)',
                  border: '1px solid var(--color-primary)',
                  borderRadius: 2,
                  padding: '10px 16px',
                  fontFamily: 'var(--font-pixel)',
                  fontSize: 13,
                  color: 'var(--color-primary-light)',
                  textAlign: 'center',
                }}
              >
                {/* PONTO DE INTEGRAÇÃO — LaTeX: renderizar formula aqui */}
                {spell.formula}
              </div>
            </div>
          )}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: 8,
                color: 'var(--color-text-muted)',
                marginBottom: 6,
              }}
            >
              Descrição
            </div>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, fontSize: 13 }}>
              {spell.description}
            </p>
          </div>
        </div>

        <button
          className="pixel-btn pixel-btn--ghost"
          onClick={onClose}
          style={{ width: '100%', marginTop: 24 }}
        >
          ✕ Fechar
        </button>
      </div>
    </div>
  );
}

function SpellDetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span
        style={{
          fontFamily: 'var(--font-pixel)',
          fontSize: 8,
          color: 'var(--color-text-muted)',
        }}
      >
        {label}
      </span>
      <span style={{ color: 'var(--color-text-primary)', fontSize: 12 }}>{value}</span>
    </div>
  );
}
