//Type
import type { ProductItem } from '@prisma/client'
import type { PizzaType } from '../constants/pizza'

//Constants
import { pizzaSizes } from '../constants/pizza'

interface getAvailablePizzaSizesProps {
  variants: ProductItem[]
  type: PizzaType
}

/**
 * Функция возвращает массив доступных/недоступных размеров пицц выбранного типа
 *
 * @param variants - вариации пиц
 * @param type - тип пиццы
 * @returns array - массив размеров пицц выбранного типа
 */
export const getAvailablePizzaSizes = ({
  variants,
  type
}: getAvailablePizzaSizesProps) => {
  //filtered variants by current type
  const filteredPizzasByType = variants.filter(
    (item) => item.pizzaType === type
  )

  //added disable/available pizzaSize variants
  const availablePizzaSizes = pizzaSizes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !filteredPizzasByType.some(
      (pizza) => Number(pizza.size) === Number(item.value)
    )
  }))

  return availablePizzaSizes
}
