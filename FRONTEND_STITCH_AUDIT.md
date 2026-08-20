# JalRakshak AI Water Platform — Frontend Stitch Design Audit

This audit document evaluates the visual fidelity of the existing React codebase in `frontend-SIH/` against the Stitch-exported visual reference code in [stitch-screens.html](file:///c:/Users/saida/Downloads/frontend-SIH/stitch-reference/stitch-screens.html).

---

## A. Shared Design System Analysis

The Stitch templates define a highly structured, modern, tactile-earthy design system using standard Tailwind CSS classes and a series of custom component stylesheets.

### 1. Colors & Palette
- **Primary Canvas (Bone):** `#fbf9f4` (`bg-background`, `bg-surface`, `bg-surface-bright`)
- **Primary Text (Ink):** `#1b1c19` (`text-on-background`, `text-on-surface`)
- **Accent Color (Clay / Terracotta):** `#aa3618` (`text-secondary`, `bg-secondary`)
- **Positive Status (Muted Teal):** `#c6eadf` (`bg-tertiary-fixed`, `text-on-tertiary-fixed`)
- **Neutral Containers (Stone):** `#eae8e3` (`bg-surface-container-high`), `#f5f3ee` (`bg-surface-container-low`), `#f0eee9` (`bg-surface-container`)
- **Borders & Outlines (Warm Grey):** `#ccc5bd` (`border-outline-variant`)
- **Muted Typography (Stone Grey):** `#7b766f` (`text-outline`)

### 2. Typography Hierarchy
The platform strictly balances **Plus Jakarta Sans** (headings & statistics) and **Inter** (functional labels & body text):
- **display-lg:** `Plus Jakarta Sans`, 48px, bold (`font-display-lg`)
- **display-lg-mobile:** `Plus Jakarta Sans`, 32px, bold (`font-display-lg-mobile`)
- **headline-md:** `Plus Jakarta Sans`, 24px, semi-bold (`font-headline-md`)
- **headline-sm:** `Plus Jakarta Sans`, 20px, semi-bold (`font-headline-sm`)
- **body-lg:** `Inter`, 18px, regular (`font-body-lg`)
- **body-md:** `Inter`, 16px, regular (`font-body-md`)
- **data-mono:** `Inter`, 20px, semi-bold (`font-data-mono`)
- **label-sm:** `Inter`, 12px, semi-bold, letter-spacing 0.05em (`font-label-sm`)

### 3. Spacing & Rhythm
An 8px linear grid scale is enforced globally:
- `gutter`: `24px`
- `base`: `8px`
- `container-padding-desktop`: `48px`
- `container-padding-mobile`: `20px`
- `section-gap`: `64px`

### 4. Custom Component Styles
The Stitch templates include critical raw CSS styling blocks that are **missing** from the React application's global stylesheets. These must be defined in [index.css](file:///c:/Users/saida/Downloads/frontend-SIH/src/index.css) to prevent visual rendering discrepancies:
- **Dotted Background Grid:**
  ```css
  .pattern-bg, .bg-bone-dots, .bg-dot-pattern {
      background-color: #fbf9f4;
      background-image: radial-gradient(#ccc5bd 1px, transparent 1px);
      background-size: 24px 24px;
  }
  ```
- **Glassmorphism Panels (Map Overlays, Floating Widgets):**
  ```css
  .glass, .glass-panel, .glass-overlay {
      background: rgba(249, 247, 242, 0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(125, 122, 116, 0.2);
  }
  ```
- **Tactile Card Elevation & Hover Transitions:**
  ```css
  .card-elevation, .card-shadow, .tactile-card, .data-card {
      box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.04);
      border: 1px solid rgba(125, 122, 116, 0.2);
      transition: all 0.3s ease;
  }
  .card-elevation:hover, .card-shadow:hover, .tactile-card:hover, .data-card:hover {
      box-shadow: 0px 8px 32px rgba(0, 0, 0, 0.08);
      transform: translateY(-2px);
  }
  ```
- **Status Accents:**
  ```css
  .status-bar-clay {
      border-left: 4px solid #aa3618;
  }
  ```
- **Animations:**
  - `subtle-rise` / `.animate-subtle-rise` (minimalist fade-in rise transition)
  - `slideInRight` / `.animate-slide-in-right` (drawer slide-in)
  - `blinker` / `.blink` (chat cursor)

---

## B. Screen-by-Screen Comparison

Each of the 16 Stitch templates maps 1-to-1 with a React component or view state:

### 1. Roof Analysis
- **React Component:** [RoofAnalysis.jsx](file:///c:/Users/saida/Downloads/frontend-SIH/src/components/assessment/RoofAnalysis.jsx)
- **Comparison:** High fidelity. Sidebar, overlays, and details card map closely.
- **Discrepancies:**
  - Dotted grid overlay is missing behind the map card.
  - Floating confidence badge color was normalized, but the shadow is flatter than the Stitch reference due to missing `.glass-overlay` style bindings.
- **Dynamic Elements:** Leaflet Map viewport rendering must remain dynamic and responsive to coordinates in props/state.

### 2. Assessment Results
- **React Component:** [AssessmentResults.jsx](file:///c:/Users/saida/Downloads/frontend-SIH/src/components/assessment/AssessmentResults.jsx)
- **Comparison:** Very high structural matching. Metric cards match Stitch Bento layouts.
- **Discrepancies:**
  - Card hover transitions and shadows do not activate because `.card-elevation` is missing in `index.css`.
- **Dynamic Elements:** Yield value must animate count-up on mount. Water savings math must derive dynamically from active assessment context.

### 3. JalRakshak - Home
- **React Component:** [Home.jsx](file:///c:/Users/saida/Downloads/frontend-SIH/src/components/assessment/Home.jsx)
- **Comparison:** Layout aligns to the hero text and manual inputs.
- **Discrepancies:**
  - Dotted background pattern `.pattern-bg` is completely missing from the screen body.
- **Dynamic Elements:** Geolocation request trigger on the primary button, manual search field query binding.

### 4. Ministry Dashboard
- **React Component:** [MinistryDashboard.jsx](file:///c:/Users/saida/Downloads/frontend-SIH/src/components/assessment/MinistryDashboard.jsx)
- **Comparison:** Side nav links, header profiles, and key metric columns are matching.
- **Discrepancies:**
  - Metric cards hover transition and border left bar (`.status-bar-clay`) are missing definitions.
- **Dynamic Elements:** All state tables, regional charts, and active dropdown filters.

### 5. Polygon Editor - Drag State
- **React Component:** [PolygonEditor.jsx](file:///c:/Users/saida/Downloads/frontend-SIH/src/components/assessment/PolygonEditor.jsx) (wrapped by [PolygonEditor.jsx](file:///c:/Users/saida/Downloads/frontend-SIH/src/components/PolygonEditor.jsx))
- **Comparison:** Overlaid panels, vertex handles, and status notifications map perfectly.
- **Discrepancies:**
  - Missing dotted grid decoration.
  - Tooltips do not have blur styles due to missing `.glass-overlay`.
- **Dynamic/React Behavior:** Interactive node drag actions, history undo/redo stacks, and area calculations (Turf) must not be interrupted.

### 6. Property Details Form
- **React Component:** [PropertyDetailsForm.jsx](file:///c:/Users/saida/Downloads/frontend-SIH/src/components/assessment/PropertyDetailsForm.jsx)
- **Comparison:** Form grid, material selection tabs, and progress counters are structurally complete.
- **Discrepancies:**
  - Missing dotted body background grid.
  - Glass card does not blur under form content due to missing `.glass-card` styling rules.
- **Dynamic Elements:** Occupant state, surface material state, and form field validation.

### 7. Low-Confidence Fallback
- **React Component:** [LowConfidenceFallback.jsx](file:///c:/Users/saida/Downloads/frontend-SIH/src/components/shared/LowConfidenceFallback.jsx)
- **Comparison:** Warning sheet and tree cover notifications match the layout.
- **Discrepancies:**
  - Background overlay shadow behaves flatter.
- **Dynamic Elements:** Bypass action links and manual editing trigger buttons.

### 8. Calculating Results
- **React Component:** [CalculatingResults.jsx](file:///c:/Users/saida/Downloads/frontend-SIH/src/components/shared/CalculatingResults.jsx)
- **Comparison:** Processing ring, progress bars, and analysis badges are formatted cleanly.
- **Discrepancies:**
  - Progress bar filling logic must operate smoothly.
  - Missing dot pattern.
- **Dynamic Elements:** Simulated percentage loader and auto-completion redirect triggers.

### 9. System Schematic Detail
- **React Component:** [SystemSchematicDetail.jsx](file:///c:/Users/saida/Downloads/frontend-SIH/src/components/assessment/SystemSchematicDetail.jsx)
- **Comparison:** Schematic blueprint images, grid lists, and item breakdowns map structurally.
- **Discrepancies:**
  - Missing card lift hover triggers (`.tactile-card`).
- **Dynamic Elements:** Active item details and blueprint downloads.

### 10. Cost Breakdown (BoQ)
- **React Component:** [CostBreakdown.jsx](file:///c:/Users/saida/Downloads/frontend-SIH/src/components/assessment/CostBreakdown.jsx)
- **Comparison:** Bill of Quantities tables, cost categories, and payback timelines align.
- **Discrepancies:**
  - Lack of hover states on row list cards.
- **Dynamic Elements:** Recalculating totals and detail dropdown expansions.

### 11. Chat Drawer - Default
- **React Component:** [ChatDefault.jsx](file:///c:/Users/saida/Downloads/frontend-SIH/src/components/chat/ChatDefault.jsx)
- **Comparison:** Sidebar navigation items, user details, and initial recommendations match.
- **Discrepancies:**
  - Layout matches, but the background card elevation styling is missing.

### 12. Chat Drawer - Active Chat
- **React Component:** [ChatActive.jsx](file:///c:/Users/saida/Downloads/frontend-SIH/src/components/chat/ChatActive.jsx)
- **Comparison:** Message cards, message bubbles, text areas, and send action items are matching.
- **Discrepancies:**
  - The typing cursor dot blink and slide-in animations are absent due to missing CSS classes.
- **Dynamic/React Behavior:** Appending dynamic messages and scrolling to the bottom on new inputs.

### 13. Location Permission Denied
- **React Component:** [LocationPermissionDenied.jsx](file:///c:/Users/saida/Downloads/frontend-SIH/src/components/shared/LocationPermissionDenied.jsx)
- **Comparison:** Layout is centered and visually complete.
- **Discrepancies:**
  - Centered modal lacks slide-up transition (`.animate-subtle-rise`).
  - Missing dot pattern on backgrounds.

### 14. Service Degraded State
- **React Component:** [ServiceDegradedState.jsx](file:///c:/Users/saida/Downloads/frontend-SIH/src/components/shared/ServiceDegradedState.jsx)
- **Comparison:** Columns and stat cards map structurally.
- **Discrepancies:**
  - Muted flow cards lack left border bar styling (`.status-bar-clay`).
- **Dynamic Elements:** Rendering actual error codes and offline alert messaging.

### 15. Contractor Checklist
- **React Component:** [ContractorChecklist.jsx](file:///c:/Users/saida/Downloads/frontend-SIH/src/components/assessment/ContractorChecklist.jsx)
- **Comparison:** Tactical checklist tables, print actions, and progress tags map structurally.
- **Discrepancies:**
  - Print layout overrides (`@media print`) are missing, which breaks normal browser printing output.
- **Dynamic Elements:** Interactive checklist states, printing triggers.

### 16. Assessment History
- **React Component:** [AssessmentHistory.jsx](file:///c:/Users/saida/Downloads/frontend-SIH/src/components/assessment/AssessmentHistory.jsx)
- **Comparison:** History grid, site thumbnails, and stats match.
- **Discrepancies:**
  - Tactile card animations and elevations are missing.
- **Dynamic Elements:** Historic assessment maps and lists.

---

## C. Shared Components to Extract

To align with modern clean React standards and prevent file duplication, several parts of the screens should be extracted into shared components under `src/components/shared/` or `src/components/layout/`:
1. **SideNavBar:** Standardize the sidebar navigation list so that modifications (e.g. adding routes) don't require updating 12+ files.
2. **TopAppBar:** Abstract mobile header items, user indicators, and historical records icons.
3. **BottomNavBar:** Centralize mobile tab bars and view triggers.
4. **DottedBackground:** A single utility component or CSS injection layout wrapper.

---

## D. Visual Discrepancies Summary

- **Missing Dotted Patterns:** Dotted grid overlays (`pattern-bg`, `bg-bone-dots`, `bg-dot-pattern`) are not rendered.
- **Missing Card Elevations:** Shadow hover effects (`card-elevation`, `card-shadow`, `tactile-card`, `data-card`) are absent.
- **Missing Glass Blurs:** Transparent cards and overlays (`glass`, `glass-panel`, `glass-overlay`, `glass-card`) lack backdrop blurs.
- **Clay Status Bars:** Left borders (`status-bar-clay`) are missing on error cards.

---

## E. Responsive Discrepancies Summary

- **Fixed Sidebar Collapses:** The sidebars use direct `hidden lg:flex` configurations, which are correct, but the main area content scrolling is constrained by default body limits rather than container bounds.
- **Print Layouts:** Standard checklist sheets lack appropriate media-print resets.

---

## F. Functional Behavior to Preserve

During visual QA pass styling, **under no circumstances** should the following functional areas be modified or broken:
- Leaflet map instances and vector overlays.
- Marker vertex dragging, click-to-add, and delete actions.
- `@turf/area` calculations.
- Axios request payloads and assessment response routers.

---

## G. Recommended Implementation Order

1. **Add Custom CSS Tokens:** Inject the missing utility styles (`.glass`, `.card-elevation`, `.pattern-bg`, `.blink`, `.status-bar-clay`, printing media queries) into [src/index.css](file:///c:/Users/saida/Downloads/frontend-SIH/src/index.css).
2. **Standardize Layout Wrappers:** Verify all screens use correct flex containers and scroll viewports.
3. **Extract Layout components:** Refactor duplicate sidebar/navbar components to centralize layout.
4. **Fidelity Verification:** Manually test print triggers, transition animations, and background textures.
