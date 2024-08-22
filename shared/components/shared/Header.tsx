'use client'
import { User } from 'lucide-react'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'

//Utils
import { cn } from '@/shared/lib/utils'

//Components
import { CartButton, Container, SearchInput } from '@/shared/components/shared'
import { Button } from '@/shared/components/ui'

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
  const { data } = useSession()

  console.log(data)

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
          <Button
            onClick={() => {
              signIn('github', {
                callbackUrl: '/',
                redirect: true
              })
            }}
            variant='outline'
            className='flex items-center gap-1'
          >
            <User size={16} /> Войти
          </Button>

          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  )
}
