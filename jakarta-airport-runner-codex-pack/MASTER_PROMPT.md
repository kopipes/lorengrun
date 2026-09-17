# MASTER PROMPT — BUILD THE GAME

You are the lead developer for a browser-based 3D third-person runner game. Work directly in this folder and implement the playable MVP, not merely a plan or mockup.

## Project

Working title: **Jakarta Airport Run**

Premise: a stylized white cat heroine wearing an Indonesian red-and-gold kebaya and batik outfit is late for boarding. She must auto-run through a fictional modern Jakarta international airport and reach **Gate B27** before the countdown reaches zero.

The game camera is behind and slightly above the character. This is not a side-scroller. The visual target is shown in `assets/reference/gameplay-mockup.png`.

## First actions

1. Inspect every file in this repository, especially:
   - `docs/GAME_DESIGN.md`
   - `docs/ASSET_MANIFEST.md`
   - `docs/LEVEL_MAP.md`
   - every file under `assets/reference/`
2. If an app already exists, preserve working code and adapt the implementation cleanly.
3. If this folder contains no app, scaffold a Vite project using TypeScript and direct Three.js.
4. Implement a playable vertical slice first, verify it in a real browser, then continue through the remaining milestones.
5. Do not stop after writing a proposal. Continue implementing unless a genuine blocker requires user input.

## Required stack

- Vite
- TypeScript with strict mode
- Three.js for 3D rendering
- DOM/CSS overlay for HUD and menus
- Vitest for deterministic gameplay logic
- Playwright or an equivalent browser smoke test when practical
- No backend for the MVP
- No paid assets, protected logos, airline branding, or runtime dependence on external APIs

Keep dependencies lean. Do not introduce React unless the existing repository already uses it and keeping it is clearly simpler.

## Asset policy

The PNG files in `assets/reference/` are visual references, not game-ready meshes or textures.

- Do not place a flat character billboard in the finished 3D runner.
- Build a recognizable procedural 3D cat heroine from hierarchical Three.js meshes for the MVP.
- Match the references: white cat, large head and ears, blue accents, blue-and-white striped tail, gold Indonesian headpiece, flower ornaments, red-and-gold kebaya, dark batik lower cloth.
- Build the player under a stable `PlayerAvatar` interface so a future rigged `assets/game/hero.glb` can replace the procedural avatar without rewriting controls, collisions, camera, or gameplay.
- Procedural geometry may simplify embroidery, but silhouette, palette, tail, headpiece, and rear-view costume must remain recognizable.
- Build airport modules and obstacles as optimized reusable Three.js groups. Use the concept sheets as art direction.

## Core gameplay

- Landscape third-person runner with the character moving away from the camera.
- Character auto-runs forward.
- Three normal lanes with smooth lane changes.
- Desktop controls:
  - `ArrowLeft` or `A`: move left; choose left at junction.
  - `ArrowRight` or `D`: move right; choose right at junction.
  - `ArrowUp`, `W`, or `Space`: jump.
  - `ArrowDown` or `S`: slide.
  - `Escape`: pause.
- Mobile controls: swipe left, right, up, and down. Use pointer events and prevent accidental page scrolling while playing.
- Add on-screen touch hints for the first few seconds, then fade them out.
- Use responsive canvas sizing and safe-area-aware HUD layout.

## Camera and movement feel

- Camera follows behind and slightly above the character with smooth damping.
- Character remains readable and occupies roughly 20–25% of viewport height.
- Use a modest dynamic FOV increase during speed boosts.
- Lane changes should feel fast but eased, never teleport.
- Jump must have clear anticipation, airborne, and landing phases.
- Slide must lower the collision capsule for the full slide duration.
- Add subtle camera shake only for collision and final-call urgency; keep it comfortable.
- Use delta-time-based movement and clamp extreme frame deltas.

## Character animation

Create a small animation state machine:

- idle
- run
- jump
- slide
- dodgeLeft
- dodgeRight
- stumble
- victory
- defeat

For the procedural avatar, animate hierarchical joints and secondary motion in the tail, jacket panels, ornaments, and head. Use `assets/reference/character-animation-side.png` to understand the run cycle and `assets/reference/character-animation-rear.png` for the actual gameplay presentation.

