import React, { useState } from 'react';
import type { Challenge } from '../../../domain/entities/Challenge';

interface ResolutionPanelProps {
  challenge: Challenge;
  onSubmit: (answer: string, isCorrect: boolean) => void;
  onOpenHints: () => void;
}

/**
 * ResolutionPanel — Etapa C do fluxo de missão
 * Interface de interação e resolução matemática
 *
 * ============================================================================
 * PONTOS DE INTEGRAÇÃO AUTORAIS (PARA O PROPRIETÁRIO DO PROJETO):
 * ============================================================================
 * 1. MOTOR MATEMÁTICO:
 *    - Implementar a validação formal através da interface `IMathEngine`.
 *    - Suporte a avaliação simbólica, tolerância numérica e múltiplos formatos.
 *
 * 2. REPRESENTAÇÕES GEOMÉTRICAS:
 *    - Implementar no bloco `GeometricWorkspace` (Canvas 2D, SVG interativo,
 *      ângulos, áreas, perímetros e transformações).
 *
 * 3. REPRESENTAÇÕES ALGÉBRICAS:
 *    - Implementar no bloco `AlgebraicWorkspace` (balança de equivalência,
 *      manipulação de termos, isolamento de incógnitas `x`).
 *
 * 4. CÁLCULOS E ENTRADA DE SÍMBOLOS:
 *    - Teclado virtual com operadores mágicos e notação matemática.
 * ============================================================================
 */
