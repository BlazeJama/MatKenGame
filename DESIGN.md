---
name: MatKenGame
description: Military vehicle recognition quiz — photograph-based, 10-question rounds, instant feedback.
colors:
  bg-abyss: "#070b14"
  navy-command: "#1a2744"
  header-dark: "#0d1526"
  amber-intel: "#f59e0b"
  state-correct: "#22c55e"
  state-wrong: "#ef4444"
  text-primary: "#e2e8f0"
  text-secondary: "#94a3b8"
  text-muted: "#64748b"
  text-ghost: "#334155"
typography:
  display:
    fontFamily: "'Bebas Neue', sans-serif"
    fontWeight: 400
    letterSpacing: "0.06em"
    lineHeight: 1
  body:
    fontFamily: "'Rajdhani', sans-serif"
    fontWeight: 600
    fontSize: "1rem"
    lineHeight: 1.5
  label:
    fontFamily: "'Share Tech Mono', monospace"
    fontWeight: 400
    fontSize: "0.75rem"
    letterSpacing: "0.12em"
rounded:
  sharp: "2px"
  pill: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.amber-intel}"
    textColor: "{colors.bg-abyss}"
    typography: "{typography.display}"
    rounded: "{rounded.sharp}"
    padding: "16px 24px"
  button-primary-hover:
    backgroundColor: "#fbbf24"
  answer-option:
    backgroundColor: "#0f172a"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.sharp}"
    padding: "11px 14px"
  answer-correct:
    backgroundColor: "#052e16"
    textColor: "#86efac"
  answer-wrong:
    backgroundColor: "#450a0a"
    textColor: "#fca5a5"
  tac-card:
    backgroundColor: "#1a274473"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.sharp}"
    padding: "24px 28px"
---

# Design System: MatKenGame

## 1. Overview

**Creative North Star: "The Training Range"**

MatKenGame is built for a student who takes the subject seriously. The interface doesn't cheerfully reward participation — it sets conditions for focus. Every screen should feel like arriving at a place where the work happens: austere, purposeful, configured for the task at hand. The tactical aesthetic is not decoration; it is the logical visual register for a military vehicle identification exercise.

The system works in near-darkness. A deep, navy-tinted black fills the background; surfaces layer progressively lighter without ever getting bright. The sole bright element is amber — reserved strictly as an intel highlight, marking the one thing on screen that demands attention right now. Everything else recedes deliberately. If you can see amber and not know where to look next, the design has failed.

This system explicitly rejects the cheerful quiz-app idiom: no pastel bubbles, no celebratory confetti bursts, no encouragement copy written for children. It equally rejects the aggressive military-shooter aesthetic (lens flares, blood, extreme contrast). The register is closer to a well-designed field manual or a serious simulator: authoritative, functional, and entirely in service of the learning that happens inside it.

**Key Characteristics:**
- Near-black background with subtle amber grid — sets the atmospheric stage before content appears
- Single amber accent used as strict intel highlight, never decoration
- Three-font system: commanding display, working body, data label — each with one fixed job
- Tonal depth through layered dark surfaces; zero box-shadows anywhere in the system
- Corner brackets frame data containers — a structural signal, not visual flair
- Feedback states (correct / wrong) are informational, not celebratory or punitive

## 2. Colors: The Night Operations Palette

A near-monochromatic dark system anchored to navy-black, with a single amber tone that functions as a spotlight rather than a brand colour.

### Primary
- **Amber Intel** (`#f59e0b`): The only bright color in the system. Used for: progress bar fill, letter badges on unanswered options, active score counts, corner bracket accents on TacCards, "◈" and "◉" status glyphs, the "GAME" suffix in the home title. Every use encodes "this is information that matters right now." Never used for decoration.

