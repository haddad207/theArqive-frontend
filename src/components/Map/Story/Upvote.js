import React, { useState, useEffect } from "react";
import axios from "axios";
import CircularIndeterminate from "./CircularIndeterminate";
import { userFirstUpvote, userUpovte } from "../../../actions/pins";
import { useDispatch, useSelector } from "react-redux";
function Upvote(props) {
  const auth = useSelector((state) => state.auth);

  const { favoritedPin, upvoteid, user } = auth;
  const dispatch = useDispatch();

  return (
    <FavoriteButton
      onClick={() =>
        favoritedPin
          ? dispatch(userUpovte(upvoteid))
          : dispatch(userFirstUpvote(props.id, user.id))
      }
    >
      {favoritedPin
        ? "./static/frontend/images/Bookmark_Icon.png"
        : "./static/frontend/images/Bookmark_Outline_Icon.png"}
    </FavoriteButton>
  );
}

export default Upvote;

const FavoriteButton = ({ children, onClick }) => {
  return (
    <button className="favorite-story-btn" onClick={onClick}>
      <img
        className="story-favorites-icon"
        src={children}
        alt={"favorite this story icon"}
      />
    </button>
  );
};
