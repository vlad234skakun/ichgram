import type { FC } from 'react'
import styles from "./Button.module.css"
import { useNavigate } from "react-router-dom";

interface IButtonProps { 
	children: string;
	type?: "button" | "submit" | "reset"; 
	form?: string;
	onClick?: () => void;
	variant: string;
	path?: string; 

}

const Button: FC<IButtonProps> = ({ children, form, path, onClick, type = "button", variant = "primery" }) => {
	const navigate = useNavigate();
	const handleClick = () => {
    if (path) {
      navigate(path);
    }
    if (onClick) {
      onClick();
    }
  };
	return (
		<button form={form} className={`${styles.button} ${styles[variant]}`} onClick={handleClick} type={type} >
			{children}
		</button>
	)
}
export default Button;