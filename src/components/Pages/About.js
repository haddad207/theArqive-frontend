import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { updateAboutUs, getAboutUs } from "../../actions/management";
import { useEffect, useState } from "react";
import TinyMCE from "react-tinymce";
import { Markup } from "interweave";

function About() {
  const [aboutUs, setAboutUs] = useState("");
  const [editButtonValue, setEditButtonValue] = useState("Edit");
  const dispatch = useDispatch();
  const aboutUsData = useSelector(state => state.management.about_us);
  const auth = useSelector(state => state.auth);
  const [editMode, setEditMode] = useState(false);
  const { isAuthenticated, user } = auth;
  const [editorContent, setEditorContent] = useState("");

  let authorized = false;

  if (user) {
    if (user.is_administrator || user.is_moderator) {
      authorized = true;
    }
  }

  useEffect(() => {
    dispatch(getAboutUs());
    // setAboutUs(aboutUsData);
  }, []);

  const handleEditorChange = e => {
    setEditorContent(e.target.getContent());
    console.log("Content was updated:", e.target.getContent());
  };

  const submitEdit = () => {
    console.log(editorContent);
    const about_us = editorContent;
    const aboutUsData = { about_us };
    dispatch(updateAboutUs(aboutUsData));
  };

  const editAboutUs = () => {
    if (editMode) {
      setEditButtonValue("Edit");
      setEditMode(false);
    } else {
      setEditButtonValue("Close");
      setEditMode(true);
    }
    // show edit form
  };

  const canEdit = (
    <div className="admin-moderator-edit">
      <button
        onClick={editAboutUs}
        className="btn btn-success admin-moderator-edit"
      >
        {editButtonValue}
      </button>
    </div>
  );

  const showEditor = aboutUsContent => (
    <div>
      <TinyMCE
        content={aboutUsContent}
        config={{
          height: 300,
          fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
          plugins: "autolink link image lists print preview",
          toolbar: "undo redo | bold italic | alignleft aligncenter alignright"
        }}
        onChange={handleEditorChange}
      />
      <button
        onClick={submitEdit}
        className="btn btn-success admin-moderator-edit"
      >
        Submit
      </button>
    </div>
  );

  return (
     <Row className={"aboutUs-row"}>
        <Col xs>
          <h2 className="aboutHeader">
            About Us
          </h2>

          <p className="aboutDesc">
            The arqive is an online map of queer stories (histories, herstories, theirstories) and resources created and collected by and for queer people all around the world to serve as a resource and a reminder that we are here, we've always been here, and we always will be.<br />
            <br />
        Originally founded by Cynthia Wang in 2014, then revamped in 2019 with new Co-Founder Zachary Vernon. The arqive seeks to provide the full range of queer stories from historical/archival to personal by geolocating them and digitally preserving them. This is an attempt to counter the queer erasure that happens through the changing physical locations of queer stories. It also seeks to make visible historically marginalized voices and stories and connect queer people globally.
        </p>
        </Col>
        <Col style={{ marginTop: "auto", marginBottom: "auto" }}>
        <img className="moveimage" src="./static/frontend/images/aboutUs_03.png" alt="About Us" />
        <p className="copyright">
              ©COPYRIGHT Manuscripts and Archives Division, The New York Public Library. Barbara Gittings
              Photographer: thought to be, Gordon Rainsford. Simon Tseko Nkoli
              ©University of California. Harvy Milk
              ©Jonathan Silin, courtesy of The New York Public Library. Harry Hay
              PHOTO: COURTESY OF NETFLIX. Marsha P. JOhnson
              ©Liz Mangelsdorf/San Francisco Chronicle/Corbis. Phyllis Lyon and Del Martin
              ©William Lucas Walker.Peter Staley
        </p>
        </Col>
      </Row>
  )}

export default About;

