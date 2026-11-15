import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ChevronRight, MessageCircle, ShoppingBag } from 'lucide-react'
import {
  categoryLabel,
  colourHasStock,
  products,
  selectedStockInfo,
} from '../lib/catalog'
import {
  assetUrl,
  formatNaira,
  productWhatsAppMessage,
  whatsappLink,
} from '../lib/store'
import { useCart } from '../context/CartContext'

export default function Product() {
  const { slug } = useParams()
  const { addItem } = useCart()
  const product = useMemo(
    () => products.find((item) => item.slug === slug),
    [slug],
  )
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)
  const [colour, setColour] = useState('')
  const [size, setSize] = useState('')
  const [zoom, setZoom] = useState({ x: 50, y: 50, active: false })

  useEffect(() => {
    setLoading(true)
    setActiveImage(0)
    setZoom({ x: 50, y: 50, active: false })

    const firstColour =
      product?.colours?.[0] || product?.variants?.[0]?.colour || ''
    let firstSize = ''
    if (product?.variants?.length) {
      const variant =
        product.variants.find((item) => item.colour === firstColour) ||
        product.variants[0]
      firstSize = variant?.sizes?.find((entry) => entry.stock > 0)?.size || ''
    }
    setColour(firstColour)
    setSize(firstSize)

    const timer = window.setTimeout(() => setLoading(false), 200)
    return () => window.clearTimeout(timer)
  }, [slug]) // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return (
      <div className="container-page py-12">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="skeleton aspect-[4/5] rounded-3xl" />
          <div className="space-y-4 pt-4">
            <div className="skeleton h-3 w-1/4" />
            <div className="skeleton h-10 w-3/4" />
            <div className="skeleton h-6 w-1/3" />
            <div className="skeleton h-24 w-full" />
            <div className="skeleton h-12 w-1/2" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container-page py-24 text-center">
        <p className="font-display text-4xl tracking-wide">Product not found</p>
        <p className="mt-3 text-sm text-ink/45">This piece may have moved on.</p>
        <Link to="/shop" className="btn-dark mt-6">
          Back to shop
        </Link>
      </div>
    )
  }

  const images = product.images?.length
    ? product.images
    : ['/images/bags/quilted-double-flap-bag.jpg']
  const category = categoryLabel(product.category)
  const selectedVariant = product.variants?.find((item) => item.colour === colour)
  const availableSizes =
    selectedVariant?.sizes?.filter((entry) => entry.stock > 0) || []
  const stockInfo = selectedStockInfo(product, colour, size)
  const soldOut = stockInfo.soldOut
  const chatLink = whatsappLink(productWhatsAppMessage(product, size, colour))

  const pickColour = (nextColour) => {
    setColour(nextColour)
    if (product.variants?.length) {
      const variant = product.variants.find((item) => item.colour === nextColour)
      const nextSize = variant?.sizes?.find((entry) => entry.stock > 0)?.size || ''
      setSize(nextSize)
    }
  }

  const handleAdd = () => {
    if (soldOut) return
    addItem(product, {
      size,
      color: colour,
      maxStock: stockInfo.stock ?? 99,
    })
  }

  return (
    <div className="container-page py-8 sm:py-12">
      <nav className="mb-6 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] text-ink/40">
        <Link to="/" className="hover:text-ink">
          Home
        </Link>
        <ChevronRight size={12} />
        <Link to="/shop" className="hover:text-ink">
          Shop
        </Link>
        <ChevronRight size={12} />
        <Link to={`/shop?category=${product.category}`} className="hover:text-ink">
          {category}
        </Link>
        <ChevronRight size={12} />
        <span className="truncate text-ink/70">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
        <div className="flex items-start gap-3 sm:gap-4">
          {images.length > 1 && (
            <div className="flex w-16 shrink-0 flex-col gap-3 sm:w-20">
              {images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  onClick={() => setActiveImage(index)}
                  className={`aspect-square overflow-hidden rounded-2xl border-2 bg-cream transition ${
                    activeImage === index
                      ? 'border-gold'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={assetUrl(image)} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
          <div
            className="relative flex-1 cursor-zoom-in overflow-hidden rounded-3xl bg-cream"
            onMouseEnter={() => setZoom((current) => ({ ...current, active: true }))}
            onMouseLeave={() => setZoom((current) => ({ ...current, active: false }))}
            onMouseMove={(event) => {
              const rect = event.currentTarget.getBoundingClientRect()
              setZoom({
                active: true,
                x: ((event.clientX - rect.left) / rect.width) * 100,
                y: ((event.clientY - rect.top) / rect.height) * 100,
              })
            }}
          >
            <div className="aspect-[4/5]">
              <img
                src={assetUrl(images[activeImage])}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-300 ease-out"
                style={{
                  transform: zoom.active ? 'scale(1.7)' : 'scale(1)',
                  transformOrigin: `${zoom.x}% ${zoom.y}%`,
                }}
              />
            </div>
            <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-white/85 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-ink/50 backdrop-blur">
              Hover to zoom
            </span>
          </div>
        </div>

        <div className="lg:pt-2">
          <div className="flex items-center justify-between gap-4">
            <p className="eyebrow">{category}</p>
            {product.tag && (
              <span
                className={`rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-[0.16em] ${
                  product.tag === 'Restocked'
                    ? 'bg-gold/15 text-gold'
                    : 'bg-ink/5 text-ink/60'
                }`}
              >
                {product.tag}
              </span>
            )}
          </div>
          <h1 className="mt-3 font-display text-4xl leading-[0.95] tracking-wide sm:text-5xl">
            {product.name}
          </h1>
          <div className="mt-4 flex flex-wrap items-baseline gap-3">
            <span className="text-2xl font-bold">{formatNaira(product.price)}</span>
            {product.bundle_offer && (
              <span className="rounded-full bg-emerald/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald">
                Buy {product.bundle_offer.quantity} for{' '}
                {formatNaira(product.bundle_offer.price)}
              </span>
            )}
          </div>
          {stockInfo.lowStock && !product.variants?.length && (
            <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.12em] text-red-500">
              {stockInfo.lowStock}
            </p>
          )}

          <p className="mt-6 text-sm leading-7 text-ink/55">{product.description}</p>

          {product.variants?.length > 0 && (
            <div className="mt-7 border-t border-ink/10 pt-6">
              <div className="flex items-center justify-between gap-3">
                <p className="label mb-0">Size</p>
                {stockInfo.lowStock && (
                  <span className="text-[11px] font-semibold text-red-500">
                    {stockInfo.lowStock}
                  </span>
                )}
              </div>
              {availableSizes.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {availableSizes.map((entry) => (
                    <button
                      key={entry.size}
                      onClick={() => setSize(entry.size)}
                      className={`min-w-12 rounded-full border px-4 py-2 text-xs font-semibold transition ${
                        size === entry.size
                          ? 'border-ink bg-ink text-white'
                          : 'border-ink/15 text-ink hover:border-ink'
                      }`}
                    >
                      {entry.size}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-xs text-ink/45">
                  This colour is sold out.
                </p>
              )}
            </div>
          )}

          {product.colours?.length > 0 && (
            <div className="mt-6">
              <p className="label">Colour</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.colours.map((item) => {
                  const available = colourHasStock(product, item)
                  return (
                    <button
                      key={item}
                      onClick={() => pickColour(item)}
                      disabled={!available}
                      className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                        colour === item
                          ? 'border-gold bg-gold/10 text-ink'
                          : available
                            ? 'border-ink/15 text-ink/70 hover:border-ink'
                            : 'cursor-not-allowed border-ink/5 text-ink/25 line-through'
                      }`}
                    >
                      {item}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button onClick={handleAdd} disabled={soldOut} className="btn-dark flex-1">
              <ShoppingBag size={17} /> {soldOut ? 'Sold out' : 'Add to bag'}
            </button>
            <a
              href={chatLink}
              target="_blank"
              rel="noreferrer"
              className="btn-outline flex-1"
            >
              <MessageCircle size={17} /> Order on WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-ink/50 hover:text-ink"
        >
          <ArrowLeft size={14} /> Back to all products
        </Link>
      </div>
    </div>
  )
}
