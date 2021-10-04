import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import databaseReducer from "./reducers/database.reducer";
import uiReducer from "./reducers/ui.reducer";
import userReducer from "./reducers/user.reducer";

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  database: databaseReducer,
  user: userReducer,
  ui: uiReducer
});

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;