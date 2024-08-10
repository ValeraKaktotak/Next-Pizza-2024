'use client'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React, { FC } from 'react'

//Utils
import { cn } from '@/shared/lib/utils'

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
import { getCartItemDetails } from '@/shared/lib/getCartItemDetails'

interface Props {
  className?: string
}

export const CartDrawer: FC<React.PropsWithChildren<Props>> = ({
  className,
  children
}) => {
  return (
    <div className={cn(className)}>
      <Sheet>
        <SheetTrigger>{children}</SheetTrigger>
        <SheetContent className='flex flex-col justify-between bg-[#f4f1ee] pb-0'>
          <SheetHeader>
            <SheetTitle>
              В корзине <span className='font-bold'>3 товара</span>
            </SheetTitle>
          </SheetHeader>

          <div className='-mx-6 mt-5 flex-1 overflow-auto'>
            <CartDrawerItem
              id={1}
              imageUrl={'http://localhost:3000/images/pizzas/Cheese.webp'}
              details={getCartItemDetails({
                pizzaType: 2,
                pizzaSize: 30,
                ingredients: [{ name: 'test1' }, { name: 'test2' }]
              })}
              name={'Чоризо Фреш'}
              price={419}
              quantity={1}
            />
            <CartDrawerItem
              id={1}
              imageUrl={'http://localhost:3000/images/pizzas/Cheese.webp'}
              details={getCartItemDetails({
                pizzaType: 2,
                pizzaSize: 30,
                ingredients: [{ name: 'test1' }, { name: 'test2' }]
              })}
              name={'Чоризо Фреш'}
              price={419}
              quantity={1}
            />
          </div>

          <SheetFooter className='-mx-6 bg-white p-8'>
            <div className='w-full'>
              <div className='mb-4 flex'>
                <span className='flex flex-1 text-lg text-neutral-500'>
                  Итого
                  <div className='relative -top-1 mx-2 flex-1 border-b border-dashed border-b-neutral-200' />
                </span>

                <span className='text-lg font-bold'>500 ₽</span>
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
