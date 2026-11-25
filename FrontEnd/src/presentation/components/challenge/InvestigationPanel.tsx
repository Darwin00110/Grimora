import React from 'react';
import type { InvestigationItem } from '../../../domain/entities/Challenge';

interface InvestigationPanelProps {
  title: string;
  description: string;
  items: InvestigationItem[];
  mathExpression?: string;
}

/**
 * InvestigationPanel — Etapa B do fluxo de missão
 * Apresenta o problema matematicamente de forma visual
 *
 * PONTO DE INTEGRAÇÃO — Motor Matemático / LaTeX:
 * O campo mathExpression suporta futuro renderizador LaTeX (KaTeX, MathJax).
 * Por ora, exibe como texto formatado.
 */
export const InvestigationPanel: React.FC<InvestigationPanelProps> = ({
  title,
  description,
  items,
  mathExpression,
}) => {
  return (
    <div
      className="animate-page-enter"
      style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
    >
      {/* Título da etapa */}
      <div style={{ textAlign: 'center' }}>
        <span
          style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: 9,
            color: 'var(--color-accent)',
            letterSpacing: 2,
            textTransform: 'uppercase',
          }}
        >
          🔍 Investigação
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: 11,
            color: 'var(--color-text-primary)',
            marginTop: 8,
          }}
        >
          {title}
        </h2>
      </div>

      {/* Descrição narrativa */}
      <div
        style={{
          background: 'rgba(0,0,0,0.4)',
          border: '2px solid var(--color-primary)',
          borderRadius: 4,
          padding: 16,
          lineHeight: 1.7,
          fontSize: 16,
          color: 'var(--color-text-secondary)',
        }}
      >
        {description}
      </div>

      {/* Itens de investigação visual */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 12,
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className={`pixel-panel ${item.highlight ? 'pixel-panel--gold' : ''}`}
            style={{
              padding: 16,
              textAlign: 'center',
              transition: 'all 0.3s',
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: 'var(--color-text-muted)',
                marginBottom: 8,
                fontFamily: 'var(--font-pixel)',
              }}
            >
              {item.label}
            </div>
            <div
              style={{
                fontSize: 32,
                fontFamily: 'var(--font-pixel)',
                color: item.value === '?' ? 'var(--color-text-muted)' : 'var(--color-accent)',
                fontWeight: 'bold',
                letterSpacing: 2,
              }}
            >
              {item.value}
            </div>
            {item.unit && (
              <div
                style={{
                  fontSize: 10,
                  color: 'var(--color-text-muted)',
                  marginTop: 4,
                }}
              >
                {item.unit}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Expressão matemática */}
      {mathExpression && (
        <div
          style={{
            background: 'rgba(0,0,0,0.6)',
            border: '2px solid var(--color-primary)',
            borderRadius: 4,
            padding: 20,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontFamily: 'var(--font-pixel)',
              color: 'var(--color-text-muted)',
              marginBottom: 12,
              letterSpacing: 1,
            }}
          >
            📐 Expressão Mágica
          </div>

          {/* ----------------------------------------------------------------
              PONTO DE INTEGRAÇÃO — Motor Matemático / LaTeX
              O proprietário do projeto deve integrar aqui o renderizador:
              - KaTeX: renderizar mathExpression como LaTeX
              - MathJax: alternativa para expressões complexas
              Exemplo de integração KaTeX:
              <div ref={el => el && katex.render(mathExpression, el)} />
              ---------------------------------------------------------------- */}
          <div
            style={{
              fontSize: 28,
              fontFamily: 'var(--font-pixel)',
              color: 'var(--color-text-primary)',
              letterSpacing: 4,
              padding: '8px 0',
              /* Substituir pelo renderizador LaTeX quando implementado */
            }}
          >
            {/* Exibição simplificada da expressão LaTeX como texto */}
            {mathExpression
              .replace(/\\times/g, '×')
              .replace(/\\div/g, '÷')
              .replace(/\\/g, '')
              .replace(/\{/g, '')
              .replace(/\}/g, '')}
          </div>

          <div
            style={{
              fontSize: 10,
              color: 'var(--color-text-muted)',
              marginTop: 8,
              fontStyle: 'italic',
            }}
          >
            {/* Remover esta nota quando o renderizador LaTeX for integrado */}
            [Renderização LaTeX — integrar KaTeX/MathJax]
          </div>
        </div>
      )}
    </div>
  );
};
