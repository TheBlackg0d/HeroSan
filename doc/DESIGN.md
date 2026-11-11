---
name: Developer Platform Dark
colors:
  surface: '#131316'
  surface-dim: '#131316'
  surface-bright: '#39393c'
  surface-container-lowest: '#0e0e11'
  surface-container-low: '#1b1b1e'
  surface-container: '#1f1f22'
  surface-container-high: '#2a2a2d'
  surface-container-highest: '#353438'
  on-surface: '#e4e1e6'
  on-surface-variant: '#c2c6d6'
  inverse-surface: '#e4e1e6'
  inverse-on-surface: '#303033'
  outline: '#8c909f'
  outline-variant: '#424754'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e6a'
  primary-container: '#4d8eff'
  on-primary-container: '#00285d'
  inverse-primary: '#005ac2'
  secondary: '#7bd0ff'
  on-secondary: '#00354a'
  secondary-container: '#00a6e0'
  on-secondary-container: '#00374d'
  tertiary: '#4edea3'
  on-tertiary: '#003824'
  tertiary-container: '#00a572'
  on-tertiary-container: '#00311f'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#c4e7ff'
  secondary-fixed-dim: '#7bd0ff'
  on-secondary-fixed: '#001e2c'
  on-secondary-fixed-variant: '#004c69'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#131316'
  on-background: '#e4e1e6'
  surface-variant: '#353438'
typography:
  headline-xl:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Geist
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 26px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Geist
    fontSize: 15px
    fontWeight: '500'
    lineHeight: 22px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Geist
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  code-lg:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 16px
  label-md:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Geist
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-tablet: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style

The design system establishes a high-performance, developer-first environment tailored for platform engineers, DevOps specialists, and full-stack builders. The interface prioritizes telemetry clarity, low visual fatigue during extended terminal-and-browser sessions, and absolute control. It balances the precision of infrastructure orchestration with the frictionless polish of modern application platforms.

Drawing from modern minimalist developer utilities and high-density technical consoles, the aesthetic utilizes:
- **Atmospheric Dark Canvas:** Deep space blacks combined with stepped zinc-tinted neutral surfaces.
- **Micro-Borders & Structural Definition:** Strict 1px delineations rather than heavy drop shadows to structure high-density data.
- **Focused Luminance:** Electric cobalt and cyan accents indicating active pipelines and interactive nodes, complemented by crisp status signals for continuous deployment health.
- **High Information Density:** Compact typography scales, calibrated line-heights, and monospaced data anchors to maximize screen utility without clutter.

## Colors

The palette is engineered for high-contrast visibility, status parsing, and reduced eye strain under prolonged usage.

### Surface Tiers
- **Canvas Base:** `#0A0A0C` — Primary background for the entire application viewport.
- **Surface Layer 1:** `#121215` — Navigation sidebars, control bars, and base container panels.
- **Surface Layer 2 (Elevated):** `#18181D` — Cards, project blocks, modal dialogs, and slide-overs.
- **Surface Layer 3 (Overlay / Hover):** `#202027` — Hover states, dropdown menus, and popovers.

### Structural Lines
- **Subtle Border:** `#23232A` — Default structural divider for tables, cards, and input boundaries.
- **Strong / Active Border:** `#2E2E38` — Hovered borders, active tab underlines, and focused segment strokes.

### Accent & Feedback Systems
- **Primary Brand / Action:** `#3B82F6` (Electric Blue) with `#2563EB` for pressed interactions and focused states.
- **Secondary / Deploying:** `#38BDF8` (Sky Blue) for operational deployment states and network traces.
- **Status Queued:** `#71717A` (Muted Zinc).
- **Status Building:** `#F59E0B` (Amber Warning).
- **Status Healthy / Live:** `#10B981` (Emerald).
- **Status Failed / Terminated:** `#EF4444` (Crimson Danger).

## Typography

The type hierarchy balances rapid legibility with technical precision:
- **Geist (Primary UI):** Used across structural titles, section headings, dashboard controls, navigation links, and standard descriptive content. Tight negative letter-spacing on headline levels delivers a modern, compact industrial character.
- **JetBrains Mono (Technical Syntax):** Strictly assigned to machine-generated, copyable, or telemetry data: commit hashes (`git sha`), branch markers, CLI deployment strings, environmental variables (`ENV_VAR`), millisecond latency indicators, CPU/RAM percentages, and custom domain names.

### Rules of Usage
- Never use JetBrains Mono for generic descriptive prose or long help documentation.
- Maintain `13px` (`body-md`) as the default body size for density across dashboard tables and parameter rows.
- Code blocks and inline commands must utilize `code-md` or `code-sm` to maintain vertical alignment with adjacent UI tags.

## Layout & Spacing

The interface runs on a strict 4px/8px mathematical base scale with a fluid, multi-tier layout structure.

### Layout Philosophy
- **Dashboard Shell:** A fixed-width collateral sidebar (`240px` expanded, `64px` collapsed) docked left, accompanied by an adaptive fluid content canvas (`max-width: 1440px`) centered with fluid horizontal margins.
- **Grid Structure:** A 12-column responsive layout for project grids and metric widgets, shifting to 6-column on tablet and a single-column flow on mobile viewports.
- **High-Density Compactness:** Inner element paddings utilize `space-sm` (`8px`) and `space-md` (`12px`) as the primary density tokens to guarantee maximal viewport utilization for infrastructure logs and metrics graphs.

