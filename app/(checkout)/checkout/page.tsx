'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

//Hooks
import { useCart } from '@/shared/hooks'

//Constants & types
import {
  checkoutFormSchema,
  type CheckoutFormValues
} from '@/shared/constants/checkout-form-schema'

//Components
import { CheckoutSidebar, Container, Title } from '@/shared/components/shared'
import {
  CheckoutAddressForm,
  CheckoutCart,
  CheckoutPersonalForm
} from '@/shared/components/shared/checkout'

export default function CheckoutPage() {
  const { totalAmount, items, onClickCountButton, removeCartItem } = useCart()

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      comment: ''
    }
  })

  return (
    <Container>
      <Title
        text='Оформление заказа'
        className='mb-8 mt-10 text-[36px] font-extrabold'
      />
      <FormProvider {...form}>
        <div className='flex gap-10'>
          {/* Left Side */}
          <div className='mb-20 flex flex-1 flex-col gap-10'>
            <CheckoutCart
              items={items}
              onClickCountButton={onClickCountButton}
              removeCartItem={removeCartItem}
            />

            <CheckoutPersonalForm />

            <CheckoutAddressForm />
          </div>

          {/* Right Side */}
          <div className='w-[450px]'>
            <CheckoutSidebar totalAmount={totalAmount} />
          </div>
        </div>
      </FormProvider>
    </Container>
  )
}
