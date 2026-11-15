import { MessageCircle } from 'lucide-react'
import { whatsappLink } from '../lib/store'
import store from '../data/store.json'

export default function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink(`Hello ${store.name}, I would like to ask about your products.`)}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-30 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow-soft transition hover:scale-105 hover:bg-[#20bd5a] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 sm:bottom-7 sm:right-7"
      aria-label={`Chat with ${store.name} on WhatsApp`}
    >
      <MessageCircle size={20} />
      <span className="hidden sm:inline">Chat with us</span>
    </a>
  )
}
