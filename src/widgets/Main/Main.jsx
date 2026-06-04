import Navbar from "@/widgets/Navbar";
import styles from "./Main.module.css";

const Main = (props) => {
  const { children } = props;

  return (
    <main className={styles.main}>
      <Navbar />
      <div className={styles.mainContent}>{children}</div>
    </main>
  );
};

export default Main;
