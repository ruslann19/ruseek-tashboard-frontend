import Navbar from "../Navbar";
import styles from "./Main.module.css";
import TasksPage from "../TasksPage";
import ModelsPage from "../ModelsPage";
import AnswersPage from "../AnswersPage";

const Main = () => {
  return (
    <main className={styles.main}>
      <Navbar />
      <div className={styles.mainContent}>
        {/* <TasksPage /> */}
        {/* <ModelsPage /> */}
        <AnswersPage />
      </div>
    </main>
  );
};

export default Main;
