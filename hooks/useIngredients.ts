import { useEffect, useState } from 'react'

//Services
import { Api } from '@/services/api-client'

//Types
import type { Ingredient } from '@prisma/client'

export const useIngredients = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const fetchIngredients = async () => {
    try {
      setLoading(true)
      const res = await Api.ingredients.getAllIngredients()
      setIngredients(res)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchIngredients()
  }, [])

  return {
    ingredients,
    loading
  }
}
