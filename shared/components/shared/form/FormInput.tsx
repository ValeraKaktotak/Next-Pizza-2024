'use client'
import React from 'react'

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
  return (
    <div className={className}>
      {label && (
        <p className='mb-2 font-medium'>
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className='relative'>
        <Input name={name} className='text-md h-12 pr-10' {...props} />

        <ClearButton />
      </div>

      <ErrorText text={'Поле обязательно для заполнения'} className='mt-2' />
    </div>
  )
}
