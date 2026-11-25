// ============================================================
// APPLICATION — Game State Context
// Estado global da aplicação — sem persistência definitiva
// ============================================================

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { Player } from '../../domain/entities/Player';
import type { Spell } from '../../domain/entities/Spell';
import type { World } from '../../domain/entities/Progression';
import {
  playerRepository,
  spellRepository,
  progressionRepository,
} from '../../infrastructure/repositories/mock.repositories';

// ----------------------------------------------------------------
// State Shape
// ----------------------------------------------------------------
interface GameState {
  player: Player | null;
  spells: Spell[];
  worlds: World[];
  loading: boolean;
  activeChallengeId: string | null;
}

// ----------------------------------------------------------------
// Actions
// ----------------------------------------------------------------
type GameAction =
  | { type: 'SET_PLAYER'; payload: Player }
  | { type: 'SET_SPELLS'; payload: Spell[] }
  | { type: 'SET_WORLDS'; payload: World[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ACTIVE_CHALLENGE'; payload: string | null }
  | { type: 'UNLOCK_SPELL'; payload: string }
  | { type: 'COMPLETE_CHALLENGE'; payload: { challengeId: string; spellId: string; xp: number } };

// ----------------------------------------------------------------
// Reducer
// ----------------------------------------------------------------
function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_PLAYER':
      return { ...state, player: action.payload };
    case 'SET_SPELLS':
      return { ...state, spells: action.payload };
    case 'SET_WORLDS':
      return { ...state, worlds: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ACTIVE_CHALLENGE':
      return { ...state, activeChallengeId: action.payload };
    case 'UNLOCK_SPELL':
      return {
        ...state,
        spells: state.spells.map((s) =>
          s.id === action.payload ? { ...s, unlocked: true } : s
        ),
      };
    case 'COMPLETE_CHALLENGE':
      return {
        ...state,
        player: state.player
          ? {
              ...state.player,
              stats: {
                ...state.player.stats,
                experience: state.player.stats.experience + action.payload.xp,
              },
              completedChallengeIds: [
                ...state.player.completedChallengeIds,
                action.payload.challengeId,
              ],
              unlockedSpellIds: [
                ...state.player.unlockedSpellIds,
                action.payload.spellId,
              ],
            }
          : null,
        spells: state.spells.map((s) =>
          s.id === action.payload.spellId ? { ...s, unlocked: true } : s
        ),
      };
    default:
      return state;
  }
}

// ----------------------------------------------------------------
// Context
// ----------------------------------------------------------------
interface GameContextValue {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  unlockSpell: (spellId: string) => Promise<void>;
  completeChallenge: (challengeId: string, spellId: string, xp: number) => Promise<void>;
}

const GameContext = createContext<GameContextValue | null>(null);

// ----------------------------------------------------------------
// Provider
// ----------------------------------------------------------------
export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, {
    player: null,
    spells: [],
    worlds: [],
    loading: true,
    activeChallengeId: null,
  });

  useEffect(() => {
    async function loadInitialData() {
      dispatch({ type: 'SET_LOADING', payload: true });
      const [player, spells, worlds] = await Promise.all([
        playerRepository.getPlayer(),
        spellRepository.getAllSpells(),
        progressionRepository.getWorlds(),
      ]);
      dispatch({ type: 'SET_PLAYER', payload: player });
      dispatch({ type: 'SET_SPELLS', payload: spells });
      dispatch({ type: 'SET_WORLDS', payload: worlds });
      dispatch({ type: 'SET_LOADING', payload: false });
    }
    loadInitialData();
  }, []);

  const unlockSpell = async (spellId: string) => {
    await spellRepository.unlockSpell(spellId);
    dispatch({ type: 'UNLOCK_SPELL', payload: spellId });
  };

  const completeChallenge = async (challengeId: string, spellId: string, xp: number) => {
    dispatch({ type: 'COMPLETE_CHALLENGE', payload: { challengeId, spellId, xp } });
    await unlockSpell(spellId);
  };

  return (
    <GameContext.Provider value={{ state, dispatch, unlockSpell, completeChallenge }}>
      {children}
    </GameContext.Provider>
  );
}

// ----------------------------------------------------------------
// Hook
// ----------------------------------------------------------------
export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used inside GameProvider');
  return ctx;
}
