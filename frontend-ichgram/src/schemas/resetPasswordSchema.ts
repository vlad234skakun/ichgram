import * as Yup from "yup"

export const resetPasswordSchema = Yup.object({
	email: Yup.string().required("Почта обязательна").email("Введите корректный email")
})