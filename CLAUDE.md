# CLAUDE.md

This is a Remotion-based video project that creates animated videos from Figma designs using GSAP for animation.

Full Remotion docs: https://www.remotion.dev/docs/

---

## Project Overview

- **Stack**: Remotion + React + GSAP + TailwindCSS
- **Purpose**: Import designs from Figma, animate them with GSAP, render as video
- **Figma Integration**: Via Figma MCP tools (not REST API)

---

## Project Structure

```
src/
  index.ts                          # Entry point -- calls registerRoot(Root)
  Root.tsx                          # Registers all <Composition> components
  style.css                        # TailwindCSS imports
  hooks/
    useGsapTimeline.ts              # GSAP ↔ Remotion bridge hook
  components/
    figma/                          # Components pulled from Figma via MCP
      ExampleDesign.tsx             # Example -- replace with real Figma exports
    scenes/                         # Remotion scene compositions
      Scene01.tsx                   # Each scene = one animated video segment
  lib/
    animations.ts                   # Reusable GSAP animation presets
public/                             # Static assets (images, fonts, audio)
remotion.config.ts                  # Remotion + TailwindCSS webpack config
tailwind.config.ts                  # TailwindCSS configuration
```

---

## Remotion Fundamentals

### Composition

A `<Composition>` defines a renderable video unit. It is registered in `src/Root.tsx`.

```tsx
<Composition
  id="Scene01"              // Unique ID, used for rendering
  component={Scene01}        // React component
  durationInFrames={150}     // 150 frames = 5 seconds at 30fps
  width={1920}               // Full HD width
  height={1080}              // Full HD height
  fps={30}                   // Frame rate
/>
```

**Defaults for this project:**
- fps: 30
- width: 1920
- height: 1080
- id: Use descriptive names like "Scene01", "Intro", "FullVideo"

### Hooks

- `useCurrentFrame()` — Returns the current frame number (0-indexed). This drives ALL animation.
- `useVideoConfig()` — Returns `{ fps, durationInFrames, width, height }`.

### Key Components

- `<AbsoluteFill>` — Full-screen container for layering elements on top of each other.
- `<Sequence from={30} durationInFrames={60}>` — Shows children only between frame 30-90. Child `useCurrentFrame()` starts at 0 relative to the Sequence.
- `<Series>` / `<Series.Sequence>` — Display elements one after another.
- `<TransitionSeries>` — Series with transitions (fade, wipe) between items.
- `<Img src={...}>` — For static images.
- `<OffthreadVideo src={...}>` — For video files.
- `<Audio src={...}>` — For audio files.
- `staticFile("filename.mp4")` — Reference files from the `public/` folder.

### Animation Helpers (built-in)

```tsx
import { interpolate, spring } from "remotion";

// Linear interpolation
const opacity = interpolate(frame, [0, 30], [0, 1], {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
});

// Spring physics
const scale = spring({ fps, frame, config: { damping: 200 } });
```

### Critical Rules

1. **Deterministic rendering**: Components MUST produce the same output for the same frame. No `Math.random()` — use `random("seed")` from Remotion instead.
2. **No interactivity**: No `onClick`, `onHover`, `useState` for interaction. All state comes from `useCurrentFrame()`.
3. **No side effects**: Avoid `useEffect` for data fetching or subscriptions. Calculations should be pure functions of the frame number.
4. **Frame-driven animation**: ALL animation must be driven by `useCurrentFrame()` or the `useGsapTimeline` hook (which internally uses `useCurrentFrame()`).

---

## GSAP Integration

### useGsapTimeline Hook

This project uses GSAP for complex animations via the `useGsapTimeline` hook in `src/hooks/useGsapTimeline.ts`.

**How it works:**
1. You provide a factory function that builds a GSAP timeline
2. The hook immediately pauses the timeline
3. On every frame, it calls `timeline.seek(frame / fps)` to sync with Remotion

**Usage pattern:**

```tsx
import { AbsoluteFill } from "remotion";
import gsap from "gsap";
import { useRef } from "react";
import { useGsapTimeline } from "../../hooks/useGsapTimeline";

export const MyScene: React.FC = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const scopeRef = useGsapTimeline(() =>
    gsap.timeline()
      .fromTo(boxRef.current, { scale: 0 }, { scale: 1, duration: 1, ease: "back.out(1.7)" })
      .fromTo(textRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.3")
  );

  return (
    <AbsoluteFill ref={scopeRef}>
      <div ref={boxRef}>Box</div>
      <div ref={textRef}>Text</div>
    </AbsoluteFill>
  );
};
```

### GSAP Rules

1. **Always use `useGsapTimeline`** — never create standalone `gsap.to()` calls outside the hook.
2. **Never let GSAP auto-play** — the hook handles pausing and seeking.
3. **Use refs for targets** — pass `ref.current` to GSAP methods, not CSS selectors (selectors only work for descendants of the scope element).
4. **Duration in seconds** — GSAP durations are in seconds. The hook converts Remotion frames to seconds automatically.
5. **Timeline position parameter** — Use GSAP's position parameter for overlapping animations: `"-=0.3"` (overlap 0.3s), `"+=0.5"` (gap 0.5s), or absolute time like `1.5`.

