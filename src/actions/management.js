import axios from "axios";

import { GET_ABOUT_US, UPDATE_ABOUT_US } from "./types";
import { LINK } from "../link/link";
export const updateAboutUs = (aboutUs) => (dispatch) => {
  axios
    .patch(`${LINK}/management/aboutUs/1/`, aboutUs)
    .then((res) => {
      dispatch({
        type: UPDATE_ABOUT_US,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const getAboutUs = () => (dispatch) => {
  axios
    .get(`${LINK}/management/aboutUs/1/`)
    .then((res) => {
      dispatch({
        type: GET_ABOUT_US,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
