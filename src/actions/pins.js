import axios from "axios";

import {
  GET_PINS,
  DELETE_PINS,
  ADD_PIN,
  EDIT_PIN,
  GET_PIN,
  GET_USER,
  SEARCH_PINS,
  GET_UPVOTE,
  ADD_COMMENT,
  DELETE_COMMENT,
  GET_PINS_BY_OWNER,
  GET_PIN_BY_ID,
  USER_FLAG_PIN,
  USER_FIRST_UPVOTE,
  USER_UPVOTE,
  USER_UNFLAG,
  GET_FLAGGED_PINS,
  GET_NEXT_FLAGGED_PINS,
  GET_MAX_PIN,
  GET_MIN_PIN,
  USER_FAVORITE_STATE_PIN,
} from "./types";
import ActionButton from "antd/lib/modal/ActionButton";
import { LINK } from "../link/link";
//GET PINS
export const getPins = () => (dispatch) => {
  axios
    .get(`${LINK}/pins/`)
    .then((res) => {
      dispatch({
        type: GET_PINS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const getPinsWithBounds = (north, south, east, west) => (dispatch) => {
  axios
    .get(
      `${LINK}/pinCoordFilter/?latitude_gte=${south}&latitude_lte=${north}&longitude_gte=${west}&longitude_lte=${east}`
    )
    .then((res) => {
      dispatch({
        type: GET_PINS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const getMinPinDate = () => (dispatch) => {
  axios
    .get(`${LINK}/minPinDate`)
    .then((res) => {
      let date = res.data[0].startDate.split("-");

      let minDate = new Date(date[0], date[1], date[2], 0, 0, 0, 0);

      dispatch({
        type: GET_MIN_PIN,
        payload: minDate,
      });
    })
    .catch((err) => console.log(err));
};

export const getMaxPinDate = () => (dispatch) => {
  axios
    .get(`${LINK}/maxPinDate`)
    .then((res) => {
      let date = res.data[0].startDate.split("-");

      let maxDate = new Date(date[0], date[1], date[2], 0, 0, 0, 0);

      dispatch({
        type: GET_MAX_PIN,
        payload: maxDate,
      });
    })
    .catch((err) => console.log(err));
};

export const searchPins = (searchQuery, categories, startDate, endDate) => (
  dispatch
) => {
  axios
    .get(
      `${LINK}/pinSearch?search=${searchQuery}&categories=${categories}&startDate_gte=${startDate}&startDate_lte=${endDate}`
    )
    .then((res) => {
      dispatch({
        type: SEARCH_PINS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const deletePins = (id) => (dispatch) => {
  axios
    .delete(`${LINK}/pins/${id}/`)
    .then((res) => {
      dispatch({
        type: DELETE_PINS,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

export const addPin = (pin) => (dispatch) => {
  let latitudeSplit = pin.latitude.toString().split(".");
  let latitude = latitudeSplit[0] + "." + latitudeSplit[1].substring(0, 6);
  let longitudeSplit = pin.longitude.toString().split(".");
  let longitude = longitudeSplit[0] + "." + longitudeSplit[1].substring(0, 6);
  pin.latitude = latitude;
  pin.longitude = longitude;

  axios
    .post(`${LINK}/pins/`, pin)
    .then((res) => {
      dispatch({
        type: ADD_PIN,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const editPin = (pin, id, userid) => (dispatch) => {
  axios
    .patch(`${LINK}/pins/${id}/`, pin)
    .then((res) => {
      let validUser = false;
      let flagstateofuser = false;
      let userFlaggedBefore = false;
      let upvotedBefore = false;
      let userCurrentUpvote = false;
      if (userid) {
        userFlaggedBefore = res.data.flaggerstory.some(
          (a) => a.flagger === userid
        );
        upvotedBefore = res.data.updotes.some((b) => b.upVoter === userid);
        if (upvotedBefore)
          userCurrentUpvote = res.data.updotes.filter(
            (b) => b.upVoter === userid
          )[0].upvote;
        if (userFlaggedBefore)
          flagstateofuser = res.data.flaggerstory.filter(
            (a) => a.flagger === userid
          )[0].flagged;
        validUser = true;
      }
      const payload = {
        ...res.data,
        userCurrentUpvote: userCurrentUpvote,
        upvotedBefore: upvotedBefore,
        validUser: validUser,
        flagState: flagstateofuser,
        userFlaggedBefore: userFlaggedBefore,
      };

      dispatch({
        type: EDIT_PIN,
        payload: res.data,
        // payload: payload
      });
    })
    .catch((err) => console.log(err));
};

export const getPin = (id, userid) => (dispatch) => {
  axios
    .get(`${LINK}/pins/${id}/`)
    .then((res) => {
      let validUser = false;
      let flagstateofuser = false;
      let userFlaggedBefore = false;
      let upvotedBefore = false;
      let userCurrentUpvote = false;
      if (userid) {
        userFlaggedBefore = res.data.flaggerstory.some(
          (a) => a.flagger === userid
        );
        upvotedBefore = res.data.updotes.some((b) => b.upVoter === userid);
        if (upvotedBefore)
          userCurrentUpvote = res.data.updotes.filter(
            (b) => b.upVoter === userid
          )[0].upvote;
        if (userFlaggedBefore)
          flagstateofuser = res.data.flaggerstory.filter(
            (a) => a.flagger === userid
          )[0].flagged;
        validUser = true;
      }
      const payload = {
        ...res.data,
        userCurrentUpvote: userCurrentUpvote,
        upvotedBefore: upvotedBefore,
        validUser: validUser,
        flagState: flagstateofuser,
        userFlaggedBefore: userFlaggedBefore,
      };

      dispatch({
        type: GET_PIN,
        payload: payload,
      });
    })
    .catch((error) => console.log(error));
};
export const getUpvote = (pinId, userid) => (dispatch) => {
  axios
    .get(`${LINK}/upVoteStory?pinId=${pinId}&userid=${userid}`)
    .then((res) => {
      dispatch({
        type: GET_UPVOTE,
        payload: res.data,
      });
    })
    .catch((error) => console.log(error));
};
export const addComment = (comment) => (dispatch) => {
  axios
    .post(`${LINK}/commentStory/`, comment)
    .then((res) => {
      dispatch({
        type: ADD_COMMENT,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const deleteComment = (id) => (dispatch) => {
  axios
    .delete(`${LINK}/commentStory/${id}/`)
    .then((res) => {
      dispatch({
        type: DELETE_COMMENT,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

export const getPinsByOwner = (ownerId) => (dispatch) => {
  axios
    .get(`${LINK}/pins/?owner=${ownerId}`)
    .then((res) => {
      dispatch({
        type: GET_PINS_BY_OWNER,
        payload: res.data,
      });
    })
    .catch((error) => console.log(error));
};

export const userFlagPin = (userFlag) => (dispatch) => {
  axios
    .post(`${LINK}/flagStory/`, userFlag)
    .then((res) => {
      dispatch({
        type: USER_FLAG_PIN,
        payload: res.data,
      });
    })
    .catch((error) => console.log(error));
};

export const userUnFlagPin = (id, state) => (dispatch) => {
  const userflagged = {
    flagged: !state,
  };

  axios
    .patch(`${LINK}/flagStory/${id}/`, userflagged)
    .then((res) => {
      dispatch({
        type: USER_UNFLAG,
        payload: res.data,
      });
    })
    .catch((error) => console.log(error));
};

export const userFirstUpvote = (pin, user) => (dispatch) => {
  const submit = {
    upvote: true,
    pinId: pin,
    upVoter: user,
  };

  axios
    .post(`${LINK}/upVoteStory/`, submit)
    .then((res) => {
      dispatch({
        type: USER_FIRST_UPVOTE,
        payload: res.data,
      });
    })
    .catch((error) => console.log(error));
};

export const userUpovte = (id) => (dispatch) => {
  axios
    .delete(`${LINK}/upVoteStory/${id}/`)
    .then((res) => {
      dispatch({
        type: USER_UPVOTE,
        payload: id,
      });
    })
    .catch((error) => console.log(error));
};

export const getFlaggedPins = () => (dispatch) => {
  axios
    .get(`${LINK}/pinFlagged`)
    .then((res) => {
      dispatch({
        type: GET_FLAGGED_PINS,
        payload: res.data,
      });
    })
    .catch((error) => console.log(error));
};
export const getNextFlaggedPins = (nextLink) => (dispatch) => {
  axios
    .get(`${nextLink}`)
    .then((res) => {
      dispatch({
        type: GET_NEXT_FLAGGED_PINS,
        payload: res.data,
      });
    })
    .catch((error) => console.log(error));
};

export const getPinsById = (pinIdArray) => (dispatch) => {
  axios
    .get(`${LINK}/pins/`)
    .then((res) => {
      let favoritedPins = res.data.pins.filter((pin) =>
        pinIdArray.includes(pin.id)
      );

      dispatch({
        type: GET_PINS,
        payload: favoritedPins,
      });
    })
    .catch((err) => console.log(err));
};
