'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { signOut } from 'next-auth/react'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

//Types and schemas
import {
  formRegisterSchema,
  type TFormRegisterValues
} from '@/shared/components/shared/modals/auth-modal/forms/schemas'
import type { User } from '@prisma/client'

//Components
import { Container, FormInput, Title } from '@/shared/components/shared'
import { Button } from '@/shared/components/ui'

interface Props {
  data: User
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
  const form = useForm({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: '',
      confirmPassword: ''
    }
  })

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await updateUserInfo({
        email: data.email,
        fullName: data.fullName,
        password: data.password
      })

      toast.error('Данные обновлены 📝', {
        icon: '✅'
      })
    } catch (error) {
      return toast.error('Ошибка при обновлении данных', {
        icon: '❌'
      })
    }
  }

  const onClickSignOut = () => {
    signOut({
      callbackUrl: '/'
    })
  }

  return (
    <Container className='my-10'>
      <Title
        text={`Личные данные | #${data.id}`}
        size='md'
        className='font-bold'
      />

      <FormProvider {...form}>
        <form
          className='mt-10 flex w-96 flex-col gap-5'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput name='email' label='E-Mail' required />
          <FormInput name='fullName' label='Полное имя' required />

          <FormInput
            type='password'
            name='password'
            label='Новый пароль'
            required
          />
          <FormInput
            type='password'
            name='confirmPassword'
            label='Повторите пароль'
            required
          />

          <Button
            disabled={form.formState.isSubmitting}
            className='mt-10 text-base'
            type='submit'
          >
            Сохранить
          </Button>

          <Button
            onClick={onClickSignOut}
            variant='secondary'
            disabled={form.formState.isSubmitting}
            className='text-base'
            type='button'
          >
            Выйти
          </Button>
        </form>
      </FormProvider>
    </Container>
  )
}