### Animation Presets

Reusable presets are in `src/lib/animations.ts`:

```tsx
import { fadeIn, slideUp, scaleIn, stagger } from "../../lib/animations";

gsap.timeline()
  .fromTo(el, fadeIn.from, fadeIn.to)
  .fromTo(el, slideUp.from, slideUp.to, "-=0.3")
```

Available presets: `fadeIn`, `fadeOut`, `slideUp`, `slideDown`, `slideLeft`, `slideRight`, `scaleIn`, `scaleOut`, `popIn`, `rotateIn`, `spin`, `heroEntrance`, `subtitleEntrance`, `exitRight`, `exitLeft`, `stagger(amount)`.

---

## Figma MCP Workflow

Designs are pulled from Figma using the Figma MCP tools available in Cursor. **Do not use the Figma REST API directly.**

### Available Tools

| Tool | When to Use |
|------|-------------|
| `get_design_context` | **Primary tool.** Generate React/SVG code from a Figma node. Provide fileKey + nodeId from the Figma URL. Returns ready-to-use React component code. |
| `get_metadata` | Inspect the layer hierarchy of a Figma node in XML format. Use BEFORE `get_design_context` to understand structure and pick specific sub-nodes. |
| `get_screenshot` | Capture a visual screenshot of a Figma node for reference. |
| `get_variable_defs` | Extract design tokens (colors, spacing, fonts) as variable definitions for a shared theme. |
| `create_design_system_rules` | Generate design system rules for consistent styling. |

### Step-by-Step Workflow

1. **Get the Figma URL**: Copy the URL from Figma. Format: `https://figma.com/design/:fileKey/:fileName?node-id=X-Y`
2. **Extract IDs**: From the URL, extract `fileKey` and convert `node-id` (e.g., `1-2` → `1:2`)
3. **Inspect structure** (optional): Use `get_metadata` with the fileKey and nodeId to see the layer tree
4. **Pull design code**: Use `get_design_context` with fileKey and nodeId — this returns a React component
5. **Save component**: Place the generated code in `src/components/figma/` with a descriptive name
6. **Add animation refs**: Add `useRef` hooks and `ref` props to elements you want to animate
7. **Create scene**: Build a scene in `src/components/scenes/` using `useGsapTimeline`
8. **Register**: Add a `<Composition>` in `src/Root.tsx`

### Figma Design Best Practices

- **Group elements** that should animate together (Ctrl+G / Cmd+G) — they become `<g>` elements in SVG
- **Name layers clearly** — names become IDs/classNames in generated code, making GSAP targeting easy
- **Use Auto Layout** — translates to flexbox in generated code
- **Keep frames at 1920x1080** — matches the Remotion composition dimensions
- **Use components** in Figma — they map cleanly to React components

---

## Creating a New Scene

1. **Pull the Figma design** using `get_design_context` (see above)
2. **Save** in `src/components/figma/MyDesign.tsx`
3. **Create scene** in `src/components/scenes/MyScene.tsx`:

```tsx
import React, { useRef } from "react";
import { AbsoluteFill } from "remotion";
import gsap from "gsap";
import { useGsapTimeline } from "../../hooks/useGsapTimeline";
import { MyDesign } from "../figma/MyDesign";

export const MyScene: React.FC = () => {
  const elementRef = useRef<HTMLDivElement>(null);

  const scopeRef = useGsapTimeline(() =>
    gsap.timeline()
      .fromTo(elementRef.current, { opacity: 0 }, { opacity: 1, duration: 1 })
  );

  return (
    <AbsoluteFill ref={scopeRef}>
      <MyDesign elementRef={elementRef} />
    </AbsoluteFill>
  );
};
```

4. **Register** in `src/Root.tsx`:

```tsx
<Composition
  id="MyScene"
  component={MyScene}
  durationInFrames={150}   // 5 seconds at 30fps
  width={1920}
  height={1080}
  fps={30}
/>
```

### Calculating Duration

`durationInFrames = seconds * fps`

| Duration | Frames (at 30fps) |
|----------|--------------------|
| 1 second | 30 |
| 3 seconds | 90 |
| 5 seconds | 150 |
| 10 seconds | 300 |
| 30 seconds | 900 |
| 1 minute | 1800 |

---

## Commands

```bash
# Start Remotion Studio (development preview)
npm run dev

# Render a specific composition to MP4
npx remotion render Scene01 out/scene01.mp4

# Render with custom settings
npx remotion render Scene01 out/scene01.mp4 --codec h264 --crf 18

# Render a still frame (e.g., frame 45)
npx remotion still Scene01 out/thumbnail.png --frame 45

# Upgrade Remotion packages
npm run upgrade
```

---

## Adding New Dependencies

When adding animation-related packages, ensure they can be synchronized with Remotion's frame system. Supported third-party integrations:

- **GSAP** (installed) — via `useGsapTimeline` hook
- **@remotion/transitions** (installed) — for scene transitions
- **@remotion/lottie** — for After Effects Lottie animations
- **@remotion/three** — for Three.js 3D scenes
- **@remotion/skia** — for React Native Skia

Always check https://remotion.dev/docs/third-party before adding new animation libraries.