## Level route

Create one finite 2.5–3 minute level with these connected zones:

1. Check-in Hall
2. Security Check
3. Duty Free
4. Moving Walkway
5. Gate Junction
6. Long Corridor
7. Waiting Lounge
8. Gate B27

Use data-driven level definitions rather than hard-coding every spawn in one class. Each zone needs a distinct palette, prop arrangement, obstacle pattern, and difficulty profile while sharing modular architecture.

At the Gate Junction, display clear signs:

- `GATES A1–A20 ←`
- `GATES B21–B40 →`

The target is B27, so right is correct. The player has 2.5 seconds to choose. A wrong choice enters a short A-gates recovery loop, subtracts 12 seconds, deducts 150 score, shows `WRONG WAY! −12 SEC`, then reconnects to the B-gates route. A wrong turn must not instantly end the game.

## Obstacles

Implement and pool these hazards:

- rolling suitcase
- luggage trolley
- cleaning cart
- wet-floor sign
- fallen luggage
- security trays
- queue barrier
- maintenance barrier
- duty-free display
- slow automatic glass door
- traveler group
- crossing passenger

Map player responses clearly:

- Jump: suitcase, wet-floor sign, security trays, low fallen luggage.
- Slide: queue barrier and selected high obstacles with a clear opening.
- Change lane: trolley, cleaning cart, traveler group, duty-free display.
- Timing: slow glass door and crossing passenger.

Use forgiving AABB/capsule-style collision bounds slightly smaller than visible meshes. Never create unavoidable patterns. Introduce each interaction alone before combining it with another.

## Collectibles and power-ups

Implement:

- Paw Coin: +10 score.
- Boarding Pass: +100 score.
- Kopi Boost: temporary speed boost.
- Fast Track Pass: opens or highlights the shortest security route.
- Time Bonus: +10 seconds.
- Shield: blocks one collision.
- Magnet: attracts nearby Paw Coins.
- Travelator Boost: speed increase while on the moving walkway.

Provide visible timers or state indicators for temporary power-ups. Do not let stacked boosts make control unreadable.

## Health, win, and loss

- Start with 3 hearts.
- Collision removes 1 heart, subtracts 50 score, briefly slows the player, triggers stumble, and grants 1.5 seconds of invulnerability.
- Shield consumes itself instead of a heart.
- Lose when the countdown reaches zero or all hearts are gone.
- Win when the player crosses the Gate B27 boarding scanner before time expires.
- Checkpoints: Security, Moving Walkway, Waiting Lounge.
- For the first MVP, the game-over screen offers `RETRY FROM CHECKPOINT` and `RESTART RUN`. Checkpoint retry restores one heart but subtracts 15 seconds; never allow a retry with fewer than 10 seconds remaining.

## Scoring

- Paw Coin: +10
- Boarding Pass: +100
- Correct turn: +100
- Near miss: +25
- Clear a zone without collision: +250
- Finish-time bonus: remaining seconds × 25
- Collision: −50
- Wrong route: −150 and −12 seconds
- Smooth-action combo multiplier: maximum ×3

Save only best score and basic settings in `localStorage`. The game must still work when storage is unavailable.

## Difficulty targets

| Zone | Target speed | Main lesson |
| --- | ---: | --- |
| Check-in | 5.5 m/s | lane changes and coins |
| Security | 6.0 m/s | jump and slide |
| Duty Free | 6.5 m/s | combined dodging |
| Moving Walkway | 7.5 m/s | boost control |
| Gate Junction | 6.5 m/s | navigation decision |
| Long Corridor | 8.0 m/s | fast combinations |
| Waiting Lounge | 8.0 m/s | moving NPC hazards |
| Final Sprint | 8.5 m/s | short climax |

Tune obstacle preview distance so early reaction windows are approximately 1.6 seconds and late-game windows never fall below roughly 0.9 seconds at target speed.

## Environment art direction

Build a fictional Jakarta airport rather than copying an official terminal. Use:

- warm wood ceiling details
- glossy stone floors with controlled reflections
- tropical plants
- tasteful batik-inspired wall panels
- navy, warm gold, muted teal, safety yellow, and alert red
- bilingual Indonesian/English visual language
- glass windows with a simplified runway and aircraft silhouettes

