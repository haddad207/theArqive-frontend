import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Row, Col } from "react-bootstrap";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";


export default function Resources() {
  return (
  <div className="main-content-div resources-main-div">
    <Row style={{width: "100%", minHeight: "100%", height: "auto"}}>
        <Col md={5} className="offset-md-1" style={{paddingTop: "5%", paddingLeft: "50px"}}>
            <h3 className="support-us-title">help + hotlines</h3>
            <Row>
              <Col md={12} style={{ padding: "0"}}>
                <div className="col-md-12 m-auto">
                    <div className="card card-body resources-card">
                      <h2 className="resource-title">The Trevor Project</h2>
                      <p className="resource-contact-text">(866) 488-7386</p>
                      <p className="resource-text">The Trevor Project is the leading national organization providing crisis intervention and suicide prevention services to lesbian, gay, bisexual, transgender and questioning (LGBTQ) young people ages 13-24.</p>
                    </div>
                  </div>
              </Col>
              <Col md={12} style={{ padding: "0"}}>
                <div className="col-md-12 m-auto">
                    <div className="card card-body resources-card">
                      <h2 className="resource-title">The Gay, Lesbian, Bisexual and Transgender National Hotline</h2>
                      <p className="resource-contact-text">(888) 843-4564</p>
                      <p className="resource-text">Free and confidential resources for LGBTQ+ locally, nationally, and internationally.</p>
                    </div>
                  </div>
              </Col>
              <Col md={12} style={{ padding: "0"}}>
                <div className="col-md-12 m-auto">
                    <div className="card card-body resources-card">
                      <h2 className="resource-title">The GLBT National Youth Talkline (youth serving youth through age 25</h2>
                      <p className="resource-contact-text">(800) 246-7743</p>
                      <p className="resource-text">Provides telephone, online private one-to-one chat and email peer-support, as well as factual information and local resources for cities and towns across the United States.</p>
                    </div>
                  </div>
              </Col>
              <Col md={12} style={{ padding: "0"}}>
                <div className="col-md-12 m-auto">
                    <div className="card card-body resources-card">
                      <h2 className="resource-title">The True Colors United</h2>
                      <p className="resource-contact-text">(212) 461-4401</p>
                      <p className="resource-text">The True Colors Fund is working to end homelessness among lesbian, gay, bisexual, transgender, queer, and questioning youth, creating a world in which all young people can be their true selves. True Colors United runs a database of service providers.</p>
                    </div>
                  </div>
              </Col>
              <Col md={12} style={{ padding: "0"}}>
                <div className="col-md-12 m-auto">
                    <div className="card card-body resources-card">
                      <h2 className="resource-title">Pride Institute</h2>
                      <p className="resource-contact-text">(800) 547-7433 24/7</p>
                      <p className="resource-text">Chemical dependency/mental health referral and information hotline for the LGBTQ community.</p>
                    </div>
                  </div>
              </Col>
            </Row>
        </Col>
        <Col md={5} className="offset-md-1" style={{ paddingTop: "5%", paddingLeft: "30px" }}>
            <div className="resources-sub-content-div">
            <h3 className="resources-title">what are we missing?</h3>
                <p className="resources-sub-text">Drop us a line on our <span className="text-underline">Contact page</span> if you'd like to add to our ever-growing list of LGBTQ+ resources. Or just <span class="text-underline">send</span> us an email directly. </p>
            </div>
        </Col>
      </Row>
  </div>
  );
}
