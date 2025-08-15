import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import RegisterForm from '../../components/RegisterForm/RegisterForm'
import addUserApi from '../../shared/api/register-api'
import styles from "./RegisterPage.module.css"

export type RegisterPayloadType = {
  email: string;
	fullname: string;
  username: string;
  password: string;
};

const RegisterPage = () => {
	
	const navigate = useNavigate()

	const onSubmit = async (payload: RegisterPayloadType) => {
		try {
			const data = await addUserApi(payload)
			console.log(data)
			if (data) navigate("/")

		} catch (error: any) {
			console.log(console.log(error.response?.data?.message || error.message))
		}

	}

	return (

		<div className={styles.registerpage} >
			<div className={styles.registerformContainer} >
				<div className={styles.registerformBlock}>
					<img src="../../../public/Logo.svg" alt="" />
					<h2>Sign up to see photos and videos
						from your friends.</h2>
					<RegisterForm onSubmit={onSubmit} />
					<h3>People who use our service may have uploaded
						your contact information to Instagram.
						<span><a href="/learn-more">Learn More</a></span></h3>
					<h3>By signing up, you agree to our <a href="/terms">Terms</a> , <a href="/privacy-policy">Privacy Policy</a> and <a href="/cookies-policy">Cookies Policy</a></h3>
					<div className={styles.Buttonwrapper}>
						<Button form={"register-form"} type={"submit"} variant={"primery"}>Sign up</Button>
					</div>
				</div>
				<div className={styles.loginLinkBlock}>
					<h1>Have an account? <span><Link to="/">Log in</Link></span></h1>
				</div>
			</div>
		</div>



	)
}

export default RegisterPage