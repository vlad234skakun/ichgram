import { Link } from 'react-router-dom'
import ResetPasswordForm from '../../components/ResetPasswordForm/ResetPasswordForm'
import styles from './ResetPasswordPage.module.css'

export interface IResetPasswordPayload { 
	email: string
}

const ResetPasswordPage = () => {

	const onSubmit = (payload: IResetPasswordPayload) => {
		console.log(payload)

	}

	return (

		<div className={styles.resetPasswordpage} >
			<div className={styles.resetPasswordContainer} >
				<div className={styles.resetPasswordBlock}>
					<img src="../../../public/Troublelogging.svg" alt="" />
					<h2>Trouble logging in?</h2>
					<h3>Enter your email, phone, or username and we'll
						send you a link to get back into your account.</h3>
					<ResetPasswordForm onSubmit={onSubmit} />
					<h1>OR</h1>
					<Link to="/signup">Create new account</Link>
				</div>
				<div className={styles.loginLinkBlock}>
					<h1><Link to="/">Back to login</Link></h1>
				</div>
			</div>
		</div>


	)
}

export default ResetPasswordPage
