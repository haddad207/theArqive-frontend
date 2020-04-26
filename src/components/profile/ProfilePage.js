import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getFavoritePosts,
  getUser,
  unFavoriteProfile,
} from "../../actions/users";
import { editPin, getPinsByOwner, userUpovte } from "../../actions/pins";
import { userEditValidate } from "../../actions/auth";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { Avatar } from "antd";
import { Markup } from "interweave";
import Switch from "react-switch";
import { Row, Col } from "react-bootstrap";
import useProfileImage from "./CustomHooks/useProfileImage";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Upvote from "../Map/Story/Upvote";
import EditIcon from "@material-ui/icons/Edit";
const FavoritePostField = ({
  index,
  title,
  isAnon,
  username,
  description,
  category,
  id,
  isAuthenticated,
  user,
  toggle,
  ownerid,
  id2,
  ...rest
}) => {
  return (
    <div
      style={{ paddingTop: "20px" }}
      key={id}
      {...rest}
      style={{ height: "auto" }}
    >
      <Card className={"profile-story-card"}>
        <div
          className={
            category == 1
              ? "search-bar-story-card-trim-personal"
              : category == 2
              ? "search-bar-story-card-trim-community"
              : "search-bar-story-card-trim-historical"
          }
        ></div>
        {isAuthenticated && (user.is_administrator || user.id === ownerid) && (
          <button className={"btn-no-style"} onClick={() => toggle(id2)}>
            <img
              className="user-profile-favorite-bookmark-icon"
              src={"./static/frontend/images/Bookmark_Icon.png"}
              alt={"favorite this story icon"}
            />
          </button>
        )}
        <Link to={`/story/${id}`}>
          <CardContent
            style={{
              paddingLeft: "40px",
              paddingRight: "40px",
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={"sidebar-story-title"}
            >
              {title}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              <p className="sidebar-story-author">
                Posted by:{" "}
                <span className="sidebar-story-username">
                  {!isAnon && username ? username : "Anonymous"}
                </span>
              </p>
            </Typography>
            <Typography
              variant="body2"
              className="user-profile-story-description"
              color="textSecondary"
            >
              <Markup
                content={description.substring(0, 250) + "..."}
                blockList={["img"]}
                noHtml={true}
              />
            </Typography>
          </CardContent>
        </Link>
      </Card>
    </div>
  );
};

export default function ProfilePage(props) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const { profileStatus, isAuthenticated, user } = auth;

  const updateStoryAnonymity = (pin) => {
    const is_anonymous_pin = !pin.is_anonymous_pin;

    const pinData = { is_anonymous_pin };

    dispatch(userEditValidate(pinData, pin.id));
  };

  return (
    <>
      {props.userProfile ? (
        <Row style={{ height: "100%", marginRight: "0px", marginLeft: "0px" }}>
          <Col md={8} style={{ paddingTop: "20px", paddingRight: "20px" }}>
            {(((isAuthenticated && (user.id == props.userProfile.id)) || (isAuthenticated && user.is_administrator))) && (
                <Link to={`/users/${props.userProfile.username}/settings`}>
                  <button
                    type="button"
                    style={{ float: "right " }}
                    className="btn btn-primary btn-sm default-btn-purple"
                  >
                    Settings
                  </button>
                </Link>
              )}
            <UserProfileBio
              ownerid={props.userProfile.id}
              userProfile={props.userProfile}
              {...props}
            />
            <div className={"user-profile-body"}>
              {props.userProfile.userStories && (
                <ListUserStories
                  updateStoryAnonymity={updateStoryAnonymity}
                  stories={props.userProfile.userStories}
                  ownerid={props.userProfile.id}
                  {...props}
                />
              )}
            </div>
          </Col>
          <ShowfavoritedPosts
            ownerid={props.userProfile.id}
            toggle={props.removalToggle}
            favoriteStories={props.userProfile.user_upvoted_stories}
          />
        </Row>
      ) : (
        <ProfileNotFound />
      )}
    </>
  );
}

const ShowfavoritedPosts = (props) => {
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, user } = auth;
  const dispatch = useDispatch();
  return (
    <Col md={4} className="favorite-stories">
      <h2 className="profile-page-favorite-posts-title">Favorite Posts</h2>
      {props.favoriteStories.length !== 0 ? (
        props.favoriteStories.map((story, index) => {
          return (
            <div key={story.id} className="user-profile-favorite-posts-div">
              <FavoritePostField
                index={index}
                title={story.title}
                isAnon={story.is_anonymous_pin}
                username={story.pinAuthor}
                description={story.description}
                category={story.category}
                id={story.pinId}
                isAuthenticated={isAuthenticated}
                user={user}
                toggle={props.toggle}
                ownerid={props.ownerid}
                id2={story.id}
              />
            </div>
          );
        })
      ) : (
        <NoStories type="favorite posts" />
      )}
    </Col>
  );
};

