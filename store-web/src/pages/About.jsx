import { Link } from 'react-router-dom'
import { ArrowRight, Heart, MessageCircle, Sparkles, Star } from 'lucide-react'
import { products } from '../lib/catalog'
import { whatsappLink } from '../lib/store'
import store from '../data/store.json'

const clothesProduct = products.find((product) => product.category === 'clothes') || products[0]
const studioProducts = ['bags', 'footwear', 'jersey-scarves', 'baggy-jeans']
  .map((category) => products.find((product) => product.category === category))
  .filter(Boolean)

export default function About() {
  return (
    <div>
      <section className="container-page pt-10 sm:pt-16">
        <div className="grid overflow-hidden rounded-[2rem] bg-cream lg:grid-cols-2">
          <div className="flex flex-col justify-center px-7 py-12 sm:px-12 sm:py-20">
            <p className="eyebrow">Our story</p>
            <h1 className="mt-4 font-display text-5xl leading-[0.9] tracking-wide sm:text-7xl">
              Made for the
              <br />
              <span className="text-gold">boldly dressed.</span>
            </h1>
            <p className="mt-6 max-w-md text-sm leading-7 text-ink/55">
              {store.name} started with a simple idea: great style should feel personal,
              not mass-produced. We curate bags, footwear, scarves and streetwear staples
              for people who want to look like themselves — just sharper.
            </p>
            <p className="mt-4 max-w-md text-sm leading-7 text-ink/55">
              Every piece is hand-picked in {store.location}, checked for quality, and packed
              with care. Small batches. Real people. No noise.
            </p>
            <Link to="/shop" className="btn-dark mt-7 w-fit">
              Shop the collection <ArrowRight size={16} />
            </Link>
          </div>
          <div className="relative min-h-[340px] lg:min-h-[560px]">
            <img
              src={clothesProduct?.images?.[0]}
              alt={clothesProduct?.name || 'Clothing'}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-24">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Sparkles,
              title: 'Curated, not crowded',
              text: 'We keep the edit tight. Every piece has a reason to be here and a place in your wardrobe.',
            },
            {
              icon: Heart,
              title: 'Style with feeling',
              text: 'Fashion is personal. We help you find pieces that feel like you, not just what is trending.',
            },
            {
              icon: Star,
              title: 'Quality you can trust',
              text: 'Each item is inspected before dispatch. If it does not meet our standard, it does not go out.',
            },
          ].map((item) => (
            <div key={item.title} className="rounded-3xl border border-ink/10 bg-white p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cream text-gold">
                <item.icon size={20} />
              </div>
              <h2 className="mt-5 font-display text-3xl tracking-wide">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-ink/50">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-20">
        <div className="grid items-center gap-8 rounded-[2rem] bg-ink p-7 text-white sm:p-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">The studio</p>
            <h2 className="mt-3 font-display text-5xl leading-none tracking-wide">
              {store.location} is our
              <br />
              <span className="text-gold">runway.</span>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/55">
              From the energy of home to the way people put themselves together, our
              surroundings shape everything we choose. We are proud to build for a global
              audience.
            </p>
            <a
              href={whatsappLink(`Hello ${store.name}, I would love to say hello.`)}
              target="_blank"
              rel="noreferrer"
              className="btn-gold mt-7"
            >
              <MessageCircle size={16} /> Say hello
            </a>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {studioProducts.map((product) => (
              <img
                key={product.id}
                src={product.images?.[0]}
                alt={product.name}
                className="aspect-square w-full rounded-2xl object-cover"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
