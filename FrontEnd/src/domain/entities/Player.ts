// ============================================================
// DOMAIN — Player Entity
// Representa o mago aprendiz (jogador)
// ============================================================

export type PlayerState =
  | 'idle'
  | 'walking'
  | 'concentrating'
  | 'casting'
  | 'success'
  | 'failure'
  | 'knockback'
  | 'dizzy'
  | 'scorched'; // chamuscado após explosão

export interface PlayerStats {
  level: number;
  experience: number;
  experienceToNextLevel: number;
  magicPoints: number;
  maxMagicPoints: number;
}

export interface Player {
  id: string;
  name: string;
  state: PlayerState;
  stats: PlayerStats;
  unlockedSpellIds: string[];
  completedChallengeIds: string[];
  currentWorldId: string | null;
}

export function createPlayer(name: string): Player {
  return {
    id: 'player-1',
    name,
    state: 'idle',
    stats: {
      level: 1,
      experience: 0,
      experienceToNextLevel: 100,
      magicPoints: 50,
      maxMagicPoints: 50,
    },
    unlockedSpellIds: [],
    completedChallengeIds: [],
    currentWorldId: null,
  };
}
