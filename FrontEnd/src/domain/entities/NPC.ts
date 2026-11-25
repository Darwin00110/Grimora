// ============================================================
// DOMAIN — NPC Entity
// Representa personagens não-jogadores das missões
// ============================================================

export type NPCExpression =
  | 'neutral'
  | 'happy'
  | 'sad'
  | 'worried'
  | 'surprised'
  | 'excited'
  | 'grateful';

export interface NPCDialogue {
  id: string;
  text: string;
  expression: NPCExpression;
}

export interface NPC {
  id: string;
  name: string;
  title: string;
  spriteColor: string;       // cor base do sprite CSS
  accentColor: string;       // cor de destaque
  introDialogues: NPCDialogue[];
  successDialogues: NPCDialogue[];
  failureDialogues: NPCDialogue[];
}
