'use client'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { useRouter } from 'next/navigation'
import React from 'react'

//Utils
import { cn } from '@/shared/lib/utils'

//Types
import { ProductWithRelations } from '@/@types/product'

//Components
import { ChoosePizzaForm, ChooseProductForm } from '@/shared/components/shared'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/shared/components/ui/dialog'

interface Props {
  product: ProductWithRelations
  className?: string
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter()
  const isPizzaForm = Boolean(product.variants[0].pizzaType)

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
          'min-h-[500px] w-full max-w-[1060px] overflow-hidden bg-white p-0',
          className
        )}
      >
        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={[]}
          />
        ) : (
          <ChooseProductForm imageUrl={product.imageUrl} name={product.name} />
        )}
      </DialogContent>
    </Dialog>
  )
}
