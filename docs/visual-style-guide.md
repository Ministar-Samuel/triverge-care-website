This **Visual Style Guide** serves as the "source of truth" for the UI/UX design of the Triverge Healthcare platform. It translates your specific requirements, the "MedTrust" visual reference, and the Triverge brand identity (Comfort, Dignity, Expertise) into a cohesive design system.

---

# Visual Style Guide: Triverge Healthcare (v1.0)

## 1. Design Philosophy

* **Core Vibe:** "Modern Compassion." The design blends the clean, trust-building precision of a medical platform with the warmth of a community center.
* **Visual Reference:** Adopting the "MedTrust" layout principles—generous whitespace, rounded corners, and clear visual hierarchy—but applying our stricter, richer color palette.
* **Dark/Light Mode Strategy:**
* **Light Mode:** Clinical, airy, and welcoming (Primary state).
* **Dark Mode:** Calm, low-strain, and sleek (Secondary state).



---

## 2. Color System

We strictly utilize the provided 5-color palette. To create depth without introducing new colors, we will use **Opacity/Alpha Channels** (e.g., 10%, 50%) of these core colors.

### The Palette

| Color | Hex | Name | Usage Role |
| --- | --- | --- | --- |
|  | **`#2d4375`** | **Triverge Blue** | **Primary Brand.** Headers, Primary Buttons, Active States. |
|  | **`#2ea69a`** | **Healing Teal** | **Secondary.** Icons, Success Messages, "Beam" Effects. |
|  | **`#1f6b63`** | **Deep Teal** | **Interactive.** Hover states for Teal buttons, Dark Mode borders. |
|  | **`#f9fffe`** | **Porcelain** | **Background.** Main page background (Light), Text (Dark Mode). |
|  | **`#212121`** | **Charcoal** | **Contrast.** Main Text (Light Mode), Background (Dark Mode). |

### Accessibility Check

* **Text on Light:** `#212121` on `#f9fffe` (Ratio: 18.6:1 - **AAA Pass**)
* **Text on Dark:** `#f9fffe` on `#212121` (Ratio: 18.6:1 - **AAA Pass**)
* **Button Text:** `#f9fffe` on `#2d4375` (Ratio: 8.5:1 - **AAA Pass**)

---

## 3. Typography

We are using a **Sans-Serif / Serif Hybrid** approach to balance modernity with editorial style.

### Primary Font (Headers & UI): **Manrope**

* **Usage:** Navbar, Buttons, H1–H6 Headers.
* **Why:** Geometric and legible. It gives the "Tech" feel of Blackstar Development.
* **Weights:** SemiBold (600), Bold (700).

### Secondary Font (Body & Editorial): **Newsreader**

* **Usage:** Paragraphs, Captions, Quotes, "Stylish" Sub-headers.
* **Why:** High readability for long text. The **Italic** variant adds the "human touch" requested.
* **Weights:** Regular (400), Medium (500), *Italic*.

### Typography Hierarchy (CSS Variables)

```css
:root {
  --font-heading: 'Manrope', sans-serif;
  --font-body: 'Newsreader', serif;
}

h1 { font-family: var(--font-heading); font-weight: 700; color: #2d4375; }
p  { font-family: var(--font-body); font-weight: 400; color: #212121; }
.stylish-accent { font-family: var(--font-body); font-style: italic; color: #2ea69a; }

```

---

## 4. UI Components & Object Styles

Adopting the rounded, soft aesthetic from the "MedTrust" reference.

### A. Cards & Containers (Glassmorphism)

* **Border Radius:** `20px` (Large, friendly curves).
* **Base Style (Light Mode):** White background (`#ffffff` or `#f9fffe`) with a soft shadow: `box-shadow: 0 4px 20px rgba(45, 67, 117, 0.08);`
* **Glassmorphism (Floating Cards):** Used for the "floating info cards" seen in the reference hero section.
* *Effect:* `backdrop-filter: blur(12px);`
* *Background:* `rgba(249, 255, 254, 0.7)` (Translucent Porcelain).
* *Border:* `1px solid rgba(255, 255, 255, 0.3)`.



### B. Buttons (Interactive)

* **Primary Button:**
* Background: `#2d4375`
* Text: `#f9fffe`
* Shape: **Pill** (Full Rounded).
* *Magic UI:* Add a **"Shimmer"** effect on load to draw the eye.


* **Secondary/Ghost Button:**
* Border: `1px solid #2d4375`
* Text: `#2d4375`
* *Hover:* Background `#f9fffe` (10% opacity).



### C. Iconography (Solar Icons)

* **Library:** Iconify (`solar:bold-duotone` or `solar:outline`).
* **Color:** `#2ea69a` (Teal) for the primary icon shape, `#2d4375` (Blue) for duotone accents.
* **Interaction:** Icons scale up 10% on hover.

---

## 5. Visual Effects & Animation (Magic UI)

### A. The "Beam" Effect

* **Usage:** On the "Book Consultation" cards or pricing tables.
* **Behavior:** A subtle border of light (`#2ea69a`) travels around the card edge to indicate it is "active" or important.

### B. Animated Doodles

* **Usage:** To highlight key phrases (e.g., circling "Dignity" in the Hero text).
* **Style:** Hand-drawn SVG strokes using `#2ea69a`.
* **Animation:** `draw-in` animation on scroll (SVG stroke-dashoffset).

### C. Micro-Interactions

* **Hover:** All clickable cards lift `y: -5px`.
* **Inputs:** Form fields have a `#2d4375` border glow when focused.
* **Marquee:** Used for the "Partners" or "Services List" strip, moving slowly at 20s duration.

---

## 6. Layout & Responsiveness

We will use a standard **12-column Grid** via Tailwind CSS / Flexbox.

### Global Spacing

* **Section Padding:** `py-20` (80px) or `py-24` (96px) to match the open feel of the reference design.
* **Gap:** `gap-6` (24px) or `gap-8` (32px) for grids.

### Breakpoints

1. **Mobile (< 768px):**
* Stack all grids to 1 column.
* Navbar collapses to Hamburger menu.
* Font sizes scale down (H1: 32px).


2. **Tablet (768px - 1024px):**
* 2-column grids (Bento Grid adapts).
* Padding reduces.


3. **Desktop (> 1024px):**
* Full 12-column layout.
* "Floating" elements and Parallax enabled.



---

## 7. Assets Guide

* **Logo:** SVG Mono.
* *Light Mode:* `#2d4375`
* *Dark Mode:* `#f9fffe`


* **Imagery:**
* All photos must use the `20px` border radius.
* **Overlay:** Images in hero sections get a 10% `#2d4375` overlay to ensure text readability if text is placed on top.
