'use client'
import React from 'react'

//Store
import { useCategoryStore } from '@/store/category'

//Utils
import { cn } from '@/lib/utils'

interface Props {
  className?: string
}

const cats = [
  { id: 1, name: 'Пиццы' },
  { id: 2, name: 'Комбо' },
  { id: 3, name: 'Закуски' },
  { id: 4, name: 'Коктейли' },
  { id: 5, name: 'Кофе' },
  { id: 6, name: 'Напитки' },
  { id: 7, name: 'Десерты' }
]

export const Categories: React.FC<Props> = ({ className }) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId)

  return (
    <div
      className={cn('inline-flex gap-1 rounded-2xl bg-gray-50 p-1', className)}
    >
      {cats.map(({ name, id }, index) => (
        <a
          href={`#${name}`}
          key={index}
          className={cn(
            'flex h-11 items-center rounded-2xl px-5 font-bold',
            categoryActiveId === id &&
              'bg-white text-primary shadow-md shadow-gray-200'
          )}
        >
          <button>{name}</button>
        </a>
      ))}
    </div>
  )
}
