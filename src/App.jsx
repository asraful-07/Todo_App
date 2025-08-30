import Header from "./Components/Header";
import TodoList from "./Components/TodoList";
import Footer from "./Components/Footer";
import Filter from "./Components/Filter";
import { ToastContainer } from "react-toastify";
import TodoModal from "./Components/TodoModal";
import TodoStatus from "./Components/TodoStatus";

function App() {
  return (
    <div className="bg-gray-100 p-6">
      <div className="container mx-auto px-4 md:px-8">
        <Header />
        <TodoStatus />
        <Filter />
        <TodoModal />
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
    </div>
  );
}

export default App;