Do not use official airport, airline, retail, or travel-company logos. Keep paths and obstacles readable above decorative detail.

## HUD and menus

Recreate the visual language from `assets/reference/ui-signage-powerups.png` using HTML/CSS and accessible text, not one flattened HUD image.

HUD:

- objective: `RUN TO GATE B27`
- countdown
- 3-heart health display
- Paw Coin count and score
- route progress: Check-in → Security → Duty Free → B27
- active power-up state
- pause and sound controls

Screens:

- compact title/start screen
- three-step control tutorial
- pause menu
- win screen with score breakdown
- loss screen with reason and retry choices
- settings for sound, reduced motion, and graphics quality

Ensure readable contrast, keyboard focus, and minimum touch targets around 44 px. Respect `prefers-reduced-motion` and disable camera shake when reduced motion is active.

## Sound

Use a small Web Audio-based sound layer or locally generated simple cues so the game is functional without downloaded audio:

- coin pickup
- power-up
- jump and landing
- collision
- correct turn
- wrong turn
- countdown warning
- boarding success

Add low-volume ambient airport tone and a fictional bilingual-style final-call cue without copying real announcements. Sound must remain muted until the user interacts, respecting browser autoplay rules.

## Architecture

Keep modules focused. A suggested structure:

```text
src/
  core/
    Game.ts
    GameLoop.ts
    StateMachine.ts
  input/
    InputManager.ts
  player/
    PlayerController.ts
    PlayerAvatar.ts
    ProceduralCatAvatar.ts
  camera/
    FollowCamera.ts
  level/
    LevelDirector.ts
    levelData.ts
    ZoneBuilder.ts
  obstacles/
    ObstacleFactory.ts
    ObstaclePool.ts
  systems/
    CollisionSystem.ts
    ScoreSystem.ts
    PowerUpSystem.ts
    AudioManager.ts
  ui/
    Hud.ts
    Screens.ts
  styles/
    main.css
```

Equivalent clean structure is acceptable. Avoid one giant game file. Keep gameplay constants in a documented configuration module.

## Performance

- Target 60 fps on a modern desktop and at least 30 fps on a typical modern mobile browser.
- Clamp renderer pixel ratio, default maximum 1.5.
- Use object pooling for obstacles and collectibles.
- Reuse geometries and materials.
- Use instancing for repeated coins, lights, seats, columns, and plants when practical.
- Dispose Three.js resources on teardown.
- Pause animation when the tab becomes hidden.
- Provide Low / Medium / High quality presets.

## Testing and verification

Add unit tests for:

- score calculation
- timer modification
- collision invulnerability
- shield behavior
- wrong-route penalty
- level progression
- win and loss conditions

Run and fix:

- type checking
- linting if configured
- unit tests
- production build
- a browser smoke test

In the browser, verify both keyboard and simulated touch/pointer input. Complete at least one win path, one wrong-turn recovery path, and one loss path. Check that there are no console errors.

## Milestones

1. Foundation: Vite + TypeScript + Three.js, game loop, resize, input, basic scene.
2. Vertical slice: procedural cat, rear camera, three lanes, run/jump/slide, one corridor, three obstacle types, collision, timer, basic HUD.
3. Full route: eight zones, junction and detour, checkpoint system, all obstacle families.
4. Game systems: collectibles, power-ups, scoring, win/loss, menus, persistence.
5. Polish: environment variation, secondary animation, audio, accessibility, quality settings, mobile layout.
6. QA: tests, build, browser playthrough, performance pass.

After each milestone, run the relevant checks and fix failures before continuing. If this is a Git repository, commit each completed milestone with a clear message, but do not rewrite existing history.

## Definition of done

The task is complete only when:

- `npm install` and `npm run dev` start the game.
- `npm run build` succeeds.
- tests pass.
- the player can complete a full run to B27.
- the junction has a correct and wrong route with recovery.
- keyboard and mobile swipe controls work.
- HUD, timer, hearts, score, power-ups, pause, win, and loss screens work.
- the character and environment visibly follow the supplied references.
- no official brands or copied logos appear.
- no severe console errors or broken controls remain.

Begin by inspecting the reference files and existing repository. Then implement Milestone 1 and continue forward.
