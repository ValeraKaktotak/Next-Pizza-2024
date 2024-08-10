'use client'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React, { FC, useEffect } from 'react'

//Utils
import { cn } from '@/shared/lib/utils'

//Store
import { useCartStore } from '@/shared/store/cart'

//Components
import { CartDrawerItem } from '@/shared/components/shared/CartDrawerItem'
import { Button } from '@/shared/components/ui'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/shared/components/ui/sheet'
import { PizzaSize, PizzaType } from '@/shared/constants/pizza'
import { getCartItemDetails } from '@/shared/lib/getCartItemDetails'

interface Props {
  className?: string
}

export const CartDrawer: FC<React.PropsWithChildren<Props>> = ({
  className,
  children
}) => {
  const [fetchCartItems, updateItemQuantity, totalAmount, items] = useCartStore(
    (state) => [
      state.fetchCartItems,
      state.updateItemQuantity,
      state.totalAmount,
      state.items
    ]
  )

  useEffect(() => {
    fetchCartItems()
  }, [])

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: 'plus' | 'minus'
  ) => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1
    updateItemQuantity(id, newQuantity)
  }

  return (
    <div className={cn(className)}>
      <Sheet>
        <SheetTrigger>{children}</SheetTrigger>
        <SheetContent className='flex flex-col justify-between bg-[#f4f1ee] pb-0'>
          <SheetHeader>
            <SheetTitle>
              В корзине <span className='font-bold'>{items.length} товара</span>
            </SheetTitle>
          </SheetHeader>

          <div className='-mx-6 mt-5 flex-1 overflow-auto'>
            {items.map((item) => (
              <CartDrawerItem
                key={item.id}
                id={item.id}
                imageUrl={item.imageUrl}
                details={
                  item.pizzaType && item.pizzaSize
                    ? getCartItemDetails({
                        ingredients: item.ingredients,
                        pizzaType: item.pizzaType as PizzaType,
                        pizzaSize: item.pizzaSize as PizzaSize
                      })
                    : ''
                }
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                onClickCountButton={(type) => {
                  onClickCountButton(item.id, item.quantity, type)
                }}
              />
            ))}
          </div>

          <SheetFooter className='-mx-6 bg-white p-8'>
            <div className='w-full'>
              <div className='mb-4 flex'>
                <span className='flex flex-1 text-lg text-neutral-500'>
                  Итого
                  <div className='relative -top-1 mx-2 flex-1 border-b border-dashed border-b-neutral-200' />
                </span>

                <span className='text-lg font-bold'>{totalAmount} ₽</span>
              </div>

              <Link href='/checkout'>
                <Button type='submit' className='h-12 w-full text-base'>
                  Оформить заказ
                  <ArrowRight className='ml-2 w-5' />
                </Button>
              </Link>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