export const ResolutionPanel: React.FC<ResolutionPanelProps> = ({
  challenge,
  onSubmit,
  onOpenHints,
}) => {
  const [answer, setAnswer] = useState('');
  const [inputState, setInputState] = useState<'idle' | 'correct' | 'wrong'>('idle');

  // ==========================================================================
  // [AUTORAL] MOTOR MATEMÁTICO — LÓGICA DE VALIDAÇÃO
  // Substituir a validação mock por chamada ao motor autoral:
  //
  // Exemplo:
  //   import { mathEngine } from '../../../domain/services/MathEngine';
  //   const isCorrect = mathEngine.validateAnswer(answer, challenge.id);
  // ==========================================================================
  const handleSubmit = () => {
    if (!answer.trim()) return;

    // --- MOCK DEMONSTRATIVO ATUAL ---
    const isCorrect = answer.trim() === challenge.mockCorrectAnswer;

    setInputState(isCorrect ? 'correct' : 'wrong');
    setTimeout(() => {
      onSubmit(answer, isCorrect);
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div
      className="animate-page-enter"
      style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
    >
      {/* Cabeçalho */}
      <div style={{ textAlign: 'center' }}>
        <span
          style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: 9,
            color: 'var(--color-primary-light)',
            letterSpacing: 2,
          }}
        >
          ✨ Resolução do Enigma Mágico
        </span>
        <p
          style={{
            marginTop: 8,
            color: 'var(--color-text-secondary)',
            lineHeight: 1.6,
            fontSize: 15,
          }}
        >
          {challenge.problemDescription}
        </p>
      </div>

      {/* =====================================================================
          [AUTORAL] ÁREA DE REPRESENTAÇÕES VISUAIS MATEMÁTICAS
          Aqui o proprietário integrará os componentes visuais de cálculo:
          - Representação Aritmética (Matriz de elementos / Agrupamentos)
          - Representação Geométrica (Polígonos, Triângulos, Circunferências)
          - Representação Algébrica (Balança de pratos / Manipulação de termos)
          ===================================================================== */}
      <div
        className="pixel-panel"
        style={{
          padding: 20,
          background: 'rgba(13,10,30,0.85)',
          border: '2px dashed var(--color-primary)',
          borderRadius: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(123,47,190,0.4)',
            paddingBottom: 8,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: 8,
              color: 'var(--color-accent)',
              letterSpacing: 1,
            }}
          >
            📐 Laboratório de Visualização Matemática
          </span>
          <span
            style={{
              fontSize: 10,
              color: 'var(--color-text-muted)',
              fontFamily: 'var(--font-pixel)',
            }}
          >
            Tipo: {challenge.type.toUpperCase()}
          </span>
        </div>

        {/* -----------------------------------------------------------------
            1. ESPAÇO PARA REPRESENTAÇÃO GEOMÉTRICA (AUTORAL)
            ----------------------------------------------------------------- */}
        {challenge.type === 'geometry' ? (
          <div
            style={{
              minHeight: 140,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.4)',
              borderRadius: 4,
              padding: 16,
              border: '1px dashed #4488ff',
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 8 }}>📐</div>
            <div
              style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: 8,
                color: '#7EB8FF',
                marginBottom: 6,
              }}
            >
              [PONTO DE INTEGRAÇÃO — GEOMETRIA PLANA / ESPACIAL]
            </div>
            <p
              style={{
                fontSize: 12,
                color: 'var(--color-text-secondary)',
                textAlign: 'center',
                maxWidth: 450,
              }}
            >
              Insira aqui seu Canvas 2D ou SVG interativo para renderizar polígonos,
              triângulos com lados cotados, ângulos e áreas interativas.
            </p>
          </div>
        ) : challenge.type === 'algebra' || challenge.type === 'equation' ? (
          /* -----------------------------------------------------------------
             2. ESPAÇO PARA REPRESENTAÇÃO ALGÉBRICA (AUTORAL)
             ----------------------------------------------------------------- */
          <div
            style={{
              minHeight: 140,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.4)',
              borderRadius: 4,
              padding: 16,
              border: '1px dashed #aa44ff',
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 8 }}>⚖️</div>
            <div
              style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: 8,
                color: '#d6a4ff',
                marginBottom: 6,
              }}
            >
              [PONTO DE INTEGRAÇÃO — BALANÇA ALGÉBRICA & MANIPULAÇÃO]
            </div>
            <p
              style={{
                fontSize: 12,
                color: 'var(--color-text-secondary)',
                textAlign: 'center',
                maxWidth: 450,
              }}
            >
              Insira aqui o modelo de balança de dois pratos, blocos de incógnita (x)
              ou visualizador interativo de isolamento de variáveis.
            </p>
          </div>
        ) : (
          /* -----------------------------------------------------------------
             3. ESPAÇO PARA REPRESENTAÇÃO ARITMÉTICA (AUTORAL / DEMONSTRATIVA)
             ----------------------------------------------------------------- */
          <div
            style={{
              minHeight: 130,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: 4,
              padding: 16,
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: 8,
                color: 'var(--color-accent)',
                marginBottom: 12,
              }}
            >
              Visualização de Agrupamento & Fatoração
            </div>
            {/* Demonstração visual de matriz de dados */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 8,
                justifyContent: 'center',
                maxWidth: 400,
              }}
            >
              {[...Array(6)].map((_, groupIdx) => (
                <div
                  key={groupIdx}
                  style={{
                    border: '1px solid var(--color-primary)',
                    borderRadius: 3,
                    padding: '6px 8px',
                    background: 'rgba(123,47,190,0.2)',
                    display: 'flex',
                    gap: 4,
                  }}
                  title={`Grupo ${groupIdx + 1}`}
                >
                  {[...Array(4)].map((_, itemIdx) => (
                    <span
                      key={itemIdx}
                      style={{
                        fontSize: 13,
                        filter: 'drop-shadow(0 0 2px var(--color-accent))',
                      }}
                    >
                      🌾
                    </span>
                  ))}
                </div>
              ))}
            </div>
            <span
              style={{
                fontSize: 10,
                color: 'var(--color-text-muted)',
                marginTop: 10,
                fontStyle: 'italic',
              }}
            >
              {/* Comentário autoral */}
              [Proprietário: customize este painel para renderizar representações dinâmicas por missão]
            </span>
          </div>
        )}
      </div>

      {/* Campo de resposta */}
      <div>
        <label
          style={{
            display: 'block',
            fontFamily: 'var(--font-pixel)',
            fontSize: 9,
            color: 'var(--color-accent)',
            marginBottom: 8,
            letterSpacing: 1,
          }}
        >
          ⚡ Sua Resposta Mágica
        </label>
        <input
          className={`magic-input magic-input--${inputState === 'idle' ? '' : inputState}`}
          type="text"
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
            setInputState('idle');
          }}
          onKeyDown={handleKeyDown}
          placeholder="Digite o resultado..."
          disabled={inputState !== 'idle'}
          autoFocus
        />

        {/* ===================================================================
            [AUTORAL] TECLADO VIRTUAL DE SÍMBOLOS MATEMÁTICOS
            Aqui você pode adicionar botões de atalho para símbolos:
            √ (raiz), ² (quadrado), ³ (cubo), π, ÷, ×, +, -, x, etc.
            =================================================================== */}
        <div
          style={{
            display: 'flex',
            gap: 6,
            marginTop: 8,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {['+', '-', '×', '÷', 'x', '²', '√'].map((sym) => (
            <button
              key={sym}
              type="button"
              className="pixel-btn pixel-btn--ghost"
              style={{ padding: '6px 10px', fontSize: 11 }}
              onClick={() => {
                setAnswer((prev) => prev + sym);
                setInputState('idle');
              }}
              title={`Inserir símbolo ${sym}`}
            >
              {sym}
            </button>
          ))}
          <button
            type="button"
            className="pixel-btn pixel-btn--ghost"
            style={{ padding: '6px 10px', fontSize: 9 }}
            onClick={() => setAnswer('')}
            title="Limpar campo"
          >
            Limpar
          </button>
        </div>
      </div>

      {/* Aviso de demo */}
      <div
        style={{
          background: 'rgba(255,152,0,0.1)',
          border: '1px solid var(--color-warning)',
          borderRadius: 2,
          padding: '8px 12px',
          fontSize: 11,
          color: 'var(--color-warning)',
          textAlign: 'center',
        }}
      >
        🧪 Modo Demonstração — motor matemático em modo mock frontend
      </div>

      {/* Ações */}
      <div style={{ display: 'flex', gap: 12 }}>
        <button
          className="pixel-btn pixel-btn--ghost"
          onClick={onOpenHints}
          style={{ flex: 1 }}
        >
          📖 Grimório de Dicas
        </button>
        <button
          className="pixel-btn pixel-btn--accent"
          onClick={handleSubmit}
          disabled={!answer.trim() || inputState !== 'idle'}
          style={{
            flex: 2,
            opacity: !answer.trim() ? 0.5 : 1,
          }}
        >
          ⚡ Lançar Feitiço!
        </button>
      </div>
    </div>
  );
};
