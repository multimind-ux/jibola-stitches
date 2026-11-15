import { AtSign, Instagram, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { instagramHandle, instagramUrl, whatsappLink } from '../lib/store'
import store from '../data/store.json'
import BrandMark from './BrandMark'

export default function Footer() {
  return (
    <footer className="mt-24 bg-ink text-white">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <BrandMark variant="light" size="lg" />
          <p className="mt-5 max-w-md text-sm leading-7 text-white/50">
            <span className="font-semibold text-gold">{store.tagline}.</span> Modern fashion
            for people who dress with intention. Bags, footwear, scarves and streetwear
            staples, curated in {store.location} and delivered nationwide.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {store.instagram && (
              <a
                href={instagramUrl(store.instagram)}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 p-2.5 transition hover:border-gold hover:text-gold"
                aria-label="Instagram"
              >
                <Instagram size={17} />
              </a>
            )}
            <a
              href={whatsappLink(`Hello ${store.name}, I would like to ask about your products.`)}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 p-2.5 transition hover:border-gold hover:text-gold"
              aria-label="WhatsApp"
            >
              <MessageCircle size={17} />
            </a>
            {store.email && (
              <a
                href={`mailto:${store.email}`}
                className="rounded-full border border-white/15 p-2.5 transition hover:border-gold hover:text-gold"
                aria-label="Email"
              >
                <Mail size={17} />
              </a>
            )}
          </div>
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-gold">Shop</p>
          <div className="mt-5 flex flex-col gap-3 text-sm text-white/55">
            <Link to="/shop" className="transition hover:text-white">
              All products
            </Link>
            <Link to="/shop?category=bags" className="transition hover:text-white">
              Bags
            </Link>
            <Link to="/shop?category=footwear" className="transition hover:text-white">
              Footwear
            </Link>
            <Link to="/shop?category=baggy-jeans" className="transition hover:text-white">
              Baggy jeans
            </Link>
            <Link to="/shop?category=jersey-scarves" className="transition hover:text-white">
              Jersey scarves
            </Link>
          </div>
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-gold">Help</p>
          <div className="mt-5 flex flex-col gap-3 text-sm text-white/55">
            <Link to="/contact" className="transition hover:text-white">
              Contact us
            </Link>
            <Link to="/about" className="transition hover:text-white">
              Our story
            </Link>
            <a
              href={whatsappLink(`Hello ${store.name}, I would like to place an order.`)}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-white"
            >
              Order on WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-4 py-6 text-[11px] text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {store.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5">
              <MapPin size={12} /> {store.location}
            </span>
            {store.whatsapp_number_local && (
              <span className="flex items-center gap-1.5">
                <Phone size={12} /> {store.whatsapp_number_local}
              </span>
            )}
            {store.instagram && (
              <span className="flex items-center gap-1.5">
                <AtSign size={12} /> {instagramHandle(store.instagram)}
              </span>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
