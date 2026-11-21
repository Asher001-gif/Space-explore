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
WASD/Arrows move, Shift/8 jump off a planet into space, mouse look (click to capture, Esc release), 1-4 and 6 slots, 5/Space tap = eat/place, hold = break, 0/E build menu.

## Day/night & creatures
A full day lasts 4 minutes. Peaceful animals fill the planets by day; predators spawn at night (19:00-05:00) and fade at dawn. Animals/predators can drop an Anti-Gravity Core (slot 6): aim at a placed block and tap 5/Space to walk around it, Shift/8 to jump off.

## Inventory & crafting
0 / E opens a 9x4 inventory grid (drag or click-click to move/swap stacks, double-click food/medicine to use) with crafting tabs underneath: Tools (pickaxe, axe, spear), Materials (hull), Food (cooked meat, stew), Comfort (bandage, medkit).
