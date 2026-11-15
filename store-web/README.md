# Store Web

React + Vite + Tailwind storefront for Jibola Collection. See the root `README.md` for the
full setup, product schema and deployment guide.

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Key files

- `src/data/store.json` — store name, WhatsApp link, email and contact details
- `src/data/products.json` — local product catalog
- `public/images/<category>/` — product images
- `src/lib/catalog.js` — category labels, stock helpers and bundle pricing
- `src/components/CartDrawer.jsx` — cart and WhatsApp checkout form
- `src/lib/store.js` — money formatting and WhatsApp message helpers

## Notes

- No backend, database, login, admin, payment or tracking.
- Cart data is stored in `localStorage`.
- Checkout opens WhatsApp with the items, quantities, total and customer details.
- Store contact details are read from `src/data/store.json`; do not hardcode them in components.
- `vercel.json` contains the SPA rewrite for React Router.
