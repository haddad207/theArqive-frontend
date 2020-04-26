import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { LINK } from "../../link/link";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
export default function contactUs() {
  const auth = useSelector((state) => state.auth);

  let token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = token;

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (email != "") {
      // var data = JSON.stringify({ "name": name.value, "email": email.value });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // Request Body
      // const body = JSON.stringify({ username, email, password });
      let data = JSON.stringify({ email: email, message: message });
      axios.post(`${LINK}/contactUs/`, data, config).then((response) => {
        console.log(response);
      });
    } else {
      setEmail(`Anonymous@anon.com`);

      axios
        .post(`${LINK}/contactUs/`, { email: email, message: message })
        .then((response) => {
          console.log(response);
          alert("Your message has been sent");
        });
    }
  };

  return (
    <div className="main-content-div contact-us-div">
      <div className="col-md-6 m-auto contact-us-col">
        <div className="card card-body mt-5 contact-us-card">
          <h2 className="text-center contact-us-title">What's on your mind?</h2>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label className="contact-us-text">Email (Optional)</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <br></br>
              <label className="contact-us-text">Message</label>
              <textarea
                rows="5"
                type="message"
                className="form-control"
                name="message"
                onChange={(e) => setMessage(e.target.value)}
              >
                {message}
              </textarea>
              {/* <input
              type="message"
              className="form-text"
              name="message"
              onChange={e =>
                setcontactForm({
                  ...contactForm,
                  message: e.target.value
                })
              }
              value={contactForm.message}
            /> */}
              <div />
              {/* <p className="text-danger">{contactForm.errors["email"]}</p> */}
            </div>
            <div className="contact-us-btn-div">
              <button type="submit" className="btn btn-primary contact-us-btn">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
