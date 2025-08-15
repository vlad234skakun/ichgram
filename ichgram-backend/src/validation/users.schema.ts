import * as Yup from "yup"

const PasswordRules = Yup.string()
    .required("Пароль обязателен")
    .min(8, "Пароль должен быть минимум 8 символов")
    .matches(/[a-z]/, "Хотя бы одна строчная буква")
    .matches(/[A-Z]/, "Хотя бы одна заглавная буква")
    .matches(/\d/, "Хотя бы одна цифра")
    .matches(/[@$!%*?&#]/, "Хотя бы один спецсимвол");

export const addUserSchema = Yup.object({
	fullname: Yup.string().required("Введите полное имя"),
  username: Yup.string().required("Введите имя пользователя"),
  email: Yup.string().email("Некорректная почта").required("Почта обязательна"),
  password: PasswordRules
})

export const loginUserSchema = Yup.object({
  email: Yup.string().email("Некорректная почта").required("Почта обязательна"),
  password: PasswordRules
})