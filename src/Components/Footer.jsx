import { useDispatch } from "react-redux";
import { allComplete, clearCompleted } from "../redux/todos/action";
import { FaCheckDouble, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const Footer = () => {
  const dispatch = useDispatch();

  const handleCompleteAll = () => {
    dispatch(allComplete());
    toast.success("Todo status updated!");
  };

  const handleClearCompleted = () => {
    dispatch(clearCompleted());
    toast.success("Todo All Clear!");
  };

  return (
    <ul className="flex justify-between my-4 text-xs text-gray-500">
      <li
        onClick={handleCompleteAll}
        className="flex items-center space-x-1 cursor-pointer hover:text-green-600"
      >
        <FaCheckDouble className="text-green-600" />
        <span>Complete All Todos</span>
      </li>
      <li
        onClick={handleClearCompleted}
        className="flex items-center space-x-1 cursor-pointer hover:text-red-600"
      >
        <FaTrashAlt className="text-red-600" />
        <span>Clear Completed</span>
      </li>
    </ul>
  );
};

export default Footer;
