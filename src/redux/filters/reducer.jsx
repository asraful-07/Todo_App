import { STATUSFILTER, COLORFILTER } from "./actionTypes";
import { filterInitialState } from "./initialState";

const filterReducer = (state = filterInitialState, action) => {
  switch (action.type) {
    case STATUSFILTER:
      return {
        ...state,
        status: action.payload,
      };

    case COLORFILTER: {
      const color = action.payload;
      const colors = state.colors.includes(color)
        ? state.colors.filter((c) => c !== color)
        : [...state.colors, color];
      return {
        ...state,
        colors,
      };
    }

    default:
      return state;
  }
};

export default filterReducer;
//
