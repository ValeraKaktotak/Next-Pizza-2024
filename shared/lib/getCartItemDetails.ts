//Types
import { type PizzaSize, type PizzaType } from '@/shared/constants/pizza'
import type { Ingredient } from '@prisma/client'

//Constants
import { mapPizzaType } from '@/shared/constants/pizza'

interface getCartItemDetailsProps {
  pizzaType: PizzaType
  pizzaSize: PizzaSize
  ingredients: Ingredient[]
}

export const getCartItemDetails = ({
  pizzaType,
  pizzaSize,
  ingredients
}: getCartItemDetailsProps) => {
  const details = []

  if (pizzaSize && pizzaType) {
    const typeName = mapPizzaType[pizzaType]
    details.push(`${typeName} ${pizzaSize} см`)
  }

  if (ingredients) {
    details.push(...ingredients.map((ingredient) => ingredient.name))
  }

  return details.join(', ')
}
