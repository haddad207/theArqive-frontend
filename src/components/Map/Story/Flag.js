import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { userFlagPin, userUnFlagPin } from "../../../actions/pins";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
function Flag(props) {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const { isAuthenticated, user } = auth;

  const flagid = props.pin.userFlaggedBefore
    ? props.pin.flaggerstory.filter(a => a.flagger === props.user.id)[0].id
    : 0;
  return (
    <>
      {props.pin.userFlaggedBefore ? (
        <button
          type="submit"
          onClick={() => dispatch(userUnFlagPin(flagid, props.pin.flagState))}
          className="btn btn-primary btn-sm flag-story-btn"
        >
          {props.pin.flagState ? "Flagged" : "Flag"}
        </button>
      ) : (
        <button
          // onClick={() => {
          //   dispatch(
          //     userFlagPin(props.pin.id, props.user.id, props.pin.flagstate)
          //   );
          // }}
          onClick={() => props.flagToggle(props.pin.id)}
          type="submit"
          className="btn btn-sm btn-primary flag-story-btn"
        >
          Flag
        </button>
      )}
    </>
  );
}

export default Flag;
