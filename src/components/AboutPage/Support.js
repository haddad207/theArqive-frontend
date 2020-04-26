import React, { useState, useRef, useEffect } from "react";
import paypal from "paypal-checkout";
import { PayPalButton } from "react-paypal-button-v2";
import axios from "axios";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

export default function Support() {
  let token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = token;
  const [isEnabled, setIsEnabled] = useState(false);
  const [amount, setAmount] = useState("0.01");

  // useEffect(() => {
  //
  //     setIsEnabled(true);
  //     paypal.Button.render({
  //         env: "sandbox",
  //         client: {
  //             sandbox: "AVUoHvbFGncgYpQ6TdvEuNBOEaLrpmO_R3wWB5_elvD_3IhmwTaP2DSjcqXOFv47S068KUTebJeCyg5O",
  //             production: ""
  //         },
  //         payment: function (data, actions) {
  //             return actions.payment.create({
  //                 transactions: [
  //                     {
  //                         amount: {
  //                             total: "1.00",
  //                             currency: "USD"
  //                         }
  //                     }
  //                 ]
  //             })
  //         },
  //         commit: true,
  //
  //         onAuthorize: function (data, actions) {
  //             return actions.payment.execute().then(function (response) {
  //                 console.log("The payment was completed!");
  //             })
  //         },
  //         onCancel: function (data) {
  //             console.log("The payment was cancelled...");
  //         }
  //     }, '#paypal-express-btn');
  // }, []);
  {
    /*<div className={"container jumbotron"}>*/
  }
  {
    /*{isEnabled ? <div id="paypal-express-btn"></div> : "Loading..."}*/
  }
  {
    /*</div>*/
  }
  return (
    <div className="container">
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Support Us</h2>
          <label>Donation Amount: </label>
          <input
            type="value"
            className="form-control"
            name="amount"
            onChange={e => setAmount(e.target.value)}
            value={amount}
          />
          <br></br>
          <PayPalButton
            amount={amount}
            onSuccess={(details, data) => {
              const config = {
                headers: {
                  "Content-Type": "application/json"
                }
              };
              const paypalEmail = details.payer.emails.filter(email => {
                if (email.primary === true) {
                  return email.value;
                }
              });
              let info = JSON.stringify({
                email: paypalEmail,
                name: details.payer.name.given_name
              });
              axios
                .post("api/contactUs/support", info, config)
                .then(response => {
                  console.log(response);
                });
              alert(
                "Transaction completed by " + details.payer.name.given_name
              );
            }}
            onCancel={data => {
              alert("Transaction was cancelled...");
            }}
            style={{
              layout: "vertical",
              shape: "rect"
            }}
          />
        </div>
      </div>
    </div>
  );
}
