import * as Yup from "yup"

import { passwordRules } from './registerSchame.ts' 

export const loginSchema = Yup.object({
	email: Yup.string().required("Почта обязательна").email("Введите корректный email"),
	password: passwordRules
})