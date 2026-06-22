import AddTasksPage from "@/pages/AddTasksPage";
import AnswersPage from "@/pages/AnswersPage";
import BalancePage from "@/pages/BalancePage";
import BenchmarkVersionPage from "@/pages/BenchmarkVersionPage/";
import BenchmarkVersionsPage from "@/pages/BenchmarkVersionsPage";
import LeaderboardPage from "@/pages/LeaderboardPage/LeaderboardPage";
import LlmsPage from "@/pages/LlmsPage";
import LoginPage from "@/pages/LoginPage";
import PageNotFound from "@/pages/PageNotFound";
import TaskPage from "@/pages/TaskPage";
import TasksPage from "@/pages/TasksPage";
import TestLlmsPage from "@/pages/TestLlmsPage";

import Header from "@/widgets/Header";
import Main from "@/widgets/Main";

import styles from "./App.module.css";
import Router from "./routing/Router";
import "./styles";

const AdminLayout = ({ children }) => (
  <div className={styles.wrapper}>
    <Header isAdmin={true} />
    <hr />
    <Main>{children}</Main>
  </div>
);

const GuestLayout = ({ children }) => (
  <div className={styles.wrapper}>
    <Header isAdmin={false} />
    <hr />
    {children}
  </div>
);

const EmptyLayout = ({ children }) => <>{children}</>;

const App = () => {
  const routes = {
    "/": "/leaderboard",
    "/tasks": { component: TasksPage, layout: AdminLayout, isProtected: true },
    "/add-tasks": {
      component: AddTasksPage,
      layout: AdminLayout,
      isProtected: true,
    },
    "/tasks/:id": {
      component: TaskPage,
      layout: AdminLayout,
      isProtected: true,
    },
    "/llms": { component: LlmsPage, layout: AdminLayout, isProtected: true },
    "/benchmark-versions": {
      component: BenchmarkVersionsPage,
      layout: AdminLayout,
      isProtected: true,
    },
    "/benchmark-versions/:id": {
      component: BenchmarkVersionPage,
      layout: AdminLayout,
      isProtected: true,
    },
    "/benchmark-versions/:benchmarkVersionId/:llmId": {
      component: AnswersPage,
      layout: AdminLayout,
      isProtected: true,
    },
    "/test-llms": {
      component: TestLlmsPage,
      layout: AdminLayout,
      isProtected: true,
    },
    "/balance": {
      component: BalancePage,
      layout: AdminLayout,
      isProtected: true,
    },
    "/leaderboard": {
      component: LeaderboardPage,
      layout: GuestLayout,
      isProtected: false,
    },
    "/login": { component: LoginPage, layout: EmptyLayout, isProtected: false },
    "*": { component: PageNotFound, layout: EmptyLayout, isProtected: false },
  };

  return <Router routes={routes} />;
};

export default App;
