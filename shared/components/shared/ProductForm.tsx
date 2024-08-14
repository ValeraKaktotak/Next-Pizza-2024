'use client'
import React from 'react'
import toast from 'react-hot-toast'

//Store
import { useCartStore } from '@/shared/store/cart'

//Types
import { ProductWithRelations } from '@/@types/product'

//Components
import { ChoosePizzaForm, ChooseProductForm } from '@/shared/components/shared'

interface Props {
  product: ProductWithRelations
  onSubmit?: VoidFunction
  className?: string
}

export const ProductForm: React.FC<Props> = ({
  product,
  onSubmit: _onSubmit
}) => {
  const [addCartItem, loading] = useCartStore((state) => [
    state.addCartItem,
    state.loading
  ])

  const firstItem = product.variants[0]
  const isPizzaForm = Boolean(firstItem.pizzaType)

  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = productItemId ?? firstItem.id

      await addCartItem({
        productItemId: itemId,
        ingredients
      })
      toast.success(product.name + ' добавлен в корзину')

      _onSubmit?.()
    } catch (error) {
      toast.error('Не удалось добавить товар в корзину')
      console.error(error)
    }
  }

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        variants={product.variants}
        onSubmit={onSubmit}
        loading={loading}
      />
    )
  }

  return (
    <ChooseProductForm
      imageUrl={product.imageUrl}
      name={product.name}
      onSubmit={onSubmit}
      price={firstItem.price}
      loading={loading}
    />
  )
}
