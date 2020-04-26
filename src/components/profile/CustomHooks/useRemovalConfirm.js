import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unFavoriteProfile } from "../../../actions/users";
const useRemovalConfirm = (onSubmit) => {
  const [removalModalState, setremovalModalState] = useState(false);
  const [removalFav, setremovalFav] = useState();
  const dispatch = useDispatch();
  const removalToggle = (id) => {
    setremovalModalState(!removalModalState);
    setremovalFav(id);
  };

  const onRemovalSubmit = () => {
    dispatch(unFavoriteProfile(removalFav));
    setremovalModalState(!removalModalState);
  };
  const onDeleteHome = () => {
    onSubmit(removalFav);
    setremovalModalState(!removalModalState);
  };
  const onConfirmDelete = () => {
    onSubmit();
  };
  return {
    removalModalState,
    removalToggle,
    onRemovalSubmit,
    removalFav,
    onDeleteHome,
    onConfirmDelete,
  };
};

export default useRemovalConfirm;
