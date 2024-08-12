'use client'
import React from 'react'

//Utils
import { cn } from '@/shared/lib/utils'

//Constants
import { pizzaTypes } from '@/shared/constants/pizza'

//Types
import type { PizzaSize, PizzaType } from '@/shared/constants/pizza'
import type { Ingredient, ProductItem } from '@prisma/client'

//Hooks
import { usePizzaOptions } from '@/shared/hooks'

//Components
import {
  GroupVariants,
  IngredientItem,
  PizzaImage,
  Title
} from '@/shared/components/shared'
import { Button } from '@/shared/components/ui'
import { getPizzaDetails } from '@/shared/lib/getPizzaDetails'

interface Props {
  imageUrl: string
  name: string
  ingredients: Ingredient[]
  variants: ProductItem[]
  onSubmit: (itemId: number, ingredients: number[]) => void
  className?: string
}

export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  imageUrl,
  ingredients,
  variants,
  onSubmit,
  className
}) => {
  const {
    addIngredient,
    availablePizzaSizes,
    selectedIngredients,
    currentItemId,
    size,
    type,
    setSize,
    setType
  } = usePizzaOptions(variants)

  const { textDetail, totalPrice } = getPizzaDetails({
    ingredients,
    selectedIngredients,
    size,
    type,
    variants
  })

  const handleClickAdd = () => {
    if (currentItemId) {
      onSubmit(currentItemId, Array.from(selectedIngredients))
    }
  }

  return (
    <div className={cn(className, 'flex flex-1')}>
      <PizzaImage imageUrl={imageUrl} alt={name} size={size} />

      <div className='w-[490px] bg-[#f7f6f5] p-7'>
        <Title text={name} size='md' className='mb-1 font-extrabold' />

        <p className='text-gray-400'>{textDetail}</p>

        <div className='mt-5 flex flex-col gap-4'>
          <GroupVariants
            items={availablePizzaSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />
          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className='scrollbar mt-5 h-[420px] overflow-auto rounded-md bg-gray-50 p-5'>
          <div className='grid grid-cols-3 gap-3'>
            {ingredients?.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                imageUrl={ingredient.imageUrl}
                name={ingredient.name}
                price={ingredient.price}
                onClick={() => addIngredient(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          onClick={handleClickAdd}
          className='mt-10 h-[55px] w-full rounded-[18px] px-10 text-base'
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  )
}
