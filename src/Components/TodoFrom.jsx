import { useDispatch } from "react-redux";
import { useState } from "react";
import { added } from "../redux/todos/action";
import { FaPlus, FaRegStickyNote } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TodoFrom() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") {
      toast.error("Todo cannot be empty!");
      return;
    }
    if (input.trim().length < 4) {
      toast.error("Todo must be at least 4 characters!");
      return;
    }
    dispatch(added(input));
    setInput("");
    toast.success("Todo added successfully!");
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center bg-gray-100 px-4 py-4 rounded-md"
      >
        <FaRegStickyNote className="text-gray-600 text-xl" />
        <input
          type="text"
          placeholder="Type your todo"
          value={input}
          onChange={handleInput}
          className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-700"
        />
        <button
          type="submit"
          className="w-8 h-8 flex items-center justify-center text-green-600 hover:text-green-800"
        >
          <FaPlus size={20} />
        </button>
      </form>
    </div>
  );
}
