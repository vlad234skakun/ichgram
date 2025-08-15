import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { resetPasswordSchema } from '../../schemas/resetPasswordSchema'
import Button from '../Button/Button'
import FormError from '../Formerror/FormError'
import styles from "./ResetPasswordForm.module.css"

import type { IResetPasswordPayload } from '../../pages/ResetPasswordPage/ResetPasswordPage'
import type { FC } from 'react'

export interface IResetPasswordOnSubmit { 
	onSubmit: (payload: IResetPasswordPayload) => void
}

const ResetPasswordForm: FC<IResetPasswordOnSubmit> = ({ onSubmit }) => {
	const { register, handleSubmit, reset, formState: { errors } } = useForm<IResetPasswordPayload>({
		resolver: yupResolver(resetPasswordSchema)
	})

	const handleFormSubmit = (payload:  IResetPasswordPayload) => {
		onSubmit(payload)
		reset()
	}

	return (
		<form className={styles.loginform} onSubmit={handleSubmit(handleFormSubmit)} >
			<input className={styles.input} placeholder='email' type="text" {...register("email", { required: "Введите имя пользователя" })} />
			{errors.email && <FormError>{errors.email.message}</FormError>}
			<div className={styles.Buttonwrapper}>
				<Button type={"submit"} variant={"primery"}>Log in</Button>
			</div>
		</form>
	)
}

export default ResetPasswordForm