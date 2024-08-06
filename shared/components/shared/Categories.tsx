'use client'
import React from 'react'

//Store
import { useCategoryStore } from '@/shared/store/category'

//Types
import type { Category } from '@prisma/client'

//Utils
import { cn } from '@/shared/lib/utils'

interface Props {
  className?: string
  items: Category[]
}

export const Categories: React.FC<Props> = ({ items, className }) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId)

  return (
    <div
      className={cn('inline-flex gap-1 rounded-2xl bg-gray-50 p-1', className)}
    >
      {items?.map(({ name, id }, index) => (
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
