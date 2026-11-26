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
WASD/Arrows move, mouse look (click to capture, Esc release). Shift/8: **tap = hop** on a planet, **hold (0.6 s) = launch** up through the clouds into space; on Gravity Generator blocks outside an atmosphere a tap jumps off at once.
Hotbar (9 slots): keys 1 2 3 4 6 7 9, mouse wheel, or [ ] select a slot. 5/Space tap = use the selected item (eat / heal / place block / Gravity Generator), hold = break; with food or medicine selected, hold = keep eating. 0/E = inventory.

## Day/night & creatures
A full day lasts 4 minutes. Peaceful animals fill the planets by day; predators spawn at night (19:00-05:00) and fade at dawn. Animals/predators can drop a Gravity Generator.

## Gravity Generator blocks
Select a Gravity Generator in the hotbar, aim at a placed block and tap 5/Space. That block **and every block connected to it** (touching faces, edges or corners) becomes a Gravity Generator block: you stick to the nearest surface, so you can walk over edges, up walls and along the underside. It is saved with the world, glows cyan, and every time you fly close to such blocks you land on them again. Blocks you place next to a Gravity Generator block join it automatically. Shift/8 jumps off. Walking down onto a planet hands you back to planet gravity.

## Verdant grass, plants and trees
On Verdant only, grass tufts sprout here and there. After a while a tuft grows into a plant, and after a while the plant grows into a tree: 50% the usual cone tree, 50% a broad round-crowned tree. Chopping a tree gives **Planks** (2, or 3 from a broad tree). Craft **1 Plank → 3 Wood Blocks** in the Materials tab. Tools and food now cost planks.

## Trees
Chopped trees grow back after 40-80 seconds on a free spot of the same planet (never on top of blocks, animals, other trees or right next to you).

## Inventory & crafting
0 / E opens a large inventory: 54 backpack slots (6 rows, scrollable) + the 9-slot hotbar row. Drag items between any slots (mouse or touch; dropping on a filled slot swaps), click-then-click also works, Shift+click sends an item to the other section, double-click / right-click food or medicine to use it. Empty hotbar slots show nothing; stacks only show a number when you have more than one. New items go into the first free hotbar slot. Crafting tabs (Tools, Materials, Food, Comfort) are on the right.

