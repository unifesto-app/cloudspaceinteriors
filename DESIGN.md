---
name: Cloud Space Interiors
description: The finishes board you're handed at the first meeting — real rooms and real material chips pinned to green baize, every promise engraved on brass.
colors:
  baize: "#1e3d2f"
  baize-deep: "#132a20"
  baize-lit: "#2b5341"
  moss: "#a9c2b0"
  ivory: "#f3ead7"
  ivory-dim: "#e2d6bc"
  ink: "#17201b"
  ink-soft: "#4a5a50"
  brass: "#b8913f"
  brass-hi: "#e3c576"
  brass-lo: "#7c5e25"
  plate-ink: "#1b2a20"
  error-rust: "#9b2c1f"
typography:
  display:
    fontFamily: "Gloock, Georgia, serif"
    fontSize: "clamp(2.6rem, 5.4vw, 4.6rem)"
    fontWeight: 400
    lineHeight: 1.02
  display-hero-tag:
    fontFamily: "Gloock, Georgia, serif"
    fontSize: "clamp(1.9rem, 2.9vw, 2.6rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Gloock, Georgia, serif"
    fontSize: "clamp(2.2rem, 4vw, 3.4rem)"
    fontWeight: 400
    lineHeight: 1.05
  title:
    fontFamily: "Gloock, Georgia, serif"
    fontSize: "1.875rem"
    fontWeight: 400
    lineHeight: 1.2
  body:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  body-sm:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.43
    letterSpacing: "0.025em"
  hand:
    fontFamily: "Kalam, cursive"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.55
rounded:
  chip: "2px"
  tag: "3px"
  pin: "9999px"
spacing:
  gap-tight: "8px"
  gap: "12px"
  gap-card: "32px"
  gutter: "40px"
  section: "80px"
  container: "1280px"
  page-x-mobile: "16px"
  page-x: "24px"
components:
  button-plate:
    backgroundColor: "{colors.brass}"
    textColor: "{colors.plate-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.tag}"
    padding: "14px 24px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ivory}"
    typography: "{typography.label}"
    rounded: "{rounded.tag}"
    padding: "14px 24px"
  button-ghost-hover:
    textColor: "{colors.brass-hi}"
  tag:
    backgroundColor: "{colors.ivory}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tag}"
    padding: "28px"
  print:
    backgroundColor: "{colors.ivory}"
    padding: "7px"
  field:
    backgroundColor: "#ffffffd9"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.tag}"
    padding: "12px 14px"
  swatch-chip:
    rounded: "{rounded.chip}"
    width: "64px"
    height: "48px"
  pin:
    backgroundColor: "{colors.brass-hi}"
    rounded: "{rounded.pin}"
    size: "14px"
  header:
    backgroundColor: "{colors.baize-deep}"
    textColor: "{colors.ivory}"
---

# Design System: Cloud Space Interiors

## Overview

**Creative North Star: "The Sample Board"**

The site is the finishes board a designer lays on the table at the first meeting. Clean deep green baize is the ground of every page and holds well over half of each viewport. On it sit three kinds of object, and only three: ivory card-stock tags that carry words, framed photographic prints of the studio's own finished rooms, and real material chips (marble, grey marble, walnut, walnut slats, linen, brass) cropped from those same photographs. Brass is the hardware: the pins that hold things down, the engraved plates that carry promises, and every action a visitor can take.

Composition is pinned, not gridded-flat. Objects sit slightly off-axis (half a degree to a degree and a half), overlap their neighbours (a spec tag tucks under its print), and step down the board at staggered heights rather than lining up in equal rows. The board is warm and tactile, never cold or stark; the deep green and gold of the existing brand are its two load-bearing colours (binding brand commitment).

Motion follows the physics of the board. On arrival the hero print drops and settles, its pins press in, and its handwritten caption tag swings onto its pin. Choosing a product lifts it off the board with a brass glow while a thumbnail flies into the header's quote plate. Nothing else animates for its own sake.

