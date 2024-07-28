import React from 'react'

//Utils
import { cn } from '@/lib/utils'

//Components
import { Categories, Container, SortPopUp } from '@/components/shared'

interface Props {
  className?: string
}

export const TopBar: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        'sticky top-0 z-10 bg-white py-5 shadow-lg shadow-black/5',
        className
      )}
    >
      <Container className='flex items-center justify-between'>
        <Categories />
        <SortPopUp />
      </Container>
    </div>
  )
}