## Collisions
Everything is solid: you, animals/predators, trees, blocks and asteroids all collide with each other (you can't walk through trees or animals, animals stop at trees/blocks/asteroids/you and don't overlap each other, blocks can't be placed inside trees, asteroids or animals). Trees, animals, the player and landing all stand on the smooth planet surface (a finely tessellated sphere), so nothing hovers above or sinks into the ground.

## Skins & icons
Creatures use pixel-art skin sheets (`src/img/skin_*.png`, green screen removed): dark blue = predators (both planets), blue-white = peaceful animals on Verdant, autumn = peaceful animals on Ember. Each animal is built from the sheet's head, body, four legs and tail. Pickaxe, axe and spear inventory icons are `src/img/pickaxe.png`, `axe.png`, `spear.png`.

## Water (Verdant only)
Verdant has one deep ocean (about 95 units deep) and a network of small rivers that branch, join each other and flow into the ocean. The layout is a fixed seeded height-field (`buildWater`), so it is identical every session; terrain, walking, trees and creatures all read the same field. The sea surface is a smooth sphere that catches the sun's glint.

- **Creatures and trees never enter water.**
- **Wading** (head above water) works like walking, just slower. When your head goes under you are **swimming**: you slowly sink unless you **hold Space / jump**, which lifts you to the surface; **arrow keys / WASD** swim sideways. Hold Space is *rise* in water, it never launches you into space there.
- **Breath:** under water a breath bar drains (30 s); at zero you take damage and can drown. Breath refills at the surface.
- Your position is saved while swimming too, so you resume in the water where you quit.

## Chasms (Ember only)
Ember has a network of long, deep cracks (about 55-75 units deep) covering about 30% of the surface instead of water. They fork and cross, and where two overlap you can find flat ledges on the way down. Like the water they are a fixed seeded depth field (`buildChasm`, same layout every session) that the terrain mesh, walking height, trees and creatures all read, so the cracks are always in the same places. Ember's terrain uses the same ~9 unit facets as Verdant so the steep walls match the walking height.

- **Falling in:** walk or fall over a rim (or land in one) and you end up on the dark floor.
- **Climbing out:** the walls are too steep to walk. **Hold W / Up Arrow while facing the rock wall** and you climb slowly (about 3 units per second). **Let go, or turn away, and you slide back down.**
- **No launching** (hold Space) from inside a chasm - you have to climb out. A short tap-hop still works.
- **Creatures and trees never enter chasms.**

## Fish (Verdant)
Small 3D fish swim in Verdant's ocean and rivers and now and then leap out of the water with a splash. They are built from the cut-out sheet `src/img/skin_fish.png` (head, body, left/right fins, dorsal fin, tail, belly, top, bottom). One hit kills a fish, even bare-handed; it drops a **Raw Fish** (+20 hunger). Craft **Cooked Fish** (+45 hunger) from 1 raw fish + 1 plank or 1 wood block. Killed fish are replaced after a while.

Bare hands can break blocks, trees and asteroids too, just about 3x slower than with the pickaxe/axe.

## Doors
Craft a **Door** from 1 plank or 3 wood blocks (Materials tab). Place it in a gap in a wall: it is 1 wide and 2 high (needs 2 free cells above each other, and takes the direction of the wall it sits in). **Tap** (5 / Space / left-click) while aiming at it to open or close it; **hold** to break it (you get the door back). Closed, it is a solid thin panel that neither you nor any creature can pass; open, it swings aside and everything can walk through. You can't close it with something standing in the doorway. Open/closed is saved with the world.

## Digging the planets (Verdant and Ember)
Both planets can be mined, but in layers, so nobody can hollow one out for fun. Look at the ground and **hold 5 / Space / left-click** (the label under the crosshair tells you what you are aiming at). Reach is 7. The ground is split into 2-unit columns; each hold removes the top layer of one column.
- **Dirt** (first 2 layers): any tool, even bare hands, breaks it in about half a second. It just crumbles into dust particles - no item.
- **Loose rocks** (next 3 layers, rough odd-shaped rocks): pickaxe = fast (about 2.4 s), axe or spear = slow (about 6 s), **bare hands = very slow and every ~0.8 s they hurt you** (-2 health).
- **Hard rock** (below that): pickaxe = 3.4 s, axe/spear about 24 s, bare hands basically impossible and they hurt (-3). It breaks into the **normal Stone** item (the same one from asteroids, craftable into Stone Blocks).
- There is no bottom layer: hard rock goes on and on. The only limit on depth is the breath bar below.
- You can't dig in water or in a chasm, under a tree's roots (about 4 units around it), or where a creature stands.
- **Walls:** the sides of a hole stop you; tap Space to hop up one layer at a time (or place blocks as steps). Blocks can be placed on the floor of a hole.
- **Thin air:** deeper than 6 units below the surface your **Breath** bar (the one from swimming) starts to drain, faster the deeper you are; it refills when you come up. At zero you take damage and can die. You can't launch into space from inside a hole.
- **Refill:** a hole that nobody is looking at (out of view and over 60 units away, and with nothing built in it) fills itself again once 3 game days have passed since it was last dug (sleeping in a tube skips time, so it helps). Holes are saved with the world.
- Tuning lives in the `DIG_*`, `DIRT_L`, `ROCK_L`, `DEEP0` constants and the `LAYERS` table in `src/index.html`.
- **Pits that hold something stay open:** a hole with a block built in it, or with water in it, never fills itself in (the 3-day refill only applies to empty, dry holes). Take the block out / let the water go and the normal refill applies again. Holes, water and blocks are all saved in the browser's localStorage.

### Water in pits and water paths
- **Bucket** (2 planks, Tools tab): aim at a river, the sea or a pit with water and **tap 5** to fill it; tap 5 on a pit to pour. One bucket = 1 layer of water in one column. The Water Bucket is a separate hotbar item. Buckets work on both planets, so you can carry Verdant's water to Ember.
- **A pit only looks full if there was enough water** (its depth in layers). Poured water spreads to open neighbouring columns until the levels match, is shown as a translucent water surface, and **dries up after 1-2 game days** (random per pour). After that you pour again.
- **Channel Spade** (2 planks + 1 stone): **hold 5 / left-click and sweep the crosshair along the ground** to draw a water path - every column it crosses is dug open 1 layer deep (gaps are filled in when you sweep fast). Not on water, under roots or where a creature stands.
- **Fed pits:** any pit or path that touches a river or the sea (through a chain of open columns) is fed for good. The water runs along the path like a front (about 6 columns a second) and rises to the level of the river / sea, also in deeper pits joined to it. Fed water **never dries out**. If a path is cut off from its river (a column fills in), the cut-off part dries out like poured water.
- **In pit water:** you wade slower; with your head under the water the Breath bar drains like when swimming. The label under the crosshair shows how full a pit is and whether it is fed.
- Tuning: `WSPD` (front speed), the `rnd(1,2)` day range in `useBucket`, and the 1.4 layers/s rise rate in `waterTick`.

## Death messages
When you die, a short funny line about *how* appears top-left (killed by a predator vs. starved).

## Controls: 5 / Space / left-click
Tap = place block / eat selected food · hold = break blocks, trees, asteroids (or keep eating food) · aimed at a creature = hit it.
Creature HP: peaceful 8, predators 14. Damage per hit: bare hand 1, pickaxe or axe 2, spear 5 → peaceful dies in 8 / 4 / 2 hits, predators in 14 / 7 / 3. Reach: 6 (spear 8). The target label shows the creature's HP.

## Houses on Gravity Generator blocks
Build with Gravity Generator blocks and you can walk inside: the floor you stand on is "sticky", so doorways, corridors and rooms no longer flip your gravity onto the doorframe, walls or ceiling. Walk into a wall to climb it. Interior tips: make rooms at least 2 blocks high (3 is comfortable) and doors 1 block wide x 2 blocks high; you can enter walking from a floor outside the door.

## Planet size
Planets are 5x bigger than before (Verdant radius 1100, Ember 950) and spaced further apart, with more trees and animals to fill them. Flying between them takes about half a minute; the edge of the world is 5200 units from the centre.

## Build grids (level houses on a round planet)
Blocks no longer snap to one world-wide grid. Each structure is its own square grid whose "up" follows the ground where you started it and whose "forward" is the way you were facing, so floors are level and walls are straight even though the planet is round.
- Place a block against another block: it joins that block's grid.
- Aim at the ground within 16 units of a grid whose up is within ~10 degrees of the ground there: the block joins that grid (and stair-steps down to the ground as the planet curves away).
- Anywhere else: a new grid starts, and the first block sits flat on the ground.
- Collision, Gravity Generator walking and placement all treat blocks as turned cubes. Saves store each grid's origin and rotation (save format lv 3).
- Old saves (before grids): the planets moved and grew, so their blocks are returned to your inventory.

## Atmospheres
Each planet is wrapped in a thick atmosphere (Verdant 330 units high, Ember 290) with a cloud layer inside it (roughly 36%-74% of the way up).
- **From far away** you see the planet with a halo and its cloud cover (thousands of soft instanced cloud puffs, one draw call per planet).
- **Flying in** you pass through the cloud layer: the fog turns white (whiteout), stars switch off and the sky colour fades in -- **Verdant's sky is blue, Ember's is yellow/golden**. Both darken at night, and stars come back after dark.
- **Below the clouds** the planet's gravity takes hold automatically: you ease down (speed ramps up, then slows to a soft touchdown) and the camera levels itself to the horizon. You can still steer sideways while falling, and hold Shift/8 to launch again.
- **Leaving**: hold Shift/8 for 0.6 s (a bar fills under the crosshair). You rocket straight up through the clouds (FOV widens) until you are clear of the atmosphere, then fly freely. Hopping (tap) is ~2.4 units high.
- **Planets never share an atmosphere**: atmosphere heights are clamped at start-up so there is always at least a 150-unit clear gap between two atmosphere shells (currently ~320 units; the planets' surfaces are ~940 apart). Asteroids and the respawn point are placed outside every atmosphere.
- Tuning lives in `PDEF` (`ah`, `sky`, `skyN`, `cloud`, `cloudN`) in `src/index.html`.

## Where new players start
A brand-new player (no save yet) spawns on Verdant, on dry land in daylight, about 16 units from the water and facing it. Players with a save resume where they left off; dying still sends you to deep space. See `spawnNearWater` in `src/index.html`.

## Start-up
The page shows an animated loading screen while the game builds (screen size, touch / keyboard detection, your saved world, planets and blocks), then drops you straight into the game. **How to play** is behind the **?** button at the top right (it pauses the game; press it again, Esc or "Got it" to continue). On a computer, click the screen to capture the mouse for looking around; losing the mouse (Esc) no longer pauses.
