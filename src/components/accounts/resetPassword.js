import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import queryString from "query-string";
import { LINK } from "../../link/link";

export default function ResetPassword() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { isAuthenticated, user } = auth;
  const [passwordForm, setpasswordForm] = useState({
    password: "",
    password2: "",
    token: "",
    errors: {},
    showError: false,
    messageFromServer: "",
  });
  const confirmPass = (e) => {
    e.preventDefault();
    const values = "test"; // queryString.parse(location.search);
    if (!formIsValid()) {
      setpasswordForm({
        ...setpasswordForm,
        showError: false,
        messageFromServer: "",
      });
      //   this.setState({
      //     showError: false,
      //     messageFromServer: ""
      //   });
    } else {
      axios
        .post(`${LINK}/password_reset/confirm/`, {
          token: values.token,
          password: passwordForm.password,
        })
        .then((response) => {
          if (response.data.toString().includes("object")) {
            window.alert("Your password has been reset");
          }
          //   if (response.data === "email not in db") {
          //     this.setState({
          //       showError: true,
          //       messageFromServer: ""
          //     });
          //   } else if (response.data === "recovery email sent") {
          //     this.setState({
          //       showError: false,
          //       messageFromServer: "recovery email sent"
          //     });
          //   }
        })
        .catch((error) => {
          console.log(error.data);
        });
    }
  };
  const formIsValid = () => {
    let errors = {};
    let formIsValid = true;
    if (passwordForm.password === passwordForm.password2) {
      formIsValid = true;
      errors["password"] = "";
      errors["password2"] = "";
    }
    if (passwordForm.password.length < 8) {
      formIsValid = false;
      errors["password"] = "*Password must be at least 8 characters long.";
    }
    if (passwordForm.password !== passwordForm.password2) {
      formIsValid = false;
      errors["password2"] = "*Passwords do not Match";
    }
    if (passwordForm.password.search(/[!@#$%^&*_+()]/) === -1) {
      formIsValid = false;
      errors["password"] =
        "*Password must contain a special character like: !@#$%^&*)(_+";
    }
    if (passwordForm.password.search(/\d/) === -1) {
      formIsValid = false;
      errors["password"] = "*Password must contain at least 1 number";
    }
    if (passwordForm.password.search(/[a-zA-Z]/) === -1) {
      formIsValid = false;
      errors["password"] = "*Password must contain a Letter";
    }
    this.setState({ errors: errors });
    return formIsValid;
  };
  return (
    <div className={"main-content-div"}>
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Reset Password</h2>
          <form className="profile-form" onSubmit={confirmPass}>
            <div className="form-group">
              <p>Please input your new password:</p>
              <TextField
                id="password"
                label="New Password"
                type="password"
                value={password || ""}
                onChange={(e) =>
                  setpasswordForm({
                    ...setpasswordForm,
                    password: e.target.value,
                  })
                }
                placeholder="password"
              />
              <p className="text-danger">{passwordForm.errors["password"]}</p>

              <p>Please Confirm your password:</p>
              <TextField
                id="password2"
                label="Confirm Password"
                type="password"
                value={password2}
                onChange={(e) =>
                  setpasswordForm({
                    ...passwordForm,
                    password2: e.target.value,
                  })
                }
                // this.handleChange("password2")}
                placeholder="Confirm Password"
              />
              <p className="text-danger">{passwordForm.errors["password2"]}</p>
            </div>
            <button type="submit" className="btn btn-primary float-left">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
