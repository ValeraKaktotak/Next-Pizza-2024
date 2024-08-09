import { FC } from 'react'

//Utils
import { cn } from '@/shared/lib/utils'

interface Props {
  value: number
  className?: string
}

export const CartItemDetailsPrice: FC<Props> = ({ value, className }) => {
  return <h2 className={cn('font-bold', className)}>{value} ₽</h2>
}
