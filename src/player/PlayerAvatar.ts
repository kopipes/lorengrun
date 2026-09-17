import * as THREE from 'three';
export type PlayerAnimation = 'run' | 'jump' | 'slide' | 'stumble' | 'victory' | 'defeat';
export interface PlayerAvatar { group: THREE.Group; update(dt: number, state: PlayerAnimation): void; }
