import catalog from '../data/products.json'

export const products = catalog.products

const CATEGORY_META = {
  bags: { name: 'Bags', order: 1 },
  footwear: { name: 'Footwear', order: 2 },
  clothes: { name: 'Clothes', order: 3 },
  'baggy-jeans': { name: 'Baggy Jeans', order: 4 },
  'jersey-scarves': { name: 'Jersey Scarves', order: 5 },
  accessories: { name: 'Accessories', order: 6 },
}

export function categoryLabel(slug) {
  return CATEGORY_META[slug]?.name || slug.replace(/-/g, ' ')
}

export function getCategories(items = products) {
  const seen = new Map()
  for (const product of items) {
    if (!seen.has(product.category)) {
      seen.set(product.category, {
        slug: product.category,
        name: categoryLabel(product.category),
        image: product.images?.[0] || '',
      })
    }
  }
  return [...seen.values()].sort(
    (a, b) => (CATEGORY_META[a.slug]?.order || 99) - (CATEGORY_META[b.slug]?.order || 99),
  )
}

export function compareSizes(a, b) {
  const aNumeric = /^\d+$/.test(a)
  const bNumeric = /^\d+$/.test(b)
  if (aNumeric && bNumeric) return Number(a) - Number(b)
  if (aNumeric) return -1
  if (bNumeric) return 1
  const order = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL']
  const aIndex = order.indexOf(a)
  const bIndex = order.indexOf(b)
  if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex
  return a.localeCompare(b)
}

export function getSizeOptions(items = products) {
  const sizes = new Set()
  for (const product of items) {
    for (const variant of product.variants || []) {
      for (const entry of variant.sizes || []) {
        if (entry.stock > 0) sizes.add(entry.size)
      }
    }
  }
  return [...sizes].sort(compareSizes)
}

export function productHasSize(product, size) {
  return (product.variants || []).some((variant) =>
    (variant.sizes || []).some((entry) => entry.size === size && entry.stock > 0),
  )
}

export function colourHasStock(product, colour) {
  if (!product?.variants?.length) return true
  const variant = product.variants.find((item) => item.colour === colour)
  return Boolean(variant?.sizes?.some((entry) => entry.stock > 0))
}

export function selectedStockInfo(product, colour, size) {
  if (!product) return { stock: null, soldOut: true, lowStock: null }
  if (product.in_stock === false || product.total_stock === 0) {
    return { stock: 0, soldOut: true, lowStock: null }
  }

  if (product.variants?.length) {
    const variant = product.variants.find((item) => item.colour === colour)
    const entry = variant?.sizes?.find((item) => item.size === size)
    if (!entry || entry.stock <= 0) {
      return { stock: 0, soldOut: true, lowStock: null }
    }
    return {
      stock: entry.stock,
      soldOut: false,
      lowStock: entry.stock <= 3 ? `Only ${entry.stock} left` : null,
    }
  }

  const stock = product.total_stock
  return {
    stock: stock ?? null,
    soldOut: false,
    lowStock: stock !== null && stock <= 3 ? `Only ${stock} left` : null,
  }
}

export function totalLowStockText(product) {
  if (product?.in_stock === false || product?.total_stock === null) return null
  if (product.total_stock <= 3) return `Only ${product.total_stock} left`
  return null
}

export function isSoldOut(product) {
  return product?.in_stock === false || product?.total_stock === 0
}

export function lineTotal(item) {
  const quantity = Number(item.quantity || 0)
  const price = Number(item.price || 0)
  const offer = item.bundle_offer
  if (offer?.quantity > 0 && offer?.price != null) {
    const bundles = Math.floor(quantity / offer.quantity)
    const singles = quantity % offer.quantity
    return bundles * Number(offer.price) + singles * price
  }
  return price * quantity
}
