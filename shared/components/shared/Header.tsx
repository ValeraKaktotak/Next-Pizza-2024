'use client'
import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'

//Utils
import { cn } from '@/shared/lib/utils'

//Components
import {
  CartButton,
  Container,
  ProfileButton,
  SearchInput
} from '@/shared/components/shared'

interface IHeader {
  className?: string
  hasSearch?: boolean
  hasCart?: boolean
}

export const Header: FC<IHeader> = ({
  className,
  hasSearch = true,
  hasCart = true
}) => {
  return (
    <header className={cn('border-b', className)}>
      <Container className='flex items-center justify-between py-8'>
        {/* Left Side(Logo) */}
        <Link href='/'>
          <div className='flex items-center gap-4'>
            <Image src='/logo.png' alt='Logo' width={35} height={35} />
            <div>
              <h1 className='text-2xl font-black uppercase'>Next Pizza</h1>
              <p className='text-sm leading-3 text-gray-400'>
                вкусней уже некуда
              </p>
            </div>
          </div>
        </Link>

        {/* Search */}
        {hasSearch && (
          <div className='mx-10 flex-1'>
            <SearchInput />
          </div>
        )}

        {/* Right Side */}
        <div className='flex items-center gap-3'>
          <ProfileButton />
          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  )
}
