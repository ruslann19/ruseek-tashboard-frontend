import AddTasksPage from "@/pages/AddTasksPage";
import AnswersPage from "@/pages/AnswersPage";
import BalancePage from "@/pages/BalancePage";
import BenchmarkVersionPage from "@/pages/BenchmarkVersionPage/";
import BenchmarkVersionsPage from "@/pages/BenchmarkVersionsPage";
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
    "/benchmark-versions": BenchmarkVersionsPage,
    "/benchmark-versions/:id": BenchmarkVersionPage,
    "/benchmark-versions/:benchmarkVersionId/:llmId": AnswersPage,
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
