# Design concepts

Throwaway HTML/CSS explorations for the ronb.co redesign. Nothing here ships.

```sh
cd design-concepts && bunx serve .   # or: python3 -m http.server
```

The chosen layout is `final.html`; `?theme=violet|midnight` forces light/dark (otherwise it follows the system setting or the header toggle) (all colors are role tokens at the top of its `<style>`).

Open `index.html` — switch concepts with `1`–`2` / `←` `→`, toggle viewport width, leave a verdict + notes per concept, then "Copy all notes as markdown".

- `assets/content.js` — shared copy (lifted from `frontend/src/data/text.ts`, DRAFT lines are new positioning copy)
- `assets/icons.js` — tech icons as inline SVG (simple-icons + custom Convex), with labels and brand hex
- `assets/base.css` — shared a11y baseline (skip link, sr-only, reduced motion)
