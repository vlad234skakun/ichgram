import { useEffect, type FC, type ReactNode } from 'react'
import styles from "./Drawer.module.css"


export interface IDrawerProps {
	children: ReactNode;
	onClose: () => void
}



const Drawer: FC<IDrawerProps> = ({children, onClose}) => { 

useEffect(() => {
    // при открытии — запретить скролл
    document.body.style.overflow = "hidden";
    return () => {
      // при закрытии — вернуть скролл
      document.body.style.overflow = "auto";
    };
  }, []);

	return ( 
		<div onClick={onClose} className={styles.backdrop} >
			<div onClick={(e) => e.stopPropagation()} className={styles.drawer} >
				{children}
			</div>
		</div>
	)
}
export default Drawer