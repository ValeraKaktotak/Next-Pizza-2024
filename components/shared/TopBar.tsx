import React from 'react'

//Utils
import { cn } from '@/lib/utils'

//Types
import type { Category } from '@prisma/client'

//Components
import { Categories, Container, SortPopUp } from '@/components/shared'

interface Props {
  className?: string
  categories: Category[]
}

export const TopBar: React.FC<Props> = ({ className, categories }) => {
  return (
    <div
      className={cn(
        'sticky top-0 z-10 bg-white py-5 shadow-lg shadow-black/5',
        className
      )}
    >
      <Container className='flex items-center justify-between'>
        <Categories items={categories} />
        <SortPopUp />
      </Container>
    </div>
  )
}
