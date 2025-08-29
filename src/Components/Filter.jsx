import { useSelector, useDispatch } from "react-redux";
import { setStatusFilter, toggleColorFilter } from "../redux/filters/action";

export default function Filter() {
  const todos = useSelector((state) => state.todos);
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  const todosRemaining = todos.filter((todo) => !todo.completed).length;

  const handleStatusChange = (status) => {
    dispatch(setStatusFilter(status));
  };

  const handleColorChange = (color) => {
    const changeType = filters.colors.includes(color) ? "removed" : "added";
    dispatch(toggleColorFilter(color, changeType));
  };

  return (
    <div className="my-4 flex justify-between text-sm text-gray-500">
      <p>{todosRemaining} todo left</p>

      <ul className="flex space-x-1 items-center text-xs">
        <li
          onClick={() => handleStatusChange("All")}
          className={`cursor-pointer ${
            filters.status === "All" ? "underline font-bold" : ""
          }`}
        >
          All
        </li>
        <li>|</li>
        <li
          onClick={() => handleStatusChange("Active")}
          className={`cursor-pointer ${
            filters.status === "Active" ? "underline font-bold" : ""
          }`}
        >
          Active
        </li>
        <li>|</li>
        <li
          onClick={() => handleStatusChange("Completed")}
          className={`cursor-pointer ${
            filters.status === "Completed" ? "underline font-bold" : ""
          }`}
        >
          Completed
        </li>

        <li
          onClick={() => handleColorChange("green")}
          className={`h-3 w-3 border-2 border-green-500 rounded-full cursor-pointer ml-2 ${
            filters.colors.includes("green") ? "bg-green-500" : ""
          }`}
        ></li>
        <li
          onClick={() => handleColorChange("red")}
          className={`h-3 w-3 border-2 border-red-500 rounded-full cursor-pointer ${
            filters.colors.includes("red") ? "bg-red-500" : ""
          }`}
        ></li>
        <li
          onClick={() => handleColorChange("yellow")}
          className={`h-3 w-3 border-2 border-yellow-500 rounded-full cursor-pointer ${
            filters.colors.includes("yellow") ? "bg-yellow-500" : ""
          }`}
        ></li>
      </ul>
    </div>
  );
}
