import { Ingredient, ProductItem } from '@prisma/client'
import { PizzaSize, PizzaType } from '../constants/pizza'

interface unionPizzaPriceProps {
  variants: ProductItem[]
  ingredients: Ingredient[]
  type: PizzaType
  size: PizzaSize
  selectedIngredients: Set<number>
}

/**
 * Функция для подсчета общей стоимости пиццы
 *
 * @param type - тип теста выбранной пиццы
 * @param size - размер выбранной пиццы
 * @param variants - список вариаций данной пиццы
 * @param ingredient - список ингредиентов
 * @param selectedIngredients - список дополнительно выбранных ингредиентов
 *
 * @returns number - общая стоимость
 */
export const unionPizzaPrice = ({
  variants,
  ingredients,
  selectedIngredients,
  type,
  size
}: unionPizzaPriceProps) => {
  const pizzaPrice =
    variants.find(
      (variant) => variant.pizzaType === type && variant.size === size
    )?.price || 0

  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, item) => acc + item.price, 0)

  const totalPrice = pizzaPrice + totalIngredientsPrice

  return totalPrice
}
