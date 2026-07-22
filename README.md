# Mouneh — Trading Post for Traditional Provisions

A multi-page marketplace website for buying and selling artisanal, small-batch **mouneh** (traditional Levantine pantry goods — olive oil, makdous, pomegranate molasses, kishk, za'atar, pickles, and more), built directly from producers to buyers.

Live demo: open `index.html` in any browser. No build step, no server required — pure HTML/CSS/JavaScript.

---

## 1. Project structure

```
mouneh/
├── index.html          Homepage — hero, ticker, categories, featured products, how-it-works, testimonials
├── shop.html            Full product catalogue with filters + sorting
├── product.html         Single product detail page (reads ?id= from the URL)
├── sell.html             Seller onboarding page + application form
├── cart.html              Shopping cart page
├── css/
│   └── style.css        All styling — design tokens, layout, components
├── js/
│   ├── data.js            Product catalogue (array of objects) + small helpers
│   └── main.js           Cart engine (localStorage), toasts, tabs, scroll reveal, nav, PWA install/service worker registration
├── manifest.json        Web app manifest — name, icons, colors (makes the site installable)
├── sw.js                    Service worker — caches pages/assets so the site works offline once opened
├── icon-192.png            App icon (Android/Chrome)
├── icon-512.png            App icon (Android/Chrome, larger)
├── apple-touch-icon.png   App icon (iOS "Add to Home Screen")
└── README.md
```

There is no backend, database, or build tool. Every page is a static `.html` file that pulls in `css/style.css` and the two JS files.

---

## 2. How to run it locally

**Easiest:** double-click `index.html` — it opens in your default browser and works as-is.

**Recommended (avoids some browser file:// quirks):** serve the folder with any local server, for example:

```bash
# Python 3
cd mouneh
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

or, with Node installed:

```bash
npx serve mouneh
```

---

## 3. How the site is wired together

### Shared files loaded on every page
Every HTML page ends with:
```html
<script src="js/data.js"></script>
<script src="js/main.js"></script>
```
`data.js` must load **before** `main.js` because `main.js` calls functions like `findProduct()` that are defined in `data.js`.

### Product data — `js/data.js`
All products live in one JavaScript array called `PRODUCTS`. Each product is an object:

```js
{
  id: "p01",                          // unique ID, used in URLs like product.html?id=p01
  name: "Cold-Pressed Olive Oil",
  vendor: "Bayt Zeitouna, Nabatieh",
  kind: "Oils",                       // must match a category name used in filters
  region: "NABATIEH",                 // shown on the round "stamp" badge
  year: "'25",                        // shown on the stamp badge
  price: 24,                          // number, in USD
  unit: "750ml tin",
  jarType: "olive-fill",              // which CSS jar colour renders (see below)
  desc: "...",
  stock: 42,
  weight: "750 ml",
  harvest: "Nov 2025",
  method: "Stone-milled, cold press"
}
```

`jarType` controls the CSS-drawn jar swatch (no image files are used) — options: `olive-fill`, `pomegranate`, `cream`, or leave blank for the default gold jar.

**To add a new product:** copy an existing object in the `PRODUCTS` array, give it a new unique `id`, and fill in the fields. It will automatically show up in `shop.html` and can be linked to from anywhere via `product.html?id=your-new-id`.

**To add a new category:** add an entry to the `CATEGORIES` array (used on the homepage category grid) and make sure some products use that same `kind` value.

### Cart engine — `js/main.js`
The cart is stored in the browser's `localStorage` under the key `mouneh_cart_v1`, as a simple object: `{ "p01": 2, "p05": 1 }` (product id → quantity).

Key functions:
- `getCart()` / `saveCart(cart)` — read/write the cart object
- `addToCart(id, qty)` — used by the "Add to Crate" button on `product.html`
- `setQty(id, qty)`, `removeFromCart(id)` — used on `cart.html`
- `cartCount()` / `cartTotal()` — used to update the header badge and cart totals
- `updateCartCount()` — refreshes the little number next to "Crate" in the nav on every page load

Because it's just `localStorage`, the cart persists across page reloads and browser tabs on the same browser/device, but is **not** shared between devices and has no real checkout/payment — the "Complete Trade" button on `cart.html` just shows a message (this is a front-end demo, not a payment system).

### Toasts, tabs, filters
- `showToast(message)` in `main.js` pops the small dark notification bottom-right (used after add-to-cart, form submits, etc.)
- The "For Buyers / For Sellers" toggle on the homepage uses `initTabs()`, driven by `data-tabs` / `data-tab` / `data-panel` attributes
- `shop.html` has its own inline `<script>` block that filters/sorts the `PRODUCTS` array live based on checkbox and dropdown state — no page reload needed

---

## 4. How to customize things

| I want to... | Edit this |
|---|---|
| Change colors, fonts, spacing | `css/style.css` — all values are CSS variables at the top of the file under `:root` |
| Add/edit/remove a product | `js/data.js` — the `PRODUCTS` array |
| Add/edit a category | `js/data.js` — the `CATEGORIES` array |
| Change homepage hero text, stats, testimonials | `index.html` directly |
| Change the seller application form fields | `sell.html` |
| Change trading fee shown in cart | `cart.html` — the `fee` variable inside the `<script>` block |
| Change site name/logo text | Search for `Mouneh` in the `<nav>` of each HTML file |

---

## 5. Design system reference

- **Colors:** deep olive `#3E4A30`, parchment `#ECE3CE`, pomegranate `#7C2D3B`, gold `#C89B3C`, ink `#221D17` — all defined as CSS variables in `style.css`
- **Fonts:** Fraunces (headings), Work Sans (body), IBM Plex Mono (prices, labels, stamps) — loaded from Google Fonts in the `<head>` of every page
- **Signature element:** the circular dashed "provenance stamp" (region + year) that appears on every product card, product page, and empty-cart state

---

## 6. Using it as a mobile app (PWA)

This site is a **Progressive Web App**, so it can be installed on a phone like a real app instead of just opening as a browser tab:

- **Android (Chrome/Edge):** visiting the site shows an "Install App" button in the nav (or the browser's own install banner). Tapping it adds a Mouneh icon to the home screen that opens full-screen, no browser UI.
- **iPhone (Safari):** Safari doesn't show an install prompt automatically — open the site, tap the **Share** icon, then **Add to Home Screen**.
- Once installed/opened once, `sw.js` (the service worker) caches all pages and assets, so the app still opens and browses even with no internet connection (the cart still works too, since it's all `localStorage`).

**Important:** the service worker and install prompt only work over **HTTPS** (or `localhost` while testing). They will not activate if you open the site directly from a `file://` path or over plain HTTP — host it on GitHub Pages, Netlify, or Vercel (all HTTPS by default) for this to work.

If you change any file inside `ASSETS` in `sw.js` (or add a new page), bump `CACHE_NAME` in `sw.js` (e.g. `mouneh-cache-v2`) so returning visitors actually get the update instead of a stale cached copy.

---

## 7. Known limitations (this is a front-end demo)

- No real backend, database, authentication, or payment processing
- Cart data lives only in the visiting browser's `localStorage`
- The seller application form and newsletter form just show a toast — they don't send anywhere yet
- Product images are CSS-drawn jar shapes, not real photos

To make this production-ready you'd want to add a backend (e.g. Node/Express + a database) for real accounts, listings, and checkout — happy to help with that next.

---

## 8. Deploying

Since it's fully static, it can be hosted for free on:
- **GitHub Pages** — push this repo, then enable Pages in the repo Settings → Pages → Deploy from branch `main`
- **Netlify / Vercel** — drag-and-drop the folder or connect the GitHub repo

All three give you HTTPS automatically, which is required for the installable app (PWA) features to work — see section 6.
