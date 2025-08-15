import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import AuthLayout from '../../components/AuthLayout/AuthLayout'
import LoginForm from '../../components/LoginForm/LoginForm'
import { clearError } from '../../redux/slices/auth-slice.ts'
import styles from './LoginPage.module.css'
import { selectError } from '../../redux/slices/auth-selector.ts'
import type { AppDispatch } from '../../redux/store.ts'
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


import { useEffect, useState } from 'react'
import { login } from '../../redux/slices/auth-slice.ts'
import { verifyUserApi } from '../../shared/api/loginUser-api.ts'

export type LoginPayloadType = { 
	email: string;
	password: string;
}

const LoginPage = () => {
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
	const [open, setOpen] = useState<boolean>(false)

	const dispatch = useDispatch<AppDispatch>();
	const error = useSelector(selectError)
	const verificationCode = searchParams.get("verificationCode")
	
	

	const onSubmit = (payload: LoginPayloadType) => dispatch(login(payload))

	// useEffect(() => {
	// 	if (error) setOpen(true)
	// }, [error])

	useEffect(()=> {
		if (verificationCode) {
			const fetchVerify = async() => {
				try {
					 const result = await verifyUserApi(verificationCode);
  				console.log("result from verifyUserApi:", result);
  				console.log("Navigate to / now");
  				navigate("/");
				} catch (error) {
					console.log(error);
				}
			}
			fetchVerify()
		}
	}, [verificationCode])

	const handleClose = () => {
		dispatch(clearError())
	}


	return (
		<AuthLayout>
			<div className={styles.loginpage}>
				<div className={styles.img}>
					<img
						src="../../../public/Background.svg" alt=""
					/>
				</div>
				<div className={styles.loginformContainer} >
					<div className={styles.loginformBlock}>
						<img src="../../../public/Logo.svg" alt="" />
						<LoginForm onSubmit={onSubmit} />
						<h1>OR</h1>
						{error &&
							<Snackbar open={open} autoHideDuration={6000} onClose={() => handleClose()} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
								<Alert sx={{ border: "1px solid #d32f2f", width: '400px' }} severity="error" onClose={() => handleClose()} >{error}</Alert>

							</Snackbar>}

						<Link to="/resetpassword">Forgot password?</Link>
					</div>
					<div className={styles.signupLinkBlock}>
						<h1>Don't have an account? <span><Link to="/signup">Sign up</Link></span></h1>
					</div>
				</div>
			</div>
		</AuthLayout>

	)
}

export default LoginPage
