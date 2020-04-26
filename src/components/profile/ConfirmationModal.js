import React from "react";

import { Button, Modal, ModalHeader, ModalBody, Form, Label } from "reactstrap";
const buttonStyle = {
  float: "right",
};
const labelStyle = {
  marginRight: "10px",
};
const ConfirmationModal = ({ modalState, toggle, onSubmit, title }) => {
  return (
    <div>
      <Modal
        isOpen={modalState}
        toggle={toggle}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ModalHeader toggle={toggle}> {title} Confirmation </ModalHeader>
        <ModalBody>
          <Label style={labelStyle} for="category">
            Are you sure ?
          </Label>
          <Button onClick={onSubmit} style={buttonStyle} color="danger">
            {title}
          </Button>

          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ConfirmationModal;
