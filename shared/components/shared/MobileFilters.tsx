import { AlignJustify } from 'lucide-react'
import { Suspense, type FC } from 'react'

//Components
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger
} from '@/shared/components/ui/sheet'
import { Filters } from './Filters'

interface IMobileNavigation {}

export const MobileFilters: FC<IMobileNavigation> = () => {
  return (
    <div className='rounded-2xl bg-gray-50 p-5'>
      <Sheet>
        <SheetTrigger asChild>
          <AlignJustify className='cursor-pointer' />
        </SheetTrigger>
        <SheetContent>
          <div className='flex h-full flex-col items-center justify-between py-8'>
            <div className='flex flex-col items-center gap-y-32'>
              <SheetClose asChild>
                <Suspense>
                  <Filters />
                </Suspense>
              </SheetClose>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
