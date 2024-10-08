//Axios
import { axiosInstance } from '@/shared/services/axios-instance'

//Types
import type { Ingredient } from '@prisma/client'

//API constants
import { ApiRoutes } from '@/shared/services/constants'

export const getAllIngredients = async (): Promise<Ingredient[]> => {
  const { data } = await axiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS)

  return data
}
