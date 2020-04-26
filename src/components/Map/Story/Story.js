import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentStory from "./CommentStory";
import { getPin } from "../../../actions/pins";
import {
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import Upvote from "./Upvote";
import Flag from "./Flag";
import Moment from "react-moment";
import Markup from "interweave";
import FlagReportModal from "./FlagReportModal";
import { Row, Col } from "react-bootstrap";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

const storyBody = {
  paddingTop: "50px",
  paddingLeft: "50px",
  paddingRight: "50px",
};
function Story(props) {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { isAuthenticated, user, userFavoritePinState } = auth;
  const [fixedArrow, setFixedArrow] = useState(false);

  const upvoteButoon = (
    <Link className="login-link favorite-story-btn" to="/login">
      <img
        className="story-favorites-icon"
        src={"./static/frontend/images/Bookmark_Outline_Icon.png"}
        alt={"favorite this story icon"}
      />
    </Link>
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, false);

    return () => {
      window.removeEventListener("scroll", handleScroll, false);
    };
  }, []);

  if (props.pinDeleted) {
    props.setPinDeleted(false);
    return <Redirect to="/" />;
  }

  const handleScroll = (e) => {
    const topConstraint = (window.innerHeight - 118.75) * 0.45; // window size - header size * map container size
    if (window.scrollY >= topConstraint && !fixedArrow) {
      setFixedArrow(true);
    } else if (window.scrollY < 386) {
      setFixedArrow(false);
    }
  };

  return (
    <div className="container-fluid" style={storyBody}>
      <Row className={"down-arrow-row"}>
        <Col
          md={1}
          className="col-1"
          className={fixedArrow ? "fixed-down-icon-col" : "down-icon-col"}
        >
          <div>
            <Link
              to={"/"}
              // onClick={() => props.setIsLeavingStoryPage(true)}
            >
              <ArrowDownwardIcon></ArrowDownwardIcon>
            </Link>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={1} className={"offset-md-1"}>
          {isAuthenticated
            ? props.pin && props.pin.updotes && <Upvote id={props.pin.id} />
            : upvoteButoon}
        </Col>
        <Col md={8} className={"offset-md-0 col-10 offset-1"}>
          <h2 className={"story-page-story-title"}>
            <strong>{props.pin.title}</strong>
          </h2>
          {props.pin.startDate && props.pin.endDate ? (
            <p className={"story-page-dates"}>
              {props.pin.startDate ? (
                <Moment format="MM/DD/YYYY">{props.pin.startDate}</Moment>
              ) : (
                "No Start Date"
              )}
              {props.pin.endDate ? (
                <Moment format="MM/DD/YYYY">{props.pin.endDate}</Moment>
              ) : (
                "No End Date"
              )}
            </p>
          ) : (
            ""
          )}
          {/* <p>By: {authorName}</p> */}
          {props.pin.is_anonymous_pin ? (
            <p className="sidebar-story-author">
              Posted by:{" "}
              <span className="sidebar-story-anon-username">Anonymous</span>
            </p>
          ) : (
            <Link
              style={{ textDecoration: "inherit" }}
              to={`/users/${props.pin.username}`}
            >
              <p className="sidebar-story-author">
                Posted by:{" "}
                <span className="sidebar-story-username">
                  {props.pin.username}
                </span>
              </p>
            </Link>
          )}

          <div className="sidebar-story-description">
            <Markup content={props.pin.description} />
          </div>
          {props.isAuthenticated
            ? props.pin &&
              props.pin.flaggerstory && (
                <div style={{ float: "left" }}>
                  <Flag {...props} />{" "}
                </div>
              )
            : ""}
          {isAuthenticated &&
            (user.is_administrator || user.id === props.pin.owner) && (
              <div>
                <div className="admin-moderator-edit">
                  <button
                    type="button"
                    style={{ float: "right" }}
                    className="btn btn-primary btn-sm default-btn-purple"
                    onClick={() => props.removalToggle(props.pin.id)}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    style={{ float: "right", marginRight: "20px" }}
                    className="btn btn-primary btn-sm default-btn-purple"
                    onClick={() => {
                      props.setEditPinState(props.pin);
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            )}
        </Col>
        <Col md={1}>
          {/*  {props.isAuthenticated*/}
          {/*? props.pin && props.pin.flaggerstory && <Flag {...props} />*/}
          {/*: ""}*/}
        </Col>
      </Row>
      <Row>
        <Col md={8} className={"offset-md-2 col-10 offset-1"}>
          <hr></hr>
        </Col>
      </Row>
      <Row style={{ paddingTop: "15px" }}>
        <Col md={8} className={"offset-md-2 col-10 offset-1"}>
          {props.pin.commentstory && (
            <CommentStory
              user={user}
              comment={props.pin.commentstory}
              toggleComment={props.toggleComment}
              settoggleComment={props.settoggleComment}
              isAuthenticated={props.isAuthenticated}
              onSubmitComment={props.onSubmitComment}
              userComment={props.userComment}
              setuserComment={props.setuserComment}
              onDeleteComment={props.onDeleteComment}
              toggle={props.flagCommentToggle}
            />
          )}
          {props.isAuthenticated && (
            <FlagReportModal
              flagForm={props.flagForm}
              toggle={props.flagToggle}
              modalState={props.flagModalState}
              onSubmit={props.onFlagSubmit}
              handleChange={props.handleFlagFormChange}
            />
          )}
          {props.isAuthenticated && (
            <FlagReportModal
              flagForm={props.flagForm}
              toggle={props.flagCommentToggle}
              modalState={props.flagCommentModalState}
              onSubmit={props.onFlagCommentSubmit}
              handleChange={props.handleFlagFormChange}
            />
          )}
        </Col>
      </Row>
    </div>
  );
}
export default Story;
