'use client'
import { signIn } from 'next-auth/react'
import React, { useState } from 'react'

//Components
import { Button } from '@/shared/components/ui'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/shared/components/ui/dialog'
import { LoginForm } from './forms/LoginForm'
import { RegisterForm } from './forms/RegisterForm'

interface Props {
  open: boolean
  onClose: VoidFunction
}

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
  const [type, setType] = useState<'login' | 'register'>('login')

  const onSwitchType = () => {
    setType(type === 'login' ? 'register' : 'login')
  }
  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogDescription />
      <DialogContent className='w-[450px] bg-white p-10'>
        <DialogTitle />
        {type === 'login' ? (
          <LoginForm onClose={handleClose} />
        ) : (
          <RegisterForm onClose={handleClose} />
        )}
        <hr />
        <div className='flex gap-2'>
          <Button
            variant='secondary'
            onClick={() =>
              signIn('github', {
                callbackUrl: '/',
                redirect: true
              })
            }
            type='button'
            className='h-12 flex-1 gap-2 p-2'
          >
            <img
              className='h-6 w-6'
              src='https://github.githubassets.com/favicons/favicon.svg'
            />
            GitHub
          </Button>

          <Button
            variant='secondary'
            onClick={() =>
              signIn('google', {
                callbackUrl: '/',
                redirect: true
              })
            }
            type='button'
            className='h-12 flex-1 gap-2 p-2'
          >
            <img
              className='h-6 w-6'
              src='https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg'
            />
            Google
          </Button>
        </div>

        <Button
          variant='outline'
          onClick={onSwitchType}
          type='button'
          className='h-12'
        >
          {type !== 'login' ? 'Войти' : 'Регистрация'}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
