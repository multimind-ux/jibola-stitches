import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import CartDrawer from './CartDrawer'
import FloatingWhatsApp from './FloatingWhatsApp'
import store from '../data/store.json'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])
  return null
}

function StoreMeta() {
  useEffect(() => {
    const title = `${store.name} — ${store.tagline}`
    const description = `${store.name}: ${store.tagline}. Order on WhatsApp.`
    document.title = title

    const setMeta = (selector, attribute, value) => {
      const element = document.querySelector(selector)
      if (element) element.setAttribute(attribute, value)
    }

    setMeta('meta[name="description"]', 'content', description)
    setMeta('meta[property="og:title"]', 'content', title)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[property="og:site_name"]', 'content', store.name)
    setMeta('meta[name="twitter:title"]', 'content', title)
    setMeta('meta[name="twitter:description"]', 'content', description)
  }, [])

  return null
}

export default function StoreLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <StoreMeta />
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <FloatingWhatsApp />
    </div>
  )
}
