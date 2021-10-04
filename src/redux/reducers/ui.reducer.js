import { addError, removeError } from "../utils";
import { ADD_ERROR, LOADING_UI, CLEAR_ERRORS, REMOVE_ERROR } from "../types";

const initialState = {
  isLoading: false,
  errors: {
    email: [],
    password: [],
    confirmPassword: []
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_ERROR:
      return {
        ...state,
        errors: addError(state.errors, action.payload)
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: {
          email: [],
          password: [],
          confirmPassword: []
        }
      };
    case LOADING_UI:
      return {
        ...state,
        isLoading: action.payload
      };
    case REMOVE_ERROR:
      return {
        ...state,
        errors: removeError(state.errors, action.payload)
      };
    default:
      return state;
  }
}