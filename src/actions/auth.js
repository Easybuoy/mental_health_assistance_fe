import axios from "axios";

import { LOGIN } from "./types";
import { setError } from "./error";

export const loginUser = (username, password) => dispatch => {
  const payload = {
    username,
    password
  };
  axios
    .post("http://localhost:5000/api/login", payload)
    .then(res => {
      const { payload } = res.data;
      localStorage.setItem("token", payload);
      dispatch(login(payload));
    })
    .catch(() => dispatch(setError("Username or Password Incorrect.")));
};

export const login = payload => {
  return {
    type: LOGIN,
    payload
  };
};