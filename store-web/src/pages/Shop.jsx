import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Filter, Search, SlidersHorizontal, X } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { EmptyState, ProductGridSkeleton } from '../components/UI'
import {
  getCategories,
  getSizeOptions,
  productHasSize,
  products,
} from '../lib/catalog'
import store from '../data/store.json'

const sorts = [
  { value: 'newest', label: 'Newest first' },
  { value: 'price_asc', label: 'Price: low to high' },
  { value: 'price_desc', label: 'Price: high to low' },
  { value: 'name', label: 'Name: A–Z' },
]

const categories = getCategories()
const allSizes = getSizeOptions()

export default function Shop() {
  const [searchParams] = useSearchParams()
  const searchKey = searchParams.toString()
  const [category, setCategory] = useState(searchParams.get('category') || '')
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [size, setSize] = useState('')
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest')
  const [loading, setLoading] = useState(true)
  const [filtersOpen, setFiltersOpen] = useState(false)

  useEffect(() => {
    setCategory(searchParams.get('category') || '')
    setSort(searchParams.get('sort') || 'newest')
    setSearchInput(searchParams.get('search') || '')
    if (!searchKey) {
      setMinPrice('')
      setMaxPrice('')
      setSize('')
    }
  }, [searchKey]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 250)
    return () => window.clearTimeout(timer)
  }, [])

  const filtered = useMemo(() => {
    const query = searchInput.trim().toLowerCase()
    const minimum = minPrice === '' ? null : Number(minPrice)
    const maximum = maxPrice === '' ? null : Number(maxPrice)

    const list = products.filter((product) => {
      if (category && product.category !== category) return false
      if (size && !productHasSize(product, size)) return false
      if (minimum !== null && product.price < minimum) return false
      if (maximum !== null && product.price > maximum) return false
      if (query) {
        const haystack = `${product.name} ${product.description}`.toLowerCase()
        if (!haystack.includes(query)) return false
      }
      return true
    })

    return [...list].sort((a, b) => {
      if (sort === 'price_asc') return a.price - b.price
      if (sort === 'price_desc') return b.price - a.price
      if (sort === 'name') return a.name.localeCompare(b.name)
      return b.id - a.id
    })
  }, [category, searchInput, minPrice, maxPrice, size, sort])

  const clearFilters = () => {
    setCategory('')
    setSearchInput('')
    setMinPrice('')
    setMaxPrice('')
    setSize('')
    setSort('newest')
  }

  const activeFilters = [category, searchInput, minPrice, maxPrice, size].filter(Boolean).length

  const filterPanel = (
    <div className="space-y-7">
      <div>
        <p className="label">Search</p>
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/35" />
          <input
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search the collection"
            className="field pl-10"
          />
        </div>
      </div>

      <div>
        <p className="label">Category</p>
        <div className="space-y-2">
          <button
            onClick={() => setCategory('')}
            className={`block w-full text-left text-sm transition ${
              !category ? 'font-bold text-ink' : 'text-ink/50 hover:text-ink'
            }`}
          >
            All products
          </button>
          {categories.map((item) => (
            <button
              key={item.slug}
              onClick={() => setCategory(item.slug)}
              className={`block w-full text-left text-sm transition ${
                category === item.slug ? 'font-bold text-ink' : 'text-ink/50 hover:text-ink'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="label">Price range ({store.currency_symbol})</p>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            value={minPrice}
            onChange={(event) => setMinPrice(event.target.value)}
            placeholder="Min"
            className="field px-3 py-2.5"
          />
          <span className="text-ink/30">—</span>
          <input
            type="number"
            min="0"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
            placeholder="Max"
            className="field px-3 py-2.5"
          />
        </div>
      </div>

      <div>
        <p className="label">Size</p>
        <select value={size} onChange={(event) => setSize(event.target.value)} className="field">
          <option value="">Any size</option>
          {allSizes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {activeFilters > 0 && (
        <button
          onClick={clearFilters}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-gold"
        >
          <X size={13} /> Clear all filters
        </button>
      )}
    </div>
  )

  return (
    <div className="container-page py-10 sm:py-14">
      <div className="flex flex-col gap-5 border-b border-ink/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">The collection</p>
          <h1 className="mt-2 font-display text-5xl leading-none tracking-wide sm:text-7xl">
            Shop all
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-6 text-ink/45">
            Bags, footwear, denim and finishing touches. Everything is ready to move.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setFiltersOpen(true)}
            className="btn-outline px-5 py-2.5 lg:hidden"
          >
            <Filter size={15} /> Filters
            {activeFilters > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] text-ink">
                {activeFilters}
              </span>
            )}
          </button>
          <div className="relative">
            <SlidersHorizontal
              size={14}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/35"
            />
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="field appearance-none py-3 pl-9 pr-9 text-xs font-semibold"
            >
              {sorts.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-10 pt-8 lg:grid-cols-[230px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-32">{filterPanel}</div>
        </aside>

        <div>
          <div className="mb-6 flex items-center justify-between">
            <p className="text-xs text-ink/45">
              {loading ? 'Loading products…' : `${filtered.length} product${filtered.length === 1 ? '' : 's'}`}
            </p>
            {activeFilters > 0 && (
              <button
                onClick={clearFilters}
                className="text-[11px] font-bold uppercase tracking-[0.14em] text-gold lg:hidden"
              >
                Clear filters
              </button>
            )}
          </div>

          {loading ? (
            <ProductGridSkeleton count={9} />
          ) : filtered.length === 0 ? (
            <EmptyState
              title="No matches yet"
              description="Try clearing a filter or searching for something else."
              actionLabel="Clear filters"
              onAction={clearFilters}
            />
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3">
              {filtered.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>

      {filtersOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <button
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={() => setFiltersOpen(false)}
            aria-label="Close filters"
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[88vh] overflow-y-auto rounded-t-[2rem] bg-paper p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-3xl tracking-wide">Filters</h2>
              <button
                onClick={() => setFiltersOpen(false)}
                className="rounded-full p-2 hover:bg-ink/5"
              >
                <X size={20} />
              </button>
            </div>
            {filterPanel}
            <button onClick={() => setFiltersOpen(false)} className="btn-dark mt-7 w-full">
              Show {filtered.length} product{filtered.length === 1 ? '' : 's'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
