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
WASD/Arrows move, Shift/8 jump off a planet / anti-gravity block into space, mouse look (click to capture, Esc release).
Hotbar (9 slots): keys 1 2 3 4 6 7 9, mouse wheel, or [ ] select a slot. 5/Space tap = use the selected item (eat / heal / place block / anti-gravity core), hold = break. 0/E = inventory.

## Day/night & creatures
A full day lasts 4 minutes. Peaceful animals fill the planets by day; predators spawn at night (19:00-05:00) and fade at dawn. Animals/predators can drop an Anti-Gravity Core.

## Anti-gravity blocks
Select an Anti-Gravity Core in the hotbar, aim at a placed block and tap 5/Space. That block **and every block connected to it** (touching faces, edges or corners) becomes anti-gravity: you stick to the nearest surface, so you can walk over edges, up walls and along the underside. It is saved with the world, glows cyan, and every time you fly close to such blocks you land on them again. Blocks you place next to an anti-gravity block join it automatically. Shift/8 jumps off. Walking down onto a planet hands you back to planet gravity.

## Trees
Chopped trees grow back after 40-80 seconds on a free spot of the same planet (never on top of blocks, animals, other trees or right next to you).

## Inventory & crafting
0 / E opens a large inventory: 27 backpack slots + the 9-slot hotbar row. Drag items between any slots (mouse or touch; dropping on a filled slot swaps), click-then-click also works, Shift+click sends an item to the other section, double-click / right-click food or medicine to use it. Empty hotbar slots show nothing; stacks only show a number when you have more than one. New items go into the first free hotbar slot. Crafting tabs (Tools, Materials, Food, Comfort) are on the right.

## Collisions
Everything is solid: you, animals/predators, trees, blocks and asteroids all collide with each other (you can't walk through trees or animals, animals stop at trees/blocks/asteroids/you and don't overlap each other, blocks can't be placed inside trees, asteroids or animals). Trees, animals, the player and landing all stand on the *real* faceted planet surface (raycast against the planet mesh), so nothing hovers above or sinks into the ground.

## Skins & icons
Creatures use pixel-art skin sheets (`src/img/skin_*.png`, green screen removed): dark blue = predators (both planets), blue-white = peaceful animals on Verdant, autumn = peaceful animals on Ember. Each animal is built from the sheet's head, body, four legs and tail. Pickaxe, axe and spear inventory icons are `src/img/pickaxe.png`, `axe.png`, `spear.png`.
