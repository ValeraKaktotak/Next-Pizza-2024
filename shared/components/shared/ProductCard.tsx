import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

//Types
import type { Ingredient } from '@prisma/client'

//Components
import { Title } from '@/shared/components/shared'
import { Button } from '@/shared/components/ui'

interface Props {
  id: number
  name: string
  price: number
  imageUrl: string
  ingredients: Ingredient[]
  className?: string
}

export const ProductCard: React.FC<Props> = ({
  className,
  id,
  name,
  price,
  imageUrl,
  ingredients
}) => {
  return (
    <article className={className}>
      <Link href={`/product/${id}`}>
        <div className='flex h-[260px] justify-center rounded-lg bg-secondary p-6'>
          <img className='h-[215px] w-[215px]' src={imageUrl} alt={name} />
        </div>

        <Title text={name} size='sm' className='mb-1 mt-3 font-bold' />

        <p className='text-sm text-gray-400'>
          {ingredients.map((ingredient) => ingredient.name).join(', ')}
        </p>

        <div className='mt-4 flex items-center justify-between'>
          <span className='text-[20px]'>
            от <b>{price} ₽</b>
          </span>

          <Button variant='secondary' className='text-base font-bold'>
            <Plus size={20} className='mr-1' />
            Добавить
          </Button>
        </div>
      </Link>
    </article>
  )
}
