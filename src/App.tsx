import Header from "./sections/Header";
import Main from "./sections/Main";

function App() {
  return (
    <>
      <div className="flex flex-col max-w-5xl mx-auto gap-4">
        <Header />
        <Main />
      </div>
    </>
  );
}

export default App;
