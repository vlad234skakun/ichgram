import * as Yup from "yup"

export const passwordRules = Yup
  .string()
  .required('Пароль обязателен')
  .min(8, 'Пароль должен быть не менее 8 символов')
  .matches(/[a-z]/, 'Пароль должен содержать хотя бы одну строчную букву')
  .matches(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
  .matches(/\d/, 'Пароль должен содержать хотя бы одну цифру')
  .matches(/[@$!%*?&#]/, 'Пароль должен содержать хотя бы один спецсимвол');

export const registerSchema = Yup.object({ 
	email: Yup.string().required("Введите почту пользователя").email("Введите корректный email"),
	fullname: Yup.string().required("Введите полное имя пользователя"),
	username: Yup.string().required("Введите имя пользователя"),
	password: passwordRules

})