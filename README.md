# Ummah Builders — informative one-pager

Plain HTML, CSS and JavaScript. No build step, no WordPress.

| File | What |
|---|---|
| `index.html` | Page structure; texts are filled in through `data-i18n` keys |
| `translations.js` | **All texts** in Dutch, English, French and Arabic |
| `styles.css` | Design (colours at the top under `:root`) |
| `main.js` | Language switch (remembered, also via `?lang=en`), RTL for Arabic, mobile menu |
| `assets/img/` | Photos (no people or animals) |
| `assets/logo.png`, `assets/logo-mark.png` | Full logo (footer) and tree only (header), transparent background |
| `assets/favicon*`, `assets/apple-touch-icon.png` | Favicons for browser tabs and phone home screens |

## Viewing locally

```bash
python -m http.server 8100
```

Then open http://localhost:8100.

## Changing texts

Edit `translations.js`. Each language has the same keys; `<em>…</em>` makes words gold and
italic. The Dutch and French translation of the hadith at the top, and all French and Arabic
texts, should be checked by a native speaker.

## Putting it online (free, Cloudflare Pages)

```bash
npx wrangler pages deploy . --project-name ummahbuilders
```

The first time, `wrangler` opens your browser to log in to Cloudflare (free account). The site
then goes live at `https://ummahbuilders.pages.dev`. Without the command line: drag this
folder onto https://app.netlify.com/drop.

## Photos

From [Unsplash](https://unsplash.com), free to use under the
[Unsplash License](https://unsplash.com/license):

| File | Unsplash photo |
|---|---|
| `arches.jpg` | https://unsplash.com/photos/s0Z52AY2tH8 |
| `sprout.jpg` | https://unsplash.com/photos/ELlinjlfwL8 |
| `dunes.jpg` | https://unsplash.com/photos/BhtjXDK_4V8 |
| `light.jpg` | https://unsplash.com/photos/3SZNNWh84zc |
| `library.jpg` | https://unsplash.com/photos/K703gErNisw |
| `workspace.jpg` | https://unsplash.com/photos/lilNr5W_FFU |
