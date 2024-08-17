import { useEffect } from 'react'

//Store
import { useCartStore } from '@/shared/store/cart'

//Types
import { CartStateItem } from '@/shared/lib/getCartDetails'
import { CreateCartItemValues } from '@/shared/services/dto/cart.dto'

type ReturnProps = {
  totalAmount: number
  items: CartStateItem[]
  loading: boolean
  updateItemQuantity: (id: number, quantity: number) => void
  removeCartItem: (id: number) => void
  addCartItem: (values: CreateCartItemValues) => void
}

export const useCart = (): ReturnProps => {
  const cartState = useCartStore((state) => state)

  useEffect(() => {
    cartState.fetchCartItems()
  }, [])

  return cartState
}
