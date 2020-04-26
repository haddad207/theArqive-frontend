import axios from "axios";
import { returnErrors } from "./messages";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  GET_FLAG_STATE,
  USER_SELF_DELETE,
  FLAG_COMMENT,
  REMOVE_FLAG_COMMENT,
  UPDATE_PROFILE_PIC,
  EDIT_PIN_PRO,
  GUEST_USER,
} from "./types";
import { LINK } from "../link/link";
// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: USER_LOADING });

  axios
    .get(`${LINK}/auth/user`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
      dispatch({
        type: GUEST_USER,
      });
    });
};

// LOGIN USER
export const login = (username, password) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request Body
  const body = JSON.stringify({ username, password });

  axios
    .post(`${LINK}/auth/login`, body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      // dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data,
      });
      console.log("login failed");
    });
};

// REGISTER USER
export const register = ({ username, password, email }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request Body
  const body = JSON.stringify({ username, email, password });

  axios
    .post(`${LINK}/auth/register`, body, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      console.log(res.data);
    })
    .catch((err) => {
      //dispatch(returnErrors(err.data, err.status));
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data,
      });
      console.log(err.response.data);
      //alert("Username/Email already exists");
    });
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
  axios
    .post(`${LINK}/auth/logout/`, null, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: "CLEAR_LEADS" });
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// Setup config with token - helper function
export const tokenConfig = (getState) => {
  // Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};

// self Delete
export const userSelfDelete = () => (dispatch, getState) => {
  // User Loading

  axios
    .delete(`${LINK}/auth/user`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_SELF_DELETE,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const userFlagComment = (userFlag) => (dispatch) => {
  axios
    .post(`${LINK}/flagcomment/`, userFlag)
    .then((res) => {
      dispatch({
        type: FLAG_COMMENT,
        payload: res.data,
      });
    })
    .catch((error) => console.log(error));
};

export const delFlagComment = (id) => (dispatch) => {
  axios
    .delete(`${LINK}/flagcomment/${id}/`)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: REMOVE_FLAG_COMMENT,
        payload: id,
      });
    })
    .catch((error) => console.log(error));
};

export const updateProfilePic = (url) => (dispatch, getState) => {
  const profilepic = {
    profileurl: url,
  };
  axios
    .patch(`${LINK}/auth/user`, profilepic, tokenConfig(getState))
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: UPDATE_PROFILE_PIC,
        payload: res.data,
      });
    })
    .catch((error) => console.log(error));
};

export const userEditValidate = (pin, id) => (dispatch) => {
  axios
    .patch(`${LINK}/pins/${id}/`, pin)
    .then((res) => {
      dispatch({
        type: EDIT_PIN_PRO,
        payload: res.data,
        // payload: payload
      });
    })
    .catch((err) => console.log(err));
};
