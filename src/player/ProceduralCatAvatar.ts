import * as THREE from 'three';
import type { PlayerAvatar, PlayerAnimation } from './PlayerAvatar';

const material = (color: number, roughness = .62, metalness = 0) => new THREE.MeshStandardMaterial({ color, roughness, metalness });
const part = (geometry: THREE.BufferGeometry, mat: THREE.Material, x = 0, y = 0, z = 0) => {
  const object = new THREE.Mesh(geometry, mat); object.position.set(x, y, z); object.castShadow = true; object.receiveShadow = true; return object;
};

/** A deliberately modular avatar: replace `group` with a future rigged hero.glb without changing gameplay. */
export class ProceduralCatAvatar implements PlayerAvatar {
  group = new THREE.Group();
  private leftArm = new THREE.Group(); private rightArm = new THREE.Group();
  private leftLeg = new THREE.Group(); private rightLeg = new THREE.Group();
  private tail = new THREE.Group(); private jacket = new THREE.Group(); private t = 0;

  constructor() {
    const porcelain = material(0xfffcf2, .72);
    const innerEar = material(0xf3a2b7, .78);
    const kebaya = material(0xa51f3a, .56);
    const kebayaDark = material(0x74172e, .55);
    const gold = material(0xe7b44e, .28, .35);
    const batik = material(0x1b2630, .7);
    const batikGold = material(0xc98b38, .42, .18);
    const batikCream = material(0xf0ce85, .65);
    const blue = material(0x265da9, .52);

    const g = this.group; g.scale.setScalar(.74);
    const hips = new THREE.Group(); hips.position.y = 1.08; g.add(hips);

    // Layered batik skirt, intentionally broad so its rear silhouette reads at runner-camera distance.
    const skirt = part(new THREE.ConeGeometry(.8, .92, 18), batik, 0, -.18, 0); skirt.scale.z = .88; hips.add(skirt);
    const hem = part(new THREE.TorusGeometry(.67, .052, 6, 24), gold, 0, -.62, 0); hem.scale.z = .86; hips.add(hem);
    for (let row = 0; row < 3; row++) for (let col = -2; col <= 2; col++) {
      const x = col * .22 + (row % 2 ? .11 : 0);
      const diamond = part(new THREE.OctahedronGeometry(.105, 0), (row + col) % 2 ? batikGold : batikCream, x, .1 - row * .22, -.7 + row * .025);
      diamond.scale.set(.8, 1.2, .18); hips.add(diamond);
    }

    const torso = new THREE.Group(); torso.position.y = .66; hips.add(torso);
    const bodice = part(new THREE.CylinderGeometry(.68, .62, 1.0, 18), kebaya); bodice.scale.z = .84; torso.add(bodice);
    const waist = part(new THREE.TorusGeometry(.64, .06, 8, 24), gold, 0, -.28, 0); waist.scale.z = .84; torso.add(waist);

    // Long rear kebaya panels plus a gold embroidered hem.
    this.jacket.position.y = -.2; torso.add(this.jacket);
    for (const x of [-.43, 0, .43]) {
      const panel = part(new THREE.ConeGeometry(.29, .8, 5), x === 0 ? kebayaDark : kebaya, x, -.32, -.48);
      panel.rotation.z = x * -.24; panel.scale.z = .28; this.jacket.add(panel);
      const trim = part(new THREE.BoxGeometry(.035, .58, .035), gold, x + Math.sign(x || 1) * .16, -.36, -.63); this.jacket.add(trim);
    }
    for (const x of [-.5, -.25, 0, .25, .5]) this.jacket.add(part(new THREE.SphereGeometry(.052, 8, 6), gold, x, -.74, -.66));

    const arms: Array<[number, THREE.Group]> = [[-.8, this.leftArm], [.8, this.rightArm]];
    arms.forEach(([x, arm]) => {
      arm.position.set(x, .5, 0); torso.add(arm);
      const sleeve = part(new THREE.CapsuleGeometry(.21, .48, 7, 12), kebaya, 0, -.36, 0); sleeve.rotation.z = x * .05; arm.add(sleeve);
      arm.add(part(new THREE.TorusGeometry(.21, .035, 6, 12), gold, 0, -.58, 0));
      arm.add(part(new THREE.SphereGeometry(.23, 12, 9), porcelain, 0, -.73, -.02));
    });

    const head = new THREE.Group(); head.position.y = 1.12; torso.add(head);
    const cranium = part(new THREE.SphereGeometry(.96, 24, 18), porcelain, 0, .31, .04); cranium.scale.set(1.03, .96, .9); head.add(cranium);
    for (const x of [-.58, .58]) {
      const ear = part(new THREE.ConeGeometry(.35, .86, 4), porcelain, x, .99, .02); ear.rotation.z = x * .29; head.add(ear);
      const earInset = part(new THREE.ConeGeometry(.19, .53, 4), innerEar, x, .98, -.13); earInset.rotation.z = x * .29; head.add(earInset);
    }

    // Gold Indonesian-inspired headpiece: rear arc, central peak, flowers, and dangling ornaments.
    const diadem = part(new THREE.TorusGeometry(.79, .095, 8, 28, Math.PI), gold, 0, .88, -.39); diadem.rotation.z = Math.PI; head.add(diadem);
    const peak = part(new THREE.ConeGeometry(.25, .72, 4), gold, 0, 1.25, -.32); peak.rotation.z = Math.PI / 4; head.add(peak);
    const jewel = part(new THREE.SphereGeometry(.10, 10, 8), batikCream, 0, .98, -.74); head.add(jewel);
    for (const x of [-.77, .77]) {
      for (let i = 0; i < 4; i++) { const petal = part(new THREE.SphereGeometry(.075, 8, 6), porcelain, x + Math.cos(i * Math.PI / 2) * .1, .58 + Math.sin(i * Math.PI / 2) * .1, -.65); petal.scale.y = .62; head.add(petal); }
      head.add(part(new THREE.SphereGeometry(.05, 8, 6), gold, x, .58, -.7));
      const chain = part(new THREE.CapsuleGeometry(.025, .31, 4, 6), gold, x, .27, -.62); head.add(chain);
      head.add(part(new THREE.SphereGeometry(.09, 8, 6), gold, x, .05, -.65));
    }

    const legs: Array<[number, THREE.Group]> = [[-.34, this.leftLeg], [.34, this.rightLeg]];
    legs.forEach(([x, leg]) => { leg.position.set(x, -.34, .02); hips.add(leg); leg.add(part(new THREE.CapsuleGeometry(.22, .42, 7, 12), porcelain, 0, -.4, .02)); const paw = part(new THREE.SphereGeometry(.29, 14, 10), porcelain, 0, -.76, -.11); paw.scale.set(1.12, .78, 1.2); leg.add(paw); });

    // Segmented, curved blue-and-white tail visible from the rear camera.
    this.tail.position.set(.2, .18, -.38); hips.add(this.tail);
    for (let i = 0; i < 6; i++) { const segment = part(new THREE.SphereGeometry(.22 - i * .017, 12, 9), i % 2 ? porcelain : blue, i * .22 + Math.sin(i * .7) * .08, .05 + Math.sin(i * .7) * .17, -i * .06); segment.scale.set(1.28, .94, 1.02); this.tail.add(segment); }
  }

  update(dt: number, state: PlayerAnimation) {
    this.t += dt; const swing = Math.sin(this.t * 13); const running = state === 'run';
    this.leftArm.rotation.x = running ? swing * .72 : 0; this.rightArm.rotation.x = running ? -swing * .72 : 0;
    this.leftLeg.rotation.x = running ? -swing * .65 : 0; this.rightLeg.rotation.x = running ? swing * .65 : 0;
    this.tail.rotation.y = Math.sin(this.t * 7) * .42; this.tail.rotation.x = .08 + Math.sin(this.t * 9) * .1;
    this.jacket.rotation.y = Math.sin(this.t * 13) * .12;
    if (state === 'jump') this.group.position.y = .32;
    if (state === 'slide') { this.group.scale.y = .63; this.group.rotation.x = .32; } else { this.group.position.y = 0; this.group.scale.y = 1; this.group.rotation.x = 0; }
    if (state === 'stumble') this.group.rotation.z = Math.sin(this.t * 25) * .15; else if (state !== 'victory') this.group.rotation.z = 0;
  }
}
