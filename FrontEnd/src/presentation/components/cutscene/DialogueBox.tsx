import React, { useState, useEffect } from 'react';
import type { NPCDialogue } from '../../../domain/entities/NPC';
import '../../styles/components.css';

interface DialogueBoxProps {
  speakerName: string;
  dialogues: NPCDialogue[];
  onComplete: () => void;
  onDialogueStep?: (index: number, isTyping: boolean) => void;
  autoAdvance?: boolean;
}

/**
 * DialogueBox — Caixa de diálogo estilo RPG
 * Suporta controle manual ou automático de avanço
 */
export const DialogueBox: React.FC<DialogueBoxProps> = ({
  speakerName,
  dialogues,
  onComplete,
  onDialogueStep,
  autoAdvance = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const currentDialogue = dialogues[currentIndex];

  // Notificar pai sobre mudança de estado de fala/passo
  useEffect(() => {
    onDialogueStep?.(currentIndex, isTyping);
  }, [currentIndex, isTyping, onDialogueStep]);

  // Efeito de digitação (typewriter)
  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    let i = 0;
    const text = currentDialogue?.text ?? '';
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setIsTyping(false);
        if (autoAdvance) {
          setTimeout(handleAdvance, 2000);
        }
      }
    }, 35);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleAdvance = () => {
    if (isTyping) {
      // Revelar texto completo imediatamente
      setDisplayedText(currentDialogue.text);
      setIsTyping(false);
      return;
    }
    if (currentIndex < dialogues.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      onComplete();
    }
  };

  if (!currentDialogue) return null;

  return (
    <div
      className="dialogue-box animate-page-enter"
      onClick={handleAdvance}
      style={{ cursor: 'pointer', userSelect: 'none' }}
    >
      <div className="dialogue-speaker">{speakerName}</div>
      <div className="dialogue-text">
        {displayedText}
        {isTyping && (
          <span
            style={{
              display: 'inline-block',
              width: 8,
              height: 16,
              background: 'var(--color-accent)',
              marginLeft: 2,
              animation: 'stars-twinkle 0.6s steps(1) infinite',
            }}
          />
        )}
      </div>
      {!isTyping && (
        <div className="dialogue-advance">
          {currentIndex < dialogues.length - 1 ? '▶ Próximo' : '▶ Continuar'}
        </div>
      )}

      {/* Indicador de progresso */}
      <div
        style={{
          position: 'absolute',
          bottom: 8,
          left: 16,
          display: 'flex',
          gap: 4,
        }}
      >
        {dialogues.map((_, i) => (
          <div
            key={i}
            style={{
              width: 6,
              height: 6,
              background: i <= currentIndex ? 'var(--color-accent)' : 'var(--color-text-muted)',
              borderRadius: '50%',
              transition: 'background 0.3s',
            }}
          />
        ))}
      </div>
    </div>
  );
};
