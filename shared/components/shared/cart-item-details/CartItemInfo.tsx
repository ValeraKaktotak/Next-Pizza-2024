import { cn } from '@/shared/lib/utils'
import { FC } from 'react'

interface Props {
  name: string
  details: string
  className?: string
}

export const CartItemInfo: FC<Props> = ({ name, details, className }) => {
  return (
    <div>
      <div className={cn('flex items-center justify-between', className)}>
        <h2 className='flex-1 text-lg font-bold leading-6'>{name}</h2>
      </div>
      {details && <p className='w-[90%] text-xs text-gray-400'>{details}</p>}
    </div>
  )
}
