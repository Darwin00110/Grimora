// ============================================================
// INFRASTRUCTURE — Mock Repositories
// Implementação mock dos contratos de domínio
// Para integração com ASP.NET Core: substituir por repositórios HTTP
// ============================================================

import type {
  IPlayerRepository,
  ISpellRepository,
  IChallengeRepository,
  IProgressionRepository,
  INPCRepository,
} from '../../domain/contracts';
import type { Player } from '../../domain/entities/Player';
import type { NodeStatus } from '../../domain/entities/Progression';

import { MOCK_SPELLS } from '../data/spells.data';
import { MOCK_CHALLENGES } from '../data/challenges.data';
import { MOCK_WORLDS } from '../data/worlds.data';
import { MOCK_NPCS } from '../data/npcs.data';
import { createPlayer } from '../../domain/entities/Player';

// Simula latência de rede para preparar integração HTTP futura
const simulateDelay = (ms = 100) => new Promise((res) => setTimeout(res, ms));

// ----------------------------------------------------------------
// Player Repository Mock
// ----------------------------------------------------------------
export class MockPlayerRepository implements IPlayerRepository {
  private player: Player = createPlayer('Aprendiz');

  async getPlayer(): Promise<Player> {
    await simulateDelay();
    return { ...this.player };
  }

  async savePlayer(player: Player): Promise<void> {
    await simulateDelay();
    this.player = { ...player };
  }
}

// ----------------------------------------------------------------
// Spell Repository Mock
// ----------------------------------------------------------------
export class MockSpellRepository implements ISpellRepository {
  private spells = [...MOCK_SPELLS];

  async getAllSpells() {
    await simulateDelay();
    return [...this.spells];
  }

  async unlockSpell(spellId: string): Promise<void> {
    await simulateDelay();
    const idx = this.spells.findIndex((s) => s.id === spellId);
    if (idx !== -1) {
      this.spells[idx] = { ...this.spells[idx], unlocked: true };
    }
  }
}

// ----------------------------------------------------------------
// Challenge Repository Mock
// ----------------------------------------------------------------
export class MockChallengeRepository implements IChallengeRepository {
  async getChallengeById(id: string) {
    await simulateDelay();
    const challenge = MOCK_CHALLENGES.find((c) => c.id === id);
    if (!challenge) throw new Error(`Challenge ${id} not found`);
    return { ...challenge };
  }

  async getAllChallenges() {
    await simulateDelay();
    return [...MOCK_CHALLENGES];
  }
}

// ----------------------------------------------------------------
// Progression Repository Mock
// ----------------------------------------------------------------
export class MockProgressionRepository implements IProgressionRepository {
  private worlds = JSON.parse(JSON.stringify(MOCK_WORLDS));

  async getWorlds() {
    await simulateDelay();
    return JSON.parse(JSON.stringify(this.worlds));
  }

  async updateStepStatus(stepId: string, status: NodeStatus): Promise<void> {
    await simulateDelay();
    for (const world of this.worlds) {
      for (const stage of world.stages) {
        const step = stage.steps.find((s: { id: string }) => s.id === stepId);
        if (step) {
          step.status = status;
          return;
        }
      }
    }
  }
}

// ----------------------------------------------------------------
// NPC Repository Mock
// ----------------------------------------------------------------
export class MockNPCRepository implements INPCRepository {
  async getNPCById(id: string) {
    await simulateDelay();
    const npc = MOCK_NPCS.find((n) => n.id === id);
    if (!npc) throw new Error(`NPC ${id} not found`);
    return { ...npc };
  }
}

// Singleton instances para reutilização
export const playerRepository = new MockPlayerRepository();
export const spellRepository = new MockSpellRepository();
export const challengeRepository = new MockChallengeRepository();
export const progressionRepository = new MockProgressionRepository();
export const npcRepository = new MockNPCRepository();
