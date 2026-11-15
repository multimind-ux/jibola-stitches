import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { lineTotal } from '../lib/catalog'

const CartContext = createContext(null)
const STORAGE_KEY = 'js_cart_v1'

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = (product, { size = '', color = '', quantity = 1, maxStock = 99 } = {}) => {
    const key = `${product.id}-${size}-${color}`
    setItems((current) => {
      const existing = current.find((item) => item.key === key)
      if (existing) {
        return current.map((item) =>
          item.key === key
            ? {
                ...item,
                quantity: Math.min(item.quantity + quantity, item.maxStock || maxStock),
              }
            : item,
        )
      }
      return [
        ...current,
        {
          key,
          product_id: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          image: product.images?.[0] || '',
          size,
          color,
          quantity: Math.min(quantity, maxStock),
          maxStock,
          bundle_offer: product.bundle_offer || null,
        },
      ]
    })
    setIsOpen(true)
  }

  const updateQuantity = (key, quantity) => {
    setItems((current) =>
      current.map((item) =>
        item.key === key
          ? {
              ...item,
              quantity: Math.max(1, Math.min(Number(quantity) || 1, item.maxStock || 99)),
            }
          : item,
      ),
    )
  }

  const removeItem = (key) => {
    setItems((current) => current.filter((item) => item.key !== key))
  }

  const clearCart = () => setItems([])

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + lineTotal(item), 0),
    [items],
  )
  const count = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  )

  return (
    <CartContext.Provider
      value={{
        items,
        subtotal,
        count,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}
