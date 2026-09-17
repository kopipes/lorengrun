# Codex Continuation Prompts

Gunakan hanya bila Codex berhenti setelah sebuah tahap atau Anda ingin melanjutkan di sesi baru.

## 1. Lanjutkan vertical slice

```text
Continue this project from its current state. Read MASTER_PROMPT.md, docs/GAME_DESIGN.md, and the current code before changing anything. Finish Milestone 2 as a genuinely playable vertical slice: procedural 3D cat heroine viewed from behind, smooth follow camera, auto-run, three lanes, jump, slide, three obstacle types, collision, countdown, and functional HUD. Run typecheck, tests, build, and a browser smoke test. Fix failures instead of only reporting them.
```

## 2. Bangun seluruh airport route

```text
Continue from the verified vertical slice. Implement Milestone 3 from MASTER_PROMPT.md: all eight airport zones, data-driven level progression, Gate Junction signs, correct right turn toward B27, wrong A-gates detour with a 12-second time deduction and recovery, checkpoints, obstacle pooling, and difficulty scaling. Preserve working controls and performance. Test one correct-route playthrough and one wrong-route recovery in the browser.
```

## 3. Tambahkan scoring dan power-up

```text
Continue from the current game. Implement Milestone 4 exactly as specified in MASTER_PROMPT.md and docs/GAME_DESIGN.md: scoring, combo, collectibles, all power-ups, hearts, shield behavior, checkpoint retry, local best score, title/tutorial/pause/win/loss screens, and complete HUD. Keep every button functional and verify keyboard plus touch input.
```

## 4. Polish visual dan audio

```text
Continue from the complete gameplay build. Execute Milestone 5. Use every image under assets/reference as art direction. Improve the procedural cat silhouette, kebaya, batik cloth, headpiece, tail animation, airport modules, lighting, signage, secondary motion, Web Audio cues, reduced-motion support, mobile layout, and Low/Medium/High quality presets. Do not replace working 3D gameplay with flat images.
```

## 5. Final QA

```text
Perform Milestone 6 as a release-candidate pass. Do not add unrelated features. Run typecheck, lint if configured, unit tests, production build, and browser tests. Play through a normal win, wrong-turn recovery, timer loss, and zero-hearts loss. Test desktop controls, mobile-sized pointer gestures, pause/resume, audio toggle, reduced motion, checkpoint retry, and local best score. Inspect console errors and performance. Fix every reproducible issue you find, then provide exact run/build commands and a concise list of verified behavior.
```

