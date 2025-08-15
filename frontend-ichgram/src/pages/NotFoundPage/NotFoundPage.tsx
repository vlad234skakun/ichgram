import AuthLayout from '../../components/AuthLayout/AuthLayout'
import styles from "./NotFoundPage.module.css"

const NotFoundPage = () => {
	return (
		<AuthLayout>
			<div className={styles.notFoundPageContainer}>
				<div className={styles.imageBlock} >
					<img src="../../../public/Background.svg" alt="" />
				</div>
				<div className={styles.textBlock} >
					<h1>Oops! Page Not Found (404 Error)</h1>
					<p>We're sorry, but the page you're looking for doesn't seem to exist.<br />
						If you typed the URL manually, please double-check the spelling.<br/>
						If you clicked on a link, it may be outdated or broken.</p>
				</div>
			</div>
		</AuthLayout>

	)
}
export default NotFoundPage