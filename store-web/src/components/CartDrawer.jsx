import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { lineTotal } from '../lib/catalog'
import { assetUrl, formatNaira, orderWhatsAppMessage, whatsappLink } from '../lib/store'
import { useCart } from '../context/CartContext'

const emptyForm = { name: '', phone: '', address: '', notes: '' }

export default function CartDrawer() {
  const {
    items,
    subtotal,
    count,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
  } = useCart()
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isOpen) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') closeCart()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, closeCart])

  useEffect(() => {
    if (!isOpen) setError('')
  }, [isOpen])

  if (!isOpen) return null

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    if (error) setError('')
  }

  const submit = (event) => {
    event.preventDefault()
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      setError('Please add your name, phone number and delivery address.')
      return
    }
    const customer = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      notes: form.notes.trim(),
    }
    const message = orderWhatsAppMessage(items, subtotal, customer)
    window.open(whatsappLink(message), '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        onClick={closeCart}
        aria-label="Close cart"
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-paper shadow-2xl">
        <div className="flex items-center justify-between border-b border-ink/10 px-5 py-5 sm:px-7">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} />
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em]">Your bag</p>
              <p className="text-xs text-ink/45">
                {count} item{count === 1 ? '' : 's'}
              </p>
            </div>
          </div>
          <button
            onClick={closeCart}
            className="rounded-full p-2 transition hover:bg-ink/5"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ink/5">
              <ShoppingBag size={24} className="text-ink/40" />
            </div>
            <p className="mt-5 font-display text-3xl tracking-wide">Your bag is empty</p>
            <p className="mt-2 text-sm text-ink/45">
              Find something you love and it will show up here.
            </p>
            <Link to="/shop" onClick={closeCart} className="btn-dark mt-6">
              Start shopping <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            <div className="px-5 py-5 sm:px-7">
              <div className="flex flex-col gap-5">
                {items.map((item) => (
                  <div key={item.key} className="flex gap-4">
                    <Link
                      to={`/product/${item.slug}`}
                      onClick={closeCart}
                      className="h-24 w-20 shrink-0 overflow-hidden rounded-2xl bg-cream"
                    >
                      <img
                        src={assetUrl(item.image)}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          to={`/product/${item.slug}`}
                          onClick={closeCart}
                          className="line-clamp-2 text-sm font-semibold leading-snug hover:text-gold"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.key)}
                          className="rounded-full p-1 text-ink/30 transition hover:text-red-500"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      {[item.size, item.color].filter(Boolean).length > 0 && (
                        <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-ink/40">
                          {[item.size, item.color].filter(Boolean).join(' / ')}
                        </p>
                      )}
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <div className="flex items-center rounded-full border border-ink/15">
                          <button
                            onClick={() => updateQuantity(item.key, item.quantity - 1)}
                            className="p-1.5 text-ink/60 transition hover:text-ink"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="w-7 text-center text-xs font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.key, item.quantity + 1)}
                            className="p-1.5 text-ink/60 transition hover:text-ink"
                            aria-label="Increase quantity"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold">{formatNaira(lineTotal(item))}</p>
                          {item.bundle_offer &&
                            item.quantity >= item.bundle_offer.quantity && (
                              <p className="mt-0.5 text-[10px] font-semibold text-emerald">
                                Bundle applied
                              </p>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-ink/10 px-5 py-5 sm:px-7">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/50">
                  Subtotal
                </span>
                <span className="font-display text-2xl tracking-wide">
                  {formatNaira(subtotal)}
                </span>
              </div>
              <p className="mt-1 text-[11px] leading-5 text-ink/40">
                Delivery is arranged on WhatsApp after you send your order.
              </p>

              <form onSubmit={submit} className="mt-6 space-y-4">
                <div>
                  <label className="label" htmlFor="checkout-name">
                    Full name
                  </label>
                  <input
                    id="checkout-name"
                    required
                    value={form.name}
                    onChange={(event) => updateField('name', event.target.value)}
                    className="field"
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label className="label" htmlFor="checkout-phone">
                    Phone number
                  </label>
                  <input
                    id="checkout-phone"
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(event) => updateField('phone', event.target.value)}
                    className="field"
                    placeholder="e.g. 0801 234 5678"
                    autoComplete="tel"
                  />
                </div>
                <div>
                  <label className="label" htmlFor="checkout-address">
                    Delivery address
                  </label>
                  <textarea
                    id="checkout-address"
                    required
                    rows="2"
                    value={form.address}
                    onChange={(event) => updateField('address', event.target.value)}
                    className="field resize-none"
                    placeholder="Street, city and state"
                    autoComplete="street-address"
                  />
                </div>
                <div>
                  <label className="label" htmlFor="checkout-notes">
                    Notes <span className="font-normal text-ink/35">(optional)</span>
                  </label>
                  <textarea
                    id="checkout-notes"
                    rows="2"
                    value={form.notes}
                    onChange={(event) => updateField('notes', event.target.value)}
                    className="field resize-none"
                    placeholder="Anything we should know?"
                  />
                </div>

                {error && (
                  <p className="rounded-2xl bg-red-50 px-4 py-3 text-xs font-medium text-red-600">
                    {error}
                  </p>
                )}

                <button type="submit" className="btn-dark w-full">
                  <MessageCircle size={17} /> Send Order on WhatsApp
                </button>
                <p className="text-center text-[10px] leading-4 text-ink/35">
                  Your order opens in WhatsApp with every item and detail ready to send.
                </p>
              </form>
            </div>
          </div>
        )}
      </aside>
    </div>
  )
}