const UserProfileBio = (props) => {
  const auth = useSelector((state) => state.auth);

  const { profileStatus, isAuthenticated, user } = auth;
  return (
    <div className={"user-profile-main-content"}>
      <Row>
        <Col md={2} className={"offset-md-1"}>
          <div className={"profile-image-div"}>
            {props.userProfile.profileurl ? (
              <img
                src={props.userProfile.profileurl}
                style={{
                  borderRadius: "50%",
                  height: "125px",
                  width: "125px",
                  margin: "auto",
                  display: "block",
                }}
              />
            ) : (
              <Avatar size={125} icon="user" />
            )}
            {isAuthenticated && user.id === props.ownerid && (
              <button
                className={"edit-profile-pic-button"}
                onClick={() => props.toggle()}
              >
                <EditIcon></EditIcon>
              </button>
            )}
          </div>
        </Col>
        <Col md={7}>
          {/*{isAuthenticated && user.id === props.ownerid && (*/}
          {/*  <button onClick={() => props.toggle()}>Change</button>*/}
          {/*)}*/}
          <Typography
            variant="h5"
            component="h3"
            align="center"
            style={{ marginTop: "20px" }}
          >
            <h1 className="user-profile-name text-left">
              {props.userProfile ? `${props.userProfile.username}` : ""}
            </h1>
            <p className="user-profile-bio text-left">
              {props.userProfile.bio}
            </p>
          </Typography>
        </Col>
      </Row>
    </div>
  );
};

const ProfileNotFound = () => {
  return (
    <Typography variant="h5" component="h3" align="center">
      <Avatar size={250} icon="user" />
      <p>Profile Not Found</p>
    </Typography>
  );
};

const NoStories = ({ type }) => {
  return <div style={{ padding: "20px" }}>No {type} found</div>;
};

const ListUserStories = (props) => {
  return (
    <>
      <Row>
        <Col md={10} className={"offset-md-2"}>
          <p className={"user-profile-my-posts-title"}>my posts</p>
        </Col>
      </Row>
      {props.stories.length !== 0 ? (
        props.stories.map((story) => {
          return (
            <div style={{ paddingBottom: "20px" }} key={story.id}>
              <StoryField story={story} {...props} />
            </div>
          );
        })
      ) : (
        <NoStories type="User Stories" />
      )}
    </>
  );
};

const StoryField = (props) => {
  const {
    id,
    title,
    description,
    is_anonymous_pin,
    startDate,
    endDate,
    category,
  } = props.story;
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, user } = auth;
  return (
    <>
      <Row style={{ height: "150px" }}>
        <Col md={6} className={"offset-md-2"} style={{ paddingRight: "5px" }}>
          <Card className={"profile-story-card"}>
            <div
              className={
                category == 1
                  ? "search-bar-story-card-trim-personal"
                  : category == 2
                  ? "search-bar-story-card-trim-community"
                  : "search-bar-story-card-trim-historical"
              }
            ></div>
            <CardContent
              style={{
                paddingLeft: "40px",
                paddingRight: "40px",
              }}
            >
              <Link to={`/story/${id}`}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  className={"sidebar-story-title"}
                >
                  {title}
                </Typography>
                <Typography
                  variant="body2"
                  className={"user-profile-story-description"}
                  color="textSecondary"
                >
                  <Markup
                    content={description.substring(0, 250) + "..."}
                    blockList={["img"]}
                    noHtml={true}
                  />
                </Typography>
              </Link>
              {isAuthenticated &&
                (user.is_administrator || user.id === props.ownerid) && (
                  <button
                    onClick={() => props.setEditPinState(props.story)}
                    type="button"
                    className="btn btn-primary profile-page-edit-story"
                  >
                    edit story
                  </button>
                )}
            </CardContent>
          </Card>
        </Col>
        {isAuthenticated &&
          (user.is_administrator || user.id === props.ownerid) && (
            <Col md={3} style={{ paddingLeft: "0", paddingRight: "0" }}>
              <div className="profile-page-story-settings-card">
                <p className="profile-anonymous-toggle-title">
                  make this post anonymous?
                </p>
                <Switch
                  className="react-switch"
                  onColor={"#00ce7d"}
                  offColor={"#e63f52"}
                  width={90}
                  height={35}
                  onChange={() => props.updateStoryAnonymity(props.story)}
                  checked={is_anonymous_pin}
                />
              </div>
            </Col>
          )}
      </Row>
    </>
  );
};
