//Services
import { axiosInstance } from '@/shared/services/axios-instance'

//Types
import { Story, StoryItem } from '@prisma/client'

export type IStory = Story & {
  items: StoryItem[]
}

export const getAll = async () => {
  const { data } = await axiosInstance.get<IStory[]>('/stories')
  console.log(data)

  return data
}
