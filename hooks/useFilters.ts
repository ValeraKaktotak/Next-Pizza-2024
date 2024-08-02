import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useSet } from 'react-use'

interface PriceRangeProps {
  priceFrom?: number
  priceTo?: number
}
interface QueryFilters extends PriceRangeProps {
  selectedPizzaTypes: string
  selectedPizzaSizes: string
  selectedIngredients: string
}

export interface Filters {
  selectedPizzaTypes: Set<string>
  selectedPizzaSizes: Set<string>
  selectedIngredients: Set<string>
  prices: PriceRangeProps
}

interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceRangeProps, value: number) => void
  setSelectedPizzaSizes: (key: string) => void
  setSelectedPizzaTypes: (key: string) => void
  setSelectedIngredients: (key: string) => void
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >

  /* Ingredients Filter */
  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(
      searchParams.has('selectedIngredients')
        ? searchParams.get('selectedIngredients')?.split(',')
        : []
    )
  )

  /* Sizes Filter */
  const [selectedPizzaSizes, { toggle: toggleSelectedPizzaSizes }] = useSet(
    new Set<string>(
      searchParams.has('selectedPizzaSizes')
        ? searchParams.get('selectedPizzaSizes')?.split(',')
        : []
    )
  )

  /* Types Filter */
  const [selectedPizzaTypes, { toggle: toggleSelectedPizzaTypes }] = useSet(
    new Set<string>(
      searchParams.has('selectedPizzaTypes')
        ? searchParams.get('selectedPizzaTypes')?.split(',')
        : []
    )
  )

  /* Price Filter */
  const [prices, setPrices] = useState<PriceRangeProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined
  })
  const updatePrice = (name: keyof PriceRangeProps, value: number) => {
    setPrices((prevState) => ({ ...prevState, [name]: value }))
  }

  return {
    selectedPizzaSizes,
    setSelectedPizzaSizes: toggleSelectedPizzaSizes,
    selectedPizzaTypes,
    setSelectedPizzaTypes: toggleSelectedPizzaTypes,
    selectedIngredients,
    setSelectedIngredients: toggleIngredients,
    prices,
    setPrices: updatePrice
  }
}
