'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'qs'
import React, { useEffect, useState } from 'react'
import { useSet } from 'react-use'

//Utils
import { cn } from '@/lib/utils'

//Hooks
import { useFilterIngredients } from '@/hooks/useFilterIngredients'

//Components
import { CheckboxFiltersGroup, RangeSlider, Title } from '@/components/shared'
import { Input } from '@/components/ui'

interface Props {
  className?: string
}

interface PriceRangeProps {
  priceFrom?: number
  priceTo?: number
}
interface QueryFilters extends PriceRangeProps {
  selectedPizzaTypes: Set<string>
  selectedSizeIds: Set<string>
  ingredients?: Set<string>
}

export const Filters: React.FC<Props> = ({ className }) => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >
  const router = useRouter()
  const [prices, setPrice] = useState<PriceRangeProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined
  })

  const { ingredients, loading, onAddId, selectedIngredients } =
    useFilterIngredients()

  const [selectedSizeIds, { toggle: toggleSelectedSizes }] = useSet(
    new Set<string>(
      searchParams.has('selectedSizeIds')
        ? searchParams.get('selectedSizeIds')?.split(',')
        : []
    )
  )
  const [selectedPizzaTypes, { toggle: toggleSelectedPizzaTypes }] = useSet(
    new Set<string>(
      searchParams.has('selectedPizzaTypes')
        ? searchParams.get('selectedPizzaTypes')?.split(',')
        : []
    )
  )

  const updatePrice = (name: keyof PriceRangeProps, value: number) => {
    setPrice((prevState) => ({ ...prevState, [name]: value }))
  }

  const items = ingredients.map((item) => ({
    value: String(item.id),
    text: item.name
  }))

  const filters = {
    ...prices,
    selectedPizzaTypes: Array.from(selectedPizzaTypes),
    selectedSizeIds: Array.from(selectedSizeIds),
    selectedIngredients: Array.from(selectedIngredients)
  }

  useEffect(() => {
    const query = qs.stringify(filters, {
      arrayFormat: 'comma'
    })
    router.push(`?${query}`, { scroll: false })
  }, [filters])

  return (
    <div className={cn(className)}>
      <Title text='Фильтрация' size='sm' className='mb-5 font-bold' />

      <CheckboxFiltersGroup
        title='Тип теста'
        className='mb-5'
        onClickCheckbox={toggleSelectedPizzaTypes}
        selected={selectedPizzaTypes}
        items={[
          { text: 'Тонкое', value: '1' },
          { text: 'Традиционное', value: '2' }
        ]}
      />

      <CheckboxFiltersGroup
        title='Размеры'
        className='mb-5'
        onClickCheckbox={toggleSelectedSizes}
        selected={selectedSizeIds}
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
            value={String(prices.priceFrom) || '0'}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updatePrice('priceFrom', Number(e.target.value))
            }
          />
          <Input
            type='number'
            placeholder='1000'
            min={100}
            max={1000}
            value={String(prices.priceTo || '1000')}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updatePrice('priceTo', Number(e.target.value))
            }
          />
        </div>

        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[prices.priceFrom || 0, prices.priceTo || 1000]}
          onValueChange={([priceFrom, priceTo]) =>
            setPrice({ priceFrom, priceTo })
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
          selected={selectedIngredients}
        />
      </div>
    </div>
  )
}
