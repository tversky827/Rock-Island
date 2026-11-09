# Facility photography

Place optimized photographs here (JPG or WebP; heroes ≥ 2400 px wide, others ≥ 1600 px).

Then open `src/content/images.ts`, find the matching key (e.g. `heroHome`, `nursing`,
`lifeDining`), and set:

```ts
src: "/images/your-photo.jpg",
alt: "Accurate description of what the photo shows",
depictsFacility: true,   // if it shows the real building, staff, or residents
focal: "50% 35%",        // optional crop focal point
```

Until `src` is set, the site shows a labeled, on-brand placeholder. Confirm signed
photo/media releases for every identifiable resident or staff member before publishing.
If you use licensed stock photography temporarily, also set `stock: true` so a
"Representative image" label is displayed.
