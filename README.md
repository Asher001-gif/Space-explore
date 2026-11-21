# Space Explore

3D first-person space survival game (Three.js).

## Structure
- `src/index.html` – the game
- `src/lib/three.min.js` – Three.js r128 (bundled, works offline on itch.io)
- `scripts/build.js` – copies `src/` to `dist/`
- `.github/workflows/build.yml` – builds on push to main and uploads `dist/` as artifact `itch-game-zip` (GitHub zips it automatically)

## Upload to itch.io
Actions tab → latest run → download `itch-game-zip` → upload it on itch.io as "HTML – played in the browser" (itch zip needs `index.html` at its root, which this has).

## Controls
WASD/Arrows move (Shift boost), mouse look (click to capture, Esc release), 1-4 slots, 5/Space tap = eat/place, hold = break, 0/E build menu.
