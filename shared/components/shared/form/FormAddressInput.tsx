'use client'

import React, { useState } from 'react'
import {
  AddressSuggestions,
  DaDataAddress,
  DaDataSuggestion
} from 'react-dadata'
import 'react-dadata/dist/react-dadata.css'
import { useFormContext } from 'react-hook-form'
import { ClearButton } from '../ClearButton'

interface Props {
  onChange?: (value?: string) => void
  name: string
}

export const FormAddressInput: React.FC<Props> = ({ onChange, name }) => {
  const { watch, setValue } = useFormContext()
  const [place, setPlace] = useState<DaDataSuggestion<DaDataAddress> | string>(
    ''
  )

  const value = watch(name)

  const onClickClear = () => {
    setValue(name, '')
    setPlace('')
  }

  return (
    <div className='relative'>
      <AddressSuggestions
        value={place as DaDataSuggestion<DaDataAddress>}
        containerClassName='box-none'
        token={process.env.NEXT_PUBLIC_DADATA_KEY!}
        onChange={(data) => {
          onChange?.(data?.value)
          setPlace(data as DaDataSuggestion<DaDataAddress>)
        }}
        uid='dadata-address-order-page'
      />
      {value && <ClearButton onClick={onClickClear} />}
    </div>
  )
}
