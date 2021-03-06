import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { userEditValidate } from "../../actions/auth";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

import { Markup } from "interweave";
import Switch from "react-switch";
import { Row, Col } from "react-bootstrap";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import EditIcon from "@material-ui/icons/Edit";
import BookMark from "../images/Bookmark_Icon.png";
import DefaultProfilePic from "../images/ProfilePic-03.png";

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
    <div style={{ paddingTop: "20px", height: "auto" }} key={id} {...rest}>
      <Card className={"profile-story-card story-card"}>
        <div
          className={
            category === "1"
              ? "search-bar-story-card-trim-personal"
              : category === "2"
              ? "search-bar-story-card-trim-resources"
              : "search-bar-story-card-trim-historical"
          }
        ></div>
        {isAuthenticated && (user.is_administrator || user.id === ownerid) && (
          <button className={"btn-no-style"} onClick={() => toggle(id2)}>
            <img
              className="user-profile-favorite-bookmark-icon"
              src={BookMark}
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
            {/*<Typography gutterBottom variant="h5" component="h2">*/}
            {/*  <p className="sidebar-story-author">*/}
            {/*    Posted by:{" "}*/}
            {/*    {!isAnon && username ? <Link to={`/users/${username}`}> <span className="sidebar-story-username">{username} </span> </Link> : <span className="sidebar-story-anon-username"> Anonymous</span>}*/}
            {/*  </p>*/}
            {/*</Typography>*/}
            <Typography
              variant="body2"
              className="user-profile-story-description"
              color="textSecondary"
            >
              <Markup
                content={
                  description ? description.substring(0, 250) + "..." : ""
                }
                blockList={["img"]}
                noHtml={true}
              />
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              className={"sidebar-story-read-more"}
            >
              read more
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

  const { isAuthenticated, user } = auth;

  //profileStatus
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
            {((isAuthenticated && user.id === props.userProfile.id) ||
              (isAuthenticated && user.is_administrator)) && (
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
              {((user && user.id === props.userProfile.id) ||
                !props.userProfile.is_profile_private) &&
                props.userProfile.userStories && (
                  <ListUserStories
                    updateStoryAnonymity={updateStoryAnonymity}
                    stories={props.userProfile.userStories}
                    ownerid={props.userProfile.id}
                    user={user}
                    {...props}
                  />
                )}
            </div>
          </Col>
          <ShowfavoritedPosts
            ownerid={props.userProfile.id}
            toggle={props.removalToggle}
            userProfile={props.userProfile}
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

  return (
    <Col md={4} className="favorite-stories">
      <h2 className="profile-page-favorite-posts-title">Favorite Posts</h2>
      {((user && user.id === props.userProfile.id) ||
        !props.userProfile.is_profile_private) &&
      props.favoriteStories.length !== 0 ? (
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

  const { isAuthenticated, user } = auth;
  return (
    <div className={"user-profile-main-content"}>
      <Row>
        <Col md={2} className={"offset-xl-1 col-xl-2 col-md-3 offset-md-0"}>
          <div className={"profile-image-div"}>
            {props.userProfile.profileurl ? (
              <img
                alt="profilepic"
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
              <img
                alt="profilepic"
                src={DefaultProfilePic}
                style={{
                  borderRadius: "50%",
                  height: "125px",
                  width: "125px",
                  margin: "auto",
                  display: "block",
                }}
              />
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
        <Col
          className={"col-xl-8 offset-xl-0 offset-lg-0 offset-md-0 col-md-7"}
        >
          {/*{isAuthenticated && user.id === props.ownerid && (*/}
          {/*  <button onClick={() => props.toggle()}>Change</button>*/}
          {/*)}*/}
          <Typography
            variant="h5"
            component="h3"
            align="center"
            style={{ marginTop: "20px" }}
          >
            <h1 className="user-profile-name left-text">
              {props.userProfile ? `${props.userProfile.username}` : ""}
            </h1>
            <p className="user-profile-bio left-text">
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
    <Typography
      variant="h5"
      component="h3"
      align="center"
      style={{ paddingTop: "80px" }}
    >
      <img
        alt="profilepic"
        src={DefaultProfilePic}
        style={{
          borderRadius: "50%",
          height: "125px",
          width: "125px",
          margin: "auto",
          display: "block",
        }}
      />
      <p style={{ textTransform: "lowercase", fontFamily: "Eina, Arial" }}>
        Profile Not Found
      </p>
    </Typography>
  );
};

const NoStories = ({ type }) => {
  return (
    <div
      className={"offset-2"}
      style={{ padding: "20px", textTransform: "lowercase" }}
    >
      No {type} found
    </div>
  );
};

const ListUserStories = (props) => {
  return (
    <>
      <Row>
        <Col md={10} className={"offset-xl-2 offset-md-1"}>
          <p className={"user-profile-my-posts-title"}>my posts</p>
        </Col>
      </Row>
      {props.stories.length !== 0 ? (
        props.stories.map((story) => {
          if (
            !story.is_anonymous_pin ||
            (props.user && props.user.id === props.ownerid)
          ) {
            return (
              <div className={"profile-page-story-row"} key={story.id}>
                <StoryField story={story} {...props} />
              </div>
            );
          } else {
            return null;
          }
        })
      ) : (
        <NoStories type="User Stories" />
      )}
    </>
  );
};

const StoryField = (props) => {
  const { id, title, description, is_anonymous_pin, category } = props.story;
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, user } = auth;
  return (
    <>
      <Row style={{ minHeight: "150px", height: "auto" }}>
        <Col
          className={"col-xl-6 col-md-7 offset-md-1 offset-xl-2"}
          style={{ paddingRight: "5px" }}
        >
          <Card className={"profile-story-card story-card"}>
            <div
              className={
                category == 1
                  ? "search-bar-story-card-trim-personal"
                  : category == 2
                  ? "search-bar-story-card-trim-resources"
                  : "search-bar-story-card-trim-historical"
              }
            ></div>
            <CardContent
              style={{
                paddingLeft: "40px",
                paddingRight: "40px",
                minHeight: "150px",
                height: "auto",
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
            <Col className={"col-8 offset-2 col-xl-3 offset-md-0 col-md-4"}>
              <div className="profile-page-story-settings-card">
                <div className={"profile-page-story-settings-card-body"}>
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
              </div>
            </Col>
          )}
      </Row>
    </>
  );
};
