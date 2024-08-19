'use client'
import { ArrowRight, Loader, ShoppingCart } from 'lucide-react'
import React from 'react'

//Utils
import { cn } from '@/shared/lib/utils'

//Components
import { useCartStore } from '@/shared/store/cart'
import { CartDrawer } from './CartDrawer'

interface Props {
  className?: string
}

export const CartButton: React.FC<Props> = ({ className }) => {
  const [totalAmount, loading, items] = useCartStore((state) => [
    state.totalAmount,
    state.loading,
    state.items
  ])
  return (
    <CartDrawer>
      {loading ? (
        <div className='pointer-events-none inline-flex h-10 w-[105px] items-center justify-center whitespace-nowrap rounded-md bg-gray-500 bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-50 ring-offset-background'>
          <Loader className='h-5 w-5 animate-spin' />
        </div>
      ) : (
        <div
          className={cn(
            className,
            'group relative flex items-center',
            'inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:translate-y-[1px]'
          )}
        >
          <b>{totalAmount} ₽</b>
          <span className='mx-3 h-full w-[1px] bg-white/30' />
          <div className='flex items-center gap-1 transition duration-300 group-hover:opacity-0'>
            <ShoppingCart size={16} strokeWidth={2} />
            <b>{items.length}</b>
          </div>
          <ArrowRight
            size={20}
            className='absolute right-5 -translate-x-2 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100'
          />
        </div>
      )}
    </CartDrawer>
  )
}
