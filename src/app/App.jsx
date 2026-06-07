import AddTasksPage from "@/pages/AddTasksPage";
import AnswersPage from "@/pages/AnswersPage/AnswersPage";
import BalancePage from "@/pages/BalancePage";
import LlmsPage from "@/pages/LlmsPage";
import PageNotFound from "@/pages/PageNotFound";
import TaskPage from "@/pages/TaskPage";
import TasksPage from "@/pages/TasksPage";
import TestLlmsPage from "@/pages/TestLlmsPage";

import Header from "@/widgets/Header";
import Main from "@/widgets/Main";

import styles from "./App.module.css";
import Router from "./routing/Router";
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
    "/balance": BalancePage,
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
