import { axiosInstance } from '@/services/axios-instance'

//Types
import type { Product } from '@prisma/client'

//API constants
import { ApiRoutes } from '@/services/constants'

export const search = async (query: string): Promise<Product[]> => {
  const { data } = await axiosInstance.get<Product[]>(
    ApiRoutes.SEARCH_PRODUCTS,
    {
      params: { query }
    }
  )

  return data
}
