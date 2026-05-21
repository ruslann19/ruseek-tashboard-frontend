import Router from "./Router";
import TaskPage from "./pages/TaskPage";
import TasksPage from "./pages/TasksPage";
import PageNotFound from "./pages/PageNotFound";
import Main from "./components/Main";
import Header from "./components/Header";

const App = () => {
  const routes = {
    "/": "/tasks",
    "/tasks": TasksPage,
    "/tasks/:id": TaskPage,
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
