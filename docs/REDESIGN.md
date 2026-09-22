# shivampandiya.com redesign, September 2026

Audit, reference study, proposal and build notes. Pattern numbers cite the
ai-slop-detector checklist. "FD" cites the frontend-design calibration list.

## 1. Audit of the site as it stood

The copy was already clean after the content pass: no fabricated social proof,
no stock openers, no "not just X" constructions, no invented metrics. What
remained templated was the visual system and the information architecture.

| # | Pattern | Where | Verdict |
|---|---|---|---|
| FD-2, FD-5 | Tinted near-black standing in for black, one accent | `App.css` `--background: #0A0A0B`, `--accent: #6671D4` | Replace |
| FD-3 | Broadsheet: hairline rules between everything, 2px radius, dense 12-col grid | Every section, `.hairline` | Replace |
| 2 | Italic serif on one word of a headline | Hero, Work, How, Contact. Also project emphasis, stat numerals, model list | Replace |
| 3, FD-5 | ALL-CAPS tracked labels | 10 eyebrows, stat captions, tag rows, Now labels, How labels | Replace |
| FD-5 | Monospace for small data labels | Geist Mono throughout | Replace |
| FD-5 | Meta strings joined with middle dots | 20+ strings: `RPC · NAAS / VAAS · INFRA`, `Product Manager · 2024`, `Layer-0 · RWA`, the title tag | Replace |
| FD-5 | `→` and `↗` appended to link text | Read resume, Read the résumé, mobile Resume | Replace |
| FD | Big numbers with small labels as the hero's support | Hero stat bar | Move the numbers next to the claims they prove |
| FD | Numbered markers on content that is not a sequence | Work 01–05, How 01–04, Life i.–v. and "Plate · 01", resume bullets 01, 02 | Remove |
| 16, 33 | Three feature cards | AI "In practice" | Rewrite as prose |
| 17 cousin | Scrolling name wall | "Stack & collaborators" marquee | Remove, tech moves to the index table |
| 20 | Grid behind the hero | `HeroGrid.jsx` | Remove |
| 30 | Split-text character reveal, Life fade-up | `HeroSection.jsx`, `OutsideSection.jsx` | One motion moment only |
| 50 | Premium-template chrome | Global SVG grain overlay, custom cursor, Lenis scroll hijack | Remove |
| 87 family | Every hobby forced into a work lesson | Life: cycling, trekking, marathon bodies | Flagged, kept verbatim by standing instruction |
| IA | Work read as a list of lists | Five rows, an Also row, an AI section, a marquee | Rebuild as one narrative |

Defects found in the same pass:

- Hero content is `opacity: 0` until a GSAP timeline runs. A link opened in a
  background tab shows a blank page until the tab is focused.
- The custom cursor's refs start at `(0, 0)`, so a ring sits in the top-left
  corner until the mouse first moves.
- `cursor: none` hides the system cursor site-wide.

## 2. References

### shwn.design, the pond

A bespoke multi-pass WebGL2 renderer on a Next.js site. Read from its uniforms
and GLSL function names, not reproduced:

- A GPU height-field wave simulation in a ping-pong texture (`u_state`,
  `u_stiffness`, `u_damping`, a Laplacian step). Clicks add drops, drags add
  splashes, and the swimming koi adds pushes, so it leaves a real wake.
- Caustics computed from the surface normals, with chromatic dispersion.
- A procedural koi with rayed fins and a shadow cast onto the pond bed.
- A sun and ambient term, ACES tonemapping, and film grain.

The realism does not come from geometry. It comes from three things: a
physical simulation that answers input, physically based light with
tonemapping, and grain. Those are what to carry over.

### prasen.dev, the theme toggle

Read from the shipped component:

1. If View Transitions are unsupported or `prefers-reduced-motion` is set,
   switch instantly.
2. `document.startViewTransition(() => flushSync(() => setTheme(next)))`.
   `flushSync` makes React commit inside the callback so the new snapshot
   holds the new theme.
3. Radius is the distance from the button to the farthest viewport corner.
4. Animate `clip-path: circle(0 → R at button)` on
   `::view-transition-new(root)`, 500ms.
5. CSS disables the default crossfade.

The whole palette shifts cleanly because the browser snapshots the entire page
and the circle reveals one over the other. No element transitions on its own,
so nothing lags, including canvases.

## 3. Proposal

### The narrative

Six years of work sorts into three tracks that are converging into one
product. That is the spine of the page.

1. **Infrastructure people build on.** Instanodes, 5irechain, Qubetics, Tomi.
2. **Money that has to arrive.** Payment rails, Circle CCTP, the trading
   competition, Blockmaze.
3. **Models that know when to stop.** Vuelo.
4. **Where they meet.** AgenticRPC: agents paying for infrastructure per task.

The decision stories move into the chapter where each happened, so every
number sits beside the call that produced it.

### Information architecture

| Section | Status |
|---|---|
| Hero: name, role, headline, the drop, one action | Rebuilt |
| The story so far, four chapters | New, absorbs Work, How I work, AI |
| How I build | Rewritten from the AI section as prose |
| Index of work | New, a real table, absorbs Also and the marquee |
| Off the clock | Kept, content verbatim, chrome removed |
| Contact | Kept, with a copy-email action |
| Stat bar, marquee, cursor, grid, grain, Lenis | Removed |

