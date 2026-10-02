# UJET AXO: Demo Site

A static recreation of [ujet.cx/axo](https://ujet.cx/axo) (Agentic Experience Orchestration), built to be hosted on GitHub Pages. No build step and no dependencies: plain HTML, CSS and JS.

## Structure

```
index.html      page markup (nav, hero, features, benefits, scroll-spy, testimonial, resource, CTA, footer, demo modal)
styles.css      brand tokens + layout
script.js       mega menu, mobile nav, scroll-spy, reveal animations, demo modal, signup
assets/img/     all images stored locally (nothing hotlinked)
.nojekyll       stops GitHub Pages from running Jekyll
```

## Branding (from ujet.cx/brand)

| Token | Hex | Use |
|---|---|---|
| UJET Blue | `#109FFF` | Primary brand / accents (Pantone 2191 C) |
| UJET Navy | `#000843` | Text, dark sections |
| Deep Navy | `#151552` | Footer |
| Cyan | `#02C9E5` | CTA gradient |
| Orange | `#FF4E33` | Buttons / CTAs |
| Lilac | `#F3F4FE` | Light section backgrounds |

Typeface: the brand font is **Galano Grotesque**, which is commercial and not bundled here. The site falls back to **Outfit** (Google Fonts), the same font ujet.cx uses on its AI pages. If you have a Galano license, add `@font-face` rules and it will be picked up first.

## Run locally

```bash
npx serve .
```

## Deploy to GitHub Pages

1. Create a repo and push the contents of this folder to its root.
2. In the repo, go to **Settings → Pages**, set **Source** to *Deploy from a branch*, and pick `main` / `(root)`.
3. The site will be live at `https://<user>.github.io/<repo>/`. All paths are relative, so it also works under a sub-path.

## Notes

- "Request a Demo" opens an in-page modal and the footer has a newsletter signup. Both are **demo-only**: nothing gets submitted.
- Nav and footer links go to the matching live ujet.cx pages. "Download" opens the real AXO white paper landing page.
