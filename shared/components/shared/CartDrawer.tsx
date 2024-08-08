import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

//Utils
import { cn } from '@/shared/lib/utils'

//Components
import { Button } from '@/shared/components/ui'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/shared/components/ui/sheet'

interface Props {
  className?: string
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children
}) => {
  return (
    <div className={cn(className)}>
      <Sheet>
        <SheetTrigger>{children}</SheetTrigger>
        <SheetContent className='flex flex-col justify-between bg-[#f4f1ee] pb-0'>
          <SheetHeader>
            <SheetTitle>
              В корзине <span className='font-bold'>3 товара</span>
            </SheetTitle>
          </SheetHeader>

          {/* Goods */}

          <SheetFooter className='-mx-6 bg-white p-8'>
            <div className='w-full'>
              <div className='mb-4 flex'>
                <span className='flex flex-1 text-lg text-neutral-500'>
                  Итого
                  <div className='relative -top-1 mx-2 flex-1 border-b border-dashed border-b-neutral-200' />
                </span>

                <span className='text-lg font-bold'>500 ₽</span>
              </div>

              <Link href='/checkout'>
                <Button type='submit' className='h-12 w-full text-base'>
                  Оформить заказ
                  <ArrowRight className='ml-2 w-5' />
                </Button>
              </Link>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
