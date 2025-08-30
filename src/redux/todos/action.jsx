import {
  ADDED,
  TOGGLED,
  COLORSELECTED,
  EDITED,
  DELETED,
  ALLCOMPLETE,
  CLEARCOMPLETED,
} from "./actionTypes";

export const added = (task) => ({
  type: ADDED,
  payload: task,
});

export const toggled = (todoId) => ({
  type: TOGGLED,
  payload: todoId,
});

export const colorSelected = (todoId, color) => ({
  type: COLORSELECTED,
  payload: {
    todoId,
    color,
  },
});

export const edited = (todoId, updatedTask) => ({
  type: EDITED,
  payload: {
    todoId,
    updatedTask,
  },
});

export const deleted = (todoId) => ({
  type: DELETED,
  payload: todoId,
});

export const allComplete = () => ({
  type: ALLCOMPLETE,
});

export const clearCompleted = () => ({
  type: CLEARCOMPLETED,
});
