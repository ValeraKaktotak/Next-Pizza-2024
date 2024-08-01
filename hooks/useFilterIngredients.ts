'use client'
import { useEffect, useState } from 'react'

//Types
import type { Ingredient } from '@prisma/client'

//Services
import { Api } from '@/services/api-client'

interface useFilterIngredientsProps {
  ingredients: Ingredient[]
}

export const useFilterIngredients = (): useFilterIngredientsProps => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])

  const fetchIngredients = async () => {
    try {
      const res = await Api.ingredients.getAllIngredients()
      setIngredients(res)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchIngredients()
  }, [])

  return { ingredients }
}
