import React from 'react'

//Utils
import { cn } from '@/shared/lib/utils'

//Types
import type { Category } from '@prisma/client'

//Components
import {
  Categories,
  Container,
  MobileFilters,
  SortPopUp
} from '@/shared/components/shared'

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
      <Container className='flex flex-wrap items-center justify-between gap-5 sm:gap-0'>
        <Categories items={categories} />
        <SortPopUp />

        {/*Mobile Navigation */}
        <div className='lg:hidden'>
          <MobileFilters />
        </div>
      </Container>
    </div>
  )
}
