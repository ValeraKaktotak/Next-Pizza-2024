import { Trash2Icon } from 'lucide-react'
import { FC } from 'react'

//Utils
import { cn } from '@/shared/lib/utils'

//Types
import type { CartItemProps } from '@/shared/components/shared/cart-item-details/CartItemDetails.types'

//Components
import * as CartItem from '@/shared/components/shared/cart-item-details'
import { CountButton } from '@/shared/components/shared/CountButton'

interface Props extends CartItemProps {
  onClickCountButton?: (type: 'plus' | 'minus') => void
  onClickRemove?: () => void
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
    <div className={cn('mb-2 flex gap-6 bg-white p-5', className)}>
      <CartItem.Image src={imageUrl} />
      <div className='flex-1'>
        <CartItem.Info name={name} details={details} />

        <hr className='my-3' />

        <div className='flex items-center justify-between'>
          <CountButton onClick={onClickCountButton} value={quantity} />

          <div className='flex items-center gap-3'>
            <CartItem.Price value={price} />
            <Trash2Icon
              className='cursor-pointer text-gray-400 hover:text-gray-600'
              size={16}
              onClick={onClickRemove}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
