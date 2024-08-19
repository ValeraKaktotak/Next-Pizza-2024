'use client'

import React from 'react'
import { AddressSuggestions } from 'react-dadata'
import 'react-dadata/dist/react-dadata.css'
import { useFormContext } from 'react-hook-form'
import { ClearButton } from '../ClearButton'

interface Props {
  onChange?: (value?: string) => void
  name: string
}

export const FormAddressInput: React.FC<Props> = ({ onChange, name }) => {
  const { watch, setValue } = useFormContext()

  const value = watch(name) || ''

  const onClickClear = () => {
    setValue(name, '')
  }
  return (
    <div className='relative'>
      <AddressSuggestions
        value={value}
        containerClassName='box-none'
        token={process.env.NEXT_PUBLIC_DADATA_KEY!}
        onChange={(data) => onChange?.(data?.value)}
        uid='dadata-address-order-page'
      />
      {value && <ClearButton onClick={onClickClear} />}
    </div>
  )
}
