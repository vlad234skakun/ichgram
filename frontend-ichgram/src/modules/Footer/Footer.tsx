import SideBarItems from '../Lauout/SideBar/SideBarNavigate/SideBarNavigateItems'
import styles from "./Footer.module.css"
import type { ISideBarItems } from '../Lauout/SideBar/SideBarNavigate/SideBarNavigateItems'


const Footer = () => {
	const element = SideBarItems.map((item: ISideBarItems)=> {
		return <li key={item.id} className={styles.item} >{item.text}</li>
	})
	return (
		<div className={styles.footerBlock}>
				<ul className={styles.menu}>{element}</ul>
				<p>© 2024 ICHgram</p>
		</div>
	
	)
}

export default Footer