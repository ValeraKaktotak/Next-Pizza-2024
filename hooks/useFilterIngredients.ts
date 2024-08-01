'use client'
import { useEffect, useState } from 'react'

//Types
import type { Ingredient } from '@prisma/client'

//Services
import { Api } from '@/services/api-client'

interface useFilterIngredientsProps {
  ingredients: Ingredient[]
  loading: boolean
}

export const useFilterIngredients = (): useFilterIngredientsProps => {
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

  return { ingredients, loading }
}
