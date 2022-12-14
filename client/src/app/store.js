import { applyMiddleware } from "redux";
import { configureStore } from '@reduxjs/toolkit'
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../reducers";
import setAuthToken from '../utils/setAuthToken'

const initialState = {};
const middleware = [thunk];
const store = configureStore(
  {reducer:rootReducer},
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
let currentState = store.getState();
store.subscribe(() => {
  let previousState = currentState;
  currentState = store.getState();
  if (previousState.auth.token !== currentState.auth.token) {
    const token = currentState.auth.token;
    setAuthToken(token);
  }
});

export default store;