//Types
import { User } from '@prisma/client'

//Services
import { axiosInstance } from '@/shared/services/axios-instance'

export const getMe = async () => {
  const { data } = await axiosInstance.get<User>('/auth/me')

  return data
}
