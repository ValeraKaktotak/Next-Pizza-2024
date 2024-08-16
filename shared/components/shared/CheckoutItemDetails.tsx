import React from 'react'

//Libs
import { cn } from '@/shared/lib/utils'

interface Props {
  title?: React.ReactNode
  value?: string
  className?: string
}

export const CheckoutItemDetails: React.FC<Props> = ({
  className,
  title,
  value
}) => {
  return (
    <div className={cn('my-4 flex', className)}>
      <div className='flex flex-1 text-lg text-neutral-500'>
        {title}:
        <div className='relative -top-1 mx-2 flex-1 border-b border-dashed border-b-neutral-200' />
      </div>

      <span className='text-lg font-bold'>{value} ₽</span>
    </div>
  )
}
