import { useRouter } from 'next/navigation'
import qs from 'qs'
import { useEffect } from 'react'
import { Filters } from './useFilters'

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter()
  const params = {
    ...filters.prices,
    selectedPizzaTypes: Array.from(filters.selectedPizzaTypes),
    selectedPizzaSizes: Array.from(filters.selectedPizzaSizes),
    selectedIngredients: Array.from(filters.selectedIngredients)
  }

  useEffect(() => {
    const query = qs.stringify(params, {
      arrayFormat: 'comma'
    })
    router.push(`?${query}`, { scroll: false })
  }, [filters])
}
