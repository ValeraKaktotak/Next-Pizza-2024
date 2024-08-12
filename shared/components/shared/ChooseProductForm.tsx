import React from 'react'

//Utils
import { cn } from '@/shared/lib/utils'

//Types

//Components
import { Title } from '@/shared/components/shared'
import { Button } from '@/shared/components/ui'

interface Props {
  imageUrl: string
  name: string
  price?: number
  loading?: boolean
  onSubmit?: () => void
  className?: string
}

export const ChooseProductForm: React.FC<Props> = ({
  name,
  imageUrl,
  loading,
  price,
  onSubmit,
  className
}) => {
  return (
    <div className={cn(className, 'flex flex-1')}>
      <div className='relative flex w-full flex-1 items-center justify-center'>
        <img
          src={imageUrl}
          alt={name}
          className='relative left-2 top-2 z-10 h-[350px] w-[350px] transition-all duration-300'
        />
      </div>

      <div className='w-[490px] bg-[#f7f6f5] p-7'>
        <Title text={name} size='md' className='mb-1 font-extrabold' />

        <Button
          loading={loading}
          onClick={() => {
            onSubmit?.()
          }}
          className='mt-10 h-[55px] w-full rounded-[18px] px-10 text-base'
        >
          Добавить в корзину за {price} ₽
        </Button>
      </div>
    </div>
  )
}
