import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { categoryLabel, isSoldOut, totalLowStockText } from '../lib/catalog'
import { assetUrl, formatNaira } from '../lib/store'

export default function ProductCard({ product, index = 0 }) {
  const soldOut = isSoldOut(product)
  const lowStock = totalLowStockText(product)

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group block animate-rise"
      style={{ animationDelay: `${Math.min(index * 45, 350)}ms` }}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-cream">
        <img
          src={assetUrl(product.images?.[0])}
          alt={product.name}
          loading="lazy"
          className={`h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04] ${
            soldOut ? 'opacity-60 grayscale' : ''
          }`}
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.tag && (
            <span
              className={`rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] ${
                product.tag === 'Restocked'
                  ? 'bg-gold text-ink'
                  : 'bg-ink text-white'
              }`}
            >
              {product.tag}
            </span>
          )}
        </div>
        <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink opacity-0 shadow-sm backdrop-blur transition duration-300 group-hover:opacity-100">
          <ArrowUpRight size={15} />
        </span>
        {soldOut && (
          <div className="absolute inset-x-3 bottom-3 rounded-full bg-ink/80 py-2 text-center text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur">
            Sold out
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/35">
          {categoryLabel(product.category)}
        </p>
        <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug transition group-hover:text-gold sm:text-[15px]">
          {product.name}
        </h3>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="text-sm font-bold">{formatNaira(product.price)}</span>
          {lowStock && (
            <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-red-500">
              {lowStock}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
