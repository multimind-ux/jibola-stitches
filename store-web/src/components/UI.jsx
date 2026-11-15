import { Link } from 'react-router-dom'
import { PackageOpen } from 'lucide-react'

export function SkeletonCard() {
  return (
    <div className="space-y-4">
      <div className="skeleton aspect-[4/5] w-full rounded-3xl" />
      <div className="skeleton h-3 w-1/3" />
      <div className="skeleton h-4 w-3/4" />
      <div className="skeleton h-4 w-1/4" />
    </div>
  )
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  )
}

export function EmptyState({
  title = 'Nothing here yet',
  description = 'Try a different filter or explore the full collection.',
  actionLabel = 'Shop all products',
  actionTo = '/shop',
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-ink/15 bg-white px-6 py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cream">
        <PackageOpen size={26} className="text-ink/40" />
      </div>
      <h3 className="mt-5 font-display text-3xl tracking-wide">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-6 text-ink/45">{description}</p>
      {onAction ? (
        <button type="button" onClick={onAction} className="btn-dark mt-6">
          {actionLabel}
        </button>
      ) : (
        <Link to={actionTo} className="btn-dark mt-6">
          {actionLabel}
        </Link>
      )}
    </div>
  )
}

export function SectionHeading({ eyebrow, title, action, actionLabel = 'View all' }) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="section-title mt-2">{title}</h2>
      </div>
      {action && (
        <Link
          to={action}
          className="hidden shrink-0 border-b border-ink/30 pb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-ink/60 transition hover:border-gold hover:text-gold sm:block"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  )
}