### Neutral
- **Abyss** (`#070b14`): The page background. Near-black with a controlled navy tint (hue ~240°). Applied everywhere no content sits — the canvas all surfaces float on.
- **Command Navy** (`#1a2744`): TacCard backgrounds at ~45% opacity (`rgba(26,39,68,0.45)`). The lightest persistent surface; signals "this block contains structured data."
- **Header Dark** (`#0d1526`): The quiz screen's header bar — one step above Abyss, one step below Command Navy. Establishes the header as a separate plane without a shadow.
- **Deep Surface** (`#0f172a`): Unanswered option buttons. Slightly lighter than Abyss to lift interactive elements off the background.
- **Text Primary** (`#e2e8f0`): Main content text. Slightly warm-cool slate so pure white is never used.
- **Text Secondary** (`#94a3b8`): Supporting labels, country names under vehicle answers, fun-fact body copy.
- **Text Muted** (`#64748b`): Section labels (MISSION INTEL, FIELD BRIEFING), metadata. Readable but clearly subordinate.
- **Text Ghost** (`#334155`): Footer text, decorative dividers, content that should barely register.

### State Colors
- **Correct Green** (`#22c55e`): Answer button border and text tint when the correct option is revealed. Background is `rgba(34,197,94,0.1)` — just enough green to read, not enough to overpower.
- **Wrong Red** (`#ef4444`): Wrong-answer state. Same approach: border + `rgba(239,68,68,0.1)` background tint. Neither state is triumphant or punishing — both are informational.

### Named Rules
**The Intel Highlight Rule.** Amber (`#f59e0b`) is reserved exclusively for active significance: what demands attention right now. It is never used as a color accent on static, decorative, or secondary elements. If amber appears on a screen and nothing is actively happening, the design is wrong.

**The No-Pure-White Rule.** Neither `#ffffff` nor `#000000` appears in this system. All text is `#e2e8f0` or dimmer; the darkest background is `#070b14`. Tinting neutrals toward the navy hue (chroma ≈ 0.015) keeps the dark-mode palette cohesive rather than harshly contrasty.

## 3. Typography

**Display Font:** Bebas Neue (Google Fonts CDN, fallback `sans-serif`)
**Body Font:** Rajdhani 400/500/600/700 (Google Fonts CDN, fallback `sans-serif`)
**Label/Data Font:** Share Tech Mono (Google Fonts CDN, fallback `monospace`)

**Character:** Bebas Neue is a condensed, uppercase-only display face — it reads like a stencil stamp on equipment. Rajdhani is a condensed humanist sans that handles dense UI text without crowding. Share Tech Mono sits between terminal output and radio signal: all data readouts, counters, and status labels live in mono. The pairing creates a clear three-register hierarchy: commanding title, working text, raw data.

### Hierarchy
- **Display** (Bebas Neue, 400, variable size `3.5rem–5rem`, line-height `1`, letter-spacing `0.04–0.14em`): Screen titles (MATKENGAME, DEBRIEF), primary call-to-action buttons (BEGIN TRAINING, NEXT TARGET), result verdict labels (TARGET ACQUIRED). Always uppercase by nature of the typeface.
- **Title** (Rajdhani, 700, `1.05–1.15rem`, line-height `1.3`): Vehicle names inside answer buttons. The most frequently read text during gameplay.
- **Body** (Rajdhani, 600, `0.875–1rem`, line-height `1.5`): Fun-fact text, field briefing copy, how-to-play description. Cap at ~55ch on mobile to maintain readability.
- **Label** (Share Tech Mono, 400, `0.7–0.75rem`, letter-spacing `0.08–0.18em`, uppercase): Question counter (QUESTION 3/10), score readout (SCORE 7), section headers (MISSION INTEL, FIELD BRIEFING), status glyphs (◈ SYSTEM ONLINE ◈, ◉ IDENTIFY TARGET). All label copy in uppercase or small caps.

### Named Rules
**The Three Voices Rule.** Bebas Neue is the commanding voice: screen titles and primary actions only. Rajdhani is the working voice: all body, UI labels, and button text that isn't a primary CTA. Share Tech Mono is the data voice: numbers, counters, and machine-readable metadata. These roles are fixed. Rajdhani does not do score readouts; Share Tech Mono does not do paragraph copy; Bebas Neue does not do supporting labels.

## 4. Elevation

This system uses tonal layering exclusively. There are no `box-shadow` declarations anywhere — not ambient, not structural, not decorative. Depth is read through surface brightness: darker surfaces recede (Abyss), lighter surfaces advance (Command Navy at 45% opacity). The three distinct background values — `#070b14`, `#0d1526`, `#1a2744` — create three clearly separated planes when stacked.

