import { STATUSFILTER, COLORFILTER } from "./actionTypes";

export const setStatusFilter = (status) => ({
  type: STATUSFILTER,
  payload: status,
});

export const toggleColorFilter = (color) => ({
  type: COLORFILTER,
  payload: color,
});
