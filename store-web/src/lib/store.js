import store from '../data/store.json'
import { lineTotal } from './catalog'

export { store }

export function formatNaira(value) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: store.currency,
    maximumFractionDigits: 0,
  }).format(Number(value || 0))
}

export function assetUrl(path) {
  if (!path) return '/images/bags/quilted-double-flap-bag.jpg'
  return path.replace(/^\/products\//, '/images/')
}

export function whatsappLink(message) {
  const base =
    store.whatsapp_link ||
    `https://wa.me/${store.whatsapp_number_international}`
  return `${base}?text=${encodeURIComponent(message)}`
}

export function instagramUrl(value) {
  if (!value) return null
  return value.startsWith('http')
    ? value
    : `https://instagram.com/${value.replace(/^@/, '')}`
}

export function instagramHandle(value) {
  if (!value) return null
  if (!value.startsWith('http')) return `@${value.replace(/^@/, '')}`
  return `@${value.replace(/\/+$/, '').split('/').pop()}`
}

export function productWhatsAppMessage(product, size, colour) {
  return [
    `Hello ${store.name}, I am interested in this item:`,
    '',
    product.name,
    size ? `Size: ${size}` : false,
    colour ? `Colour: ${colour}` : false,
    `Price: ${formatNaira(product.price)}`,
    product.bundle_offer
      ? `Offer: Buy ${product.bundle_offer.quantity} for ${formatNaira(product.bundle_offer.price)}`
      : false,
    '',
    'Please share more details.',
  ]
    .filter((line) => line !== false)
    .join('\n')
}

export function orderWhatsAppMessage(items, subtotal, customer) {
  const lines = items.map((item) => {
    const options = [
      item.size ? `Size: ${item.size}` : false,
      item.color ? `Colour: ${item.color}` : false,
      `Qty: ${item.quantity}`,
    ]
      .filter(Boolean)
      .join(' | ')
    return `• ${item.name} | ${options} | ${formatNaira(lineTotal(item))}`
  })

  return [
    `Hello ${store.name}, I would like to place an order.`,
    '',
    'Items:',
    ...lines,
    '',
    `Total: ${formatNaira(subtotal)}`,
    '',
    `Name: ${customer.name}`,
    `Phone: ${customer.phone}`,
    `Delivery address: ${customer.address}`,
    customer.notes ? `Notes: ${customer.notes}` : false,
    '',
    'Please confirm availability and delivery.',
  ]
    .filter((line) => line !== false)
    .join('\n')
}
