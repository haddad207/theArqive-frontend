import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormText,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";

import InputGroup from "react-bootstrap/InputGroup";
const buttonStyle = {
  float: "right",
};
const labelStyle = {
  marginRight: "10px",
};
export default function ProfileImageModal(props) {
  const size = { width: 300, height: 300 };
  const aspect = 1;
  return (
    <>
      <Modal
        isOpen={props.modalState}
        toggle={props.toggle}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ModalHeader toggle={props.toggle}> Add a Profile Image </ModalHeader>
        <ModalBody style={{ height: "300px" }}>
          <Form>
            <FormGroup>
              <Label for="exampleFile">Filffe</Label> <br />
              {props.image && (
                <Cropper
                  image={props.image}
                  crop={props.crop}
                  zoom={props.zoom}
                  cropSize={size}
                  aspect={aspect}
                  onCropChange={props.setcrop}
                  onZoomChange={props.setZoom}
                  onCropComplete={props.onCropComplete}
                  cropShape="round"
                />
              )}
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <input
            type="file"
            name="file"
            id="exampleFile"
            onChange={props.onSelectFile}
            accept="image/*"
          />
          {props.previewUrl && (
            <img alt="Crop preview" src={props.previewUrl} />
          )}
          <Slider
            value={props.zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e, zoom) => props.setZoom(zoom)}
          />
          <Button
            style={buttonStyle}
            onClick={props.showCroppedImage}
            color="success"
          >
            Save
          </Button>

          <Button color="secondary" onClick={props.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
