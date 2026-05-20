import Navbar from "../Navbar";
import styles from "./Main.module.css";
import TasksPage from "../TasksPage";
import ModelsPage from "../ModelsPage";
import AnswersPage from "../AnswersPage";
import TestModelsPage from "../TestModelsPage";
import { useState } from "react";
import TaskPage from "../TaskPage/TaskPage";
import { TasksProvider } from "../../context/TasksContext";

const Main = () => {
  const [activeNavbarItem, setActiveNavbarItem] = useState("Tasks");
  const [activePage, setActivePage] = useState("Tasks");

  const createMainContent = (activePage) => {
    switch (activePage) {
      case "Tasks":
        return (
          <TasksProvider>
            <TasksPage setActivePage={setActivePage} />
          </TasksProvider>
        );
      case "Task":
        console.log("here");
        return <TaskPage id={1} question={"Как дела?"} answer={"Нормально"} />;
      case "Answers":
        return <AnswersPage />;
      case "Models":
        return <ModelsPage />;
      case "Test models":
        return <TestModelsPage />;
    }
  };
  const mainContent = createMainContent(activePage);

  const onClickNavbarItem = (navbarItem) => {
    setActiveNavbarItem(navbarItem);
    setActivePage(navbarItem);
  };

  return (
    <main className={styles.main}>
      <Navbar
        activeNavbarItem={activeNavbarItem}
        onClickNavbarItem={onClickNavbarItem}
      />
      <div className={styles.mainContent}>{mainContent}</div>
    </main>
  );
};

export default Main;
