'use client'
import React from 'react'

//Utils
import { cn } from '@/lib/utils'

//Hooks
import { useFilterIngredients } from '@/hooks/useFilterIngredients'

//Components
import {
  CheckboxFiltersGroup,
  FilterCheckbox,
  RangeSlider,
  Title
} from '@/components/shared'
import { Input } from '@/components/ui'

interface Props {
  className?: string
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading } = useFilterIngredients()
  const items = ingredients.map((item) => ({
    value: String(item.id),
    text: item.name
  }))

  return (
    <div className={cn(className)}>
      <Title text='Фильтрация' size='sm' className='mb-5 font-bold' />

      <div className='flex flex-col gap-4'>
        <FilterCheckbox text='Можно собирать' value='1' />
        <FilterCheckbox text='Новинки' value='2' />
      </div>

      <div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
        <p className='mb-3 font-bold'>Цена от и до:</p>
        <div className='mb-5 flex gap-3'>
          <Input type='number' placeholder='0' min={0} max={1000} />
          <Input type='number' placeholder='1000' min={100} max={1000} />
        </div>

        <RangeSlider min={0} max={1000} step={10} value={[0, 1000]} />

        <CheckboxFiltersGroup
          title='Ингредиенты'
          items={items}
          className='mt-5'
          limit={6}
          defaultItems={items.slice(0, 6)}
          loading={loading}
        />
      </div>
    </div>
  )
}
