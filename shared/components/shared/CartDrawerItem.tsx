import { FC } from 'react'

//Utils
import { cn } from '@/shared/lib/utils'

//Types
import type { CartItemProps } from './cart-item-details/CartItemDetails.types'

//Components
import * as CartItem from '@/shared/components/shared/cart-item-details'

interface Props extends CartItemProps {
  className?: string
}

export const CartDrawerItem: FC<Props> = ({
  imageUrl,
  name,
  price,
  quantity,
  details,
  disabled,
  onClickCountButton,
  onClickRemove,
  className
}) => {
  return (
    <div className={cn('flex gap-6 bg-white p-5', className)}>
      <CartItem.Image src={imageUrl} />
      <div className='flex-1'></div>
    </div>
  )
}
