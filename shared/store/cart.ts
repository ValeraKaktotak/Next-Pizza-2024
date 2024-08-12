import { create } from 'zustand'

//Services
import { Api } from '@/shared/services/api-client'

//Types
import type { CreateCartItemValues } from '../services/dto/cart.dto'

//Libs
import { getCartDetails } from '@/shared/lib/getCartDetails'

export type CartStateItem = {
  id: number
  quantity: number
  name: string
  imageUrl: string
  price: number
  disabled?: boolean
  pizzaSize?: number | null
  pizzaType?: number | null
  ingredients: Array<{ name: string; price: number }>
}

export interface CartState {
  loading: boolean
  error: boolean
  totalAmount: number
  items: CartStateItem[]

  /* Получение товаров из корзины */
  fetchCartItems: () => Promise<void>

  /* Запрос на обновление количества товара */
  updateItemQuantity: (id: number, quantity: number) => Promise<void>

  /* Запрос на добавление товара в корзину */
  addCartItem: (values: CreateCartItemValues) => Promise<void>

  /* Запрос на удаление товара из корзины */
  removeCartItem: (id: number) => Promise<void>
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  error: false,
  loading: true,
  totalAmount: 0,

  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false })
      const data = await Api.cart.getCart()
      set(getCartDetails(data))
    } catch (error) {
      console.error(error)
      set({ error: true })
    } finally {
      set({ loading: false })
    }
  },

  updateItemQuantity: async (id: number, quantity: number) => {
    try {
      set({ loading: true, error: false })
      const data = await Api.cart.updateItemQuantity(id, quantity)
      set(getCartDetails(data))
    } catch (error) {
      console.error(error)
      set({ error: true })
    } finally {
      set({ loading: false })
    }
  },

  removeCartItem: async (id: number) => {
    try {
      set({ loading: true, error: false })
      const data = await Api.cart.removeCartItem(id)
      set(getCartDetails(data))
    } catch (error) {
      console.error(error)
      set({ error: true })
    } finally {
      set({ loading: false })
    }
  },

  addCartItem: async (values: CreateCartItemValues) => {
    try {
      set({ loading: true, error: false })
      const data = await Api.cart.addCartItem(values)
      set(getCartDetails(data))
    } catch (error) {
      console.error(error)
      set({ error: true })
    } finally {
      set({ loading: false })
    }
  }
}))
