import Router from "./routing/Router";
import TaskPage from "@/pages/TaskPage";
import AddTasksPage from "@/pages/AddTasksPage";
import TasksPage from "@/pages/TasksPage";
import PageNotFound from "@/pages/PageNotFound";
import Main from "@/widgets/Main";
import Header from "@/widgets/Header";
import ModelsPage from "@/pages/ModelsPage";
import AnswersPage from "@/pages/AnswersPage/AnswersPage";
import TestModelsPage from "@/pages/TestModelsPage";
import styles from "./App.module.css";
import "./styles";

const App = () => {
  const routes = {
    "/": "/tasks",
    "/tasks": TasksPage,
    "/add-tasks": AddTasksPage,
    "/tasks/:id": TaskPage,
    "/models": ModelsPage,
    "/answers": AnswersPage,
    "/test-models": TestModelsPage,
    "*": PageNotFound,
  };

  return (
    <div className={styles.wrapper}>
      <Header />
      <hr />
      <Main>
        <Router routes={routes} />
      </Main>
    </div>
  );
};

export default App;
