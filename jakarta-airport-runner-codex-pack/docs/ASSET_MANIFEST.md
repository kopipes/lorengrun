# Asset Manifest

All files below are art-direction references. They are not licensed third-party game meshes and should not be treated as ready-to-rig 3D models.

| File | Purpose |
| --- | --- |
| `assets/reference/character-original.png` | Primary identity reference supplied by the user. Highest priority for face, colors, costume, and character personality. |
| `assets/reference/gameplay-mockup.png` | Target third-person camera, scene density, airport mood, HUD placement, and overall finish. |
| `assets/reference/character-turnaround.png` | Front, three-quarter, side, and rear modeling reference. Use for silhouette and rear costume construction. |
| `assets/reference/character-animation-side.png` | Side-view motion reference for run-cycle phases, jump, slide, dodge, stumble, and victory. |
| `assets/reference/character-animation-rear.png` | Primary gameplay animation reference from the player camera direction. |
| `assets/reference/airport-obstacle-pack.png` | Shape and styling guide for twelve hazard families. |
| `assets/reference/airport-environment-kit.png` | Eight environment modules from check-in through Gate B27. |
| `assets/reference/ui-signage-powerups.png` | HUD, navigation sign, alert, collectible, and power-up visual language. |
| `docs/LEVEL_MAP.md` | Route map with stage timing, obstacles, junction, recovery route, and difficulty notes. |

## Priority when references differ

1. `character-original.png` controls identity.
2. `character-turnaround.png` controls construction and rear appearance.
3. `character-animation-rear.png` controls gameplay readability.
4. `gameplay-mockup.png` controls camera and overall presentation.
5. Other sheets control their named content category.

## Implementation note

The first playable version should construct optimized procedural Three.js meshes. Keep the rendering and control interfaces ready for a later `hero.glb` replacement. Do not delay gameplay development while waiting for an exact production character model.
