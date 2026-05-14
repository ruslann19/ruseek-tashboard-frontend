import Navbar from "../Navbar";
import styles from "./Main.module.css";
import TasksPage from "../TasksPage";
import ModelsPage from "../ModelsPage";
import AnswersPage from "../AnswersPage";
import TestModelsPage from "../TestModelsPage";

const Main = () => {
  return (
    <main className={styles.main}>
      <Navbar />
      <div className={styles.mainContent}>
        {/* <TasksPage /> */}
        {/* <ModelsPage /> */}
        {/* <AnswersPage /> */}
        <TestModelsPage />
      </div>
    </main>
  );
};

export default Main;
