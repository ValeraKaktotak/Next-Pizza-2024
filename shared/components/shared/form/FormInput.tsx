'use client'
import React from 'react'
import { useFormContext } from 'react-hook-form'

//Components
import {
  ClearButton,
  ErrorText,
  RequiredSymbol
} from '@/shared/components/shared'
import { Input } from '@/shared/components/ui'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  required?: boolean
  className?: string
}

export const FormInput: React.FC<Props> = ({
  className,
  name,
  label,
  required,
  ...props
}) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors }
  } = useFormContext()

  const value = watch(name)
  const errorText = errors[name]?.message as string

  const onClickClear = () => {
    setValue(name, '')
  }

  return (
    <div className={className}>
      {label && (
        <p className='mb-2 font-medium'>
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className='relative'>
        <Input className='text-md h-12 pr-10' {...register(name)} {...props} />

        {value && <ClearButton onClick={onClickClear} />}
      </div>

      {errorText && <ErrorText text={errorText} className='mt-2' />}
    </div>
  )
}
