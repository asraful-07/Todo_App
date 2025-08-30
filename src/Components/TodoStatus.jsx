import React from "react";
import { useSelector } from "react-redux";

const TodoStatus = () => {
  const todos = useSelector((state) => state.todos);

  const totalTodos = todos.length;

  const activeTodos = todos.filter((todo) => !todo.completed).length;

  const completedTodos = todos.filter((todo) => todo.completed).length;

  return (
    <div className="flex justify-between my-4 text-sm font-medium bg-white shadow-xl p-4 rounded-lg">
      <p className="flex items-center gap-1">
        <span className="font-bold">{totalTodos}</span> All
      </p>
      <p className="flex items-center gap-1">
        <span className="font-bold ">{activeTodos}</span> Active
      </p>
      <p className="flex items-center gap-1">
        <span className="font-bold ">{completedTodos}</span> Completed
      </p>
    </div>
  );
};

export default TodoStatus;
