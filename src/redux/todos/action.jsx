import {
  ADDED,
  TOGGLED,
  COLORSELECTED,
  EDITED,
  DELETED,
  ALLCOMPLETE,
  CLEARCOMPLETED,
} from "./actionTypes";

export const added = (todoText) => ({
  type: ADDED,
  payload: todoText,
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

export const edited = (todoId, newText) => ({
  type: EDITED,
  payload: {
    todoId,
    newText,
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
