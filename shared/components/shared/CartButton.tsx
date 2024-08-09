import { ArrowRight, ShoppingCart } from 'lucide-react'
import React from 'react'

//Utils
import { cn } from '@/shared/lib/utils'

//Components
import { Button } from '@/shared/components/ui'
import { CartDrawer } from './CartDrawer'

interface Props {
  className?: string
}
/** TODO button -> button is wrong !!!*/

export const CartButton: React.FC<Props> = ({ className }) => {
  return (
    <CartDrawer>
      <Button className={cn(className, 'group relative flex items-center')}>
        <b>520 ₽</b>
        <span className='mx-3 h-full w-[1px] bg-white/30' />
        <div className='flex items-center gap-1 transition duration-300 group-hover:opacity-0'>
          <ShoppingCart size={16} strokeWidth={2} />
          <b>3</b>
        </div>
        <ArrowRight
          size={20}
          className='absolute right-5 -translate-x-2 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100'
        />
      </Button>
    </CartDrawer>
  )
}
