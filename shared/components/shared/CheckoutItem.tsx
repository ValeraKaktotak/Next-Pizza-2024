'use client'

import { X } from 'lucide-react'
import React from 'react'

//Libs
import { cn } from '@/shared/lib/utils'

//Types
import type { CartItemProps } from '@/shared/components/shared/cart-item-details/CartItemDetails.types'

//Components
import * as CartItemDetails from '@/shared/components/shared/cart-item-details'
import { CountButton } from '@/shared/components/shared/CountButton'

interface Props extends CartItemProps {
  onClickCountButton?: (type: 'plus' | 'minus') => void
  onClickRemove?: () => void
  className?: string
}

export const CheckoutItem: React.FC<Props> = ({
  name,
  price,
  imageUrl,
  quantity,
  details,
  className,
  disabled,
  onClickCountButton,
  onClickRemove
}) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between',
        {
          'pointer-events-none opacity-50': disabled
        },
        className
      )}
    >
      <div className='flex flex-1 items-center gap-5'>
        <CartItemDetails.Image src={imageUrl} />
        <CartItemDetails.Info name={name} details={details} />
      </div>

      <CartItemDetails.Price value={price} />

      <div className='ml-20 flex items-center gap-5'>
        <CountButton onClick={onClickCountButton} value={quantity} />
        <button type='button' onClick={onClickRemove}>
          <X
            className='cursor-pointer text-gray-400 hover:text-gray-600'
            size={20}
          />
        </button>
      </div>
    </div>
  )
}
