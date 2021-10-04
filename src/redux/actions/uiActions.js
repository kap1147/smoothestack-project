import { ADD_ERROR, CLEAR_ERRORS, LOADING_UI, REMOVE_ERROR } from "../types";

const addError = (type, desc) => (dispatch) => {
  dispatch({ type: ADD_ERROR, payload: { type, desc } });
};

const loading = (flag) => (dispatch) => {
  dispatch({ type: LOADING_UI, payload: flag });
};

const removeError = (type, desc) => (dispatch) => {
  dispatch({ type: REMOVE_ERROR, payload: { type, desc } });
};

const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export default { addError, clearErrors, loading, removeError };