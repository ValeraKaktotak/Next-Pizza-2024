import React from 'react'

//Utils
import { cn } from '@/lib/utils'

//Types

//Components
import { PizzaImage, Title } from '@/components/shared'
import { Button } from '@/components/ui'

interface Props {
  imageUrl: string
  name: string
  price?: number
  ingredients: any[]
  loading?: boolean
  onSubmit?: (itemId: number, ingredients: number[]) => void
  className?: string
}

export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  imageUrl,
  loading,
  onSubmit,
  className
}) => {
  const totalPrice = 350
  const size = 30

  return (
    <div className={cn(className, 'flex flex-1')}>
      <PizzaImage imageUrl={imageUrl} alt={name} size={size} />

      <div className='w-[490px] bg-[#f7f6f5] p-7'>
        <Title text={name} size='md' className='mb-1 font-extrabold' />

        <Button className='mt-10 h-[55px] w-full rounded-[18px] px-10 text-base'>
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  )
}
