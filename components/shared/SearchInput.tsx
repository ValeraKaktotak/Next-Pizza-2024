'use client'
import { Search } from 'lucide-react'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import { useClickAway, useDebounce } from 'react-use'

//Types
import type { Product } from '@prisma/client'

//Utils
import { cn } from '@/lib/utils'

//Services
import { Api } from '@/services/api-client'

interface Props {
  className?: string
}

export const SearchInput: React.FC<Props> = ({ className }) => {
  const [focused, setFocused] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [products, setProducts] = useState<Product[]>([])
  const ref = useRef(null)

  useClickAway(ref, () => {
    setFocused(false)
  })

  const onClickItem = () => {
    setFocused(false)
    setSearchQuery('')
    setProducts([])
  }

  const fetchProductsData = async () => {
    const res = await Api.products.search(searchQuery)
    setProducts(res)
  }

  useDebounce(
    () => {
      fetchProductsData()
    },
    250,
    [searchQuery]
  )

  return (
    <>
      {focused && <div className='fixed inset-0 z-30 bg-black/50'></div>}
      <div
        ref={ref}
        className={cn(
          className,
          'relative z-30 flex h-11 flex-1 justify-between rounded-2xl'
        )}
      >
        <Search className='absolute left-3 top-1/2 h-5 translate-y-[-50%] text-gray-400' />
        <input
          className='w-full rounded-2xl bg-gray-100 pl-11 pr-5 outline-none'
          type='text'
          placeholder='Найти пиццу...'
          onFocus={() => setFocused(true)}
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
        />

        {products.length > 0 && (
          <div
            className={cn(
              'invisible absolute top-14 z-30 w-full rounded-xl bg-white py-2 opacity-0 shadow-md transition-all duration-200',
              focused && 'visible top-12 opacity-100'
            )}
          >
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className='flex w-full items-center gap-3 px-3 py-2 hover:bg-primary/20'
                onClick={onClickItem}
              >
                <img
                  className='h-8 w-8 rounded-sm'
                  src={product.imageUrl}
                  alt={product.name}
                />
                <span>{product.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
