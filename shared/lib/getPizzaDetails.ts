//Types
import type { Ingredient, ProductItem } from '@prisma/client'
import type { PizzaSize, PizzaType } from '../constants/pizza'

//Constants
import { mapPizzaType } from '@/shared/constants/pizza'

//Libs
import { unionPizzaPrice } from './unionPizzaPrice'

interface getPizzaDetailsProps {
  type: PizzaType
  size: PizzaSize
  variants: ProductItem[]
  ingredients: Ingredient[]
  selectedIngredients: Set<number>
}

/**
 * Функция для расчета финальной стоимости и описания пиццы
 */
export const getPizzaDetails = ({
  variants,
  ingredients,
  selectedIngredients,
  type,
  size
}: getPizzaDetailsProps) => {
  const totalPrice = unionPizzaPrice({
    type,
    size,
    variants,
    ingredients,
    selectedIngredients
  })

  const textDetail = `${size} см, ${mapPizzaType[type]} пицца.`

  return { totalPrice, textDetail }
}
