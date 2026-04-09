# VPN Subscription Page - Hermit Style Design

## Reference
The target design is inspired by the Hermit VPN service UI:
- Deep dark navy/indigo background (not pure black)
- Soft purple-blue radial glow at the bottom of the page (background only)
- Semi-transparent dark cards with very subtle borders
- Clean white typography, no ALL CAPS anywhere
- Pill-shaped buttons with soft borders
- Minimal, calm aesthetic — no neon, no cyan, no harsh gradients

---

## Strictly Forbidden
- NO cyan or teal accent colors anywhere (buttons, borders, icons, glows)
- NO bright blue glow or neon border effects on any card or container
- NO box-shadow with colored glow (e.g. `box-shadow: 0 0 10px cyan`)
- NO ALL CAPS text in buttons, tabs, or labels
- NO animal or mascot icons inside tabs
- NO gradient borders or animated effects
- NO colored icon backgrounds (warning icon must not be red/orange)

---

## Background
- Deep dark navy: `#08081a`
- Subtle radial glow at the very bottom center of the page: `radial-gradient(ellipse at center bottom, rgba(70, 30, 180, 0.35) 0%, transparent 70%)`
- This glow is only on the page background — NOT on any card or element

---

## Header
- Transparent or very dark background (`#08081a`)
- Logo icon: small rounded square, dark purple (`#2a1f6e`), simple line icon inside
- Logo text: service name in white (`#ffffff`, 14px, weight 500), subtitle in muted purple-gray (`#7070a0`, 11px)
- Right side: single circular icon button for Telegram — dark background (`#1a1a3a`), thin border (`#2a2a50`), muted icon

---

## Subscription Status Card
- Background: `#0f0f28`
- Border: `0.5px solid #1e1e42` — no glow, no colored shadow
- Border radius: 12px
- Left side: status badge (pill shape) — dark green background (`#0d2a1a`), green border (`#1a4a2a`), green text (`#4dbb7a`), checkmark circle
- Right side: traffic label in muted color (`#5a5a80`), traffic value in white
- Bottom left: expiry date in muted purple-gray (`#4a4a70`)

---

## Installation Card
- Background: `#0f0f28`
- Border: `0.5px solid #1e1e42` — NO cyan border, NO glow effect
- Border radius: 12px
- Header row: "Установка" title (white, 16px, weight 500) on left; OS selector on right

---

## OS Selector (Windows dropdown)
- Background: `#16162e`
- Border: `0.5px solid #2a2a50`
- Border radius: 8px
- Text: muted gray (`#9090c0`), 12px
- Small OS icon + label + chevron down arrow
- NO cyan, NO bright blue background

---

## App Tabs (Koala Clash / FClashX / Clash Verge or Happ / Throne)
- Simple pill-shaped tabs, NO icons, NO mascots, NO emoji
- Active tab: white background (`#ffffff`), black text (`#000000`), font weight 500
- Inactive tabs: dark background (`#16162e`), border `0.5px solid #2a2a50`, gray text (`#7070a0`)
- Border radius: 20px
- Gap between tabs: 8px

---

## Installation Steps (Timeline)
- Each step: icon on the left, title + description + optional button on the right
- Thin vertical connector line (`#1e1e42`, 1px) runs between step icons
- Steps separated by `border-bottom: 0.5px solid #141430`
- Last step has no bottom border

### Step Icons
- All icons identical style: background `#16162e`, border `0.5px solid #2a2a50`, border radius 8px, size 36×36px
- Icon stroke color: `#8888cc` (muted purple-white)
- Completed step icon: background `#0d2a1a`, border `#1a4a2a`, checkmark in `#4dbb7a`
- NO red, orange, or any accent-colored icons (warning step uses same neutral gray style)

### Step Text
- Title: white (`#ffffff`), 13px, weight 500
- Description: muted (`#5a5a80`), 12px, line-height 1.5

### Step Buttons
- Pill shape, border-radius: 20px
- Background: `#16162e`, border: `0.5px solid #2a2a50`, text color: `#c0c0e0`
- Primary action button (e.g. download): background `#1e1260`, border `#3a2a80`
- Text in sentence case — e.g. "Windows", "Добавить подписку" — never ALL CAPS
- Small inline icon where applicable (12×12px)

---

## Language Picker
- Small icon centered at the bottom, muted opacity (0.4)
- No label, just icon

---

## Typography Rules
- Font: system sans-serif stack
- Sentence case everywhere — no ALL CAPS, no Title Case on buttons or labels
- Primary text: `#ffffff`, weight 500
- Secondary text: `#5a5a80` or `#7070a0`
- Never use font-size below 11px

---

## Spacing & Layout
- Page max-width: ~680px, centered
- Card padding: 20px 24px
- Gap between cards: 16px
- Step internal padding: 14px 0
- Icon-to-text gap: 14px

---

## What Must Change vs Current Implementation
1. Remove cyan/teal glow from installation card border
2. Remove ALL CAPS from all buttons (use sentence case)
3. Remove mascot/animal icons from app tabs — use plain text pills only
4. Change cyan OS selector button to neutral dark style
5. Make all step icons the same neutral style — remove red/orange warning icon
6. Add thin vertical connector line between timeline step icons
7. Background should be deep navy (`#08081a`), not pure black
8. Subtle purple radial glow on page background only (not on cards)