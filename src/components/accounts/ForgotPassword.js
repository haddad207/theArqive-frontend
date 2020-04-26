import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { LINK } from "../../link/link";
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [showError, setShowError] = useState(false);
  const [messageFromServer, setMessageFromServer] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    if (email === "") {
      setShowError(false);
      setMessageFromServer("");
    } else {
      axios
        .post(`${LINK}/password_reset/`, {
          email: email,
        })
        .then((response) => {
          if (response.data.toString().includes("object")) {
            console.log(response.headers);
            window.alert(
              "An e-mail has been sent with a link to change your password"
            );
          }
          // if (response.data === "email not in db") {
          //   setShowError(true);
          //   setMessageFromServer("");
          // } else if (response.data === "recovery email sent") {
          //   setShowError(false);
          //   setMessageFromServer("recovery email sent");
          // }
        })
        .catch((error) => {
          console.log(error.data);
        });
    }
  };

  return (
    <div className={"main-content-div forgot-password-div"}>
      <div className="col-md-6 m-auto forgot-password-col">
        <div className="card card-body mt-5 forgot-password-card">
          <h2 className="text-center forgot-password-title">Forgot Password</h2>
          <form className="profile-form" onSubmit={sendEmail}>
            <div className="form-group">
              <p className="forgot-password-text">Please input your e-mail:</p>
              <TextField
                className="forgot-password-text"
                id="email"
                label="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // not sure about this part
                placeholder="Email Address"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary float-left forgot-password-btn"
            >
              Forgot Password
            </button>
          </form>
          {/* {showNullError && (
          <div>
            <p className="text-danger">*You must input a email address </p>
          </div>
        )}
        {showError && (
          <div>
            <p className="text-danger">
              *That email address doesn't exist, please try again or register
              for a new account
            </p>
          </div>
        )}
        {messageFromServer === "recovery email sent" && (
          <div>
            <h3>Password Reset Email Sent Successfully!</h3>
          </div>
        )} */}
        </div>
      </div>
    </div>
  );
}
