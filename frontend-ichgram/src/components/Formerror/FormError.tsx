
import styles from "./FormError.module.css"

const FormError = ({ children }) => {
	return <p className={styles.error}>{children}</p>
}
export default FormError