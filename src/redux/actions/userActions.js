import { ADD_ERROR, LOADING_UI, LOGIN, LOGOUT } from "../types";

const loginUser = (email, users) => (dispatch) => {
  let user = users.find((user) => user.email === email);
  if (user) {
    dispatch({ type: LOGIN, payload: user });
    dispatch({ type: LOADING_UI, payload: false });
  } else {
    dispatch({
      type: ADD_ERROR,
      payload: { type: email, desc: "No user found!" }
    });
    dispatch({ type: LOADING_UI, payload: false });
  }
};

const logoutUser = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

export default { loginUser, logoutUser };