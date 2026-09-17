import { describe, expect, it } from 'vitest';
import { addScore, applyCollision, applyWrongRoute, isLost, type GameRulesState } from './Rules';
const state=():GameRulesState=>({score:100,time:30,hearts:3,shield:false,invulnerableUntil:0,wrongRouteTaken:false});
describe('game rules',()=>{
  it('calculates score without below-zero values',()=>{const s=state();addScore(s,10);addScore(s,-1000);expect(s.score).toBe(0);});
  it('applies wrong route once with time penalty',()=>{const s=state();applyWrongRoute(s);applyWrongRoute(s);expect(s).toMatchObject({score:0,time:18,wrongRouteTaken:true});});
  it('uses shield before a heart',()=>{const s=state();s.shield=true;expect(applyCollision(s,2)).toBe(false);expect(s.hearts).toBe(3);expect(s.shield).toBe(false);});
  it('makes a player invulnerable after collision',()=>{const s=state();expect(applyCollision(s,2)).toBe(true);expect(applyCollision(s,2.2)).toBe(false);expect(s.hearts).toBe(2);});
  it('recognizes time and health loss',()=>{const s=state();s.time=0;expect(isLost(s)).toBe(true);s.time=3;s.hearts=0;expect(isLost(s)).toBe(true);});
});
