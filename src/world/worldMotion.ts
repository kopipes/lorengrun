export const relativeWorldZ = (worldZ: number, distance: number) => worldZ - distance;

export const sideEntryX = (laneX: number, relativeZ: number, side: -1 | 1) => {
  const progress = Math.max(0, Math.min(1, (30 - relativeZ) / 30));
  const eased = progress * progress * (3 - 2 * progress);
  return laneX + side * (1 - eased) * 2.2;
};
