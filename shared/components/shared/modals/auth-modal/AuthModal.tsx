import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import React from 'react'

//Components
import { Button } from '@/shared/components/ui'
import {
  Dialog,
  DialogContent,
  DialogDescription
} from '@/shared/components/ui/dialog'
import { signIn } from 'next-auth/react'

interface Props {
  open: boolean
  onClose: VoidFunction
}

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogDescription>
        <VisuallyHidden.Root>Product Modal Description</VisuallyHidden.Root>
      </DialogDescription>
      <DialogContent className='w-[450px] bg-white p-10'>
        <div>FORM</div>
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
              src='https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg'
            />
            Google
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
