import React from "react";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";
import Loading from "./Loading";

const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  const filters = useSelector((state) => state.filters);
  const loading = useSelector((state) => state.todos.loading);

  const filterByStatus = (todo) => {
    if (filters.status === "All") {
      return true;
    } else if (filters.status === "Active") {
      return !todo.completed;
    } else if (filters.status === "Completed") {
      return todo.completed;
    }
    return true;
  };

  const filterByColors = (todo) => {
    if (filters.colors.length === 0) return true;
    return filters.colors.includes(todo.color);
  };

  const filteredTodos = todos.filter(
    (todo) => filterByStatus(todo) && filterByColors(todo)
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="space-y-2">
      {filteredTodos.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No todos available....</p>
      ) : (
        filteredTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
      )}
    </div>
  );
};

export default TodoList;