### Responsive Breakpoints
- **Mobile (< 768px):** Navigation transitions to a drawer/bottom sheet; margins set to `margin: 1rem`; horizontal tables gain overflow scrolling or collapse into card rows.
- **Tablet (768px – 1024px):** Sidebar compacts to icon-only mode; outer margins scale to `margin-tablet: 1.5rem`; metrics grids collapse to 2 columns.
- **Desktop (≥ 1024px):** Standard full-pane layout; gutter increases to `gutter-desktop: 1.5rem`; outer margin expands to `margin-desktop: 2rem`.

## Elevation & Depth

Visual separation relies on luminance shifts and architectural boundaries instead of pronounced drop shadows.

### Surface Tonal Hierarchy
- **Base Canvas (`#0A0A0C`):** Zero elevation. Houses the master dashboard underlay and log viewers.
- **Containers & Sidebars (`#121215`):** 1px solid stroke (`#23232A`), creating a subtle inset contrast.
- **Cards & Data Nodes (`#18181D`):** 1px solid border (`#23232A`). When hovered, the border shifts to `#2E2E38` accompanied by a micro-luminance boost.

### Ambient State Glows
- For active terminals, live deployment indicators, or focused form primitives, use a colored directional glow:
  - **Active Focus:** `0 0 0 1px #3B82F6, 0 0 16px -4px rgba(59, 130, 246, 0.35)`
  - **Live State Glow:** `0 0 12px -2px rgba(16, 185, 129, 0.40)`
  - **Failure Alert:** `0 0 12px -2px rgba(239, 68, 68, 0.40)`

### Overlays & Dialogs
Modals and context flyouts sit on `#18181D` elevated surfaces with an additional ambient shadow: `0 16px 36px -8px rgba(0, 0, 0, 0.70), 0 0 0 1px #2E2E38`.

## Shapes

The design uses a restrained, disciplined geometry (`roundedness: 1`). The aesthetic is crisp, technical, and aligned with standard IDE and CLI interface mental models.

- **Base Components (Inputs, Buttons, Badges):** `4px` (`rounded-sm` / `0.25rem`). This provides structural precision without aggressive softness.
- **Containers & Project Cards:** `8px` (`rounded-lg` / `0.5rem`).
- **Modal Dialogs & Large Panels:** `12px` (`rounded-xl` / `0.75rem`).
- **Telemetry Indicators & Badges:** Circular (`9999px`) reserved purely for live-status dots and user avatars. Tags and pills maintain the `4px` corner radius.

## Components

### Buttons
- **Primary:** Background `#3B82F6`, text `#FFFFFF`, border none, hover `#2563EB`. Active states feature an inset press transform (`scale(0.99)`).
- **Secondary / Ghost:** Background `#18181D`, text `#E4E4E7`, border `1px solid #23232A`, hover background `#202027`, hover border `#2E2E38`.
- **Destructive:** Background `transparent`, text `#EF4444`, border `1px solid rgba(239, 68, 68, 0.25)`, hover background `rgba(239, 68, 68, 0.10)`.
- **Metrics Action / Icon-Only:** `28px x 28px` or `32px x 32px`, centered icon with neutral label on hover tooltip.

### Status Chips & Badges
- Displayed with a solid or pulsing micro-dot (`6px`), formatted in `code-sm`:
  - **Queued:** Background `rgba(113, 113, 122, 0.15)`, text `#A1A1AA`, border `1px solid rgba(113, 113, 122, 0.25)`.
  - **Building:** Background `rgba(245, 158, 11, 0.15)`, text `#FBBF24`, border `1px solid rgba(245, 158, 11, 0.3)`.
  - **Deploying:** Background `rgba(56, 189, 248, 0.15)`, text `#38BDF8`, border `1px solid rgba(56, 189, 248, 0.3)`.
  - **Healthy / Live:** Background `rgba(16, 185, 129, 0.15)`, text `#34D399`, border `1px solid rgba(16, 185, 129, 0.3)`.
  - **Failed:** Background `rgba(239, 68, 68, 0.15)`, text `#F87171`, border `1px solid rgba(239, 68, 68, 0.3)`.

### Cards & Project Tiles
- Structure: Background `#18181D`, border `1px solid #23232A`, internal padding `16px` (`space-lg`).
- Transitions: Seamless border shift from `#23232A` to `#2E2E38` on mouse enter. Cards contain a monospace metadata line detailing current Git branch, latest commit hash, and age timestamp.

### Inputs & CLI Terminals
- **Form Inputs:** Background `#0A0A0C`, border `1px solid #23232A`, text `#F4F4F5`, placeholder `#52525B`. Focus state transitions border to `#3B82F6` with the electric focus ring.
- **Monospace Code Inputs / Env Var Editor:** Two-column grid with key-value alignment. Utilizes `JetBrains Mono` at `12px` (`code-md`), alternating zebra-striping with `rgba(255, 255, 255, 0.01)`.

### Real-Time Log Viewers & Telemetry Graphs
- **Terminal Shell:** Fixed black canvas (`#050507`), interior border `#23232A`, custom slim scrollbars (`4px` width, thumb `#2E2E38`).
- **Telemetry Charts:** Line and sparkline strokes use `#3B82F6` (Network/Traffic), `#10B981` (CPU/Memory normal), and `#EF4444` (Spikes/OOM). Gridlines set to `#18181D`.