Corner brackets on TacCards (four 14px `2px`-wide amber divs) replace the visual separation role that a card shadow would otherwise provide. They signal "bounded data container" without introducing any elevation vocabulary.

**The No-Shadow Doctrine.** `box-shadow` is prohibited. If a surface needs to feel lifted or separated, step its background one tone lighter up the tonal stack. If that doesn't create enough separation, reconsider the layout — surfaces that compete for hierarchy are a layout problem, not a shadow problem.

## 5. Components

### Buttons

The primary action button is Bebas Neue on amber — direct, unmissable, unambiguous. Shape is nearly square-cornered (2px radius) to match the system's mechanical feel. Hover is a brightness increase (`filter: brightness(1.08)`), never a color swap.

- **Shape:** Nearly sharp, gently rounded (2px). No radius variation.
- **Primary:** Amber Intel background (`#f59e0b`), Abyss text (`#070b14`), Bebas Neue display type, `0.14em` letter-spacing, minimum height 56px, full width on mobile.
- **Hover:** `filter: brightness(1.08)`. No translation, no shadow.
- **Active:** `transform: scale(0.98)`. Tactile compression.
- **Focus:** `outline: 2px solid #f59e0b; outline-offset: 3px`. Amber ring, never hidden.
- **Disabled:** `rgba(30,41,59,0.7)` background, `#334155` text. Not visually loud — unavailability is quiet.

### Answer Options

The central interactive component. Each option is a dark panel with a letter badge, vehicle name, and country. States change the entire panel: border color, background tint, text color, and badge color all shift together as a single signal.

- **Default:** `rgba(15,23,42,0.85)` background, `rgba(245,158,11,0.2)` border (amber at 20%). Amber letter badge. Hover: border steps to `rgba(245,158,11,0.45)`, background gains slight amber blush `rgba(245,158,11,0.07)`.
- **Correct:** `rgba(34,197,94,0.1)` background, `#22c55e` border, `#86efac` text, green badge tint. Checkmark `✓` right-aligned.
- **Wrong (selected):** `rgba(239,68,68,0.1)` background, `#ef4444` border, `#fca5a5` text, red badge tint. Cross `✗` right-aligned.
- **Dimmed (unchosen after reveal):** 45% opacity, border collapses to `rgba(30,41,59,0.5)`. The answer recedes; the correct one stays bright.
- **Internal layout:** Letter badge (32×32px, 2px radius) left-aligned; vehicle name (Rajdhani 600, `1.05rem`) and country (Share Tech Mono, `0.7rem`, 65% opacity) stacked; icon right-aligned after reveal.

### TacCard (Bracketed Container)

Used for the Mission Intel block (home screen), the score card (end screen), and any future panel grouping structured data. Four amber corner brackets (`14×14px`, `2px` line weight, inset `−1px`) replace a border or shadow. The card body uses `rgba(26,39,68,0.45)` — translucent Command Navy — over the Abyss background.

- **Shape:** 2px radius.
- **Background:** `rgba(26,39,68,0.45)`.
- **Border:** `1px solid rgba(245,158,11,0.18)` — barely visible amber perimeter, present but unassertive.
- **Corner Brackets:** Four `14×14px` amber divs positioned absolutely at each corner. They extend 1px beyond the card border to sit right on the corner.
- **Internal Padding:** `24px 28px`.
- **Usage Rule:** TacCards group structured mission data. They are not used as generic layout containers. Nesting TacCards is prohibited.

### Progress Bar

Tracks quiz progression through a 10-question round.

- **Track:** 3px height, `rgba(245,158,11,0.1)` background (amber at 10%), `9999px` radius.
- **Fill:** Amber Intel (`#f59e0b`), same radius. Animated with `transition: width 0.4s ease`.
- **Positioning:** Inside the quiz header bar (Header Dark background), full max-width of the content column.

### Result Panel

Appears below the answer options after selection, replacing the button prompt. Signals correct or wrong, names the correct vehicle if the player was wrong, and surfaces the fun fact.

