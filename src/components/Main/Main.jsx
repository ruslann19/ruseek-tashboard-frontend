import Navbar from "../Navbar";
import styles from "./Main.module.css";

const Main = () => {
  return (
    <main className={styles.main}>
      <Navbar />
      <div className={styles.mainContent}>Контент</div>
    </main>
  );
};

export default Main;
