import { Link } from 'react-router-dom'
import store from '../data/store.json'

const words = store.name.trim().split(/\s+/).filter(Boolean)
const firstWord = words[0] || store.name
const remainingWords = words.slice(1).join(' ')
const initials = words
  .map((word) => word[0])
  .join('')
  .slice(0, 2)
  .toUpperCase()

export default function BrandMark({ variant = 'dark', size = 'default', className = '' }) {
  const isLight = variant === 'light'
  const isLarge = size === 'lg'

  return (
    <Link
      to="/"
      aria-label={store.name}
      className={`group inline-flex items-center ${isLarge ? 'gap-4' : 'gap-3'} ${className}`}
    >
      <span
        className={`relative grid shrink-0 place-items-center overflow-hidden rounded-[0.9rem] border shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] transition duration-500 group-hover:-rotate-3 ${
          isLarge ? 'h-12 w-12' : 'h-10 w-10'
        } ${
          isLight
            ? 'border-white/15 bg-white/[0.06]'
            : 'border-ink/10 bg-ink'
        }`}
      >
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_15%,rgba(214,178,90,0.55),transparent_58%)] opacity-80" />
        <span className="absolute -right-3 -top-3 h-8 w-8 rounded-full bg-gold/30 blur-xl transition duration-500 group-hover:bg-gold/50" />
        <span
          className={`relative font-display leading-none tracking-[0.02em] text-gold-light ${
            isLarge ? 'text-2xl' : 'text-xl'
          }`}
        >
          {initials}
        </span>
        <span className="absolute bottom-1.5 right-1.5 h-1 w-1 rounded-full bg-gold-light/90" />
      </span>

      <span className="flex min-w-0 flex-col">
        <span
          className={`font-display leading-[0.78] tracking-[0.08em] transition duration-300 group-hover:text-gold ${
            isLarge ? 'text-[2.7rem]' : 'text-[1.75rem]'
          } ${isLight ? 'text-white' : 'text-ink'}`}
        >
          {firstWord.toUpperCase()}
        </span>
        {remainingWords && (
          <span
            className={`mt-1.5 flex items-center gap-1.5 font-bold uppercase ${
              isLarge ? 'text-[10px] tracking-[0.42em]' : 'text-[8px] tracking-[0.34em]'
            } ${isLight ? 'text-white/45' : 'text-ink/40'}`}
          >
            <span className={`h-px bg-gold ${isLarge ? 'w-6' : 'w-4'}`} />
            {remainingWords}
          </span>
        )}
      </span>
    </Link>
  )
}