**Key Characteristics:**
- Flat, sharp green baize ground — no noise texture or light pool (removed at the studio's request: it read as blurry).
- Ivory tags for all reading text; ink on ivory, never body copy straight on baize beyond short moss-coloured supporting lines.
- Brass reserved for pins, promise plates, actions and the chosen state.
- Real material chips act as category controls and category markers.
- Small physical tilts, overlaps, staggered heights; one 12-column board.

## Colors

One green ramp does the tonal work; ivory carries text; brass marks what is held, promised or chosen.

### Primary
- **Baize** (`baize`): the felt board itself, the flat page background on every public surface.
- **Deep Baize** (`baize-deep`): the About band (60%), the "two doors" band (50%), the footer, and the scrollbar track. Use it to sink a band, not to start a new colour.
- **Lit Baize** (`baize-lit`): only the light pool at the top-left of the board.

### Secondary
- **Brass** (`brass`): the mid-tone of every engraved plate gradient, link underlines, field focus ring (30%), checked-toggle fill (15%), the scrollbar thumb.
- **Polished Brass** (`brass-hi`): highlights — focus outline, text selection, active nav and link hover, the quote-count badge numerals, the chosen-state ring and glow.
- **Aged Brass** (`brass-lo`): brass that has to be read on ivory — "On your quote", door links, process step numerals, focused field border.

### Neutral
- **Ivory Card-Stock** (`ivory`): tags, print borders, the base text colour on baize.
- **Dim Ivory** (`ivory-dim`): the placeholder fill behind product images.
- **Ink** (`ink`): text on ivory; borders on ivory at 10–15%.
- **Soft Ink** (`ink-soft`): secondary text on ivory (descriptions, spec-sheet terms, form labels).
- **Moss** (`moss`): secondary text directly on baize (lede paragraphs, chip labels).
- **Plate Ink** (`plate-ink`): the engraved lettering on brass plates.
- **Rust** (`error-rust`): form error messages on ivory only.

### Named Rules
**The Hardware Rule.** Brass appears only as hardware: pins, plates that carry a promise or an action, and the ring of a chosen piece. It is never a decorative border, heading colour, or background band.

**The Two-Text-Colours Rule.** Body text reads Ink on Ivory. Directly on baize, text is Ivory for headings and Moss for supporting lines; secondary text on ivory is Soft Ink, never Moss.

## Typography

**Display Font:** Gloock (with Georgia, serif)
**Body Font:** Schibsted Grotesk (with system-ui, sans-serif)
**Hand Font:** Kalam (with cursive), by the Indian Type Foundry

**Character:** Gloock is a high-contrast engraved serif that reads like the lettering on a brass plate or a printed sample card; Schibsted Grotesk is a sturdy, plain grotesk for specs and forms. Kalam is the designer's pen on a tag.

### Hierarchy
- **Display** (400, clamp(2.6rem, 5.4vw, 4.6rem), 1.02): inner-page H1s set directly on baize.
- **Hero Tag Display** (400, clamp(1.9rem, 2.9vw, 2.6rem), 1.05, −0.01em): the home H1, sized to sit on an ivory tag in a 5/12 column.
- **Headline** (400, clamp(2.2rem, 4vw, 3.4rem), 1.05): section H2s on baize, max ~36rem wide.
- **Title** (400, 1.5–1.875rem, tight): tag headings, product and project names, testimonial quotes (1.25rem, snug), promise-plate titles (1.125–1.25rem, line-height 1).
- **Body** (400, 1rem, 1.625): ledes on baize in Moss at 1–1.125rem, max ~28–36rem.
- **Body Small** (400, 0.875rem, 1.625): descriptions and spec sheets on tags.
- **Label** (600, 0.875rem, slight tracking): button and plate text; form labels at 0.75rem 600 in Soft Ink. Sentence case throughout.
- **Hand** (400, 1.125rem): the hero print's caption tag only.

### Named Rules
**The Tabular Figures Rule.** Every number a visitor might compare or copy — handover days, phone numbers, quantities, request numbers, step numerals — is set with tabular figures.

**The One Pen Rule.** The hand face writes one caption on the board's focal print. It is never used for headings, buttons or body copy.

## Layout

A single 12-column board in a 1280px container (16px side padding on mobile, 24px from `sm`). Sections breathe at 80px vertical rhythm; the hero is tighter (32–40px top). Columns are split asymmetrically — 7/5 for the hero and lead project, 4/5/3 for the doors, 4/8 for the sample tray, 5/4/3 for testimonials — and siblings step down the board with 48–96px top offsets instead of sharing a baseline. Gutters run 40–48px between board objects; inside tags, stacks use 8–12px gaps.

Below `lg` everything collapses to one column in reading order; tilts and stagger offsets are `lg`/`md`-only so the mobile board is a clean pinned stack. The product catalogue uses CSS columns (2 at `sm`, 3 at `lg`) grouped by category, each group headed by its material chip. The navigation collapses to a toggle below `md`.

**The Board Rule.** Never set three equal cards on one baseline. Vary column span or vertical offset so the board reads as hand-pinned.

## Elevation & Depth

Depth is physical: every object lies on the felt and casts a soft, downward shadow proportional to how thick it is. There are no flat cards and no hard offset shadows.

### Shadow Vocabulary
- **Tag** (`0 14px 28px -12px rgb(0 0 0 / .55), 0 2px 4px rgb(0 0 0 / .25)`): card-stock lifted a few millimetres.
- **Print** (`0 22px 40px -18px rgb(0 0 0 / .7), 0 3px 6px rgb(0 0 0 / .3)`): a heavier mounted photograph.
- **Plate** (`0 8px 18px -8px rgb(0 0 0 / .65)`): a thin metal plate, close to the felt.
- **Chip** (`0 8px 14px -6px rgb(0 0 0 / .6)`): material samples in the tray.
- **Pin** (`2px 4px 5px rgb(0 0 0 / .5)`): a blurred cast shadow from a domed pin head.
- **Chosen** (`0 0 0 2px brass-hi, 0 24px 44px -14px rgb(227 197 118 / .45)`): a chosen piece raised 6px with a warm brass glow.

### Named Rules
**The Felt Rule.** Shadows always fall downward and blur into the felt; elevation changes only by lifting (hover −4px, chosen −6px), never by adding borders.

## Shapes

Paper-and-metal corners: tags, prints, plates, buttons and fields are almost square (3px); material chips are 2px; pins are the only circles (14px domed brass, radial-gradient highlight). Prints have a 7px ivory border like a mounted photo. Tags overlap the edge of their print (−24px) and carry a pin centred or near a corner at −6px. Tilts are the board's signature silhouette: −1.2° to +1.5°, straightening to 0° on hover.

## Components

### Buttons
Engraved and tactile.
- **Shape:** near-square (3px).
- **Brass Plate (primary):** a 160° four-stop brass gradient (light, mid, deep, light) with Plate Ink lettering and a faint white text highlight, 14px × 24px padding, Label type. It is every primary action: get a quote, add to quote, start my quote, send on WhatsApp.
- **Hover / Active / Disabled:** brightens 10%; presses down 1px; disabled at 60% opacity with no hover.
- **Ghost:** transparent with a 1px Ivory border at 40%; border and text turn Polished Brass on hover. Used for secondary navigation on baize ("See all work").
- **Focus:** 2px Polished Brass outline, 3px offset, everywhere.

### Chips
Real material swatches cropped from the studio's own project photos (marble, grey marble, walnut, walnut slats) plus a woven-linen and a brass gradient. Each product category maps to one finish. In the hero tray and catalogue nav they are links (4:3, 2px, chip shadow, 1px black ring at 20%, lift 4px on hover, Moss caption turning Polished Brass); as markers they clip to a product image corner with a 2px ivory ring, or head a catalogue group.

### Cards / Containers
- **Tag:** Ivory, 3px, Tag shadow, 20–28px padding, one brass pin, slight tilt. Carries all reading text: headlines in the hero, door lists, testimonials, forms, closing calls to action.
- **Print + spec tag (project pin):** a 7px-bordered photo with a pin, and an overlapping tag beneath holding a two-column spec sheet (Where, Style, Scope, Handover).
- **Product card:** a tag with image, corner material chip, Gloock name, Soft Ink description, Baize price label, and a footer row divided by a 10% ink rule holding the Brass Plate or the quantity stepper.
- **Promise plate:** a brass plate (no button behaviour) with a Gloock title and one line; set two-up under the hero print.

### Inputs / Fields
- **Style:** translucent white (85%) on ivory, 1px Ink border at 15%, 3px, 12×14px padding, Body Small.
- **Focus:** border turns Aged Brass with a 2px Brass ring at 30%.
- **Toggle (Home / Business):** bordered segments; checked state is Aged Brass border, 15% brass fill, semibold.
- **Error:** Rust text below the form, announced as an alert.

### Navigation
Sticky Ivory header with a 2px Brass bottom rule, like the old site's white header: the logo sits directly on it (h-16, no tag, no tilt) so it blends in. Links are Ink at 75%, the active link Ink semibold with a 2px Brass underline; the Get a quote plate sits at the right. The mobile menu drops down as an Ivory panel.

### Chosen Piece (signature)
When a product is added, its card rises 6px and gains the Chosen ring and glow; its image flies as a 72px thumbnail along an arc into the header plate (640ms), and the count badge flashes brighter (520ms). Under reduced motion the rise and flight are removed and only the brightness flash remains. All settling motion uses the Settle easing.

### Admin
`/admin` is a separate operate surface that reuses the Ivory, Ink and Brass tokens, the Brass Plate button and the field style. It is not part of the board world and is not specified here.

## Do's and Don'ts

### Do:
- **Do** keep baize as the ground of every public page and put reading text on ivory tags.
- **Do** use real material crops from the studio's own photographs for chips, and record their source in `public/swatches/PROVENANCE.md`.
- **Do** make every primary action a Brass Plate and every promise an engraved plate.
- **Do** tilt and stagger board objects at `md`/`lg`, and straighten them on hover.
- **Do** honour reduced motion by removing spatial movement while keeping state feedback.

### Don't:
- **Don't** fill brass flat or use it as a decorative heading colour, border or band; brass is a gradient plate, a pin, or a chosen ring.
- **Don't** introduce white or grey page surfaces; the only white is the translucent field well inside a tag.
- **Don't** use stock or generated imagery for rooms or materials.
- **Don't** set body copy directly on baize beyond short Moss ledes and captions.
- **Don't** use the hand face anywhere but a single caption tag.
