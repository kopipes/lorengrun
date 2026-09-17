import * as THREE from 'three';
import type { PlayerAvatar, PlayerAnimation } from './PlayerAvatar';

/** High-fidelity 2.5D fallback avatar, used when no rigged hero.glb is available. */
export class SpriteCatAvatar implements PlayerAvatar {
  group = new THREE.Group();
  private sprite: THREE.Sprite;
  private material: THREE.SpriteMaterial;
  private runTextures: THREE.Texture[];
  private slideTexture: THREE.Texture;
  private elapsed = 0;
  private frame = 0;

  constructor() {
    const loader = new THREE.TextureLoader();
    const load = (src: string) => {
      const texture = loader.load(src);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      return texture;
    };
    this.runTextures = [load('/assets/hero-run-full-stride-v3.png'), load('/assets/hero-run-opposite-stride-v3.png')];
    this.slideTexture = load('/assets/hero-slide-duck-v5.png');
    this.material = new THREE.SpriteMaterial({ map: this.runTextures[0], transparent: true, depthWrite: false, alphaTest: .03 });
    this.sprite = new THREE.Sprite(this.material);
    this.sprite.renderOrder = 3;
    this.sprite.position.y = 1.18;
    this.sprite.scale.set(1.48, 2.45, 1);
    this.group.add(this.sprite);
  }

  update(dt: number, state: PlayerAnimation) {
    this.elapsed += dt;
    const running = state === 'run';
    const stumbling = state === 'stumble';
    if (running) this.frame = Math.floor(this.elapsed * 9) % 2;
    const crouching = state === 'slide';
    const map = crouching ? this.slideTexture : this.runTextures[this.frame];
    if (this.material.map !== map) { this.material.map = map; this.material.needsUpdate = true; }
    const strideLift = running ? [.018, .07][this.frame] : 0;
    this.sprite.position.y = crouching ? .75 : stumbling ? 1.1 : 1.18 + strideLift;
    this.sprite.position.x = stumbling ? Math.sin(this.elapsed * 34) * .09 : 0;
    this.material.rotation = crouching ? 0 : running ? [-.015, .018][this.frame] : 0;
    this.sprite.scale.set(crouching ? 1.68 : stumbling ? 1.58 : 1.48, crouching ? 1.62 : stumbling ? 2.32 : 2.45, 1);
    this.material.color.setHex(stumbling && Math.floor(this.elapsed * 20) % 2 ? 0xff4058 : 0xffffff);
    if (state === 'jump') this.group.position.y = .42;
    else this.group.position.y = 0;
    if (stumbling) this.group.rotation.z = Math.sin(this.elapsed * 31) * .24;
    else if (state === 'victory') this.group.rotation.z = Math.sin(this.elapsed * 7) * .08;
    else this.group.rotation.z = 0;
  }
}
