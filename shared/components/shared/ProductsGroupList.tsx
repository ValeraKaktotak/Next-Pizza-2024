'use client'
import React, { useEffect, useRef } from 'react'
import { useIntersection } from 'react-use'

//Utils
import { cn } from '@/shared/lib/utils'

//Store
import { useCategoryStore } from '@/shared/store/category'

//Components
import { ProductCard, Title } from '@/shared/components/shared'
import { Ingredient, Product, ProductItem } from '@prisma/client'

type ProductWithRelations = Product & {
  variants: ProductItem[]
  ingredients: Ingredient[]
}

interface Props {
  title: string
  items: ProductWithRelations[]
  categoryId: number
  listClassName?: string
  className?: string
}

export const ProductsGroupList: React.FC<Props> = ({
  title,
  items,
  listClassName,
  categoryId,
  className
}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId)
  const intersectionRef = useRef(null)
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4
  })

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId)
    }
  }, [categoryId, intersection?.isIntersecting, title])

  return (
    <article className={className} id={title} ref={intersectionRef}>
      <Title text={title} size='lg' className='mb-5 font-extrabold' />

      <div
        className={cn(
          'grid grid-cols-1 gap-[50px] sm:grid-cols-2 lg:grid-cols-3',
          listClassName
        )}
      >
        {items.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.variants[0].price}
            ingredients={product.ingredients}
          />
        ))}
      </div>
    </article>
  )
}
