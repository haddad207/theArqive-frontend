import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import InputGroup from "react-bootstrap/InputGroup";
const buttonStyle = {
  float: "right"
};
const labelStyle = {
  marginRight: "10px"
};

export const FlagReportModal = props => {
  return (
    <Modal
      isOpen={props.modalState}
      toggle={props.toggle}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <ModalHeader toggle={props.toggle}> Flagging </ModalHeader>
      <ModalBody>
        <Form onSubmit={props.onSubmit}>
          {/* <FormGroup>
            <Label style={labelStyle} for="category">
              Type of Report
            </Label>
            <select
              name="reportType"
              value={props.flagForm}
              onChange={props.handleChange}
            >
              <option value="1">Spam</option>
              <option value="2">Harassment</option>
              <option value="3">Other</option>
            </select>
          </FormGroup> */}
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="reportType"
                value={"1"}
                onChange={props.handleChange}
                checked={props.flagForm.reportType === "1"}
              />{" "}
              Suspicious or Spam
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="reportType"
                value={"2"}
                onChange={props.handleChange}
                checked={props.flagForm.reportType === "2"}
              />{" "}
              Harassment
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="reportType"
                value={"3"}
                onChange={props.handleChange}
                checked={props.flagForm.reportType === "3"}
              />{" "}
              Other
            </Label>
          </FormGroup>
          <FormGroup>
            <Label for="exampleText">Explain Your reason</Label>
            <Input
              type="textarea"
              name="reason"
              id="exampleText"
              onChange={props.handleChange}
              value={props.flagForm.reason}
            />
          </FormGroup>

          <Button style={buttonStyle} color="success">
            Save
          </Button>
        </Form>
      </ModalBody>
      <ModalFooter>
        {/*<Button color="primary" onClick={props.toggle}>*/}
        {/*  Do Something*/}
        {/*</Button>{" "}*/}
        <Button color="secondary" onClick={props.toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default FlagReportModal;
