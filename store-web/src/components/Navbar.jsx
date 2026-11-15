import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, Search, ShoppingBag, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import BrandMark from './BrandMark'
import store from '../data/store.json'

const links = [
  { to: '/shop', label: 'Shop All' },
  { to: '/shop?category=bags', label: 'Bags' },
  { to: '/shop?category=footwear', label: 'Footwear' },
  { to: '/shop?category=baggy-jeans', label: 'Baggy Jeans' },
  { to: '/shop?category=jersey-scarves', label: 'Scarves' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const { count, openCart } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-ink text-white">
        <div className="container-page flex items-center justify-center gap-2 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] sm:text-[11px]">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          Nationwide delivery across {store.location}
          <span className="hidden text-white/45 sm:inline">•</span>
          <span className="hidden text-white/70 sm:inline">Order on WhatsApp</span>
        </div>
      </div>
      <div className="border-b border-ink/10 bg-paper/95 backdrop-blur-xl">
        <div className="container-page flex h-[70px] items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen((open) => !open)}
              className="rounded-full p-2 text-ink transition hover:bg-ink/5 lg:hidden"
              aria-label="Open menu"
            >
              {mobileOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
            <BrandMark />
          </div>

          <nav className="hidden items-center gap-7 lg:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative text-[12px] font-semibold uppercase tracking-[0.14em] transition ${
                    isActive ? 'text-ink' : 'text-ink/55 hover:text-ink'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              to="/shop"
              className="rounded-full p-2.5 text-ink transition hover:bg-ink/5"
              aria-label="Search products"
            >
              <Search size={20} />
            </Link>
            <button
              onClick={openCart}
              className="relative rounded-full p-2.5 text-ink transition hover:bg-ink/5"
              aria-label="Open cart"
            >
              <ShoppingBag size={20} />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-ink">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-ink/10 bg-paper px-5 pb-5 pt-3 lg:hidden">
            <nav className="flex flex-col">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="border-b border-ink/5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-ink/70"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
