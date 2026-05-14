import Navbar from "../Navbar";
import styles from "./Main.module.css";
import TasksPage from "../TasksPage";

const Main = () => {
  return (
    <main className={styles.main}>
      <Navbar />
      <div className={styles.mainContent}>
        <TasksPage />
      </div>
    </main>
  );
};

export default Main;
