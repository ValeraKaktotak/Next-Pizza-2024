import { ArrowUpDown } from 'lucide-react'
import React from 'react'

//Utils
import { cn } from '@/shared/lib/utils'

interface Props {
  className?: string
}

export const SortPopUp: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        className,
        'hidden h-[52px] cursor-pointer items-center gap-1 rounded-2xl bg-gray-50 px-5 lg:inline-flex'
      )}
    >
      <ArrowUpDown size={16} />
      <b>Сортировка:</b>
      <b className='text-primary'>популярное</b>
    </div>
  )
}
