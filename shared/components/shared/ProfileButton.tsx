import { CircleUser, Loader, User } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React from 'react'

//Libs
import { cn } from '@/shared/lib/utils'

//Components
import { Button } from '@/shared/components/ui'
import Link from 'next/link'

interface Props {
  onClickSignIn?: () => void
  className?: string
}

export const ProfileButton: React.FC<Props> = ({
  className,
  onClickSignIn
}) => {
  const { status } = useSession()

  return (
    <div className={cn(className)}>
      {status === 'unauthenticated' ? (
        <Button
          onClick={onClickSignIn}
          variant='outline'
          className='flex items-center gap-1'
        >
          <User size={16} /> Войти
        </Button>
      ) : status === 'authenticated' ? (
        <Link href='/profile'>
          <Button variant='secondary' className='flex items-center gap-2'>
            <CircleUser size={18} />
            Профиль
          </Button>
        </Link>
      ) : (
        <div className='pointer-events-none inline-flex h-10 w-[105px] items-center justify-center whitespace-nowrap rounded-md bg-gray-500 bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-50 ring-offset-background'>
          <Loader className='h-5 w-5 animate-spin' />
        </div>
      )}
    </div>
  )
}
