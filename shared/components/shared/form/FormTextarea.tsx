'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'

//Components
import { ClearButton } from '@/shared/components/shared'
import { Textarea } from '@/shared/components/ui'

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
  name: string
  label?: string
  required?: boolean
}

export const FormTextarea: React.FC<Props> = ({
  className,
  name,
  label,
  required,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue
  } = useFormContext()

  const value = watch(name)
  const errorText = errors[name]?.message as string

  const onClickClear = () => {
    setValue(name, '')
  }

  return (
    <div className={className}>
      <p className='mb-2 font-medium'>
        {label} {required && <span className='text-red-500'>*</span>}
      </p>

      <div className='relative'>
        <Textarea
          className='text-md h-12 pr-10'
          {...register(name)}
          {...props}
        />

        {value && <ClearButton onClick={onClickClear} />}
      </div>

      {errorText && <p className='mt-2 text-sm text-red-500'>{errorText}</p>}
    </div>
  )
}
