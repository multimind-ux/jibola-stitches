# Jibola Collection

A simple, mobile-first storefront for **Jibola Collection**, built with React, Vite,
Tailwind CSS, React Router and lucide-react.

This is a front-end-only site. There is no backend, database, login, admin area, online
payment or order tracking. The cart lives in the browser and checkout opens WhatsApp with a
pre-filled order message.

## Run locally

```bash
cd store-web
npm install
npm run dev
```

Open `http://localhost:5173`.

## Build

```bash
cd store-web
npm run build
```

The production build is written to `store-web/dist`.

## Pages

- Home
- Shop — category, price and size filters, search and sorting
- Product — gallery, size and colour selectors, add to cart and order on WhatsApp
- Cart drawer — quantities, removal and WhatsApp checkout form
- About
- Contact

A floating WhatsApp button appears on every page.

## Store details

The store name, WhatsApp number, email, location and Instagram handle all come from
`store-web/src/data/store.json`. Edit that file instead of changing components.

```json
{
  "name": "Store name",
  "tagline": "Short store tagline",
  "currency": "NGN",
  "currency_symbol": "₦",
  "whatsapp_number_local": "08000000000",
  "whatsapp_number_international": "2348000000000",
  "whatsapp_link": "https://wa.me/2348000000000",
  "email": "hello@example.com",
  "location": "Nigeria",
  "instagram": null
}
```

- All WhatsApp buttons and order messages use `whatsapp_link`.
- `whatsapp_number_local` is shown as the contact number; `whatsapp_number_international`
  is used for the click-to-call link.
- `email` is shown only as a contact detail in the footer and on the Contact page.
- `instagram` can be a handle or a full URL. It is hidden while it is `null`.

No environment variables are required.

## Products and images

Products live in `store-web/src/data/products.json`. Images live in
`store-web/public/images/<category>/`.

`products.json` has this shape:

```json
{
  "store": "Jibola Collection",
  "currency": "NGN",
  "products": [
    {
      "id": 1,
      "name": "Product name",
      "slug": "product-name",
      "category": "footwear",
      "price": 8000,
      "description": "Short product description.",
      "images": ["/images/footwear/product-name.jpg"],
      "colours": ["Black"],
      "variants": [
        {
          "colour": "Black",
          "sizes": [{ "size": "38", "stock": 2 }]
        }
      ],
      "tag": "New Arrival",
      "in_stock": true,
      "total_stock": 2
    }
  ]
}
```

Product fields:

- `price` is a plain number in naira.
- `colours` is the list of colours on sale. It can be empty.
- `variants` lists stock per colour and size.
- `total_stock` is the sum of all variant stock. `null` means stock was not given, so the
  product is treated as available and no stock count is shown.
- `tag` is `"New Arrival"`, `"Restocked"` or `null`. It is shown as a badge on product cards.
- `bundle_offer` is optional, for example `{ "quantity": 2, "price": 3800 }`. The offer is
  applied automatically in the cart for every qualifying group.
- `in_stock` is `false` for a sold-out product.

Stock rules used by the storefront:

- “Only N left” is shown when a size or the total stock is 3 or less.
- Sizes with 0 stock are hidden.
- Products with `total_stock: null` never show a stock count.
- Colours with no variants (bags, caps, scarves) are shown as colour choices without stock
  counts.

The six category values are `bags`, `footwear`, `clothes`, `baggy-jeans`,
`jersey-scarves` and `accessories`. Category labels and display order are defined in
`store-web/src/lib/catalog.js`.

### Adding a product

1. Add the image to `store-web/public/images/<category>/`.
2. Add a product object to the `products` array in `src/data/products.json`.
3. Set `images` to the matching path, for example
   `"/images/footwear/my-new-shoe.jpg"`.
4. Use an existing category, or add its label to `src/lib/catalog.js`.
5. Set `total_stock` to the sum of the variant stock, or `null` when stock was not given.
6. Run `npm run build` to check everything compiles.

### Content rules

- Do not show designer brand names in product titles or descriptions.
- Do not use “original”, “genuine” or similar authenticity claims.
- Keep image paths in `products.json` in sync with the filenames in `public/images/`.

## Deploy to Vercel

`store-web/vercel.json` rewrites all routes to `index.html`, so React Router links work on
refresh and direct visits.

1. Import the `store-web` folder into Vercel.
2. Use the Vite preset (build command `npm run build`, output directory `dist`).
3. Deploy.

No environment variables are required.
