import type { FC, ReactNode } from "react";

import styles from "./Wrapper.module.css";

interface IWrapperProps {
  children: ReactNode;
}

const Wrapper: FC<IWrapperProps> = ({ children }) => {
  return <section className={styles.wrapper}>{children}</section>;
};

export default Wrapper;
