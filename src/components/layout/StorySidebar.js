import React, { useState, useEffect } from "react";
import CloseIcon from "@material-ui/icons/Close";
import Sidebar from "react-sidebar";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import { Markup } from "interweave";
import Moment from "react-moment";
import { IconButton } from "@material-ui/core";
import { getPinsWithBounds } from "../../actions/pins";
import { useSelector } from "react-redux";

function StorySidebar(props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, user } = auth;

  const onSetSidebarOpen = (open) => {
    setSidebarOpen({ sidebarOpen: open });
  };

  if (props.storySidebarOpen) {
    if (props.pins.length == 0) {
      props.setStorySidebarOpen(false);
      props.setSidebarOpen(true);
    }

    return (
      <Sidebar
        sidebar={
          <div style={{ padding: "5px 5px 5px 5px" }}>
            <IconButton
              onClick={() => props.setStorySidebarOpen(false)}
              style={{ float: "right", zIndex: "5" }}
              aria-label="close"
            >
              <CloseIcon color="disabled"></CloseIcon>
            </IconButton>
            {/* pin cluster - loop through markers and show them in the sidebar*/}
            {props.pinData.length > 1 ? (
              <div>
                <h3> Cluster of {props.pinData.length} stories </h3>
                {props.pinData.map((story, index) => {
                  return (
                    <Card>
                      <Link
                        style={{ textDecoration: "inherit" }}
                        to={`story/${story.options.data.id}`}
                        onClick={() => props.centerMarker(story)}
                      >
                        <CardActionArea>
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                              className="sidebar-story-title"
                            >
                              {story.options.data.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              className="sidebar-story-description"
                            >
                              <Markup
                                content={story.options.data.description}
                              />
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Link>
                    </Card>
                  );
                })}
              </div>
            ) : //   not a pin cluster - show the individual story data
            props.pinData ? (
              <div className={"sidebar-story-div"}>
                <h1 className="sidebar-story-title">{props.pinData.title}</h1>
                <h5>
                  {props.pinData.is_anonymous_pin ? (
                    <p
                      style={{ marginBottom: "5" }}
                      className="sidebar-story-author"
                    >
                      Posted by:{" "}
                      <span className="sidebar-story-username">Anonymous</span>
                    </p>
                  ) : (
                    <p
                      style={{ marginBottom: "5" }}
                      className="sidebar-story-author"
                    >
                      Posted by:
                      <Link
                        style={{ textDecoration: "inherit" }}
                        to={`/users/${props.pinData.username}`}
                      >
                        <span className="sidebar-story-username">
                          {props.pinData.username}
                        </span>
                      </Link>
                    </p>
                  )}
                </h5>
                <div
                  className={"story-page-dates"}
                  style={{ marginBottom: "20px" }}
                >
                  {props.pinData.startDate ? (
                    <Moment format="MM/DD/YYYY">
                      {props.pinData.startDate}
                    </Moment>
                  ) : (
                    "No Start Date"
                  )}{" "}
                  -{" "}
                  {props.pinData.endDate ? (
                    <Moment format="MM/DD/YYYY">{props.pinData.endDate}</Moment>
                  ) : (
                    "No End Date"
                  )}{" "}
                </div>
                <div className="sidebar-story-description">
                  <Markup content={props.pinData.description} />
                </div>
                {/* show edit/ delete button for story owners and admins/moderators */}
                {isAuthenticated &&
                  (user.is_administrator ||
                    user.id === props.pinData.owner) && (
                    <div>
                      <div className="admin-moderator-edit">
                        <button
                          type="button"
                          className="btn btn-primary btn-sm default-btn-purple"
                          style={{
                            position: "absolute",
                            bottom: "50",
                            right: "80",
                          }}
                          onClick={() => props.setEditPinState(props.pinData)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          style={{
                            position: "absolute",
                            bottom: "50",
                            right: "0",
                          }}
                          className="btn btn-primary btn-sm default-btn-purple"
                          onClick={(e) => props.removalToggle(props.pinData.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                <div>
                  <Link
                    to={`${props.maplink}/${props.pinData.id}`}
                    onClick={() => props.centerMarker(props.pinData)}
                  >
                    <button
                      type="button"
                      style={{ position: "absolute", bottom: "50" }}
                      className="btn btn-primary btn-sm default-btn-purple"
                    >
                      View Full Story
                    </button>
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
        }
        open={props.storySidebarOpen}
        onSetOpen={onSetSidebarOpen}
        pullRight={true}
        styles={{
          sidebar: { background: "white", width: "40%", padding: "20px" },
          overlay: {
            position: "absolute",
            visibility: "hidden",
            transition: "none",
            backgroundColor: "transparent",
          },
        }}
      ></Sidebar>
    );
  } else {
    return null;
  }
}

export default StorySidebar;
