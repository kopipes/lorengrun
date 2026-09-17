export interface GameRulesState { score: number; time: number; hearts: number; shield: boolean; invulnerableUntil: number; wrongRouteTaken: boolean; }
export const addScore = (state: GameRulesState, value: number) => { state.score = Math.max(0, state.score + value); };
export const applyWrongRoute = (state: GameRulesState) => { if (!state.wrongRouteTaken) { state.wrongRouteTaken = true; state.time = Math.max(0, state.time - 12); addScore(state, -150); } };
export const applyCollision = (state: GameRulesState, now: number) => {
  if (now < state.invulnerableUntil) return false;
  state.invulnerableUntil = now + 1.5;
  if (state.shield) { state.shield = false; return false; }
  state.hearts--; addScore(state, -50); return true;
};
export const isLost = (state: GameRulesState) => state.time <= 0 || state.hearts <= 0;
