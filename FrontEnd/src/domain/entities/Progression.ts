// ============================================================
// DOMAIN — Progression Entity
// Hierarquia: Mundo → Estágio → Etapa → Desafio
// ============================================================

export type NodeStatus = 'locked' | 'available' | 'in-progress' | 'completed';

export interface ProgressionStep {
  id: string;
  title: string;
  challengeId: string;
  status: NodeStatus;
  position: { x: number; y: number }; // posição no mapa de progressão
}

export interface Stage {
  id: string;
  title: string;
  worldId: string;
  steps: ProgressionStep[];
  status: NodeStatus;
  position: { x: number; y: number };
}

export interface World {
  id: string;
  title: string;
  subtitle: string;
  themeColor: string;
  accentColor: string;
  backgroundGradient: string;
  iconEmoji: string;
  stages: Stage[];
  status: NodeStatus;
}
