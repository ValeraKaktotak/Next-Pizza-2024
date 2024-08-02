'use client'
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
import { useRouter } from 'next/navigation'

interface Props {
  className?: string
}

interface PriceRangeProps {
  priceFrom: number
  priceTo: number
}

export const Filters: React.FC<Props> = ({ className }) => {
  const router = useRouter()
  const [prices, setPrice] = useState<PriceRangeProps>({
    priceFrom: 0,
    priceTo: 1000
  })

  const { ingredients, loading, onAddId, selectedIngredients } =
    useFilterIngredients()

  const [selectedSizeIds, { toggle: toggleSelectedSizes }] = useSet(
    new Set<string>([])
  )
  const [selectedPizzaTypes, { toggle: toggleSelectedPizzaTypes }] = useSet(
    new Set<string>([])
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
    router.push(`?${query}`)
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
            value={String(prices.priceFrom)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updatePrice('priceFrom', Number(e.target.value))
            }
          />
          <Input
            type='number'
            placeholder='1000'
            min={100}
            max={1000}
            value={String(prices.priceTo)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updatePrice('priceTo', Number(e.target.value))
            }
          />
        </div>

        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[prices.priceFrom, prices.priceTo]}
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
          selected={selectedIngredients}
        />
      </div>
    </div>
  )
}
