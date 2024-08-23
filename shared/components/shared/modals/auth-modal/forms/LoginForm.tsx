'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import type { FC } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

//Types and schemas
import { formLoginSchema, TFormLoginValues } from './schemas'

//Components
import { FormInput, Title } from '@/shared/components/shared'
import { Button } from '@/shared/components/ui'

interface ILoginForm {
  onClose?: VoidFunction
}

const LoginForm: FC<ILoginForm> = ({ onClose }) => {
  const form = useForm<TFormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const onSubmit: SubmitHandler<TFormLoginValues> = async (data) => {
    try {
      const resp = await signIn('credentials', {
        ...data,
        redirect: false
      })

      if (!resp?.ok) {
        throw Error()
      }

      toast.success('Вы успешно вошли в аккаунт', {
        icon: '✅'
      })

      onClose?.()
    } catch (error) {
      console.error('Error [LOGIN]', error)
      toast.error('Не удалось войти в аккаунт', {
        icon: '❌'
      })
    }
  }
  return (
    <FormProvider {...form}>
      <form
        className='flex flex-col gap-5'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className='flex items-center justify-between'>
          <div className='mr-2'>
            <Title text='Вход в аккаунт' size='md' className='font-bold' />
            <p className='text-gray-400'>
              Введите свою почту, чтобы войти в свой аккаунт
            </p>
          </div>
          <img
            src='/images/tools/phone-icon.png'
            alt='phone-icon'
            width={60}
            height={60}
          />
        </div>

        <FormInput name='email' label='E-Mail' required />
        <FormInput name='password' label='Пароль' type='password' required />

        <Button
          loading={form.formState.isSubmitting}
          className='h-12 text-base'
          type='submit'
        >
          Войти
        </Button>
      </form>
    </FormProvider>
  )
}
export default LoginForm
