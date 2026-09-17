import { describe, expect, it } from 'vitest';
import { CRAZY_EXTRA_SPAWNS, HARD_EXTRA_SPAWNS, IMPOSSIBLE_EXTRA_SPAWNS, NORMAL_EXTRA_SPAWNS, SPAWNS } from './levelData';

describe('magnet pickup sequence', () => {
  it('places a visible multi-lane coin trail immediately after the magnet', () => {
    const magnet = SPAWNS.find(spawn => spawn.kind === 'magnet');
    expect(magnet).toBeDefined();

    const coins = SPAWNS.filter(spawn =>
      spawn.kind === 'coin' &&
      spawn.z > magnet!.z &&
      spawn.z <= magnet!.z + 50,
    );

    expect(coins.length).toBeGreaterThanOrEqual(6);
    expect(coins[0].z - magnet!.z).toBeLessThanOrEqual(12);
    expect(new Set(coins.map(coin => coin.lane))).toEqual(new Set([0, 1, 2]));
  });
});

describe('difficulty traffic', () => {
  it('adds progressively more obstacles without changing the easy layout', () => {
    expect(NORMAL_EXTRA_SPAWNS.length).toBeGreaterThanOrEqual(10);
    expect(HARD_EXTRA_SPAWNS.length).toBeGreaterThanOrEqual(10);
    expect([...NORMAL_EXTRA_SPAWNS, ...HARD_EXTRA_SPAWNS].every(spawn => spawn.kind !== 'coin')).toBe(true);
  });

  it('makes Crazy traffic exactly three times the Hard bonus density', () => {
    const hardBonus = NORMAL_EXTRA_SPAWNS.length + HARD_EXTRA_SPAWNS.length;
    const crazyBonus = hardBonus + CRAZY_EXTRA_SPAWNS.length;
    expect(crazyBonus).toBe(hardBonus * 3);
  });

  it('makes Impossible traffic exactly three times the Crazy bonus density', () => {
    const crazyBonus = NORMAL_EXTRA_SPAWNS.length + HARD_EXTRA_SPAWNS.length + CRAZY_EXTRA_SPAWNS.length;
    const impossibleBonus = crazyBonus + IMPOSSIBLE_EXTRA_SPAWNS.length;
    expect(impossibleBonus).toBe(crazyBonus * 3);
  });
});
