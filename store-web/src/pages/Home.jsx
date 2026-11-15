import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BadgeCheck,
  HeartHandshake,
  MessageCircle,
  Sparkles,
  Truck,
} from 'lucide-react'
import { formatNaira, whatsappLink } from '../lib/store'
import { getCategories, products } from '../lib/catalog'
import ProductCard from '../components/ProductCard'
import { ProductGridSkeleton, SectionHeading } from '../components/UI'
import store from '../data/store.json'

const categories = getCategories()
const heroProduct =
  products.find((product) => product.category === 'bags' && product.tag === 'New Arrival') ||
  products.find((product) => product.category === 'bags') ||
  products[0]
const newArrivals = products.filter((product) => product.tag === 'New Arrival').slice(0, 4)
const restocked = products.filter((product) => product.tag === 'Restocked').slice(0, 4)
const denimProduct =
  products.find((product) => product.category === 'baggy-jeans') || products[0]

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 250)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div>
      <section className="container-page pt-6 sm:pt-10">
        <div className="grid overflow-hidden rounded-[2rem] bg-ink lg:grid-cols-[1.08fr_0.92fr]">
          <div className="relative flex flex-col justify-center px-7 py-14 text-white sm:px-12 sm:py-20 lg:px-14">
            <p className="eyebrow">Made in {store.location}. Nationwide delivered.</p>
            <h1 className="mt-5 font-display text-[4.2rem] leading-[0.84] tracking-wide sm:text-[6rem] lg:text-[6.6rem]">
              Dress like
              <br />
              you <span className="text-gold">mean it.</span>
            </h1>
            <p className="mt-6 max-w-md text-sm leading-7 text-white/55 sm:text-[15px]">
              Bags, footwear, jersey scarves and streetwear staples for the version of you
              that never blends in. Curated in small batches.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/shop" className="btn-gold">
                Shop the collection <ArrowRight size={16} />
              </Link>
              <a
                href={whatsappLink(`Hello ${store.name}, I would like to place an order.`)}
                target="_blank"
                rel="noreferrer"
                className="btn border border-white/20 text-white hover:border-white hover:bg-white hover:text-ink"
              >
                <MessageCircle size={16} /> Order on WhatsApp
              </a>
            </div>
            <div className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-6">
              <div>
                <p className="font-display text-3xl text-gold">24h</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/40">
                  Order dispatch
                </p>
              </div>
              <div>
                <p className="font-display text-3xl text-gold">2–5</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/40">
                  Days nationwide
                </p>
              </div>
              <div>
                <p className="font-display text-3xl text-gold">100%</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/40">
                  Hand-picked
                </p>
              </div>
            </div>
          </div>
          <div className="relative min-h-[360px] lg:min-h-[640px]">
            <img
              src={heroProduct?.images?.[0]}
              alt={heroProduct?.name || 'Featured product'}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-ink/30 lg:to-transparent" />
            {heroProduct && (
              <div className="absolute bottom-5 left-5 rounded-2xl bg-white/95 px-4 py-3 shadow-soft backdrop-blur sm:bottom-8 sm:left-8">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-ink/40">
                  Editor's pick
                </p>
                <p className="mt-1 text-sm font-semibold">{heroProduct.name}</p>
                <p className="mt-0.5 text-xs font-bold text-gold">
                  {formatNaira(heroProduct.price)}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="mt-6 overflow-hidden border-y border-ink/10 bg-cream py-3">
        <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="flex items-center gap-8">
              {[
                'NEW DROPS EVERY WEEK',
                'NATIONWIDE SHIPPING',
                'ORDER ON WHATSAPP',
                'CURATED IN SMALL BATCHES',
                'STYLE THAT FEELS LIKE YOU',
              ].map((item) => (
                <span key={`${index}-${item}`} className="flex items-center gap-8">
                  <span className="text-[10px] font-bold uppercase tracking-[0.26em] text-ink/50">
                    {item}
                  </span>
                  <Sparkles size={12} className="text-gold" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="container-page py-16 sm:py-24">
        <SectionHeading
          eyebrow="Find your next favourite"
          title="Shop by category"
          action="/shop"
          actionLabel="Browse everything"
        />
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              to={`/shop?category=${category.slug}`}
              className={`group relative overflow-hidden rounded-3xl bg-cream ${
                index === 0 ? 'lg:col-span-2' : ''
              }`}
            >
              <div className={index === 0 ? 'aspect-[16/10]' : 'aspect-[4/3]'}>
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/5 to-transparent" />
              <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 sm:inset-x-5 sm:bottom-5">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/55">
                    {store.name}
                  </p>
                  <h3 className="mt-1 font-display text-3xl tracking-wide text-white sm:text-4xl">
                    {category.name}
                  </h3>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition group-hover:bg-gold group-hover:text-ink">
                  <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-ink/10 bg-cream/50 py-16 sm:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Fresh off the rack"
            title="New arrivals"
            action="/shop?sort=newest"
            actionLabel="See all new"
          />
          {loading ? (
            <ProductGridSkeleton count={4} />
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
              {newArrivals.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="container-page py-16 sm:py-24">
        <div className="grid items-center gap-8 overflow-hidden rounded-[2rem] bg-ink lg:grid-cols-2">
          <div className="relative min-h-[320px] lg:min-h-[480px]">
            <img
              src={denimProduct?.images?.[0]}
              alt="Baggy jeans collection"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="px-7 pb-10 pt-2 text-white sm:px-12 lg:py-16">
            <p className="eyebrow">The denim edit</p>
            <h2 className="mt-4 font-display text-5xl leading-none tracking-wide sm:text-6xl">
              Baggy jeans,
              <br />
              <span className="text-gold">big energy.</span>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/55">
              Relaxed silhouettes, soft denim and a fit that works with everything you
              already own. Built for long days and late nights.
            </p>
            <Link to="/shop?category=baggy-jeans" className="btn-gold mt-7">
              Shop baggy jeans <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page pb-16 sm:pb-24">
        <SectionHeading
          eyebrow="Back in stock"
          title="Just restocked"
          action="/shop"
          actionLabel="Shop all"
        />
        {loading ? (
          <ProductGridSkeleton count={4} />
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {restocked.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </section>

      <section className="container-page pb-20">
        <div className="grid gap-6 rounded-[2rem] border border-ink/10 bg-white p-7 sm:p-10 md:grid-cols-3">
          {[
            {
              icon: Truck,
              title: 'Nationwide delivery',
              text: 'Dispatch within 24 hours. Every other state in 2–5 working days.',
            },
            {
              icon: BadgeCheck,
              title: 'Hand-picked quality',
              text: 'Every piece is checked before it leaves the studio. No surprises.',
            },
            {
              icon: HeartHandshake,
              title: 'Real human support',
              text: 'Questions about sizing or styling? Send us a message on WhatsApp.',
            },
          ].map((item) => (
            <div key={item.title} className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cream text-gold">
                <item.icon size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold">{item.title}</h3>
                <p className="mt-1.5 text-xs leading-6 text-ink/45">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-20">
        <div className="flex flex-col items-center rounded-[2rem] bg-gold px-6 py-14 text-center text-ink sm:px-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-ink/50">
            Can't decide?
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl leading-none tracking-wide sm:text-6xl">
            Let's find your fit together.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-ink/60">
            Send us a message and we'll help you pick the right size, colour and style.
          </p>
          <a
            href={whatsappLink(`Hello ${store.name}, I need help choosing a piece.`)}
            target="_blank"
            rel="noreferrer"
            className="btn-dark mt-7"
          >
            <MessageCircle size={16} /> Chat with {store.name}
          </a>
        </div>
      </section>
    </div>
  )
}