- **Correct:** `rgba(34,197,94,0.06)` background, `rgba(34,197,94,0.3)` border. "✓ TARGET ACQUIRED" in Correct Green via display type. Fun fact in Text Secondary.
- **Wrong:** `rgba(239,68,68,0.06)` background, `rgba(239,68,68,0.28)` border. "✗ WRONG TARGET" in Wrong Red via display type. Correct vehicle name in Text Primary. Fun fact in Text Secondary.
- **Fun fact:** Prefixed with `◈` in Amber Intel. Body in Rajdhani 600 at `0.875rem`. If no fun fact exists, the prefix and line are omitted entirely — no empty space.
- **Animation:** `fadeSlideUp` — 10px rise, 0.25s ease-in-out. Appears after selection; does not animate on subsequent renders.

### Target Image Frame

The vehicle photograph, framed with targeting reticle brackets and a gradient label overlay.

- **Image:** `object-cover`, fixed 220px height on mobile. Full column width.
- **Corner Reticles:** Four amber divs (`26×26px`, `2px` line weight), inset `10px` from the image edges. These do not touch the image border — they float over the image interior, reinforcing the "targeting" read.
- **Label Overlay:** `linear-gradient(to top, rgba(7,11,20,0.88), transparent)` pinned to the image bottom. Contains "◉ IDENTIFY TARGET" in Share Tech Mono Amber Intel at 65% opacity.

## 6. Do's and Don'ts

### Do:
- **Do** reserve Amber Intel (`#f59e0b`) for active significance — progress, selected states, the one label demanding attention. Its rarity is its power.
- **Do** use Bebas Neue exclusively for primary screen titles and CTA button labels. Rajdhani handles everything else that reads as UI text.
- **Do** use Share Tech Mono for all scores, counters, question indexes, and status glyphs. Numbers in Rajdhani break the data-voice convention.
- **Do** maintain the tonal stack: Abyss → Header Dark → Command Navy. New surfaces must land on one of these three steps, not between them.
- **Do** apply the scanline overlay (`body::after` with repeating-linear-gradient) on all game screens. It unifies the system's atmospheric layer across surface and image content.
- **Do** keep corner brackets on TacCards structural. They mark bounded data containers — Mission Intel, score cards, future stats panels. Any new card that groups mission-critical data should use TacCard.
- **Do** honor `prefers-reduced-motion`: wrap all `animation` declarations in `@media (prefers-reduced-motion: no-preference)` so the `fadeSlideUp` and `fadeIn` animations are skipped for users who've opted out.
- **Do** verify WCAG 2.1 AA contrast on every new text/background pairing. The amber-on-abyss combination (`#f59e0b` on `#070b14`) passes at approximately 10:1; text in Text Secondary (`#94a3b8`) on deep surfaces needs verification per new context.

### Don't:
- **Don't** use pastel colors, rounded "bubble" shapes, bouncy animations, or cheerful encouragement copy. This system is explicitly not Kahoot, Quizlet, or any quiz-app that treats its audience as children. These are the primary anti-references from PRODUCT.md — violating them destroys the educational register.
- **Don't** use `box-shadow` anywhere. Not on cards, not on buttons, not on the image frame. The No-Shadow Doctrine is absolute. Any need for separation is a layout or tonal problem.
- **Don't** add a fourth font. Three voices (Display / Body / Data) is the system. Introducing a fourth breaks the three-voice hierarchy and makes the system feel undirected.
- **Don't** add gradient text (`background-clip: text`). Text is a single solid color. Emphasis comes from weight, size, or Amber Intel — never from a gradient.
- **Don't** use `border-left` as a colored accent stripe on cards or list items. Any block needing left-border treatment should use a full border or a background tint instead.
- **Don't** use glassmorphism (`backdrop-filter: blur`) as a visual effect. The TacCard uses a translucent background but not a blur. Blurs in this system are gratuitous.
- **Don't** use confetti, star bursts, badge pops, coin animations, or any other mobile F2P reward mechanic. The game's feedback is informational: correct/wrong, score number, fun fact. That's the complete feedback loop.
- **Don't** let the result panel (TARGET ACQUIRED / WRONG TARGET) animate on re-render. The `anim-panel` class uses a CSS animation that fires once on mount. It should not re-fire when the component re-renders for unrelated reasons.
