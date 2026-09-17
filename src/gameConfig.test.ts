import { describe, expect, it } from 'vitest';
import { DIFFICULTIES, INITIAL_TIME } from './gameConfig';

describe('difficulty configuration', () => {
  it('preserves the original game as easy and scales normal/hard upward', () => {
    expect(DIFFICULTIES.easy).toMatchObject({ time: INITIAL_TIME, hearts: 3, speed: 1, rank: 0 });
    expect(DIFFICULTIES.normal.speed).toBeGreaterThan(DIFFICULTIES.easy.speed);
    expect(DIFFICULTIES.hard.speed).toBeGreaterThan(DIFFICULTIES.normal.speed);
    expect(DIFFICULTIES.hard.time).toBeLessThan(DIFFICULTIES.normal.time);
    expect(DIFFICULTIES.hard.hearts).toBe(2);
    expect(DIFFICULTIES.crazy.rank).toBe(3);
    expect(DIFFICULTIES.crazy.speed).toBeGreaterThan(DIFFICULTIES.hard.speed);
    expect(DIFFICULTIES.crazy.hearts).toBe(1);
    expect(DIFFICULTIES.crazy.time).toBeLessThan(DIFFICULTIES.hard.time);
    expect(DIFFICULTIES.impossible.rank).toBe(4);
    expect(DIFFICULTIES.impossible.speed).toBeGreaterThan(DIFFICULTIES.crazy.speed);
    expect(DIFFICULTIES.impossible.hearts).toBe(1);
    expect(DIFFICULTIES.impossible.time).toBeLessThan(DIFFICULTIES.crazy.time);
  });
});
