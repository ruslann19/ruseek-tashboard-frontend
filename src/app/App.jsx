import Router from "./routing/Router";
import TaskPage from "@/pages/TaskPage";
import TasksPage from "@/pages/TasksPage";
import PageNotFound from "@/pages/PageNotFound";
import Main from "@/widgets/Main";
import Header from "@/widgets/Header";
import ModelsPage from "@/pages/ModelsPage";
import AnswersPage from "@/pages/AnswersPage/AnswersPage";
import TestModelsPage from "@/pages/TestModelsPage";
import "./styles";

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
