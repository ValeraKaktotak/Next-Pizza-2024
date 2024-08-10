//Axios
import { axiosInstance } from '@/shared/services/axios-instance'

//TYpes
import type { CartDTO } from './dto/cart.dto'

export const getCart = async (): Promise<CartDTO> => {
  return (await axiosInstance.get<CartDTO>('/cart')).data
}
