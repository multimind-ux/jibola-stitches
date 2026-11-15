import { useState } from 'react'
import { Instagram, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react'
import { instagramHandle, instagramUrl, whatsappLink } from '../lib/store'
import store from '../data/store.json'

export default function Contact() {
  const [form, setForm] = useState({ name: '', message: '' })

  const submit = (event) => {
    event.preventDefault()
    const text = `Hello ${store.name}, my name is ${form.name}. ${form.message}`
    window.open(whatsappLink(text), '_blank', 'noopener,noreferrer')
    setForm({ name: '', message: '' })
  }

  const channels = [
    store.whatsapp_number_local && {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: store.whatsapp_number_local,
      href: whatsappLink(`Hello ${store.name}, I have a question.`),
      note: 'Fastest response, usually within an hour.',
    },
    store.instagram && {
      icon: Instagram,
      label: 'Instagram',
      value: instagramHandle(store.instagram),
      href: instagramUrl(store.instagram),
      note: 'New drops, styling and behind the scenes.',
    },
    store.email && {
      icon: Mail,
      label: 'Email',
      value: store.email,
      href: `mailto:${store.email}`,
      note: 'For collaborations and larger orders.',
    },
    store.whatsapp_number_international && {
      icon: Phone,
      label: 'Call',
      value: store.whatsapp_number_local || store.whatsapp_number_international,
      href: `tel:+${store.whatsapp_number_international}`,
      note: 'Monday to Saturday, 9am–6pm WAT.',
    },
  ].filter(Boolean)

  return (
    <div className="container-page py-12 sm:py-20">
      <div className="mx-auto max-w-4xl text-center">
        <p className="eyebrow">We're here</p>
        <h1 className="mt-2 font-display text-5xl leading-none tracking-wide sm:text-7xl">
          Let's talk style
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-ink/50">
          Questions about sizing, delivery or an order? Send a message and a real person will
          get back to you.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          {channels.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="flex items-start gap-4 rounded-2xl border border-ink/10 bg-white p-5 transition hover:border-gold/50 hover:shadow-card"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cream text-gold">
                <item.icon size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/35">
                  {item.label}
                </p>
                <p className="mt-1 break-all text-sm font-semibold">{item.value}</p>
                <p className="mt-1 text-[11px] leading-5 text-ink/40">{item.note}</p>
              </div>
            </a>
          ))}
          <div className="flex items-start gap-4 rounded-2xl border border-ink/10 bg-white p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cream text-gold">
              <MapPin size={18} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/35">
                Location
              </p>
              <p className="mt-1 text-sm font-semibold">{store.location}</p>
              <p className="mt-1 text-[11px] leading-5 text-ink/40">
                Pickup by appointment only.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={submit} className="h-fit rounded-3xl border border-ink/10 bg-white p-6 sm:p-8">
          <h2 className="font-display text-3xl tracking-wide">Send a message</h2>
          <p className="mt-2 text-xs leading-5 text-ink/45">
            This opens WhatsApp with your message ready to send.
          </p>
          <div className="mt-6 space-y-4">
            <div>
              <label className="label" htmlFor="contact-name">
                Your name
              </label>
              <input
                id="contact-name"
                required
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({ ...current, name: event.target.value }))
                }
                className="field"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="label" htmlFor="contact-message">
                Message
              </label>
              <textarea
                id="contact-message"
                required
                rows="5"
                value={form.message}
                onChange={(event) =>
                  setForm((current) => ({ ...current, message: event.target.value }))
                }
                className="field resize-none"
                placeholder="How can we help?"
              />
            </div>
            <button type="submit" className="btn-dark w-full">
              <Send size={16} /> Send on WhatsApp
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
