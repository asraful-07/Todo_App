import Header from "./Components/Header";
import TodoList from "./Components/TodoList";
import Footer from "./Components/Footer";
import Filter from "./Components/Filter";
import { ToastContainer } from "react-toastify";
import TodoFrom from "./Components/TodoFrom";

function App() {
  return (
    <div className="container mx-auto px-4 md:px-8 shadow-lg rounded-lg p-6">
      <Header />
      <TodoFrom />
      <Filter />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <TodoList />
      <Footer />
    </div>
  );
}

export default App;
