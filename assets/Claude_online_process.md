# G17 Teardown — Project Log

This project log serves as a summary of what I did on my phone while on the bus when brainstorming the assignment

**Source assets (supplied by CC SpatialNeglect on sketchfab https://sketchfab.com/3d-models/g17-9mm-pistol-schematics-95867c27c084496db8b960c4465e2cdf)**
- `G17_Outline.fbx` — Kaydara FBX binary, version 7400
- Seven texture atlases: `00_Frame_2k`, `01_Barrel_1k`, `02_Base_2k`, `03_Magazine_2k`, `04_Sights_512`, `06_Slide_Cover_Plate_512`, `07_Slide_2k` (all `_Outline.png`)

**Current deliverables**
| File | What it is |
|---|---|
| `g17_teardown.html` | Self-contained scrollytelling page, ~820 KB, no server required |
| `g17_components.glb` | The model split into 53 named component nodes, indexed |
| `CHANGELOG.md` | This document |

---

## Prompt 1

> can you take the  G-17 outline model, split it apart into induvidual components then use the anime.js animation engine to make a scrollytelling of every compononet of a G-17 and what materials its made out of and its contribution to the gun

### What was done

**Parsing.** No FBX conversion tools were available in the environment (no Blender, no assimp, no pyassimp), so I wrote a pure-Python FBX binary parser: node tree walking, zlib-compressed property arrays, and the `~i` XOR terminator convention that marks the last index of each polygon.

**Cleanup.** The file contained 63 meshes. Three were removed:

| Dropped | Reason |
|---|---|
| `31_Magazine_Spring_low.001` | Bound to a `Cube.003` geometry with 129,405 polygon indices (~49,611 triangles) spanning the entire scene — a corrupt merged duplicate holding **half the file's total geometry** |
| `33_Magazite_Tube_low` | Duplicate magazine body with no internals |
| `32_Magazine_Floorplate_a_low.001` | Duplicate floorplate |

Seven backdrop `Plane` meshes were also excluded. The one complete magazine (the copy that actually had a follower and spring) was translated onto the pistol's centreline. **Result: 53 clean components.**

**Key discovery.** I software-rendered the parsed geometry before designing anything, and found the model is **already authored as an exploded view**, not assembled. The page was built around that rather than faking a disassembly.

**Web payload.** Vertices welded on position+normal, positions quantised to `uint16` over each part's own bounding box, normals to `int8` normalized. Final: 33,389 vertices, 46,823 triangles, 567 KB binary → 757 KB base64, inlined so the page is a single file. A custom binary format was used rather than glTF because cdnjs ships three.js core only — no `GLTFLoader` — so avoiding a loader entirely was simpler than working around its absence.

**Design.** Since the brief centred on materials, materials became the palette: five classes (polymer, nitrided steel, steel, spring steel, brass), each with a colour driving the 3D shading, the accent colour, and a legend. Light concrete-grey theme, Archivo/IBM Plex typography. Signature element: **leader lines projected live each frame** from each focused part's 3D centroid to labels at the canvas edge, with collision avoidance.

anime.js drove camera azimuth/elevation/distance, per-part focus tweens, the staggered intro, and a scroll-seeked explode in the finale.

### Verification
Decode path cross-checked in Node against the Python encoder — max bounding-box error 5e-5 (pure quantisation), zero typed-array misalignments, zero out-of-range indices. All three.js r128 members confirmed present. anime.js confirmed tweening plain objects.

### Bug fixed
- NumPy 2 changed the shape of `np.unique(..., return_inverse=True)`, breaking the weld step.

---

## Prompt 2

> I want it to be mobile friendly as well and have it so that it intially shows you the full gun, and tells you the name and manufacturer and then from there it starts with the most internal component and adds the next component as you scroll down

### What was done

**Hero with provenance.** Opens on the complete diagram with a spec block: Glock 17 in 9×19 mm; Glock Ges.m.b.H., Deutsch-Wagram, Austria; Gaston Glock, early 1980s, the firm's first firearm after years making polymer and steel goods; adopted by the Austrian armed forces in 1982 as the Pistole 80.

**Restructured to an accretive, inside-out build.** Everything hides after the hero, then parts accumulate as you scroll. Three chapters tracked in the top rail:

1. *Slide, inside out* — striker → firing pin safety → extractor → barrel → recoil assembly → slide (the first five visibly vanish inside it) → cover plate → sights
2. *Frame, inside out* — trigger bar & connector → housing & ejector → trigger → locking block & pins → slide stop & takedown → magazine catch → frame
3. *Magazine* → *Ammunition*

Colour separated new from old: a part arrived in full material colour and desaturated to grey once the next appeared, so the newest piece was always the coloured one. The finale restored full colour to every part.

**Content correction.** Version 1 stated the "17" came from magazine capacity. That's the popular explanation and it's probably wrong — it's usually attributed to Gaston Glock's seventeenth patent, with the company describing the matching round count as coincidence. Corrected.

**Mobile work.** Canvas pinned at `48svh` with text scrolling beneath; `touch-action: pan-y` so horizontal drag orbits while vertical drag still scrolls; callouts flip to right-anchored labels below 700 px and cap at four; legend drops part counts under 420 px; camera pads out further on narrow screens.

### Verification
All 53 parts introduced exactly once, count growing monotonically 5 → 53, no gaps or duplicates.

### Bugs fixed
1. **CSS class collision** — `.num` was used for both the giant outlined step number and the legend part counts, leaking a 1.5 px text-stroke and huge line-height into the legend. Renamed to `.stepno`.
2. **`svh`/`vh` fallback order inverted** — the `vh` fallback was declared *after* `svh`, so `svh` never applied anywhere.
3. **Sticky canvas had no background** — scrolling text would have bled through the transparent WebGL canvas on mobile.
4. **`offsetTop` read through a positioned ancestor** — `.story` had `position: relative`, making it the offset parent and throwing step detection off entirely. Replaced with cached `getBoundingClientRect()` measurements, re-taken on resize and after font load.

---

## Prompt 3

> also make the 3d model cell shaded, with clear edge lines and a more anime appearance. Make the website have a black background. Also go back to the previous teardown but make the first model all the components shifted into place to form the actual gun not just an exploded view

### What was done

**Assembly reconstruction — the substantial piece of work.** The FBX has no assembled pose to recover; the parts are authored exploded, and there are no animation curves in the file. So the pose was reconstructed from scratch:

1. Built an orthographic inspector and rendered labelled side/top views of the frame and slide in isolation.
2. Read real coordinates off the geometry — frame rail line at y ≈ 0.209, trigger guard opening spanning z ∈ [−0.13, 0.09] and y ∈ [0.01, 0.13], the two pin holes, the magazine catch cutout, the takedown lever slot, slide extents, barrel and sight positions.
3. Derived a translation for all 53 parts, anchored on the frame.
4. Iterated against renders.

Precision was concentrated where it shows: only the frame, slide, barrel, sights, trigger, levers, magazine catch and floorplate are visible once assembled — the rest is internal and hidden, so those only needed to land plausibly inside their housings.

**This became the structural spine.** The page opens assembled, flies apart into the teardown, and the final section **reassembles it under scroll control** — scrubbing the pistol back together as you read the closing text.

**Cel shading.** Custom GLSL replacing the previous PBR setup:
- Three flat light bands with a view-space key light (stable under orbit)
- A tight `smoothstep` specular step for the anime highlight
- A fresnel rim so parts separate from the black background without environment lighting

**Edge lines** from two sources: an inverted-hull outline (`BackSide`, expanded in clip space for constant screen width) and crease lines from `EdgesGeometry` at a 22° threshold. Both require position-welded geometry, so a single weld pass at load produces averaged normals for a gap-free hull *and* shared vertices so creases are detected properly instead of every hard edge registering as a boundary. Ghosted parts drop to faint line art with no hull.

**Black theme.** Materials rebrightened to read on black: polymer slate `#7C879B`, nitride blue `#4E93C4`, steel near-white `#CBD4DE`, spring sage `#9DAE95`, brass gold `#E0A945`. Accent still tracks the current section's material.

**Reverted to the teardown structure** — one component group per section with everything else ghosted, outside-in from the frame, 16 sections plus hero and outro.

### Verification
- All 53 parts have assembly offsets; JS offsets **byte-identical** to the Python values validated visually.
- Every part appears in exactly one section.
- Cel shading maths reimplemented in the software renderer to preview the look before shipping — confirmed both the assembled pose and the exploded state read correctly.
- GLSL reviewed against the ES 1.0 spec and three.js's injected uniforms.

### Bugs fixed
1. **Slide seated too high** on the first assembly pass — its side walls extend lower than the main silhouette suggested.
2. **Connector protruded out the back of the frame** — it had been exploded rearward and needed +0.15 in Z to sit against the trigger housing.
3. **Magazine body and floorplate misaligned** — the magazine's rake is slightly steeper than the magwell's, so the two needed independent Z offsets.
4. **Morph state lived inside the `view` object** — the outro's `anime.remove(view)` (needed so scroll could drive reassembly directly) was also killing the camera tween. Split into a separate `morph` object.
5. Stray placeholder value left in a CSS custom property.

### Open interpretation
"Go back to the previous teardown" was read as version 1's structure — one component group per section, outside-in from the frame — rather than version 2's inside-out accretive build. If the accretive build was meant to stay and only the hero was to change, that's a contained swap of the section logic.

---

## Prompt 4

> generate a markdown file for every single prompt I've sent and a summary of the resultant changes

Produced this document. It's one file with a section per prompt rather than four separate files — if you wanted them split out individually, that's a quick change.

---

## Current state

**Page structure** — hero (assembled, with provenance) → 16 teardown sections → outro (scroll-driven reassembly).

**Rendering** — custom cel shader, inverted-hull outlines, crease lines, black theme, material-derived palette, live projected callouts, material legend with hover isolation, drag-to-orbit.

**Libraries** — three.js r128 and anime.js 3.2.2, both from cdnjs. Geometry inlined as base64; no network fetch for model data.

### Known limitations

- **Never rendered in a real browser.** No browser was available in this environment. The data, geometry, sequence logic and library APIs are all verified, and the shading maths was previewed via a software reimplementation — but the shaders have never been compiled by an actual GL driver. If something fails at runtime, the custom `ShaderMaterial` is the first place to look. Layout and lighting are also unseen.
- **The assembled pose is reconstructed, not authoritative.** It is derived from the geometry and is visually correct, but it is not dimensionally exact and internal parts are positioned only well enough to stay hidden.
- **Material notes are general.** They describe the design at an encyclopedic level — no dimensions, tolerances, or manufacturing process data.
- **Textures are unused.** The supplied `_Outline` atlases are UV maps for a different (textured) look; the page uses flat cel shading, so no UVs are exported in the web payload. The GLB likewise carries position and normal only.