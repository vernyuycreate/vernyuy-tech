# Vernyuy Tech demo store

Frontend portfolio demonstration by Vernyuy Services. Open `index.html` locally; no server needed (an internet connection is needed for GSAP and Google Fonts).

## Status
| Page | State |
|---|---|
| index.html | Done (all sections). Uses shared header, footer and data. |
| shop.html | Done: search, category/brand/price/rating/stock/discount filters, 6 sorts, grid/list, load more, quick view |
| cart.html | Done: quantity +/-, remove, subtotal, demo delivery estimate (5,000 XAF flat), total, empty state |
| wishlist.html | Done: view, remove (heart), add to cart, link to details |
| checkout.html | Done: validated form, demo payment options, demo confirmation (clears cart) |
| product-details.html | Done: gallery with thumbnails and lightbox, colour and storage/config options, quantity, cart, wishlist, compare, WhatsApp inquiry, specs, shipping/warranty, demo reviews, related and recently viewed |
| compare.html | Done: up to 4 products from one category, only that category's specs |
| smartphones, computers, televisions, audio, accessories, deals | Done: hero, brand (or category) chips, sort, in-stock filter, buying guide, help CTA. Driven by `category.js` and `<body data-cat>` |
| about, team, faq, contact | Done. About has count-up stats and parallax; Team has leadership plus grouped staff; FAQ has search, category chips and accordion; Contact has a validated demo form |
| admin/dashboard.html | Done: inside the main site (shared header, footer and an Admin menu link). Overview with sample chart, products CRUD, categories, brands, orders (status), customers, promotions, reviews, website content, settings |

## Files
- `styles.css` shared styles and brand tokens (`:root` at the top). Extracted from the original homepage.
- `products.js` the 40-item demo catalogue and category labels. Edit this to change products.
- `app.js` shared header, footer, cart, wishlist, quick view modal, toasts. Pages only need `<div id="nx-header">` and `<div id="nx-footer">` plus the script tags (see `shop.html`).
- `shop.css`, `shop.js` shop page only.
- `specs.js` demo specs generated from category and price tier (replace with real data per product when needed).
- `details.css`, `details.js` product details page and compare table styles. `compare.js` compare page.
- `category.css`, `category.js` category and deals pages. Edit copy and buying tips in the `CFG` object.
- `info.css`, `info.js` about, team, FAQ and contact pages. FAQ questions live in the `F` object in `info.js`.
- `admin.css`, `admin.js` admin demo. `admin/dashboard.html` uses `<base href="../">` so it shares the root CSS, JS and menu. Data lives in localStorage key `nx_admin`; use Settings > Reset demo data to restore the defaults. Admin edits do not change the storefront.
- `cart.css`, `cart.js` cart, wishlist and checkout pages (page picked by `<body data-page>`). Change the delivery estimate with `DEL` at the top of `cart.js`.

## Images
Put files in `images/`. Empty slots show a grey placeholder with the expected filename.
- Hero and sections: `hero`, `signature`, `offer`, `show-home`, `show-gaming`, `show-desk`, `show-living`
- Categories: `cat-smartphones`, `cat-laptops`, `cat-televisions`, `cat-tablets`, `cat-audio`, `cat-smartwatches`, `cat-gaming`, `cat-accessories`
- Lifestyle: `life-professionals`, `life-creators`, `life-gamers`, `life-students`, `life-entertainment`, `life-everyday`
- Testimonial portraits: `user1`, `user2`, `user3`
- About: `about-story`, `about-team`. Team portraits: `team-1` to `team-11`.
- Products: `p1` to `p40` (`.jpg`)

## Shop URL filters
`shop.html?c=phones|laptops|tvs|tablets|audio|watches|gaming|accessories`, `?brand=Sony`, `?q=text`, `?s=new`, `?life=gamers`, `?focus=1`.

## Notes
- localStorage keys: `nx_cart`, `nx_wish`, `nx_cmp` (compare), `nx_recent` (recently viewed).
- Product images: `p<id>.jpg` plus `p<id>-2.jpg`, `p<id>-3.jpg`, `p<id>-4.jpg` for the gallery.
- Colour and storage choices are saved on the cart line as text only; they don't change the price.
- Compare only allows products from the same category, so unrelated specs are never mixed.
- The homepage now uses the shared `products.js`, `app.js` and header/footer.
- Menus: the mega menu opens on hover or via its ▾ button, and closes with Esc or an outside click. The mobile drawer has a solid white panel, a dimmed backdrop, a close button, and closes on Esc, backdrop tap or link tap.
- The brand links use text names, not logos, to avoid inaccurate logo versions.
- Team profiles, FAQ answers, contact details and hours are sample content. The About page stats describe the demo catalogue only.
- Countdown, testimonials, newsletter, checkout and contact form are demonstrations only. Nothing is stored or sent.
- The Admin link is in the main menu and mobile drawer. It has no login: it is a demonstration.
- Reduced-motion: animations are skipped and content stays visible.

## Next
All 17 pages from the brief exist. Possible polish: replace demo copy and specs, add real images, split `app.js` styling if you want, and wire the admin edits into the storefront.
"# vernyuy-tech" 
