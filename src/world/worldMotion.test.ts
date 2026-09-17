import { describe, expect, it } from 'vitest';
import { relativeWorldZ, sideEntryX } from './worldMotion';

describe('world-space runner motion', () => {
  it('moves objects toward the camera only by decreasing relative z', () => {
    expect(relativeWorldZ(40, 5)).toBe(35);
    expect(relativeWorldZ(40, 18)).toBe(22);
  });

  it('keeps a forward obstacle on its lane', () => {
    expect(sideEntryX(0, 0, 1)).toBe(0);
  });

  it('lets side traffic merge toward a lane as it approaches', () => {
    expect(sideEntryX(-2.25, 30, 1)).toBeCloseTo(-0.05);
    expect(sideEntryX(-2.25, 18, 1)).toBeLessThan(-0.05);
    expect(sideEntryX(-2.25, 0, 1)).toBe(-2.25);
  });
});
