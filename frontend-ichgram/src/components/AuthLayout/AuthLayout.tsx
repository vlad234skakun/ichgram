import styles from "./AuthLayout.module.css"
import { FC, ReactNode } from 'react';

interface IAuthLayoutProps { 
	children: ReactNode
}

const AuthLayout: FC<IAuthLayoutProps> = ({children}) => { 
	return (
		<div className={styles.wrapper}>{children}
		</div>
	)
};
export default AuthLayout