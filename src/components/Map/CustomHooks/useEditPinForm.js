import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPin, getMinPinDate, getMaxPinDate } from "../../../actions/pins";
const useEditPinForm = (pinData, setPinData) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, user } = auth;
  const [editpinmodalState, seteditpinmodalState] = useState(false);
  const [editPinForm, seteditPinForm] = useState({
    //fields for editng
    id: "1",
    title: "",
    description: "",
    category: "1",
    startDate: new Date(),
    endDate: new Date(),
  });

  const setEditPinState = (pin) => {
    let start = pin.startDate.split("-");
    start = new Date(start[0], start[1] - 1, start[2], 0, 0, 0, 0);
    let end = pin.endDate.split("-");
    end = new Date(end[0], end[1] - 1, end[2], 0, 0, 0, 0);
    seteditPinForm({
      ...pin,
      startDate: start,
      endDate: end,
    });
    seteditpinmodalState(!editpinmodalState);
  };
  const updateEditForm = (e) => {
    e.persist();
    seteditPinForm((editPinForm) => ({
      ...editPinForm,
      [e.target.name]: e.target.value,
    }));
  };
  const onEditSubmit = (e) => {
    //patches the selected pin
    if (e) e.preventDefault();

    dispatch(editPin(editPinForm, editPinForm.id, user.id));
    setPinData({
      ...pinData,
      title: editPinForm.title,
      description: editPinForm.description,
      category: editPinForm.category,
      startDate: editPinForm.startDate,
      endDate: editPinForm.endDate,
    });
    dispatch(getMaxPinDate());
    dispatch(getMinPinDate());
    editToggle();
  };

  const editToggle = () => {
    seteditpinmodalState(!editpinmodalState);
  };

  return {
    editToggle,
    editPinForm,
    seteditPinForm,
    editpinmodalState,
    onEditSubmit,
    updateEditForm,
    seteditpinmodalState,
    setEditPinState,
  };
};

export default useEditPinForm;
