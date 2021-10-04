import { LOGIN, LOGOUT } from "../types";

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  user: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}