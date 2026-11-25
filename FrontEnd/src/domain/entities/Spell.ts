// ============================================================
// DOMAIN — Spell Entity (Magia)
// Representa um feitiço/conhecimento matemático aprendido
// ============================================================

export type SpellCategory =
  | 'arithmetic'
  | 'algebra'
  | 'geometry'
  | 'fractions'
  | 'exponents'
  | 'equations'
  | 'statistics';

export interface Spell {
  id: string;
  name: string;
  description: string;
  mathConcept: string;
  formula?: string;
  category: SpellCategory;
  iconEmoji: string;
  missionId: string;
  unlocked: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}
