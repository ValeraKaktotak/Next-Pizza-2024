'use client'

import React, { useState } from 'react'

//Utils
import { cn } from '@/shared/lib/utils'

//Constants
import { pizzaSizes } from '@/shared/constants/pizza'

//Types
import type { PizzaSize, PizzaType } from '@/shared/constants/pizza'

//Components
import { GroupVariants, PizzaImage, Title } from '@/shared/components/shared'
import { Button } from '@/shared/components/ui'

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
  const textDetail = '30 sm, default'

  const [size, setSize] = useState<PizzaSize>(20)
  const [type, setType] = useState<PizzaType>(1)

  return (
    <div className={cn(className, 'flex flex-1')}>
      <PizzaImage imageUrl={imageUrl} alt={name} size={size} />

      <div className='w-[490px] bg-[#f7f6f5] p-7'>
        <Title text={name} size='md' className='mb-1 font-extrabold' />

        <p className='text-gray-400'>{textDetail}</p>

        <GroupVariants
          items={pizzaSizes}
          value={String(size)}
          onClick={(value) => setSize(Number(value) as PizzaSize)}
        />

        <Button className='mt-10 h-[55px] w-full rounded-[18px] px-10 text-base'>
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  )
}
