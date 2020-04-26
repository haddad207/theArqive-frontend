import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import InputGroup from "react-bootstrap/InputGroup";
import "react-datepicker/dist/react-datepicker.css";
import TinyMCE from "react-tinymce";
import DatePicker from "react-date-picker";
import { addPin } from "../../../actions/pins";
// import
import { OpenStreetMapProvider } from "leaflet-geosearch";

// setup
const provider = new OpenStreetMapProvider();

const buttonStyle = {
  float: "right",
};
const labelStyle = {
  marginRight: "10px",
};
function ModalAddPinForm(props) {
  var today = new Date();
  const validateAddPinForm = async (e) => {
    e.preventDefault();

    let results = "";

    if (props.addAddress) {
      let address = props.addPinValues.address;
      let locality = props.addPinValues.locality;
      let region = props.addPinValues.region;
      let country = props.addPinValues.country;
      let postCode = props.addPinValues.postCode;

      let addressQuery =
        address +
        " " +
        locality +
        " " +
        region +
        " " +
        postCode +
        " " +
        country;
      // search
      results = await provider.search({ query: addressQuery });
    }

    if (props.addPinValues.title && props.addPinValues.description) {
      console.log("Results");
      console.log(results);
      if (results.length > 0) {
        console.log("settings values");
        props.addPinValues.latitude = Number(results[0].y);
        props.addPinValues.longitude = Number(results[0].x);
      }
      console.log("validating add pin...");
      props.handleAddPinSubmit();
    }
  };

  return (
    <>
      <Modal
        isOpen={props.modalState}
        toggle={props.toggle}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ModalHeader toggle={props.toggle}> Add a story </ModalHeader>
        <ModalBody>
          <Form onSubmit={validateAddPinForm}>
            {props.addAddress ? (
              <>
                <FormGroup>
                  <Label for="address">Address</Label>
                  <Input
                    className="form-control"
                    type="text"
                    name="address"
                    value={props.addPinValues.address}
                    onChange={(e) =>
                      props.setaddPinValues({
                        ...props.addPinValues,
                        address: e.target.value,
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="address">Locality</Label>
                  <Input
                    className="form-control"
                    type="text"
                    name="locality"
                    value={props.addPinValues.locality}
                    onChange={(e) =>
                      props.setaddPinValues({
                        ...props.addPinValues,
                        locality: e.target.value,
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="address">Region</Label>
                  <Input
                    className="form-control"
                    type="text"
                    name="region"
                    value={props.addPinValues.region}
                    onChange={(e) =>
                      props.setaddPinValues({
                        ...props.addPinValues,
                        region: e.target.value,
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="address">Country</Label>
                  <Input
                    className="form-control"
                    type="text"
                    name="country"
                    value={props.addPinValues.country}
                    onChange={(e) =>
                      props.setaddPinValues({
                        ...props.addPinValues,
                        country: e.target.value,
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="address">Postcode</Label>
                  <Input
                    className="form-control"
                    type="text"
                    name="postcode"
                    value={props.addPinValues.postCode}
                    onChange={(e) =>
                      props.setaddPinValues({
                        ...props.addPinValues,
                        postCode: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </>
            ) : (
              ""
            )}
            <FormGroup>
              <Label for="title">Title</Label>
              {!props.addPinValues.title ? (
                <p className="text-danger">*Please enter a story title</p>
              ) : null}
              <Input
                className="form-control"
                type="text"
                name="title"
                value={props.addPinValues.title}
                onChange={(e) =>
                  props.setaddPinValues({
                    ...props.addPinValues,
                    title: e.target.value,
                  })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label style={labelStyle} for="category">
                Category
              </Label>
              <select
                name="category"
                value={props.addPinValues.category}
                onChange={(e) =>
                  props.setaddPinValues({
                    ...props.addPinValues,
                    category: e.target.value,
                  })
                }
              >
                <option value="1">Personal</option>
                <option value="2">Community</option>
                <option value="3">Historical</option>
              </select>
            </FormGroup>
            <FormGroup>
              <Label for="description">
                Description
                {!props.addPinValues.description ? (
                  <p className="text-danger">
                    *Please enter a story description
                  </p>
                ) : null}
              </Label>
              <TinyMCE
                content={props.addPinValues.description}
                config={{
                  height: 300,
                  fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
                  plugins: "autolink link image lists print preview",
                  toolbar: "undo redo | bold italic",
                }}
                onChange={(e) =>
                  props.setaddPinValues({
                    ...props.addPinValues,
                    description: e.target.getContent(),
                  })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label style={labelStyle} for="radius">
                Anonymity radius
              </Label>
              <select
                name="anonradius"
                value={props.addPinValues.userRadius}
                onChange={(e) =>
                  props.setaddPinValues({
                    ...props.addPinValues,
                    anonradius: e.target.value,
                  })
                }
                // onChange={e => props.setAnonRadius(e.target.value)}
              >
                <option value="1">None</option>
                <option value="2">Minimum</option>
                <option value="3">Moderate</option>
                <option value="4">Maximum</option>
              </select>
            </FormGroup>
            <InputGroup>
              <Label style={labelStyle} for="startDate">
                Start Date
              </Label>
              <DatePicker
                format={"MM/dd/yyyy"}
                name="startDate"
                value={props.addPinValues.startDate}
                onChange={(date) =>
                  props.setaddPinValues({
                    ...props.addPinValues,
                    startDate: date,
                  })
                }
              />
              <Label style={labelStyle} for="endDate">
                &nbsp;&nbsp;&nbsp;End Date
              </Label>
              <DatePicker
                format={"MM/dd/yyyy"}
                name="endDate"
                value={props.addPinValues.endDate}
                onChange={(date) =>
                  props.setaddPinValues({
                    ...props.addPinValues,
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

export default ModalAddPinForm;
