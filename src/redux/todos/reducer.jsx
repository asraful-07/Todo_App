// todosReducer.js

import { initialState } from "./initialState";
import {
  ADDED,
  TOGGLED,
  COLORSELECTED,
  EDITED,
  DELETED,
  ALLCOMPLETE,
  CLEARCOMPLETED,
} from "./actionTypes";

const nextTodoId = (todos) => {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1);
  return maxId + 1;
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDED:
      return [
        ...state,
        {
          id: nextTodoId(state),
          title: action.payload.title,
          date: action.payload.date,
          description: action.payload.description,
          completed: false,
          color: null,
        },
      ];

    case TOGGLED:
      return state.map((todo) =>
        todo.id !== action.payload
          ? todo
          : { ...todo, completed: !todo.completed }
      );

    case COLORSELECTED: {
      const { todoId, color } = action.payload;
      return state.map((todo) =>
        todo.id !== todoId ? todo : { ...todo, color }
      );
    }

    case EDITED: {
      const { todoId: editId, updatedTask } = action.payload;
      return state.map((todo) =>
        todo.id !== editId
          ? todo
          : {
              ...todo,
              title: updatedTask.title ?? todo.title,
              date: updatedTask.date ?? todo.date,
              description: updatedTask.description ?? todo.description,
            }
      );
    }

    case DELETED:
      return state.filter((todo) => todo.id !== action.payload);

    case ALLCOMPLETE:
      return state.map((todo) => ({ ...todo, completed: true }));

    case CLEARCOMPLETED:
      return state.filter((todo) => !todo.completed);

    default:
      return state;
  }
};

export default todoReducer;
