'use client'
import React, { useMemo } from 'react'

//Utils
import { cn } from '@/shared/lib/utils'

//Hooks
import { useFilters, useIngredients, useQueryFilters } from '@/shared/hooks'

//Components
import {
  CheckboxFiltersGroup,
  RangeSlider,
  Title
} from '@/shared/components/shared'
import { Input } from '@/shared/components/ui'

interface Props {
  className?: string
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading } = useIngredients()
  const filters = useFilters()

  const params = useMemo(
    () => ({
      selectedPizzaTypes: filters.selectedPizzaTypes,
      selectedPizzaSizes: filters.selectedPizzaSizes,
      selectedIngredients: filters.selectedIngredients,
      prices: filters.prices
    }),
    [filters]
  )

  useQueryFilters(params)

  const items = ingredients.map((item) => ({
    value: String(item.id),
    text: item.name
  }))

  return (
    <div className={cn(className)}>
      <Title text='Фильтрация' size='sm' className='mb-5 font-bold' />

      <CheckboxFiltersGroup
        title='Тип теста'
        className='mb-5'
        onClickCheckbox={filters.setSelectedPizzaTypes}
        selected={filters.selectedPizzaTypes}
        items={[
          { text: 'Тонкое', value: '1' },
          { text: 'Традиционное', value: '2' }
        ]}
      />

      <CheckboxFiltersGroup
        title='Размеры'
        className='mb-5'
        onClickCheckbox={filters.setSelectedPizzaSizes}
        selected={filters.selectedPizzaSizes}
        items={[
          { text: '20 см', value: '20' },
          { text: '30 см', value: '30' },
          { text: '40 см', value: '40' }
        ]}
      />

      <div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
        <p className='mb-3 font-bold'>Цена от и до:</p>
        <div className='mb-5 flex gap-3'>
          <Input
            type='number'
            placeholder='0'
            min={0}
            max={1000}
            value={String(filters.prices.priceFrom || '0')}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              filters.setPrices('priceFrom', Number(e.target.value))
            }
          />
          <Input
            type='number'
            placeholder='1000'
            min={100}
            max={1000}
            value={String(filters.prices.priceTo || '1000')}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              filters.setPrices('priceTo', Number(e.target.value))
            }
          />
        </div>

        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[
            filters.prices.priceFrom || 0,
            filters.prices.priceTo || 1000
          ]}
          onValueChange={([
            priceFrom = filters.prices.priceFrom,
            priceTo = filters.prices.priceTo
          ]) => {
            filters.setPrices('priceTo', priceTo!)
            filters.setPrices('priceFrom', priceFrom!)
          }}
        />

        <CheckboxFiltersGroup
          title='Ингредиенты'
          items={items}
          className='mt-5'
          limit={6}
          defaultItems={items.slice(0, 6)}
          loading={loading}
          onClickCheckbox={filters.setSelectedIngredients}
          selected={filters.selectedIngredients}
        />
      </div>
    </div>
  )
}
