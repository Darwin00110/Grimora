// ============================================================
// DOMAIN — Challenge Entity (Desafio)
// ============================================================

export type ChallengePhase = 'intro' | 'investigation' | 'resolution' | 'result';
export type ChallengeResult = 'none' | 'success' | 'failure';
export type ChallengeType = 'arithmetic' | 'algebra' | 'geometry' | 'equation';

export interface HintLevel {
  level: 1 | 2 | 3;
  title: string;
  text: string;
}

export interface InvestigationItem {
  label: string;
  value: string | number;
  unit?: string;
  highlight?: boolean;
}

export interface Challenge {
  id: string;
  title: string;
  stageId: string;
  npcId: string;
  spellRewardId: string;
  type: ChallengeType;
  hints: HintLevel[];
  investigationItems: InvestigationItem[];
  // ----------------------------------------------------------------
  // PONTO DE INTEGRAÇÃO — Motor Matemático
  // O proprietário do projeto implementará os campos abaixo:
  //   mathProblem: MathProblem         (problema estruturado)
  //   validateAnswer: (input) => bool  (validador da resposta)
  // ----------------------------------------------------------------
  mockCorrectAnswer: string;   // resposta demo apenas para o frontend mock
  problemDescription: string;
  mathExpressionLatex?: string; // expressão LaTeX para renderização futura
  xpReward: number;
  mpCost: number;
}
