import React, { useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";

import { Row, Col } from "react-bootstrap";
import Bubble from "../images/Purple_Chat_Bubble.png";
import GreenBubble from "../images/Green_Chat_Bubble.png";
import RedBubble from "../images/Red_Chat_Bubble.png";
import IG from "../images/instagram_icon.JPG";
import TW from "../images/twitter_icon.JPG";
import FB from "../images/facebook_icon.JPG";
export default function Support() {
  // const [isEnabled, setIsEnabled] = useState(false);
  const [amount, setAmount] = useState("0.00");

  return (
    <div className="main-content-div support-us-div">
      <Row style={{ width: "100%", minHeight: "100%", height: "auto", marginRight: "0px", marginLeft: "0px" }}>
        <Col md={9} className="support-us-main-content-col">
          <div className="support-us-main-content-div">
            <h3 className="support-us-title">How you can help</h3>
            <Row style={{ paddingTop: "50px" }}>
              <Col md={4}>
                <div className="support-us-image-div">
                  <img
                    src={Bubble}
                    alt="post your stories"
                    className="support-us-images"
                  />
                  <div className="text-block-1">
                    <h4 className="support-us-image-main-text">post</h4>
                    <p className="support-us-image-sub-text">your stories</p>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="support-us-image-div">
                  <img
                    src={GreenBubble}
                    alt="post your stories"
                    className="support-us-images"
                  />
                  <div className="text-block-1">
                    <h4 className="support-us-image-main-text">share</h4>
                    <p className="support-us-image-sub-text">#thearqive</p>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="support-us-image-div">
                  <img
                    src={RedBubble}
                    alt="post your stories"
                    className="support-us-images"
                  />
                  <div className="text-block-1">
                    <h4 className="support-us-image-main-text">donate</h4>
                    <p className="support-us-image-sub-text">if you can</p>
                  </div>
                </div>
              </Col>
            </Row>
            <Row style={{ paddingTop: "50px" }}>
              <Col md={12}>
                <p className="support-us-main-content-text">
                  We would like to say <strong>thank you</strong> to all our
                  supporters and followers for sharing your stories and helping
                  us grow! Your contributions, no matter what they are, very
                  well may help someone who is struggling with their identity or
                  someone who feels alone in the world.
                </p>
              </Col>
            </Row>
            <Row style={{ paddingBottom: "50px" }}>
              <div className="col-md-8 m-auto col-12 col-xl-6 col-lg-6">
                <div
                  className="card card-body mt-5"
                  style={{ borderRadius: "8px" }}
                >
                  {/*<h2 className="text-center">Support Us</h2>*/}
                  <label className="support-us-image-sub-text text-center">
                    donation{" "}
                  </label>
                  <input
                    type="value"
                    className="form-control"
                    name="amount"
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                  />
                  <br></br>
                  <PayPalButton
                    amount={amount}
                    onSuccess={(details, data) => {
                      alert(
                        "Transaction completed by " +
                          details.payer.name.given_name
                      );
                    }}
                    onCancel={(data) => {
                      alert("Transaction was cancelled...");
                    }}
                    style={{
                      layout: "vertical",
                      shape: "rect",
                    }}
                  />
                </div>
              </div>
            </Row>
          </div>
        </Col>
        <Col md={3} className="support-us-side-content-col">
          <div className="support-us-side-content-div">
            <h3 className="support-us-side-title">follow us</h3>
          </div>
          <div>
            <Col className="col-md-3 offset-md-5 col-md-2 col-8 offset-3">
              <div>
                <a target="_blank" href={"https://www.instagram.com/the.arqive/?fbclid=IwAR3q0KyoS1eNKmXVbiAqvq31J2hlAh-PmHoRwlUU4orUGM79nP_YYueGSws"}>
                  <img
                    src={IG}
                    alt="instagram link"
                    className="social-media-images"
                  />
                </a>
                <a target="_blank" href={"https://twitter.com/thearqive"}>
                <img
                  src={TW}
                  alt="twitter link"
                  className="social-media-images"
                />
                </a>
                <a target="_blank" href={"https://www.facebook.com/pg/thearqive/about/?ref=page_internal"}>
                <img
                  src={FB}
                  alt="facebook link"
                  className="social-media-images"
                />
                </a>
              </div>
            </Col>
          </div>
        </Col>
      </Row>
    </div>
    // below is the paypal popup
    /*<div className="col-md-6 m-auto">
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
    </div>*/
  );
}
