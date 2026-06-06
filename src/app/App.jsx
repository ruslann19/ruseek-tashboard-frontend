import Router from "./routing/Router";
import TaskPage from "@/pages/TaskPage";
import AddTasksPage from "@/pages/AddTasksPage";
import TasksPage from "@/pages/TasksPage";
import PageNotFound from "@/pages/PageNotFound";
import Main from "@/widgets/Main";
import Header from "@/widgets/Header";
import LlmsPage from "@/pages/LlmsPage";
import AnswersPage from "@/pages/AnswersPage/AnswersPage";
import TestLlmsPage from "@/pages/TestLlmsPage";
import styles from "./App.module.css";
import "./styles";

const App = () => {
  const routes = {
    "/": "/tasks",
    "/tasks": TasksPage,
    "/add-tasks": AddTasksPage,
    "/tasks/:id": TaskPage,
    "/llms": LlmsPage,
    "/answers": AnswersPage,
    "/test-llms": TestLlmsPage,
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
