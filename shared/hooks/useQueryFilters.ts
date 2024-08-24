import { useRouter } from 'next/navigation'
import qs from 'qs'
import { useEffect, useRef } from 'react'

//Types
import type { Filters } from './useFilters'

/**
 * Хук для добавления параметров в URL
 *
 * @param selectedPizzaTypes: Set<string>
 * @param selectedPizzaSizes: Set<string>
 * @param selectedIngredients: Set<string>
 * @param prices: PriceRangeProps
 */
export const useQueryFilters = (filters: Filters) => {
  const isMounted = useRef(false)
  const router = useRouter()
  const params = {
    ...filters.prices,
    selectedPizzaTypes: Array.from(filters.selectedPizzaTypes),
    selectedPizzaSizes: Array.from(filters.selectedPizzaSizes),
    selectedIngredients: Array.from(filters.selectedIngredients)
  }

  useEffect(() => {
    if (isMounted) {
      const query = qs.stringify(params, {
        arrayFormat: 'comma'
      })
      router.push(`?${query}`, { scroll: false })
      isMounted.current = true
    }
  }),
    [filters]
}
