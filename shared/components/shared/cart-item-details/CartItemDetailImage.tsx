import { cn } from '@/shared/lib/utils'
import { FC } from 'react'

interface Props {
  src: string
  className?: string
}

export const CartItemDetailsImage: FC<Props> = ({ src, className }) => {
  return <img className={cn('h-[60px] w-[60px]', className)} src={src} />
}
