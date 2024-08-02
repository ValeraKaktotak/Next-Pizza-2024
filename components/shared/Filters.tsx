'use client'
import React, { useState } from 'react'

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

interface PriceRangeProps {
  priceFrom: number
  priceTo: number
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading, onAddId, selectedIds } = useFilterIngredients()
  const [{ priceFrom, priceTo }, setPrice] = useState<PriceRangeProps>({
    priceFrom: 0,
    priceTo: 1000
  })

  const updatePrice = (name: keyof PriceRangeProps, value: number) => {
    setPrice((prevState) => ({ ...prevState, [name]: value }))
  }

  const items = ingredients.map((item) => ({
    value: String(item.id),
    text: item.name
  }))

  return (
    <div className={cn(className)}>
      <Title text='Фильтрация' size='sm' className='mb-5 font-bold' />

      <div className='flex flex-col gap-4'>
        <FilterCheckbox name='type' text='Можно собирать' value='1' />
        <FilterCheckbox name='news' text='Новинки' value='2' />
      </div>

      <div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
        <p className='mb-3 font-bold'>Цена от и до:</p>
        <div className='mb-5 flex gap-3'>
          <Input
            type='number'
            placeholder='0'
            min={0}
            max={1000}
            value={String(priceFrom)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updatePrice('priceFrom', Number(e.target.value))
            }
          />
          <Input
            type='number'
            placeholder='1000'
            min={100}
            max={1000}
            value={String(priceTo)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updatePrice('priceTo', Number(e.target.value))
            }
          />
        </div>

        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[priceFrom, priceTo]}
          onValueChange={([from, to]) =>
            setPrice({ priceFrom: from, priceTo: to })
          }
        />

        <CheckboxFiltersGroup
          title='Ингредиенты'
          items={items}
          className='mt-5'
          limit={6}
          defaultItems={items.slice(0, 6)}
          loading={loading}
          onClickCheckbox={onAddId}
          selectedIds={selectedIds}
        />
      </div>
    </div>
  )
}
