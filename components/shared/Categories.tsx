import React from 'react'

//Utils
import { cn } from '@/lib/utils'

interface Props {
  className?: string
}

const cats = [
  'Пиццы',
  'Комбо',
  'Закуски',
  'Коктейли',
  'Кофе',
  'Напитки',
  'Десерты'
]
const activeIndex = 0

export const Categories: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn('inline-flex gap-1 rounded-2xl bg-gray-50 p-1', className)}
    >
      {cats.map((cat, index) => (
        <a
          key={index}
          className={cn(
            'flex h-11 items-center rounded-2xl px-5 font-bold',
            activeIndex === index &&
              'bg-white text-primary shadow-md shadow-gray-200'
          )}
        >
          <button>{cat}</button>
        </a>
      ))}
    </div>
  )
}
