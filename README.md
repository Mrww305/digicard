# SA — Digital CV · *"Deep Space"*

[![Deploy to GitHub Pages](https://github.com/Mrww305/digicard/actions/workflows/deploy.yml/badge.svg)](https://github.com/Mrww305/digicard/actions/workflows/deploy.yml)

A single-page, cinematic **digital CV for Sajid Afridi** — Senior AI Platform & Infrastructure Engineer and founder of [megnitoo.com](https://megnitoo.com). Pure-black canvas, interactive WebGL starfield, split-text blur-to-focus typography, and a full flight-telemetry content system.

🌌 **Live:** <https://mrww305.github.io/digicard/>

---

## Contents

1. [The Idea](#1--the-idea)
2. [Stack](#2--stack)
3. [Architecture — the Layering Model](#3--architecture--the-layering-model)
4. [The Four Engineering Pillars](#4--the-four-engineering-pillars)
5. [Project Structure](#5--project-structure)
6. [Getting Started](#6--getting-started)
7. [Editing Content](#7--editing-content)
8. [Deploying to GitHub Pages — Step by Step](#8--deploying-to-github-pages--step-by-step)
9. [Motion & Accessibility](#9--motion--accessibility)
10. [Performance Notes](#10--performance-notes)
11. [Troubleshooting Playbook](#11--troubleshooting-playbook)
12. [License](#12--license)

---

## 1 · The Idea

Most CVs are documents. This one is a **viewport into deep space**: the candidate's career rendered as a trajectory, his skills as instrumentation, his community as a gravity well. Every section is numbered like telemetry (`01 — 06`), headings *decode* like an incoming transmission, and the entire page drifts over a slowly rotating galactic core that answers to the mouse.

Design constraints that shaped the build:

| Decision | Rationale |
|---|---|
| Pure black `#000` canvas | Cinematic contrast; the starfield *is* the background layer |
| Off-white ink `#e8e8e8` + ember accent `#e2a33c` | High readability, one disciplined highlight color |
| Montserrat (200–500) + Instrument Serif + Space Mono | Airy tracked sans for structure, high-contrast italic serif for *emphasis*, mono for data voice |
| No images, no frameworks-of-motion beyond GSAP | Copy stays crawlable HTML over canvas; zero asset weight |

---

## 2 · Stack

| Layer | Technology | Notes |
|---|---|---|
| Runtime | **React 18** + **Vite 6** | UI composition + build pipeline |
| Language | **TypeScript 5.9** (strict) | `tsc --noEmit` gate via `npm run typecheck` |
| 3D background | **Three.js r128** (`three@0.128.0` exactly) | Perspective camera, `Points` starfields, additive blending |
| Motion | **GSAP 3.15** | Staggered timelines, `expo.out` / `power3.out` eases |
| Styling | **Custom CSS design system** (~1,450 lines) | BEM-ish tokens, no utility framework at runtime |
| Fonts | Montserrat · Instrument Serif · Space Mono | Google Fonts, `display=swap`, preconnected |
| Deploy | **GitHub Pages** via **GitHub Actions** | `actions/deploy-pages@v4`, `base: "/digicard/"` |

> **Note:** Tailwind CSS is *not* used. The scaffold ships with `@tailwindcss/*` leftovers; the build never loads them (see [playbook §11.1](#111--tailwind-oxide-native-binding-crash-on-ci)).

---

## 3 · Architecture — the Layering Model

The page is a stack of **fixed planes**; real, crawlable HTML copy always sits above the interactive canvas:

```
z-index
  90 │  ● Cursor (ember dot + lagging ring)      — fine pointers only
  80 │  ▓ Film grain (animated SVG noise)
  70 │  ━ Scroll telemetry bar (scaleX progress)
  50 │  ⌐ Fixed header (mix-blend-mode: difference)
   3 │  ✎ HTML typography / content layer        — pointer-events: none
     │                                            on shells, auto on links
   2 │  ◍ Vignette (radial-gradient falloff)
   1 │  ▚ <canvas class="use-webgl">             — Three.js scene, click-through
   0 │  █ Pure black document background
```

Rules enforced by CSS:

- `.use-webgl` is `position: fixed; inset: 0; z-index: 1; pointer-events: none` — the scene *feels* interactive via window-level pointer tracking, never by stealing clicks.
- Structural containers (`.hero`) are `pointer-events: none`; interactive children (`a`, `button`) re-enable with `pointer-events: auto`.
- The header uses `mix-blend-mode: difference` so it stays legible over any scene region.

---

## 4 · The Four Engineering Pillars

### 4.1 · Dynamic viewport fix (`--vh`)

Mobile Safari/Chrome resize their address bars, which makes `100vh` jump. `src/lib/vh.ts` writes the *actual* visible height to a CSS variable:

```ts
document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
window.addEventListener("resize", set);
window.addEventListener("orientationchange", set);   // both events, per spec
```

The hero is then sized without any `vh` unit:

```css
.hero { height: calc(var(--vh, 1vh) * 100); }
```

### 4.2 · WebGL-to-DOM layering

`<canvas class="use-webgl">` renders behind real HTML — search engines and screen readers parse actual copy, while the GPU paints the cosmos underneath. See the [layering diagram](#3--architecture--the-layering-model).

### 4.3 · Three.js r128 scene (`src/three/cosmos.ts`)

- **Renderer:** `alpha: true`, `antialias: true`, pixel ratio **clamped at 1.75** to cap fill-rate cost on 3× displays.
- **Content:** three parallax star layers (1,500 far / 750 mid / 240 ember-near) + a 2,400-point **galactic core disc** (vertex colors: ice-white, blue, ember).
- **Motion:** single `requestAnimationFrame` loop; normalized mouse `(-1…1)` lerps the camera for parallax drift; core rotates and "breathes" on a sine.
- **Lifetime:** full `dispose()` teardown — RAF cancelled, listeners removed, geometries/materials/renderer released (React StrictMode-safe).

### 4.4 · GSAP split-text, blur-to-focus

`src/lib/split.ts` wraps **every character** of a `[data-split]` node in its own inline-block `<span class="char">` inside no-break `<span class="word">` wrappers; the original string survives on `aria-label` for screen readers.

CSS initial state:

```css
.char { display: inline-block; opacity: 0; visibility: hidden; filter: blur(0.2ex); }
```

GSAP sweeps them to focus in a staggered timeline (`ease: "expo.out"`):

```ts
tl.to(chars, { autoAlpha: 1, y: 0, filter: "blur(0ex)",
               duration: 1.25, stagger: { each: 0.032 } }, 0.4)
```

The entrance runs from `useLayoutEffect` — the masked state is committed **before first paint**, so there is no flash of un-animated text.

---

## 5 · Project Structure

```
digicard/
├── .github/workflows/deploy.yml   # GitHub Pages pipeline (self-healing install)
├── index.html                     # shell: fonts, meta, critical black-canvas style
├── vite.config.js                 # base: "/digicard/" + react plugin only
├── src/
│   ├── main.tsx                   # entry — mounts <App/>, imports global.css
│   ├── App.tsx                    # boot: vh fix, cosmos, split/GSAP, observers
│   ├── styles/global.css          # full design system + reduced-motion rules
│   ├── lib/
│   │   ├── vh.ts                  # --vh mobile viewport trick
│   │   ├── split.ts               # custom SplitText utility
│   │   └── scramble.ts            # decode-in heading effect
│   ├── three/cosmos.ts            # Three.js r128 starfield scene
│   └── components/
│       ├── Header.tsx             # brand, nav, live GST clock
│       ├── Hero.tsx               # split-text title, orbit badge, meta rail
│       ├── Marquee.tsx            # discipline ticker (SVG spark separators)
│       ├── Profile.tsx            # sticky two-column bio + pull-quote + facts
│       ├── Career.tsx             # trajectory rows (2013 → now)
│       ├── Megnitoo.tsx           # the venture + orbit diagram + CTA
│       ├── Capabilities.tsx       # instrumentation grid + chips + doctrine
│       ├── Signals.tsx            # count-up telemetry stats
│       ├── Contact.tsx            # open channel, links, ghost wordmark, footer
│       └── Chrome.tsx             # <Progress/> telemetry bar + <Cursor/>
```

---

## 6 · Getting Started

```bash
# 1 — clone
git clone https://github.com/Mrww305/digicard.git
cd digicard

# 2 — install (Node 18+; CI uses the lockfile)
npm ci            # falls back to `npm install` if the lockfile ever drifts

# 3 — develop
npm run dev       # http://localhost:3000

# 4 — production build → ./dist
npm run build

# 5 — sanity-check the artifact locally
npx vite preview  # serves dist/ (assets already use /digicard/ base)

# 6 — type gate (optional)
npm run typecheck
```

---

## 7 · Editing Content

All copy is plain data at the top of its component — no CMS required:

| Change this | Edit here |
|---|---|
| Name, role line, hero meta rail | `src/components/Hero.tsx` |
| Bio paragraphs, pull-quote, fact grid | `src/components/Profile.tsx` |
| Career timeline rows | `ROWS` in `src/components/Career.tsx` |
| MegniToo pillars + CTA URL | `src/components/Megnitoo.tsx` |
| Capability rows + tech chips + doctrine | `src/components/Capabilities.tsx` |
| Stat counters | `STATS` in `src/components/Signals.tsx` |
| Contact links (email, LinkedIn…) | `LINKS` in `src/components/Contact.tsx` |
| Marquee disciplines | `ITEMS` in `src/components/Marquee.tsx` |
| Palette, fonts, easing tokens | `:root` in `src/styles/global.css` |
| Starfield density / colors / drift | `src/three/cosmos.ts` |

---

## 8 · Deploying to GitHub Pages — Step by Step

The pipeline is already wired in this repo. Follow in order:

### Step 1 · Push to `main`

```bash
git checkout main
git add .
git commit -m "deploy: digital CV"
git push origin main
```

### Step 2 · Confirm the base path

`vite.config.js` must carry the **repo-name base** so assets resolve under the Pages subpath:

```js
export default defineConfig({
  base: "/digicard/",      // ← must match the repository name
  plugins: [react()],
});
```

### Step 3 · The workflow (`.github/workflows/deploy.yml`)

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pages: write
      id-token: write
    environment:                    # ← REQUIRED by actions/deploy-pages@v4
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v5
        with:
          node-version: 22
          cache: npm
      - name: Install dependencies
        run: npm ci || npm install  # self-healing: never dies on lockfile drift
      - name: Build
        run: npm run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v4
        with:
          path: ./dist
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Step 4 · Repository settings (one-time)

1. **Settings → Pages → Source** → select **"GitHub Actions"** *(not "Deploy from a branch")*.
2. If your org blocks auto-created environments: **Settings → Environments → New environment** → name it **`github-pages`** (no protection rules needed).

### Step 5 · Verify

- Watch **Actions** — the run should go fully green (~40 s).
- Open <https://mrww305.github.io/digicard/> — black canvas first, starfield fades in, title decodes.
- Check DevTools → Network: every asset loads with a `/digicard/assets/…` path, no 404s.

---

## 9 · Motion & Accessibility

| Behavior | Implementation |
|---|---|
| `prefers-reduced-motion` | JS adds `html.rm`; CSS force-shows every staged element, kills grain/marquee/spinners; cosmos renders **one static frame**; custom cursor never mounts |
| Screen readers | Split titles keep `aria-label`; decorative layers are `aria-hidden`; nav, landmarks and focus rings intact |
| Keyboard | Native anchors + `:focus-visible` ember outline; no hover-only interactions |
| Touch devices | `--vh` recalculates on address-bar collapse & rotation; cursor layer skipped (`pointer: coarse`) |

---

## 10 · Performance Notes

- **One bundle, on purpose:** ~747 KB raw / **~209 KB gzip** — Three.js r128 + GSAP + React. Fine for a single-page piece; split with `manualChunks` only if the app grows.
- **GPU budget:** ~4,900 points total, additive blending, `depthWrite: false`, no textures, no post-processing.
- **Pixel-ratio clamp** at `1.75` prevents 3×-display fill-rate spikes.
- **No layout thrash:** telemetry bar & cursor animate `transform` only; scroll reads are RAF-throttled.
- **Zero blocking assets:** fonts `display=swap`; critical black-canvas style inlined in `index.html` — no white flash.

---

## 11 · Troubleshooting Playbook

Every failure this project has actually hit on CI, with the permanent fix:

### 11.1 · Tailwind oxide native-binding crash on CI

**Symptom:** `Cannot find native binding … @tailwindcss/oxide` while loading `vite.config.js`.
**Root cause:** `@tailwindcss/vite` loads a platform-specific Rust binary *at config-parse time*; npm's optional-dependency bug can skip it on fresh runners.
**Fix (permanent):** the plugin was **removed** from `vite.config.js` — the design system is custom CSS, Tailwind is unused. The build can never touch the binary again.

### 11.2 · Node 20 deprecation warnings

**Symptom:** `Node 20 is being deprecated…` + `punycode` deprecation noise.
**Fix:** actions modernized — `checkout@v5`, `setup-node@v5` (Node 22 + npm cache), `upload-pages-artifact@v4`, `configure-pages@v5`, `deploy-pages@v4`.

### 11.3 · `Missing environment` (400) on deploy

**Symptom:** `Creating Pages deployment failed … Missing environment.`
**Fix:** the job declares it:
```yaml
environment:
  name: github-pages
  url: ${{ steps.deployment.outputs.page_url }}
```
…plus **Settings → Pages → Source = "GitHub Actions"**.

### 11.4 · `npm ci` EUSAGE — lockfile out of sync

**Symptom:** `npm ci can only install packages when package.json and package-lock.json are in sync` followed by a wall of `Missing: <pkg> from lock file`.
**Root cause:** a stale/truncated lockfile reached the repo (usually a selective commit that skipped `package-lock.json`).
**Fix:**
```bash
rm -rf node_modules package-lock.json
npm install                      # regenerate the full lockfile
git add package-lock.json        # ← MUST appear in git status
git commit -m "chore: regenerate lockfile"
```
The workflow's `npm ci || npm install` guards against this recurring.

### 11.5 · Local dev oddities

| Symptom | Fix |
|---|---|
| Blank page at `localhost:3000/digicard/` | Expected — the base path only exists in production. Use `localhost:3000` in dev |
| Hero text flashes before animating | Split/GSAP must run in `useLayoutEffect` (already wired in `App.tsx`) |
| Cursor visible on phone | Only mounts for `pointer: fine`; check OS-level pointer emulation in DevTools |

---

## 12 · License

© 2026 **Sajid Afridi** — content and design are personal work. The engineering patterns (`--vh` trick, split-text utility, Three.js boilerplate) are free to study and reuse; the identity, copy and MegniToo branding are not.

**Contact:** [ceo@megnitoo.com](mailto:ceo@megnitoo.com) · [megnitoo.com](https://megnitoo.com) · [linkedin.com/in/mr305afridi](https://sa.linkedin.com/in/mr305afridi)

---

*Built in the dark, on purpose.* 🛰️
