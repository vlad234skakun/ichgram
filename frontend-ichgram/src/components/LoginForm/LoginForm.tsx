import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { loginSchema } from '../../schemas/loginSchema.ts'
import Button from '../Button/Button.tsx'
import FormError from '../Formerror/FormError.tsx'
import styles from './LoginForm.module.css'
import type { FC } from 'react';
import type { LoginPayloadType } from '../../pages/LoginPage/LoginPage.tsx'

interface ILoginFormPayload { 
  onSubmit: (payload: LoginPayloadType) => void; 
} 

const LoginForm: FC<ILoginFormPayload> = ({ onSubmit }) => {


  const { register, handleSubmit, reset, formState: { errors }, } = useForm({
    resolver: yupResolver(loginSchema)
  })

  const handleFormSubmit = (payload: LoginPayloadType) => {
    onSubmit(payload)
    reset()
  }

  return (
    <form className={styles.loginform} onSubmit={handleSubmit(handleFormSubmit)} >
      <input className={styles.input} placeholder='email' type="text" {...register("email", { required: "Введите имя пользователя" })} />
      {errors.email && <FormError>{errors.email.message}</FormError>}
      <input className={styles.input} placeholder='password' type="text" {...register("password", { required: "Введите пароль" })} />
      {errors.password && <FormError>{errors.password.message}</FormError>}
      <div className={styles.Buttonwrapper}>
        <Button type={"submit"} variant={"primery"}>Log in</Button>
      </div>
    </form>
  )
}

export default LoginForm
