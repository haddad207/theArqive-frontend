import React from "react";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
} from "reactstrap";
const buttonStyle = {
  float: "right"
};
const labelStyle = {
  marginRight: "10px"
};
const ModalDeleteConfirm = props => {
  return (
    <div>
      <Modal
        isOpen={props.modalState}
        toggle={props.toggle}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ModalHeader toggle={props.toggle}> Delete Confirmation </ModalHeader>
        <ModalBody>
          <Form onSubmit={props.onSubmit}>
            <Button style={buttonStyle} color="danger">
              Delete
            </Button>
          </Form>
          <Button color="secondary" onClick={props.toggle}>
            Cancel
          </Button>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ModalDeleteConfirm;
