'use client'
import { Search } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { useClickAway } from 'react-use'

//Utils
import { cn } from '@/lib/utils'

interface Props {
  className?: string
}

export const SearchInput: React.FC<Props> = ({ className }) => {
  const [focused, setFocused] = useState<boolean>(false)
  const ref = useRef(null)

  useClickAway(ref, () => {
    setFocused(false)
  })

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
        />

        <div
          className={cn(
            'invisible absolute top-14 z-30 w-full rounded-xl bg-white py-2 opacity-0 shadow-md transition-all duration-200',
            focused && 'visible top-12 opacity-100'
          )}
        ></div>
      </div>
    </>
  )
}
