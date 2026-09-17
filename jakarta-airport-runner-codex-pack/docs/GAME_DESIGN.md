# Game Design — Jakarta Airport Run MVP

## Product definition

- Genre: finite third-person 3D runner with navigation decisions.
- Platform: desktop and mobile browser.
- Session length: approximately 2.5–3 minutes.
- Setting: fictional modern Jakarta international airport.
- Goal: reach Gate B27 before boarding closes.
- Primary differentiator: the player must read airport signs and choose routes, not only dodge obstacles.

## Core loop

1. Read the immediate path and upcoming signage.
2. Change lane, jump, slide, or time movement around hazards.
3. Collect Paw Coins and situational power-ups.
4. Cross a zone checkpoint.
5. Choose the correct gate branch.
6. Reach the final boarding scanner before time or hearts run out.

## Controls

| Action | Keyboard | Mobile |
| --- | --- | --- |
| Move/choose left | Left arrow or A | Swipe left |
| Move/choose right | Right arrow or D | Swipe right |
| Jump | Up arrow, W, or Space | Swipe up |
| Slide | Down arrow or S | Swipe down |
| Pause | Escape | Pause button |

## Route

| Zone | Time target | Speed | Gameplay purpose |
| --- | ---: | ---: | --- |
| Check-in Hall | 0:00–0:25 | 5.5 m/s | lane tutorial and coins |
| Security Check | 0:25–0:55 | 6.0 m/s | introduce jump and slide |
| Duty Free | 0:55–1:25 | 6.5 m/s | chained lane changes |
| Moving Walkway | 1:25–1:45 | 7.5 m/s | controlled speed boost |
| Gate Junction | 1:45–1:55 | 6.5 m/s | choose B-gates right branch |
| Long Corridor | 1:55–2:20 | 8.0 m/s | rapid mixed patterns |
| Waiting Lounge | 2:20–2:45 | 8.0 m/s | moving NPC slalom |
| Gate B27 | 2:45–3:00 | 8.5 m/s | short final sprint |

Wrong branch: the A-gates route removes 12 seconds, deducts 150 score, contains two easy recovery obstacles, and reconnects before the Long Corridor. It never becomes an instant game over.

## Health and recovery

- Starting hearts: 3.
- Collision: −1 heart, −50 score, brief slow effect, stumble animation, 1.5 seconds invulnerability.
- Shield: consumes the shield instead of a heart.
- Checkpoints: Security, Moving Walkway, Waiting Lounge.
- Retry from checkpoint: restore 1 heart and subtract 15 seconds.
- Do not offer checkpoint retry with fewer than 10 seconds remaining.

## Score

| Event | Score |
| --- | ---: |
| Paw Coin | +10 |
| Boarding Pass | +100 |
| Correct gate turn | +100 |
| Near miss | +25 |
| Collision-free zone | +250 |
| Remaining time | +25 per second |
| Collision | −50 |
| Wrong route | −150 |

Combo multiplier rises through successful consecutive actions and caps at ×3. Collision and wrong turns reset the combo.

## Power-ups

| Power-up | Effect |
| --- | --- |
| Kopi Boost | Temporary forward speed increase with controllable steering |
| Fast Track Pass | Opens/highlights the shortest security route |
| Time Bonus | Adds 10 seconds |
| Shield | Blocks one collision |
| Magnet | Pulls nearby Paw Coins toward the player |
| Travelator Boost | Increases speed on the moving walkway |

## Obstacle grammar

- Jumpable: rolling suitcase, wet-floor sign, security trays, low fallen bags.
- Slide: queue belt and selected overhead structures with obvious clearance.
- Lane change: trolley, cleaning cart, traveler group, display island.
- Timing: automatic glass door and crossing passenger.
- Early zones teach one response at a time.
- Late zones combine at most two immediate decisions.
- Every sequence must leave at least one safe solution.

## Presentation

- Third-person camera behind and slightly above the heroine.
- Bright stylized 3D rendering with warm tropical daylight.
- Indonesian identity is subtle: kebaya and batik character costume, batik panels, tropical planting, warm wood, bilingual signage.
- No official airport, airline, or retail branding.
- UI colors: airport navy, sky blue, warm gold, teal, safety yellow, alert red.

## Accessibility and comfort

- Reduced-motion mode disables camera shake and minimizes FOV animation.
- Keyboard focus is visible on all menus.
- Touch targets are approximately 44 px or larger.
- Important state is communicated with icons, text, and color together.
- Collision bounds are slightly more forgiving than visible geometry.

