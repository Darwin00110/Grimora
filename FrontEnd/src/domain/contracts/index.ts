// ============================================================
// DOMAIN — Contracts
// Interfaces que o Motor Matemático e Backend devem implementar
// ============================================================

// ----------------------------------------------------------------
// PONTO DE INTEGRAÇÃO — Motor Matemático (futuro)
// O proprietário do projeto implementará esta interface
// para validação real de expressões matemáticas
// ----------------------------------------------------------------
export interface IMathEngine {
  /**
   * Valida se a resposta do aluno está correta
   * @param input - resposta fornecida pelo aluno (string ou número)
   * @param challengeId - identificador do desafio
   */
  validateAnswer(input: string, challengeId: string): boolean;

  /**
   * Simplifica uma expressão matemática
   * @param expression - expressão em formato string ou LaTeX
   */
  simplify(expression: string): string;

  /**
   * Resolve uma equação e retorna os passos
   */
  solve(equation: string): { result: string; steps: string[] };
}

// ----------------------------------------------------------------
// PONTO DE INTEGRAÇÃO — Repositório HTTP (futuro ASP.NET Core)
// Atualmente implementado por repositórios mock (Infrastructure)
// ----------------------------------------------------------------
export interface IPlayerRepository {
  getPlayer(): Promise<import('../entities/Player').Player>;
  savePlayer(player: import('../entities/Player').Player): Promise<void>;
}

export interface ISpellRepository {
  getAllSpells(): Promise<import('../entities/Spell').Spell[]>;
  unlockSpell(spellId: string): Promise<void>;
}

export interface IChallengeRepository {
  getChallengeById(id: string): Promise<import('../entities/Challenge').Challenge>;
  getAllChallenges(): Promise<import('../entities/Challenge').Challenge[]>;
}

export interface IProgressionRepository {
  getWorlds(): Promise<import('../entities/Progression').World[]>;
  updateStepStatus(stepId: string, status: import('../entities/Progression').NodeStatus): Promise<void>;
}

export interface INPCRepository {
  getNPCById(id: string): Promise<import('../entities/NPC').NPC>;
}
