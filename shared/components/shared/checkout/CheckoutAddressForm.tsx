import React from 'react'

//Component
import { FormInput, FormTextarea, WhiteBlock } from '@/shared/components/shared'

interface Props {
  className?: string
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title='3. Адрес доставки' className={className}>
      <div className='flex flex-col gap-5'>
        <FormInput
          name='address'
          className='text-base'
          placeholder='Введите адрес'
        />
        <FormTextarea
          name='comment'
          rows={5}
          className='text-base'
          placeholder='Комментарий к заказу'
        />
      </div>
    </WhiteBlock>
  )
}
