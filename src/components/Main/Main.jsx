import Navbar from "../Navbar";
import styles from "./Main.module.css";
import { useState } from "react";

const Main = (props) => {
  const { children } = props;

  const [activeNavbarItem, setActiveNavbarItem] = useState("Tasks");

  const onClickNavbarItem = (navbarItem) => {
    setActiveNavbarItem(navbarItem);
  };

  return (
    <main className={styles.main}>
      <Navbar
        activeNavbarItem={activeNavbarItem}
        onClickNavbarItem={onClickNavbarItem}
      />
      <div className={styles.mainContent}>{children}</div>
    </main>
  );
};

export default Main;