### Visual direction: river stone

Grounded in the Shivalik foothills and Himachal trails in the site's own
photographs, and in the water drop of the hero.

| Token | Light (day) | Dark (lamp) |
|---|---|---|
| paper | `#EDF0EB` limestone | `#1B2422` wet slate |
| raised | `#F6F8F4` | `#222D2A` |
| ink | `#14201B` | `#E4EBE7` |
| ink-2 | `#4A5852` | `#A5B3AD` |
| rule | `#CCD4CE` | `#34423E` |
| accent | `#0B6B66` deep water | `#7CCFC4` |

Dark is a colour, not tinted black. Light is cool mineral, not cream.

**Type: one family, three widths.** Archivo, variable in weight and width.
Claims are set expanded so they carry. Reading text is normal width. Data and
metadata are set condensed so they fit a row. Width replaces the italic-serif
accent, the monospace labels and the caps as the hierarchy device.

**Layout: claims in the column, evidence in the margin.** The writing rule
"every claim carries its evidence within two sentences" becomes the grid.
Prose runs in a 62ch column. The number that proves a sentence sits in the
margin beside it. On narrow screens the note drops in beneath its paragraph.

### The drop

One drop of water on a stone tile, lit like a real object. The cursor pushes
it rather than dragging it. Clicking splits a smaller drop off, which rolls and
merges back. It leaves a wet trail that dries. Rendered in a raw WebGL2
fragment shader with no library: a metaball field gives the shape, its
gradient gives a normal, and the normal drives refraction of the stone,
a Fresnel rim, a specular highlight, a soft contact shadow and a caustic spot
where the drop focuses light onto the stone.

The theme toggle does not recolour the drop. It changes the light source.
Day is high soft sunlight. Lamp is a low warm key from one side.

Fallbacks: reduced motion renders one still frame and takes no input. No
WebGL2 draws a CSS drop. Weak devices render at lower resolution. The loop
stops when the tile is off screen or the tab is hidden.

### Micro-interactions, each doing a job

- Push and split the drop.
- The toggle relights the drop through the circular reveal.
- Hovering or focusing a claim lights the evidence beside it, and the reverse.
- "What I'd do differently" is a disclosure, the way a retro note works.
- Copy email confirms with "Copied".

## 4. Stack

The site stays on Vite and React, deployed on Vercel. A two-page static site
gains nothing from a move to Next.js. The build drops GSAP, Lenis,
framer-motion and lucide-react.

## 5. Build notes

Runtime dependencies are now `react`, `react-dom` and `react-router-dom`.
CSS went from 92 KB to 15 KB. Total JavaScript roughly halved.

The drop ships as `src/components/Droplet.jsx`: two shader programs, no
library. Things worth knowing:

- It starts on `requestIdleCallback`, after the page has painted. The slab
  shows first and the drop lands on it.
- One frame is always drawn on mount. A background tab gets no animation
  frames, and a link opened from LinkedIn usually lands in one.
- The loop runs at full rate while anything moves and at 12 fps once the drop
  has settled. A device that cannot hold the frame during the landing gets
  fewer pixels, and if that is still too slow it stops drawing between
  interactions.
- Touch screens cap at 1.5x resolution. Weak devices cap at 1x.
- `?still` renders the reduced-motion path: one full-size frame, no input.

The theme swap suspends CSS colour transitions for the instant it happens.
Without that, links and figures faded from the old palette to the new one
inside the circular reveal.

## 6. Final audit

Mechanical sweep of every rendered string: zero em dashes, semicolons, middle
dots, arrows in link text, all-caps labels, banned words or stock openers.

Fixed in the final pass:

- A repeated "A call I would make again" label above all four decision
  stories. The panel and the verb-phrase title already say what it is.
- "The hard part is not the payment. It is deciding..." restated directly (#51).
- Two sentences of mine that pre-announced what the decision story below
  them says (#76).
- Every section rebuilt on one identical padding (#48). Spacing now follows
  the weight of the section.

Kept, and why:

- "Open to roles where the hard part is the product, not the pitch." and
  "define retention before a launch, not read headline counts after it."
  Both are the owner's own specified copy. One light contrast each, not a
  cluster.
- Life section bodies that turn each hobby into a work lesson (#87 family).
  Kept verbatim by standing instruction.
- Margin figures are big numbers with small labels. They sit beside the
  sentence they prove, not in a hero as decoration.
- The drop's meaning is implicit. A skeptic could still call it decoration
  (#49). It sits on a physical surface, answers input, and the money chapter
  is about liquidity, but the page does not spell the metaphor out.

## 7. Results

| Page | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| Home, mobile | 96 | 100 | 100 | 100 |
| Home, desktop | 100 | 100 | 100 | 100 |
| Resume, mobile | 92 | 100 | 100 | 100 |

Contrast measured on the rendered page after a real toggle: light floor
5.52:1, dark floor 6.54:1, no failures. No horizontal scroll at 320 or 375.
One `h1`, no skipped heading levels, all 21 interactive elements show a focus
ring.
