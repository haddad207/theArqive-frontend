import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  InputGroup,
  Input,
  Label,
} from "reactstrap";
import TinyMCE from "react-tinymce";

import DatePicker from "react-date-picker";
import "react-datepicker/dist/react-datepicker.css";
const buttonStyle = {
  float: "right",
};
const labelStyle = {
  marginRight: "10px",
};
function ModalEditPinForm(props) {
  const validateEditForm = (e) => {
    e.preventDefault();
    // console.log("validating edit pin...");
    if (props.userForm.title && props.userForm.description) {
      props.onSubmit();
    }
  };
  const {
    address,
    locality,
    country,
    postCode,
    region,
    category,
    title,
    description,
    startDate,
    endDate,
  } = props.userForm;
  const { updateEditForm } = props;

  return (
    <>
      {" "}
      <Modal
        isOpen={props.modalState}
        toggle={props.toggle}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ModalHeader toggle={props.toggle}> Add a story </ModalHeader>
        <ModalBody>
          <Form onSubmit={validateEditForm} noValidate={true}>
            {address && (
              <>
                <InputField
                  label="address"
                  title="Address"
                  value={address}
                  onChange={updateEditForm}
                />
                <InputField
                  label="locality"
                  title="Locality"
                  value={locality}
                  onChange={updateEditForm}
                />
                <InputField
                  label="region"
                  title="Region"
                  value={region}
                  onChange={updateEditForm}
                />
                <InputField
                  label="country"
                  title="Country"
                  value={country}
                  onChange={updateEditForm}
                />
                <InputField
                  label="postCode"
                  title="postCode"
                  value={postCode}
                  onChange={updateEditForm}
                />{" "}
              </>
            )}
            <FormGroup>
              <Label style={labelStyle} for="category">
                Category
              </Label>
              <select
                name="category"
                value={props.userForm.category}
                onChange={props.updateEditForm}
              >
                <option value="1">Personal</option>
                <option value="2">Community</option>
                <option value="3">Historical</option>
              </select>
            </FormGroup>
            <FormGroup>
              <Label for="title">Title</Label>
              {!props.userForm.title ? (
                <p className="text-danger">*Please enter a story title</p>
              ) : null}
              <Input
                className="form-control"
                type="text"
                name="title"
                value={props.userForm.title}
                onChange={props.updateEditForm}
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">
                Description
                {!props.userForm.description ? (
                  <p className="text-danger">
                    *Please enter a story description
                  </p>
                ) : null}
              </Label>
              <TinyMCE
                content={props.userForm.description}
                config={{
                  height: 300,
                  fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
                  plugins: "autolink link image lists print preview",
                  toolbar: "undo redo | bold italic",
                }}
                onChange={(e) =>
                  props.setuserForm({
                    ...props.userForm,
                    description: e.target.getContent(),
                  })
                }
              />
            </FormGroup>
            <InputGroup>
              <label style={labelStyle} for="startDate">
                Start Date
              </label>
              <DatePicker
                format={"MM/dd/yyyy"}
                name="startDate"
                value={props.userForm.startDate}
                onChange={(date) =>
                  props.setuserForm({
                    ...props.userForm,
                    startDate: date,
                  })
                }
              />
              <label style={labelStyle} for="endDate">
                &nbsp;&nbsp;&nbsp;End Date
              </label>
              <DatePicker
                format={"MM/dd/yyyy"}
                name="endDate"
                value={props.userForm.endDate}
                onChange={(date) =>
                  props.setuserForm({
                    ...props.userForm,
                    endDate: date,
                  })
                }
              />
            </InputGroup>

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
    </>
  );
}

export default ModalEditPinForm;

const InputField = ({ label, title, value, onChange }) => {
  return (
    <FormGroup>
      <Label for={label}>{title}</Label>
      <Input
        className="form-control"
        type="text"
        name={label}
        value={value || ""}
        onChange={onChange}
      />
    </FormGroup>
  );
};
