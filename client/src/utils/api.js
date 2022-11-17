import axios from "axios";
import store from "../app/store.js";
import { LOGOUT } from "../actions/types";

const api = axios.create({
  baseURL: "/api",
  headers: { "Conten-Type": "application/json" },
});
/*
intercept any error reponses from the api and check if the token is no
longer valid. ie. Token has expired or user is no longer authenticated.
logout the user if the token has expired. 
// */
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      store.dispatch({ type: LOGOUT });
    }
    return Promise.reject(err);
  }
);

export default api;
