'use client'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'

interface ILoginForm {
  onClose?: VoidFunction
}

const LoginForm: FC<ILoginForm> = ({ onClose }) => {
  const form = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })
  return <div>LoginForm</div>
}
export default LoginForm
