import SideBarNavigate from './SideBarNavigate/SideBarNavigate.tsx';
import { useSelector, useDispatch } from 'react-redux';
import styles from "./SideBar.module.css"
import type { FC } from 'react';

const SideBar: FC = () => {
	// const token = useSelector(store => store.auth.token)
	// if(!token) return null

	return ( 
		<div className={styles.sidebar} >
			<div className={styles.imgContainer} >
				<img src="../../../public/Logo.svg" alt="" />
			</div>
			<SideBarNavigate />
		</div>
	)
};

export default SideBar;