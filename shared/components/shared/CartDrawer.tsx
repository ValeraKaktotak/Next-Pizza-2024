'use client'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC, useState } from 'react'

//Libs
import { getCartItemDetails } from '@/shared/lib/getCartItemDetails'
import { cn } from '@/shared/lib/utils'

//Hooks -> Store
import { useCart } from '@/shared/hooks'

//Types
import type { PizzaSize, PizzaType } from '@/shared/constants/pizza'

//Components
import { CartDrawerItem, Title } from '@/shared/components/shared'
import { Button } from '@/shared/components/ui'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/shared/components/ui/sheet'

export const CartDrawer: FC<React.PropsWithChildren> = ({ children }) => {
  const { totalAmount, items, onClickCountButton, removeCartItem } = useCart()
  const [redirecting, setRedirecting] = useState<boolean>(false)

  return (
    <div>
      <Sheet>
        <SheetTrigger>{children}</SheetTrigger>
        <SheetContent className='flex flex-col justify-between bg-[#f4f1ee] pb-0'>
          <div
            className={cn(
              'flex h-full flex-col',
              !totalAmount && 'justify-center'
            )}
          >
            {totalAmount > 0 && (
              <SheetHeader>
                <SheetTitle>
                  В корзине{' '}
                  <span className='font-bold'>{items.length} товара</span>
                </SheetTitle>
              </SheetHeader>
            )}

            {!totalAmount && (
              <div className='mx-auto flex w-72 flex-col items-center justify-center'>
                <Image
                  src='/images/tools/empty-box.png'
                  alt='Empty cart'
                  width={120}
                  height={120}
                />
                <Title
                  size='sm'
                  text='Корзина пустая'
                  className='my-2 text-center font-bold'
                />
                <p className='mb-5 text-center text-neutral-500'>
                  Добавьте хотя бы одну пиццу, чтобы совершить заказ
                </p>

                <SheetClose>
                  <Button className='h-12 w-56 text-base' size='lg'>
                    <ArrowLeft className='mr-2 w-5' />
                    Вернуться назад
                  </Button>
                </SheetClose>
              </div>
            )}

            {totalAmount > 0 && (
              <>
                <div className='-mx-6 mt-5 flex-1 overflow-auto'>
                  {items.map((item) => (
                    <CartDrawerItem
                      key={item.id}
                      id={item.id}
                      imageUrl={item.imageUrl}
                      disabled={item.disabled}
                      details={getCartItemDetails({
                        ingredients: item.ingredients,
                        pizzaType: item.pizzaType as PizzaType,
                        pizzaSize: item.pizzaSize as PizzaSize
                      })}
                      name={item.name}
                      price={item.price}
                      quantity={item.quantity}
                      onClickCountButton={(type) => {
                        onClickCountButton(item.id, item.quantity, type)
                      }}
                      onClickRemove={() => removeCartItem(item.id)}
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
                      <Button
                        loading={redirecting}
                        onClick={() => setRedirecting(true)}
                        type='submit'
                        className='h-12 w-full text-base'
                      >
                        Оформить заказ
                        <ArrowRight className='ml-2 w-5' />
                      </Button>
                    </Link>
                  </div>
                </SheetFooter>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
