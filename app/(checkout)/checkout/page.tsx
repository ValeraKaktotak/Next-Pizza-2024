'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

//Hooks
import { useCart } from '@/shared/hooks'

//Constants & types
import {
  checkoutFormSchema,
  type CheckoutFormValues
} from '@/shared/constants/checkout-form-schema'

//Components
import {
  CheckoutAddressForm,
  CheckoutCart,
  CheckoutPersonalForm,
  CheckoutSidebar,
  Container,
  Title
} from '@/shared/components/shared'
import { cn } from '@/shared/lib/utils'

export default function CheckoutPage() {
  const { totalAmount, items, loading, onClickCountButton, removeCartItem } =
    useCart()

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

  const onSubmit: SubmitHandler<CheckoutFormValues> = (data) => {
    console.log(data)
  }

  return (
    <Container>
      <Title
        text='Оформление заказа'
        className='mb-8 mt-10 text-[36px] font-extrabold'
      />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex gap-10'>
            {/* Left Side */}
            <div className='mb-20 flex flex-1 flex-col gap-10'>
              <CheckoutCart
                items={items}
                onClickCountButton={onClickCountButton}
                removeCartItem={removeCartItem}
                loading={loading}
              />

              <CheckoutPersonalForm
                className={cn({ 'pointer-events-none opacity-40': loading })}
              />

              <CheckoutAddressForm
                className={cn({ 'pointer-events-none opacity-40': loading })}
              />
            </div>

            {/* Right Side */}
            <div className='w-[450px]'>
              <CheckoutSidebar totalAmount={totalAmount} loading={loading} />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  )
}
