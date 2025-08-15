import type { FC, ReactNode } from "react"
import styles from "./Modal.module.css";
import { useEffect } from 'react';

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ onClose, children }) => {

	useEffect(() => {
			// при открытии — запретить скролл
			document.body.style.overflow = "hidden";
			return () => {
				// при закрытии — вернуть скролл
				document.body.style.overflow = "auto";
			};
		}, []);
  
  // Закрытие по клику вне окна
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        {/* <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button> */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
