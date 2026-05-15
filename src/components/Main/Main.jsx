import Navbar from "../Navbar";
import styles from "./Main.module.css";
import TasksPage from "../TasksPage";
import ModelsPage from "../ModelsPage";
import AnswersPage from "../AnswersPage";
import TestModelsPage from "../TestModelsPage";
import { useState } from "react";

const createMainContent = (activeNavbarItem) => {
  switch (activeNavbarItem) {
    case "Models":
      return <ModelsPage />;
    case "Tasks":
      return <TasksPage />;
    case "Answers":
      return <AnswersPage />;
    case "Test models":
      return <TestModelsPage />;
  }
};

const Main = () => {
  const [activeNavbarItem, setActiveNavbarItem] = useState("Tasks");

  const mainContent = createMainContent(activeNavbarItem);

  const onClickNavbarItem = (navbarItem) => {
    setActiveNavbarItem(navbarItem);
  };

  return (
    <main className={styles.main}>
      <Navbar onClickNavbarItem={onClickNavbarItem} />
      <div className={styles.mainContent}>{mainContent}</div>
    </main>
  );
};

export default Main;
