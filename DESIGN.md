---
name: JalRakshak Narrative
colors:
  surface: '#fbf9f4'
  surface-dim: '#dbdad5'
  surface-bright: '#fbf9f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3ee'
  surface-container: '#f0eee9'
  surface-container-high: '#eae8e3'
  surface-container-highest: '#e4e2dd'
  on-surface: '#1b1c19'
  on-surface-variant: '#4a4640'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f1ec'
  outline: '#7b766f'
  outline-variant: '#ccc5bd'
  surface-tint: '#605e5c'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1a'
  on-primary-container: '#868382'
  inverse-primary: '#cac6c4'
  secondary: '#aa3618'
  on-secondary: '#ffffff'
  secondary-container: '#fe7350'
  on-secondary-container: '#6a1500'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#00201a'
  on-tertiary-container: '#698b81'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e6e2df'
  primary-fixed-dim: '#cac6c4'
  on-primary-fixed: '#1c1b1a'
  on-primary-fixed-variant: '#484645'
  secondary-fixed: '#ffdbd2'
  secondary-fixed-dim: '#ffb4a2'
  on-secondary-fixed: '#3c0800'
  on-secondary-fixed-variant: '#881f01'
  tertiary-fixed: '#c6eadf'
  tertiary-fixed-dim: '#aacec3'
  on-tertiary-fixed: '#00201a'
  on-tertiary-fixed-variant: '#2c4d45'
  background: '#fbf9f4'
  on-background: '#1b1c19'
  surface-variant: '#e4e2dd'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  data-mono:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-padding-mobile: 20px
  container-padding-desktop: 48px
  gutter: 24px
  section-gap: 64px
---

## Brand & Style

The design system is built on a foundation of **Modern Professionalism** with a **Tactile Earthy** aesthetic. It departs from traditional environmental tropes (heavy blues and bright greens) in favor of a sophisticated, infrastructure-focused palette that emphasizes the permanence of masonry, clay, and stone.

The target audience includes government officials, urban planners, and high-end residential developers who require a platform that feels like a precision financial tool but remains grounded in the physical reality of water conservation. The UI evokes a sense of "Expert Calm"—utilizing heavy whitespace, structured layouts, and physical metaphors to make complex data feel manageable and authoritative. 

The style is primarily **Minimalist** with **Tactile** influences: surfaces feel like physical slabs, and elevation is used to denote structural hierarchy rather than mere decoration.

## Colors

This design system utilizes a high-contrast, warm-neutral palette designed to feel institutional yet modern.

- **Primary (Ink):** Used for deep backgrounds in "Dark Mode" sections, primary headers, and high-importance typography. It provides the "fintech" weight and authority.
- **Accent (Clay):** Reserved for high-action items, critical data points, and active navigation states. It should be used sparingly to maintain its impact.
- **Neutral (Bone):** The primary canvas color. It is warmer than pure white, reducing eye strain and reinforcing the "earthy" narrative.
- **Success (Teal):** Used for positive data trends, verification badges, and "safe" status indicators. It is muted to ensure it doesn't compete with the Clay accent.

## Typography

The typography system balances the friendly, open curves of **Plus Jakarta Sans** for headings with the systematic precision of **Inter** for functional text and data.

- **Data Emphasis:** For numerical values (harvest yields, rainfall data), use `data-mono` or `headline-md` with the Primary (Ink) color to ensure maximum legibility.
- **Hierarchy:** Use all-caps labels for metadata and section overlines to create a clear "bureaucratic" but modern structure.
- **Line Heights:** Generous line heights are maintained throughout to support the "calm and effortless" brand tone.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy on desktop (12 columns, 1200px max-width) to maintain a sense of controlled, institutional order. On mobile, it transitions to a fluid single-column layout with generous side margins.

- **Rhythm:** An 8px linear scale governs all spacing.
- **Whitespace:** Emphasize vertical "breathing room" between sections (64px+) to prevent the platform from feeling cluttered or "government-heavy."
- **Content Reflow:** On tablets, the 12-column grid collapses to 6 columns, with cards stacking into two-column rows.

## Elevation & Depth

This design system uses **Tonal Layering** combined with soft, directional shadows to create a sense of physical weight.

- **Base Layer:** The Bone (#F9F7F2) surface acts as the ground.
- **Card Elevation:** Cards use a subtle, large-radius shadow (Y: 4px, Blur: 20px, Opacity: 4%) with a thin 1px border in Stone Grey (#7D7A74) at 20% opacity. This makes the cards feel like they are resting lightly on the surface.
- **Active Elevation:** When hovered or selected, cards should slightly increase shadow depth (Blur: 32px) and shift Y-offset to 8px, simulating a physical lift.
- **Overlays:** Map overlays and tooltips use a light Glassmorphism effect (Backdrop Blur: 12px) with a semi-transparent Bone background to maintain context of the underlying geography.

## Shapes

The shape language is "Softly Architectural." 

- **Primary Radius:** Use 12px (rounded-lg) for standard cards and input fields to strike a balance between friendly and structural.
- **Large Components:** Hero sections and large data containers use 24px (rounded-xl) to emphasize their container-like nature.
- **Interactive Elements:** Buttons and tags follow the 12px rule, ensuring they don't appear "bubbly" but avoid the harshness of sharp corners.

## Components

### Buttons & Interaction
- **Primary CTA:** Solid Clay (#D35433) background with Bone text. Use for "Submit Plan" or "Apply for Subsidy."
- **Secondary:** Transparent with an Ink (#1A1918) 1.5px border.
- **Ghost:** Ink text with no border; background becomes a light Stone Grey on hover.

### Cards
- **Data Cards:** Must feature a clear "Label" (uppercase, Stone Grey) and a "Value" (Ink, Plus Jakarta Sans). 
- **Status Cards:** Use a left-edge vertical accent bar in Teal or Clay to denote status without coloring the entire surface.

### Input Fields
- **Styling:** Bone background with a 1px Stone Grey border. On focus, the border thickens to 2px and changes to Ink.
- **Labels:** Always positioned above the field in Inter Bold, 12px.

### Map Overlays
- Map controls should be floating, using the Glassmorphism style. 
- Points of interest on maps should use the Clay accent for high visibility against neutral map tiles.

### Progress & Indicators
- Use horizontal "Step" indicators for multi-stage applications. Completed steps use Teal, active steps use Clay, and future steps use Stone Grey.