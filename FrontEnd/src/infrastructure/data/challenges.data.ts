// ============================================================
// INFRASTRUCTURE — Mock Data: Challenges (Desafios)
// Dados demonstrativos — substituir por API futuramente
// ============================================================

import type { Challenge } from '../../domain/entities/Challenge';

export const MOCK_CHALLENGES: Challenge[] = [
  {
    id: 'challenge-1',
    title: 'O Pão do Mestre Bolo',
    stageId: 'stage-1-1',
    npcId: 'npc-padeiro',
    spellRewardId: 'spell-multiplication',
    type: 'arithmetic',
    problemDescription:
      'Mestre Bolo precisa fazer 6 fornadas de pão. Cada fornada usa 4 sacos de farinha. Quantos sacos ele precisa no total?',
    // ----------------------------------------------------------------
    // MATEMÁTICA — Preencher pelo proprietário do projeto
    // Conceito: Multiplicação simples
    // Operação esperada: 6 × 4 = 24
    // mathExpressionLatex: '6 \\times 4 = ?'
    // ----------------------------------------------------------------
    mathExpressionLatex: '6 \\times 4 = ?',
    mockCorrectAnswer: '24',
    investigationItems: [
      { label: 'Número de fornadas', value: 6, unit: 'fornadas', highlight: true },
      { label: 'Farinha por fornada', value: 4, unit: 'sacos', highlight: true },
      { label: 'Total necessário', value: '?', unit: 'sacos', highlight: false },
    ],
    hints: [
      {
        level: 1,
        title: 'Observação',
        text: 'Preste atenção em dois números: quantas fornadas existem e quantos sacos cada uma precisa. Esses são os ingredientes do seu feitiço.',
      },
      {
        level: 2,
        title: 'Raciocínio',
        text: 'Quando temos grupos iguais, a multiplicação nos ajuda a encontrar o total rapidamente. Em vez de somar 4+4+4+4+4+4, podemos multiplicar.',
      },
      {
        level: 3,
        title: 'Direcionamento',
        text: 'Pense: se cada uma das 6 fornadas usa 4 sacos, você pode escrever isso como 6 grupos de 4. Que operação matemática junta grupos iguais?',
      },
    ],
    xpReward: 50,
    mpCost: 10,
  },
  {
    id: 'challenge-2',
    title: 'O Jardim de Flora',
    stageId: 'stage-1-2',
    npcId: 'npc-jardineira',
    spellRewardId: 'spell-division',
    type: 'arithmetic',
    problemDescription:
      'Flora tem 48 flores mágicas para distribuir igualmente entre 6 canteiros. Quantas flores vão em cada canteiro?',
    // ----------------------------------------------------------------
    // MATEMÁTICA — Preencher pelo proprietário do projeto
    // Conceito: Divisão simples
    // Operação esperada: 48 ÷ 6 = 8
    // mathExpressionLatex: '48 \\div 6 = ?'
    // ----------------------------------------------------------------
    mathExpressionLatex: '48 \\div 6 = ?',
    mockCorrectAnswer: '8',
    investigationItems: [
      { label: 'Total de flores', value: 48, unit: 'flores', highlight: true },
      { label: 'Número de canteiros', value: 6, unit: 'canteiros', highlight: true },
      { label: 'Flores por canteiro', value: '?', unit: 'flores', highlight: false },
    ],
    hints: [
      {
        level: 1,
        title: 'Observação',
        text: 'Você tem um total de flores e precisa distribuí-las em partes iguais. Olhe para o número de grupos que você precisa formar.',
      },
      {
        level: 2,
        title: 'Raciocínio',
        text: 'A divisão é o feitiço que separa um total em partes iguais. Se você tem um total e sabe em quantas partes dividir, pode encontrar quanto vai em cada parte.',
      },
      {
        level: 3,
        title: 'Direcionamento',
        text: 'Pense: 48 flores precisam caber igualmente em 6 canteiros. Qual número, quando multiplicado por 6, resulta em 48?',
      },
    ],
    xpReward: 55,
    mpCost: 10,
  },
  {
    id: 'challenge-3',
    title: 'As Torres de Thorin',
    stageId: 'stage-2-1',
    npcId: 'npc-arquiteto',
    spellRewardId: 'spell-exponents',
    type: 'arithmetic',
    problemDescription:
      'Thorin quer construir 3 torres. Cada torre tem 3 andares, e cada andar tem 3 janelas. Quantas janelas no total?',
    // ----------------------------------------------------------------
    // MATEMÁTICA — Preencher pelo proprietário do projeto
    // Conceito: Potenciação — 3³
    // Operação esperada: 3 × 3 × 3 = 27
    // mathExpressionLatex: '3^3 = ?'
    // ----------------------------------------------------------------
    mathExpressionLatex: '3^3 = ?',
    mockCorrectAnswer: '27',
    investigationItems: [
      { label: 'Número de torres', value: 3, unit: 'torres', highlight: true },
      { label: 'Andares por torre', value: 3, unit: 'andares', highlight: true },
      { label: 'Janelas por andar', value: 3, unit: 'janelas', highlight: true },
      { label: 'Total de janelas', value: '?', highlight: false },
    ],
    hints: [
      {
        level: 1,
        title: 'Observação',
        text: 'Note que o número 3 aparece repetidamente: 3 torres, 3 andares, 3 janelas. Isso é uma pista importante!',
      },
      {
        level: 2,
        title: 'Raciocínio',
        text: 'Quando multiplicamos um número por ele mesmo várias vezes, chamamos isso de potenciação. 3 usado 3 vezes como fator é escrito como 3³.',
      },
      {
        level: 3,
        title: 'Direcionamento',
        text: 'Calcule passo a passo: primeiro torres × andares, depois multiplique pelo número de janelas. Ou calcule 3 × 3 × 3 diretamente.',
      },
    ],
    xpReward: 70,
    mpCost: 15,
  },
];
