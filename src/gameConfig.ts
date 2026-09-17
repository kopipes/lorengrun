// The follow camera looks along +Z, so positive world X renders on screen-left.
// Keep lane indices intuitive: 0 = left, 1 = center, 2 = right on screen.
export const LANES = [2.25, 0, -2.25] as const;
export const WORLD_LENGTH = 1190;
export const INITIAL_TIME = 180;
export type Difficulty = 'easy' | 'normal' | 'hard' | 'crazy' | 'impossible';
export const DIFFICULTIES: Record<Difficulty, { label:string; time:number; hearts:number; speed:number; rank:number; description:string }> = {
  easy: { label:'EASY', time:INITIAL_TIME, hearts:3, speed:1, rank:0, description:'3 hearts · relaxed traffic' },
  normal: { label:'NORMAL', time:160, hearts:3, speed:1.12, rank:1, description:'3 hearts · faster + busier' },
  hard: { label:'HARD', time:140, hearts:2, speed:1.27, rank:2, description:'2 hearts · fastest traffic' },
  crazy: { label:'CRAZY', time:105, hearts:1, speed:1.72, rank:3, description:'1 heart · 3× Hard traffic' },
  impossible: { label:'IMPOSSIBLE', time:75, hearts:1, speed:2.08, rank:4, description:'1 heart · 3× Crazy traffic' },
};
export type ZoneName = 'CHECK-IN' | 'SECURITY' | 'DUTY FREE' | 'MOVING WALKWAY' | 'GATE JUNCTION' | 'LONG CORRIDOR' | 'WAITING LOUNGE' | 'GATE B27';
export interface Zone { name: ZoneName; from: number; to: number; speed: number; color: number; checkpoint?: boolean; }
export const ZONES: Zone[] = [
  { name: 'CHECK-IN', from: 0, to: 130, speed: 5.5, color: 0x15567a },
  { name: 'SECURITY', from: 130, to: 290, speed: 6, color: 0x28635d, checkpoint: true },
  { name: 'DUTY FREE', from: 290, to: 470, speed: 6.5, color: 0x7a3d48 },
  { name: 'MOVING WALKWAY', from: 470, to: 600, speed: 7.5, color: 0x187b83, checkpoint: true },
  { name: 'GATE JUNCTION', from: 600, to: 665, speed: 6.5, color: 0x40346b },
  { name: 'LONG CORRIDOR', from: 665, to: 860, speed: 8, color: 0x245488 },
  { name: 'WAITING LOUNGE', from: 860, to: 1065, speed: 8, color: 0x6b4868, checkpoint: true },
  { name: 'GATE B27', from: 1065, to: WORLD_LENGTH, speed: 8.5, color: 0x174a66 }
];
export const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));
