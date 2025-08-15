import { yupResolver } from '@hookform/resolvers/yup'
import { registerSchema } from '../../schemas/registerSchame.ts'
import FormError from '../Formerror/FormError'
import styles from './RegisterForm.module.css'

import { useForm } from 'react-hook-form'
import type { RegisterPayloadType } from '../../pages/RegisterPage/RegisterPage'
import type { FC } from 'react'

export interface IRedisterFormPayload { 
  onSubmit: (payload: RegisterPayloadType) => void
}

const RegisterForm: FC<IRedisterFormPayload> = ({ onSubmit }) => {
  const { register, handleSubmit, reset, formState: { errors }, } = useForm({
    resolver: yupResolver(registerSchema)
  })

  const handleFormSubmit = (payload: RegisterPayloadType) => {
    onSubmit(payload)
    reset()
  }

  return (
    <form id="register-form" className={styles.registerform} onSubmit={handleSubmit(handleFormSubmit)} >
      <input className={styles.input} placeholder='email' type="text" {...register("email", { required: "Введите почту пользователя" })} />
      {errors.email && <FormError>{errors.email.message}</FormError>}
      <input className={styles.input} placeholder='fullname' type="text" {...register("fullname", { required: "Введите полное имя пользователя" })} />
      {errors.fullname && <FormError>{errors.fullname.message}</FormError>}
      <input className={styles.input} placeholder='username' type="text" {...register("username", { required: "Введите имя пользователя" })} />
      {errors.username && <FormError>{errors.username.message}</FormError>}
      <input className={styles.input} placeholder='password' type="text" {...register("password", { required: "Введите пароль" })} />
      {errors.password && <FormError>{errors.email?.message}</FormError>}
    </form>
  )
}

export default RegisterForm
