import Header from "./components/Header";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Header />
      <hr />
      <main className="main">
        <Navbar />
        <div className="main-content">Контент</div>
      </main>
    </>
  );
};

export default App;
