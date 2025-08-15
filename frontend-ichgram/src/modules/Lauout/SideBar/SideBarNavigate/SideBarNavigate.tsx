import { NavLink, useLocation } from "react-router-dom"
import styles from "./SideBarNavigate.module.css"
import SideBarItems from './SideBarNavigateItems.ts'

import type { FC } from 'react'
import type { ISideBarItems } from './SideBarNavigateItems.ts'


const SideBarNavigate: FC = () => {
  const location = useLocation();
  
  const element = SideBarItems.map((item: ISideBarItems) => {
    const Icon = item.icon

    return (
      <li className={styles.linkContainer} key={item.id}>
        {item.type === "drawer" ? (<NavLink
          to={item.href}
         state={{backgroundLocation: location}}
          className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`}>
          <Icon />
          <span>{item.text}</span>
        </NavLink>) :
          <NavLink
            to={item.href}
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`}>
            <Icon />
            <span>{item.text}</span>
          </NavLink>
        }</li >
    )
  })

  return <ul className={styles.menu}>{element}</ul>
}

export default SideBarNavigate