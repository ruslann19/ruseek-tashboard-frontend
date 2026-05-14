import Navbar from "../Navbar";
import styles from "./Main.module.css";
import TasksPage from "../TasksPage";
import ModelsPage from "../ModelsPage";

const Main = () => {
  return (
    <main className={styles.main}>
      <Navbar />
      <div className={styles.mainContent}>
        {/* <TasksPage /> */}
        <ModelsPage />
      </div>
    </main>
  );
};

export default Main;
