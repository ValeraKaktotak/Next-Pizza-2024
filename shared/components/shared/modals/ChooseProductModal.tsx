'use client'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { useRouter } from 'next/navigation'
import React from 'react'

//Utils
import { cn } from '@/shared/lib/utils'

//Types
import { ProductWithRelations } from '@/@types/product'

//Store
import { useCartStore } from '@/shared/store/cart'

//Components
import { ChoosePizzaForm, ChooseProductForm } from '@/shared/components/shared'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/shared/components/ui/dialog'
import toast from 'react-hot-toast'

interface Props {
  product: ProductWithRelations
  className?: string
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter()
  const firstItem = product.variants[0]
  const isPizzaForm = Boolean(firstItem.pizzaType)
  const addCartItem = useCartStore((state) => state.addCartItem)

  const onAddProduct = () => {
    addCartItem({
      productItemId: firstItem.id
    })
  }
  const onAddPizza = async (productItemId: number, ingredients: number[]) => {
    try {
      await addCartItem({
        productItemId,
        ingredients
      })
      toast.success('Пицца добавлена в корзину')
    } catch (error) {
      toast.error('Не удалось добавить пиццу в корзину')
      console.error(error)
    }
  }

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogTitle>
        <VisuallyHidden.Root>Product Modal</VisuallyHidden.Root>
      </DialogTitle>
      <DialogDescription>
        <VisuallyHidden.Root>Product Modal Description</VisuallyHidden.Root>
      </DialogDescription>
      <DialogContent
        className={cn(
          'max-h-screen min-h-[550px] w-full max-w-[1060px] overflow-hidden bg-white p-0',
          className
        )}
      >
        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            variants={product.variants}
            onSubmit={onAddPizza}
          />
        ) : (
          <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            onSubmit={onAddProduct}
            price={firstItem.price}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
