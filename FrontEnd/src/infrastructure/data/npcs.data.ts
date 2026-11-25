// ============================================================
// INFRASTRUCTURE — Mock Data: NPCs
// Dados demonstrativos — substituir por API futuramente
// ============================================================

import type { NPC } from '../../domain/entities/NPC';

export const MOCK_NPCS: NPC[] = [
  {
    id: 'npc-padeiro',
    name: 'Rodrigo pudim',
    title: 'Padeiro Real',
    spriteColor: '#8B4513',
    accentColor: '#FFD700',
    introDialogues: [
      { id: 'd1', text: 'Ó, pequeno mago! Você chegou na hora certa!', expression: 'worried' },
      { id: 'd2', text: 'Preciso fazer 6 fornadas de pão. Cada fornada usa 4 sacos de farinha.', expression: 'neutral' },
      { id: 'd3', text: 'Mas meu aprendiz misturou tudo e não sei mais quantos sacos preciso no total!', expression: 'sad' },
      { id: 'd4', text: 'Você consegue me ajudar com seus poderes matemáticos?', expression: 'worried' },
    ],
    successDialogues: [
      { id: 's1', text: 'INCRÍVEL! Eram exatamente 24 sacos!', expression: 'excited' },
      { id: 's2', text: 'Você dominou o Feitiço da Multiplicação! Meus pães serão os melhores do reino!', expression: 'happy' },
      { id: 's3', text: 'Muito obrigado, jovem mago! O reino inteiro agradece!', expression: 'grateful' },
    ],
    failureDialogues: [
      { id: 'f1', text: 'Oops! Acho que a magia fugiu um pouco do controle...', expression: 'surprised' },
      { id: 'f2', text: 'Não se preocupe! Até os grandes magos erraram no começo. Tente novamente!', expression: 'neutral' },
    ],
  },
  {
    id: 'npc-jardineira',
    name: 'Flora',
    title: 'Jardineira Encantada',
    spriteColor: '#228B22',
    accentColor: '#FF69B4',
    introDialogues: [
      { id: 'd1', text: 'Olá, aprendiz! Que sorte encontrar você por aqui!', expression: 'happy' },
      { id: 'd2', text: 'Tenho um jardim de 48 flores mágicas para dividir igualmente entre 6 canteiros.', expression: 'neutral' },
      { id: 'd3', text: 'As flores precisam ser distribuídas perfeitamente, senão perdem o encantamento!', expression: 'worried' },
      { id: 'd4', text: 'Quantas flores vão em cada canteiro?', expression: 'neutral' },
    ],
    successDialogues: [
      { id: 's1', text: '8 flores em cada canteiro! Perfeito!', expression: 'excited' },
      { id: 's2', text: 'Você dominou o Encantamento da Divisão! As flores estão radiantes!', expression: 'happy' },
      { id: 's3', text: 'Obrigada, pequeno mago! Você salvou meu jardim!', expression: 'grateful' },
    ],
    failureDialogues: [
      { id: 'f1', text: 'Puxa, as flores ficaram um pouco... chamuscadas...', expression: 'surprised' },
      { id: 'f2', text: 'Mas não desanime! Tente novamente, você vai conseguir!', expression: 'neutral' },
    ],
  },
  {
    id: 'npc-arquiteto',
    name: 'Thorin',
    title: 'Arquiteto do Castelo',
    spriteColor: '#4169E1',
    accentColor: '#C0C0C0',
    introDialogues: [
      { id: 'd1', text: 'Jovem aprendiz! Preciso da sua ajuda urgente!', expression: 'worried' },
      { id: 'd2', text: 'Estou construindo uma torre com 3 andares. Cada andar tem 3 janelas.', expression: 'neutral' },
      { id: 'd3', text: 'Se quero elevar para 3 torres assim, quantas janelas no total?', expression: 'neutral' },
      { id: 'd4', text: 'Isso envolve poderes exponenciais... você sabe usar?', expression: 'surprised' },
    ],
    successDialogues: [
      { id: 's1', text: 'Extraordinário! 27 janelas! Você calculou 3³!', expression: 'excited' },
      { id: 's2', text: 'A Conjuração Exponencial está em suas mãos agora!', expression: 'happy' },
      { id: 's3', text: 'As torres ficarão magníficas! Obrigado, mago!', expression: 'grateful' },
    ],
    failureDialogues: [
      { id: 'f1', text: 'Hmm, parece que os números escaparam um pouco...', expression: 'surprised' },
      { id: 'f2', text: 'Não se preocupe, tente olhar para as dicas do seu Grimório!', expression: 'neutral' },
    ],
  },
  {
    id: 'npc-aprendiz',
    name: 'Kael',
    title: 'Colega de Academia',
    spriteColor: '#7B2FBE',
    accentColor: '#FFD700',
    introDialogues: [
      { id: 'd1', text: 'Ei, companheiro de feitiços! Veja só isso!', expression: 'excited' },
      { id: 'd2', text: 'Estava praticando runas algébricas, mas fiquei preso numa equação.', expression: 'worried' },
      { id: 'd3', text: 'Se juntarmos nossos grimórios, tenho certeza que resolvemos em segundos!', expression: 'happy' },
    ],
    successDialogues: [
      { id: 's1', text: 'Sensacional! Sabia que você conseguiria decifrar!', expression: 'excited' },
      { id: 's2', text: 'O feitiço está salvo no seu Grimório! Vamos praticar mais juntos!', expression: 'happy' },
    ],
    failureDialogues: [
      { id: 'f1', text: 'Eita! Essa faísca quase pegou no meu cabelo!', expression: 'surprised' },
      { id: 'f2', text: 'Calma, vamos revisar o grimório de dicas e tentar de novo!', expression: 'neutral' },
    ],
  },
];
