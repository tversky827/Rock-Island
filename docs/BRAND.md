# Brand identity: Rock Island Nursing Home (proposed)

Live guidelines: **`/brand`** (excluded from search). Asset files: `public/brand/`.

## Positioning
> Exceptional care starts with genuine compassion. At Rock Island Nursing Home, we believe every resident deserves to feel valued, respected, supported, and at home.

Personality: compassionate, loving, trustworthy, professional, established, welcoming, family-oriented, clinically capable, community-focused. The site should have the polish of premium hospitality and the credibility of an established healthcare organization.

## Logo: "The Threshold"
A classical arch (home, shelter, stability) holding a second inner arch (an embrace: care within care). A champagne keystone marks the heart of the structure, and a gentle river line grounds it, referencing the Mississippi and the island community the facility is named for. It is architectural and abstract, with no medical clichés.

| Asset | File |
|---|---|
| Primary (stacked) | `logo-primary.svg`, `logo-primary-light.svg` |
| Secondary (horizontal) | `logo-secondary-horizontal.svg` |
| Text-only wordmark | `logo-wordmark.svg` |
| Mark | `logo-mark.svg`, `logo-mark-light.svg` |
| Favicon / app icons | `favicon.svg`, `src/app/icon.svg`, `src/app/apple-icon.tsx` |

The SVG files reference brand fonts; before print, convert text to outlines.

## Color
| Role | Name | Hex |
|---|---|---|
| Primary | Deep Navy | `#0F2138` |
| Deep | Midnight | `#0A1628` |
| Accent | Champagne Gold | `#D2B87F` |
| Accent text on light (AA) | Antique Gold | `#7D6436` |
| Neutral | Warm Beige | `#E5D8C2` |
| Surface | Cream | `#F5EFE4` |
| Background | Soft Ivory | `#FBF8F2` |
| Card | White | `#FFFFFF` |
| Body text | Warm Gray | `#5F574E` |

Tokens are in `src/app/globals.css` (`@theme`).

## Typography
- **Cormorant Garamond** (500/600/italic) for headlines, pull quotes, and numerals
- **Manrope** (variable) for body, navigation, labels, and buttons
- Both are self-hosted via Fontsource (SIL Open Font License).

## Components
- Buttons are square-shouldered with tracked uppercase labels: Primary (navy), Gold (on dark), Outline, Outline-light, and an arrow text link.
- Cards use hairline grids, not heavily rounded cards; a gold top-rule animates in on hover.
- Ornaments: hairline gold rules, arched image crops (echoing the mark), and offset gold frames.
- Icons: Lucide line icons, 1.4 px stroke, champagne or navy, always paired with text.

## Photography direction
Warm, natural light; genuine interaction rather than posed smiles; dignified portrayals of older adults; uncluttered environments; a consistent warm color grade. Avoid clinical blue casts, staged stock clichés, and anything that could be mistaken for the actual facility unless it *is* the facility.

## Voice
Warm, plain-spoken, reassuring with families; clear and precise with clinicians. Describe what we do and how, and never promise outcomes, rankings, or availability.
