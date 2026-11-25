// ============================================================
// INFRASTRUCTURE — Mock Data: Worlds & Progression
// Dados demonstrativos — substituir por API futuramente
// ============================================================

import type { World } from '../../domain/entities/Progression';

export const MOCK_WORLDS: World[] = [
  {
    id: 'world-1',
    title: 'Vale dos Números',
    subtitle: 'Aritmética Fundamental',
    themeColor: '#7B2FBE',
    accentColor: '#FFD700',
    backgroundGradient: 'linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 50%, #1a0a2e 100%)',
    iconEmoji: '🔢',
    status: 'in-progress',
    stages: [
      {
        id: 'stage-1-1',
        title: 'Floresta da Multiplicação',
        worldId: 'world-1',
        status: 'in-progress',
        position: { x: 50, y: 80 },
        steps: [
          {
            id: 'step-1-1-1',
            title: 'O Pão do Mestre',
            challengeId: 'challenge-1',
            status: 'available',
            position: { x: 50, y: 80 },
          },
          {
            id: 'step-1-1-2',
            title: 'A Colheita',
            challengeId: 'challenge-1',
            status: 'locked',
            position: { x: 35, y: 65 },
          },
          {
            id: 'step-1-1-3',
            title: 'O Mercado',
            challengeId: 'challenge-1',
            status: 'locked',
            position: { x: 55, y: 50 },
          },
        ],
      },
      {
        id: 'stage-1-2',
        title: 'Caverna da Divisão',
        worldId: 'world-1',
        status: 'locked',
        position: { x: 60, y: 35 },
        steps: [
          {
            id: 'step-1-2-1',
            title: 'O Jardim Mágico',
            challengeId: 'challenge-2',
            status: 'locked',
            position: { x: 60, y: 35 },
          },
          {
            id: 'step-1-2-2',
            title: 'A Partilha',
            challengeId: 'challenge-2',
            status: 'locked',
            position: { x: 45, y: 22 },
          },
        ],
      },
      {
        id: 'stage-1-3',
        title: 'Pico da Avaliação',
        worldId: 'world-1',
        status: 'locked',
        position: { x: 50, y: 10 },
        steps: [
          {
            id: 'step-1-3-1',
            title: 'Grande Prova',
            challengeId: 'challenge-1',
            status: 'locked',
            position: { x: 50, y: 10 },
          },
        ],
      },
    ],
  },
  {
    id: 'world-2',
    title: 'Montanhas do Poder',
    subtitle: 'Potências & Raízes',
    themeColor: '#C0392B',
    accentColor: '#E74C3C',
    backgroundGradient: 'linear-gradient(135deg, #2d0a0a 0%, #4e1b1b 50%, #2d0a0a 100%)',
    iconEmoji: '⚡',
    status: 'locked',
    stages: [
      {
        id: 'stage-2-1',
        title: 'Torre Exponencial',
        worldId: 'world-2',
        status: 'locked',
        position: { x: 50, y: 80 },
        steps: [
          {
            id: 'step-2-1-1',
            title: 'As Torres de Thorin',
            challengeId: 'challenge-3',
            status: 'locked',
            position: { x: 50, y: 80 },
          },
        ],
      },
    ],
  },
  {
    id: 'world-3',
    title: 'Biblioteca Algébrica',
    subtitle: 'Álgebra & Equações',
    themeColor: '#27AE60',
    accentColor: '#2ECC71',
    backgroundGradient: 'linear-gradient(135deg, #0a2d1a 0%, #1b4e2d 50%, #0a2d1a 100%)',
    iconEmoji: '📜',
    status: 'locked',
    stages: [
      {
        id: 'stage-3-1',
        title: 'Sala das Incógnitas',
        worldId: 'world-3',
        status: 'locked',
        position: { x: 50, y: 75 },
        steps: [
          {
            id: 'step-3-1-1',
            title: 'O Manuscrito',
            challengeId: 'challenge-1',
            status: 'locked',
            position: { x: 50, y: 75 },
          },
        ],
      },
    ],
  },
];
