import Router from "./Router";
import TaskPage from "./pages/TaskPage";
import TasksPage from "./pages/TasksPage";
import PageNotFound from "./pages/PageNotFound";
import Main from "./components/Main";
import Header from "./components/Header";
import ModelsPage from "./pages/ModelsPage";
import AnswersPage from "./pages/AnswersPage/AnswersPage";
import TestModelsPage from "./pages/TestModelsPage";

const App = () => {
  const routes = {
    "/": "/tasks",
    "/tasks": TasksPage,
    "/tasks/:id": TaskPage,
    "/models": ModelsPage,
    "/answers": AnswersPage,
    "/test-models": TestModelsPage,
    "*": PageNotFound,
  };

  return (
    <>
      <Header />
      <hr />
      <Main>
        <Router routes={routes} />
      </Main>
    </>
  );
};

export default App;
