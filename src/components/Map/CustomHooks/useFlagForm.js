import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userFlagPin } from "../../../actions/pins";
import { userFlagComment } from "../../../actions/auth";
const useFlagForm = () => {
  const [flagModalState, setflagModalState] = useState(false);
  const [flagCommentModalState, setflagCommentModalState] = useState(false);
  const [flagForm, setflagForm] = useState("");
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, user } = auth;
  const dispatch = useDispatch();
  const flagToggle = (id) => {
    setflagModalState(!flagModalState);
    setflagForm({
      pinId: id,
      flagger: user.id,
      flagged: true,
    });
  };
  const flagCommentToggle = (id) => {
    setflagCommentModalState(!flagCommentModalState);
    setflagForm({
      comment: id,
      flagger: user.id,
      flagged: true,
    });
  };
  const handleFlagFormChange = (e) => {
    e.persist();
    setflagForm((flagForm) => ({
      ...flagForm,
      [e.target.name]: e.target.value,
    }));
  };
  const onFlagSubmit = (e) => {
    e.preventDefault();
    dispatch(userFlagPin(flagForm));
    setflagModalState(!flagModalState);
  };
  const onFlagCommentSubmit = (e) => {
    e.preventDefault();
    dispatch(userFlagComment(flagForm));
    setflagCommentModalState(!flagCommentModalState);
  };
  return {
    flagForm,
    flagToggle,
    flagCommentToggle,
    flagCommentModalState,
    flagModalState,
    onFlagSubmit,
    onFlagCommentSubmit,
    handleFlagFormChange,
  };
};

export default useFlagForm;
