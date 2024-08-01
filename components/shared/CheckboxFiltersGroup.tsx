'use client'
import React, { useState } from 'react'

//Utils
import { cn } from '@/lib/utils'

//Types
import type { FilterCheckboxProps } from '@/components/shared/FilterCheckbox'

//Components
import { FilterCheckbox } from '@/components/shared'
import { Input, Skeleton } from '@/components/ui'

type Item = FilterCheckboxProps

interface Props {
  title: string
  items: Item[]
  defaultItems?: Item[]
  limit?: number
  searchInputPlaceholder?: string
  onChange?: (values: string[]) => void
  defaultValue?: string[]
  className?: string
  loading?: boolean
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
  title,
  items,
  defaultItems,
  limit = 5,
  searchInputPlaceholder = 'Поиск...',
  className,
  onChange,
  defaultValue,
  loading
}) => {
  const [showAll, setShowAll] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const count = showAll
    ? items.filter((item) =>
        item.text.toLowerCase().includes(searchValue.toLowerCase())
      )
    : defaultItems!

  if (loading) {
    return (
      <div>
        <p className='mb-3 font-bold'>{title}</p>
        {...Array(limit)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} className='mb-4 h-6 rounded-[8px]' />
          ))}
        <Skeleton className='mb-4 h-6 w-28 rounded-[8px]' />
      </div>
    )
  }

  return (
    <div className={cn(className)}>
      <p className='mb-3 font-bold'>{title}</p>

      {showAll && (
        <div className='mb-5'>
          <Input
            onChange={onChangeSearchInput}
            placeholder={searchInputPlaceholder}
            className='border-none bg-gray-50'
          />
        </div>
      )}

      <div className='scrollbar flex max-h-96 flex-col gap-4 overflow-auto pr-2'>
        {count.map((item, index) => (
          <FilterCheckbox
            key={index}
            text={item.text}
            value={item.value}
            endAdornment={item.endAdornment}
            //checked={false}
            onCheckedChange={() => console.log('123')}
            name='group'
          />
        ))}
      </div>

      {items.length > limit && (
        <div className={showAll ? 'mt-4 border-t border-t-neutral-100' : ''}>
          <button
            onClick={() => setShowAll(!showAll)}
            className='mt-3 text-primary'
          >
            {showAll ? 'Скрыть' : '+ Показать все'}
          </button>
        </div>
      )}
    </div>
  )
}
