'use client'
import React, { useEffect, useState } from 'react'
import { useSet } from 'react-use'

//Utils
import { getAvailablePizzaSizes } from '@/shared/lib/getAvailablePizzaSizes'
import { unionPizzaPrice } from '@/shared/lib/unionPizzaPrice'
import { cn } from '@/shared/lib/utils'

//Constants
import { mapPizzaType, pizzaTypes } from '@/shared/constants/pizza'

//Types
import type { PizzaSize, PizzaType } from '@/shared/constants/pizza'
import type { Ingredient, ProductItem } from '@prisma/client'

//Components
import {
  GroupVariants,
  IngredientItem,
  PizzaImage,
  Title
} from '@/shared/components/shared'
import { Button } from '@/shared/components/ui'

interface Props {
  imageUrl: string
  name: string
  ingredients: Ingredient[]
  variants: ProductItem[]
  onSubmit?: () => void
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
  const [size, setSize] = useState<PizzaSize>(20)
  const [type, setType] = useState<PizzaType>(1)

  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([])
  )

  const totalPrice = unionPizzaPrice({
    type,
    size,
    variants,
    ingredients,
    selectedIngredients
  })
  const availablePizzaSizes = getAvailablePizzaSizes({ type, variants })

  const textDetail = `${size} см, ${mapPizzaType[type]} пицца.`

  //selecting available pizzaSize variant
  useEffect(() => {
    const isAvailableSize = availablePizzaSizes?.find(
      (item) => Number(item.value) === size && !item.disabled
    )
    const availableSize = availablePizzaSizes?.find((item) => !item.disabled)
    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize)
    }
  }, [type])

  const handleClickAdd = () => {
    onSubmit?.()
    console.log({
      size,
      type,
      extraIngredients: selectedIngredients,
      price: totalPrice
    })
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
