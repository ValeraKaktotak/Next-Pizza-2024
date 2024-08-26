'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, type FC } from 'react'
import toast from 'react-hot-toast'

//Utils
import { cn } from '@/shared/lib/utils'

//Components
import {
  AuthModal,
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
  const searchParams = useSearchParams()
  const router = useRouter()
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    let toastMessage = ''

    if (searchParams.has('paid')) {
      toastMessage = 'Заказ успешно оплачен! Информация отправлена на почту.'
    }

    if (searchParams.has('verified')) {
      toastMessage = 'Почта успешно подтверждена!'
    }

    if (toastMessage) {
      setTimeout(() => {
        router.replace('/')
        toast.success(toastMessage, {
          duration: 3000
        })
      }, 1000)
    }
  }, [])
  return (
    <header className={cn('border-b', className)}>
      <Container className='flex flex-col items-center justify-between gap-5 py-8 sm:flex-row sm:gap-0'>
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
          <AuthModal open={open} onClose={() => setOpen(false)} />

          <ProfileButton onClickSignIn={() => setOpen(true)} />
          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  )
}
