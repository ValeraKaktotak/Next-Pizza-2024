'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

//Libs
import { cn } from '@/shared/lib/utils'

//Hooks
import { useCart } from '@/shared/hooks'

//Constants & types
import {
  checkoutFormSchema,
  type CheckoutFormValues
} from '@/shared/constants/checkout-form-schema'

//Actions
import { createOrder } from '@/app/actions'

//Services
import { Api } from '@/shared/services/api-client'

//Components
import {
  CheckoutAddressForm,
  CheckoutCart,
  CheckoutPersonalForm,
  CheckoutSidebar,
  Container,
  Title
} from '@/shared/components/shared'

export default function CheckoutPage() {
  const { totalAmount, items, loading, onClickCountButton, removeCartItem } =
    useCart()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const { data: session } = useSession()

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

  const onSubmit: SubmitHandler<CheckoutFormValues> = async (data) => {
    try {
      setIsSubmitting(true)
      const url = await createOrder(data)

      toast.success('Заказ успешно оформлен! 📝 Переход на оплату... ', {
        icon: '✅'
      })

      if (url) {
        location.href = url
      }
    } catch (error) {
      console.log(error)
      setIsSubmitting(false)
      toast.error('Не удалось создать заказ', {
        icon: '❌'
      })
    }
  }

  useEffect(() => {
    async function fetchUserInfo() {
      const data = await Api.auth.getMe()
      const [firstName, lastName] = data.fullName.split(' ')

      form.setValue('firstName', firstName)
      form.setValue('lastName', lastName)
      form.setValue('email', data.email)
    }

    if (session) {
      fetchUserInfo()
    }
  }, [session])

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
              <CheckoutSidebar
                totalAmount={totalAmount}
                loading={loading || isSubmitting}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  )
}
