export type SpawnKind = 'suitcase' | 'barrier' | 'trolley' | 'wet' | 'tray' | 'cart' | 'display' | 'door' | 'coin' | 'pass' | 'kopi' | 'time' | 'shield' | 'magnet';
export interface Spawn { z: number; lane: number; kind: SpawnKind; }
const s = (z: number, lane: number, kind: SpawnKind): Spawn => ({ z, lane, kind });
const coinTrail = (start: number, lanes: number[], step = 8): Spawn[] => lanes.map((lane, index) => s(start + index * step, lane, 'coin'));
export const SPAWNS: Spawn[] = [
  s(38,0,'coin'),s(44,1,'coin'),s(51,2,'coin'),s(67,1,'suitcase'),s(85,0,'suitcase'),s(105,2,'coin'),s(126,1,'suitcase'),
  s(175,1,'tray'),s(193,0,'coin'),s(209,2,'barrier'),s(233,0,'wet'),s(257,1,'shield'),s(282,2,'tray'),s(313,1,'barrier'),
  s(365,0,'display'),s(388,2,'coin'),s(404,1,'trolley'),s(429,0,'display'),s(453,2,'kopi'),s(476,1,'display'),s(504,0,'coin'),
  s(565,1,'cart'),s(590,0,'coin'),s(612,2,'door'),s(642,1,'time'),s(666,0,'cart'),
  s(705,0,'coin'),s(720,2,'pass'),
  s(785,1,'trolley'),s(805,0,'barrier'),s(826,2,'suitcase'),s(848,1,'magnet'),s(870,0,'tray'),s(895,2,'tray'),s(923,1,'cart'),s(951,0,'wet'),
  s(1005,1,'suitcase'),s(1028,0,'coin'),s(1052,2,'trolley'),s(1075,1,'suitcase'),s(1102,0,'barrier'),s(1125,2,'time'),s(1150,1,'display'),
  s(1225,0,'coin'),s(1250,2,'suitcase'),s(1280,1,'trolley'),s(1310,0,'wet'),s(1350,2,'coin'),s(1390,1,'barrier'),
  ...coinTrail(18,[1,1,2,2,1],7),
  ...coinTrail(137,[0,1,2,1,0],7),
  ...coinTrail(326,[2,2,1,0,0],8),
  ...coinTrail(515,[0,1,2,1,0],8),
  ...coinTrail(675,[1,1,2,2,1],7),
  ...coinTrail(735,[0,1,2,1,0],8),
  // Magnet at z=848 must immediately demonstrate its lane-wide auto-collect effect.
  ...coinTrail(858,[0,2,0,2,1,0,2,1],6),
  ...coinTrail(960,[2,1,0,1,2],8),
  ...coinTrail(1166,[0,0,1,2,2],9),
  ...coinTrail(1322,[1,2,1,0,1],9),
].sort((a,b)=>a.z-b.z);

export const NORMAL_EXTRA_SPAWNS: Spawn[] = [
  s(115,0,'suitcase'),s(220,1,'suitcase'),s(300,0,'wet'),s(420,2,'suitcase'),
  s(540,2,'tray'),s(625,0,'suitcase'),s(762,2,'wet'),s(985,2,'suitcase'),
  s(1040,1,'wet'),s(1188,0,'tray'),s(1270,0,'suitcase'),s(1340,0,'tray'),
].sort((a,b)=>a.z-b.z);

export const HARD_EXTRA_SPAWNS: Spawn[] = [
  s(93,1,'wet'),s(190,2,'suitcase'),s(250,0,'tray'),s(335,0,'barrier'),
  s(450,0,'suitcase'),s(575,2,'wet'),s(650,0,'barrier'),s(815,1,'wet'),
  s(910,0,'suitcase'),s(1015,2,'barrier'),s(1090,2,'wet'),s(1235,1,'tray'),
  s(1372,0,'suitcase'),
].sort((a,b)=>a.z-b.z);

const crazyKinds: SpawnKind[] = ['suitcase','wet','tray','barrier','cart','display'];
const hardBonusCount = NORMAL_EXTRA_SPAWNS.length + HARD_EXTRA_SPAWNS.length;
// CRAZY sees Normal + Hard bonuses plus twice that amount again: exactly 3× Hard bonus density.
export const CRAZY_EXTRA_SPAWNS: Spawn[] = Array.from({length:hardBonusCount*2},(_,index)=>
  s(72+index*26,(index*2+(index%4===0?1:0))%3,crazyKinds[index%crazyKinds.length]),
).sort((a,b)=>a.z-b.z);

const crazyBonusCount = hardBonusCount + CRAZY_EXTRA_SPAWNS.length;
// IMPOSSIBLE sees every lower bonus plus twice the Crazy total: exactly 3× Crazy bonus density.
export const IMPOSSIBLE_EXTRA_SPAWNS: Spawn[] = Array.from({length:crazyBonusCount*2},(_,index)=>
  s(60+index*8.6,(index+(index%5===0?1:0))%3,crazyKinds[(index*5)%crazyKinds.length]),
).sort((a,b)=>a.z-b.z);
