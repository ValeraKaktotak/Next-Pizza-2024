'use client'
import { useEffect, useState } from 'react'
import { useSet } from 'react-use'

//Types
import type { ProductItem } from '@prisma/client'
import type { Variant } from '../components/shared/GroupVariants'
import type { PizzaSize, PizzaType } from '../constants/pizza'

//Libs
import { getAvailablePizzaSizes } from '../lib/getAvailablePizzaSizes'

interface ReturnProps {
  size: PizzaSize
  type: PizzaType
  selectedIngredients: Set<number>
  availablePizzaSizes: Variant[]
  setSize: (size: PizzaSize) => void
  setType: (type: PizzaType) => void
  addIngredient: (id: number) => void
}

export const usePizzaOptions = (variants: ProductItem[]): ReturnProps => {
  const [size, setSize] = useState<PizzaSize>(20)
  const [type, setType] = useState<PizzaType>(1)
  const availablePizzaSizes = getAvailablePizzaSizes({ type, variants })

  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([])
  )

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

  return {
    size,
    type,
    selectedIngredients,
    availablePizzaSizes,
    setSize,
    setType,
    addIngredient
  }
}
