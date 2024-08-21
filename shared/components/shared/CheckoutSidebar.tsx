import { ArrowRight, Package, Percent, Truck } from 'lucide-react'
import React from 'react'

//Components
import { CheckoutItemDetails, WhiteBlock } from '@/shared/components/shared'
import { Button, Skeleton } from '@/shared/components/ui'

const TAX = 15
const DELIVERY_PRICE = 250

interface Props {
  totalAmount: number
  loading?: boolean
  submitting?: boolean
}

export const CheckoutSidebar: React.FC<Props> = ({ totalAmount, loading }) => {
  const priceWithTaxAndDelivery =
    (totalAmount / 100) * TAX + totalAmount + DELIVERY_PRICE

  return (
    <WhiteBlock className='sticky top-4 p-6'>
      <div className='flex flex-col gap-1'>
        <span className='text-xl'>Итого:</span>
        {loading ? (
          <Skeleton className='h-[51px] w-1/2' />
        ) : (
          <span className='text-[34px] font-extrabold'>
            {priceWithTaxAndDelivery} ₽
          </span>
        )}
      </div>

      <CheckoutItemDetails
        title={
          <div className='flex items-center'>
            <Package className='mr-2' size={18} />
            Стоимость корзины
          </div>
        }
        value={
          loading ? (
            <Skeleton className='h-[28px] w-20 rounded-[6px]' />
          ) : (
            `${totalAmount} ₽`
          )
        }
      />
      <CheckoutItemDetails
        title={
          <div className='flex items-center'>
            <Percent className='mr-2' size={18} />
            Налоги
          </div>
        }
        value={
          loading ? (
            <Skeleton className='h-[28px] w-20 rounded-[6px]' />
          ) : (
            `${(totalAmount / 100) * TAX} ₽`
          )
        }
      />
      <CheckoutItemDetails
        title={
          <div className='flex items-center'>
            <Truck className='mr-2' size={18} />
            Доставка
          </div>
        }
        value={
          loading ? (
            <Skeleton className='h-[28px] w-20 rounded-[6px]' />
          ) : totalAmount > 0 ? (
            `${DELIVERY_PRICE} ₽`
          ) : (
            '0 ₽'
          )
        }
      />

      <Button
        type='submit'
        className='mt-6 h-14 w-full rounded-2xl text-base font-bold'
        loading={loading}
      >
        Перейти к оплате
        <ArrowRight className='ml-2 w-5' />
      </Button>
    </WhiteBlock>
  )
}
