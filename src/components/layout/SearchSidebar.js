import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import Sidebar from "react-sidebar";
import { IconButton } from "@material-ui/core";
import { getPinsWithBounds, searchPins } from "../../actions/pins";
import { getPins } from "../../actions/pins";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import Select from "react-select";
import DatePicker from "react-date-picker";
import { Markup } from "interweave";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Slider from "@material-ui/core/Slider";
import { Label } from "reactstrap";
import chroma from "chroma-js";
import InputGroup from "react-bootstrap/InputGroup";
import { Avatar } from "antd";
import { Row, Col } from "react-bootstrap";

import { searchUsers, getNextPreviousUsers } from "../../actions/users";

const options = [
  { value: "1", label: "Personal" },
  { value: "2", label: "Community" },
  { value: "3", label: "Historical" },
];

const labelStyle = {
  marginRight: "10px",
};

function SearchSidebar(props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pinType, setPinType] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(options);
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(props.minPinDate);
  const [endDate, setEndDate] = useState(props.maxPinDate);
  const [minDate, setMinDate] = useState(0);
  const [maxDate, setMaxDate] = useState(new Date());
  const pinData = useSelector((state) => state.pins.pins);
  const users = useSelector((state) => state.auth.users);
  const [userSearchText, setUserSearchText] = useState("");

  const [dateRange, setDateRange] = useState([
    props.minPinDate.getFullYear(),
    props.maxPinDate.getFullYear(),
  ]);

  useEffect(() => {
    setDateRange([
      props.minPinDate.getFullYear(),
      props.maxPinDate.getFullYear(),
    ]);
    setMinDate(props.minPinDate.getFullYear());
    setMaxDate(props.maxPinDate.getFullYear());
  }, [props.minPinDate]);

  useEffect(() => {
    setDateRange([
      props.minPinDate.getFullYear(),
      props.maxPinDate.getFullYear(),
    ]);
    setMinDate(props.minPinDate.getFullYear());
    setMaxDate(props.maxPinDate.getFullYear());
  }, [props.maxPinDate]);

  // useEffect(() => {
  //   dispatch(getPins());
  // }, []);

  useEffect(() => {
    dispatch(searchUsers(""));
  }, []);

  const onSetSidebarOpen = (open) => {
    setSidebarOpen({ sidebarOpen: open });
  };

  const submitSearch = (e) => {
    // console.log("pin type " + pinType);
    e.preventDefault(); //prevents refresh of page
    // console.log(startDate);
    // console.log(endDate);
    const start =
      startDate.getFullYear() +
      "-" +
      (startDate.getMonth() + 1) +
      "-" +
      startDate.getDate();
    const end =
      endDate.getFullYear() +
      "-" +
      (endDate.getMonth() + 1) +
      "-" +
      endDate.getDate();
    let categorySearchQuery = "";
    if (selectedCategories == null) {
      setSelectedCategories(options);
    } else {
      for (const [index, value] of selectedCategories.entries()) {
        if (index < selectedCategories.length - 1) {
          // console.log(value.value);
          categorySearchQuery += value.value + ",";
          // console.log("is the num");
        } else {
          // console.log(value.value);
          categorySearchQuery += value.value;
          // console.log("is the num");
        }
      }
    }
    // console.log(categorySearchQuery);
    // console.log("is the query");
    dispatch(searchPins(searchText, categorySearchQuery, start, end));
    props.setIsSearch(true);
  };
  const submitUserSearch = (e) => {
    e.preventDefault(); //prevents refresh of page
    dispatch(searchUsers(userSearchText));
  };
  function valuetext(value) {
    // console.log(dateRange);
    // console.log("slider val is " + value);
    return value;
  }

  const clearFilters = () => {
    setSelectedCategories(options);
    setMinDate(props.minPinDate.getFullYear());
    setMaxDate(props.maxPinDate.getFullYear());
    setStartDate(props.minPinDate);
    setEndDate(props.maxPinDate);
    setDateRange([
      props.minPinDate.getFullYear(),
      props.maxPinDate.getFullYear(),
    ]);
    setSearchText("");
    let mapBounds = props.mapReference.getBounds();
    let south = mapBounds.getSouth();
    let west = mapBounds.getWest();
    let north = mapBounds.getNorth();
    let east = mapBounds.getEast();
    dispatch(getPinsWithBounds(north, south, east, west));
    props.setIsSearch(false);
    // dispatch(getPins());
  };

  const colorStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    multiValue: (styles, { data }) => {
      const category = data.value;
      let color = "white";
      if (category == 1) {
        color = "#e01783";
      } else if (category == 2) {
        color = "#00ce7d";
      } else {
        color = "#248dc1";
      }
      return {
        ...styles,
        backgroundColor: color,
        color: "white",
        fontFamily: "Eina, Arial",
        textTransform: "lowercase",
        borderRadius: "8px",
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: "white",
      fontFamily: "Eina, Arial",
      textTransform: "lowercase",
      borderRadius: "8px",
    }),
  };

  const storySearch = (
    <div style={{ marginTop: "10px" }}>
      <form onSubmit={submitSearch} noValidate={true}>
        <div className={"form-group"}>
          <label className="sidebar-text">Search:</label>
          <input
            className="form-control"
            id="searchForm"
            label="Search"
            placeholder={"Search for stories"}
            name={"searchText"}
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
        </div>
        <label className="sidebar-text">Category: </label>
        <Select
          isMulti
          defaultValue={options}
          value={selectedCategories}
          onChange={(categories) => setSelectedCategories(categories)}
          options={options}
          styles={colorStyles}
        />
        <InputGroup style={{ marginTop: "20px" }}>
          <Label className="sidebar-text" style={labelStyle} for="dateRange">
            Search date range
          </Label>
          <DatePicker
            value={startDate}
            minDate={
              new Date(
                props.minPinDate.getFullYear(),
                props.minPinDate.getMonth() - 1,
                props.minPinDate.getDate() - 2,
                0,
                0,
                0,
                0
              )
            }
            maxDate={
              new Date(
                props.maxPinDate.getFullYear(),
                props.maxPinDate.getMonth() - 1,
                props.maxPinDate.getDate() + 1,
                0,
                0,
                0,
                0
              )
            }
            onChange={(date) => {
              setStartDate(date);
              setDateRange([date.getFullYear(), endDate.getFullYear()]);
            }}
            format={"MM/dd/yyyy"}
          />
          <DatePicker
            minDate={
              new Date(
                props.minPinDate.getFullYear(),
                props.minPinDate.getMonth() - 1,
                props.minPinDate.getDate() - 2,
                0,
                0,
                0,
                0
              )
            }
            maxDate={
              new Date(
                props.maxPinDate.getFullYear(),
                props.maxPinDate.getMonth() - 1,
                props.maxPinDate.getDate() + 1,
                0,
                0,
                0,
                0
              )
            }
            value={endDate}
            onChange={(date) => {
              setEndDate(date);
              setDateRange([startDate.getFullYear(), date.getFullYear()]);
            }}
            format={"MM/dd/yyyy"}
          />
          <Slider
            min={Number(minDate)}
            max={Number(maxDate)}
            // min={1000}
            // max={Number(new Date().getFullYear())}
            value={dateRange}
            valueLabelDisplay="auto"
            onChange={(event, newValue) => {
              // console.log("props.minPinDate "+ props.minPinDate.getFullYear());
              // console.log("new value " + newValue);
              setDateRange(newValue);
              startDate.setFullYear(newValue[0]);
              endDate.setFullYear(newValue[1]);
            }}
            aria-labelledby="range-slider"
            getAriaValueText={valuetext}
          />
          {/*<Slider*/}
          {/*  min={props.minPinYear}*/}
          {/*  max={props.maxPinYear}*/}
          {/*  onChange={(event, newValue) => { setDateRange(newValue);*/}
          {/* console.log(event); */}
          {/*    console.log(newValue);}*/}
          {/*  }*/}
          {/*  valueLabelDisplay="auto"*/}
          {/*  aria-labelledby="range-slider"*/}
          {/*  getAriaValueText={valuetext}*/}
          {/*/>*/}
          {/*<DatePicker*/}
          {/*  selected={startDate}*/}
          {/*  onChange={date => setStartDate(date)}*/}
          {/*/>*/}
          {/*<Label*/}
          {/*  style={{ marginLeft: "20px", marginRight: "20px" }}*/}
          {/*  for="startDate"*/}
          {/*>*/}
          {/*  to*/}
          {/*</Label>*/}
          {/*<DatePicker selected={endDate} onChange={date => setEndDate(date)} />*/}
        </InputGroup>
        <div className="form-group" style={{ padding: "20px 20px 20px 20px" }}>
          <button
            type="submit"
            style={{ float: "right" }}
            className="btn btn-primary default-btn-purple"
          >
            Search
          </button>
          <button
            type="submit"
            style={{ float: "left", paddingRight: "20px" }}
            className="btn btn-primary default-btn-purple"
            onClick={() => clearFilters()}
          >
            Clear filters
          </button>
        </div>
      </form>
      <div>
        <p
          className="sidebar-text"
          style={{ marginTop: "50px", marginBottom: "20px" }}
        >
          {" "}
          {pinData.length}{" "}
          {pinData.length == 1 ? " search result" : " search results"}{" "}
        </p>

        {pinData.map((story, index) => {
          return (
            <Card style={{ marginTop: "10px", borderRadius: "20px" }}>
              <Link
                style={{ textDecoration: "inherit" }}
                to={`story/${story.id}`}
                onClick={() => props.centerMarker(story)}
              >
                <div
                  className={
                    story.category == 1
                      ? "search-bar-story-card-trim-personal"
                      : story.category == 2
                      ? "search-bar-story-card-trim-community"
                      : "search-bar-story-card-trim-historical"
                  }
                ></div>
                <CardActionArea>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      className={"sidebar-story-title"}
                    >
                      {story.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      className={"sidebar-story-description"}
                    >
                      <Markup
                        content={story.description.substring(0, 250) + "..."}
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
                </CardActionArea>
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );

  let resultCount = pinData.length;
  // console.log(props.minPinDate + " is MIN PIN DATE");
  // console.log(dateRange + " is the date range");

  return (
    <Sidebar
      sidebar={
        <div style={{ padding: "5px 5px 5px 5px" }}>
          <IconButton
            onClick={() => props.setSidebarOpen(false)}
            style={{ float: "right" }}
            aria-label="close"
          >
            <CloseIcon color="disabled"></CloseIcon>
          </IconButton>
          <div style={{ marginTop: "20px" }}>
            <Tabs defaultActiveKey="stories" id="uncontrolled-tab-example">
              <Tab
                eventKey="stories"
                tabClassName="sidebar-text"
                title="Search Stories"
              >
                {storySearch}
              </Tab>
              <Tab
                eventKey="users"
                tabClassName="sidebar-text"
                title="Search Users"
              >
                <UserSearchForm
                  previous={users.previous}
                  next={users.next}
                  count={users.count}
                  onSubmit={submitUserSearch}
                  setUserSearchText={setUserSearchText}
                  userSearchText={userSearchText}
                />
                {users.results && <ListUsersSearch users={users.results} />}
              </Tab>
            </Tabs>
          </div>
        </div>
      }
      open={props.sidebarOpen}
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
    >
      {/* {console.log(pinData.length + " is the length")} */}
    </Sidebar>
  );
}

export default SearchSidebar;

const UserSearchForm = (props) => {
  const dispatch = useDispatch();
  return (
    <div style={{ marginTop: "10px" }}>
      <form onSubmit={props.onSubmit}>
        <div className={"form-group"}>
          <label className="sidebar-text">Search: </label>
          <input
            className="form-control"
            id="searchForm"
            label="Search"
            placeholder={"Search for users"}
            name={"userSearchText"}
            onChange={(e) => props.setUserSearchText(e.target.value)}
            value={props.userSearchText}
          />
        </div>
        <div className="form-group">
          <button
            type="submit"
            style={{ float: "right" }}
            className="btn btn-primary"
          >
            Search
          </button>
          {props.previous ? (
            <button
              type="submit"
              style={{ float: "right" }}
              className="btn btn-primary"
              onClick={() => dispatch(getNextPreviousUsers(props.previous))}
            >
              Previous
            </button>
          ) : (
            ""
          )}
          {props.next ? (
            <button
              type="submit"
              style={{ float: "right" }}
              className="btn btn-primary"
              onClick={() => dispatch(getNextPreviousUsers(props.next))}
            >
              Next
            </button>
          ) : (
            ""
          )}
        </div>
      </form>
      <div>
        <p
          className="sidebar-text"
          style={{ marginTop: "50px", marginBottom: "20px" }}
        >
          {" "}
          {props.count}{" "}
          {props.count === 1 ? " search result" : " search results"}{" "}
        </p>
      </div>
    </div>
  );
};

const ListUsersSearch = (props) => {
  return (
    <>
      {props.users.map((user, index) => {
        return (
          <Card key={index} style={{ marginTop: "5px" }}>
            <Link
              style={{ textDecoration: "inherit" }}
              to={`users/${user.username}`}
            >
              <CardActionArea>
                <CardContent>
                  <Row>
                    <Col md={3}>
                      {user.profileurl ? (
                        <img
                          src={user.profileurl}
                          style={{
                            borderRadius: "50%",
                            height: "100px",
                            width: "100px",
                          }}
                        />
                      ) : (
                        <Avatar size={100} icon="user" />
                      )}
                    </Col>
                    <Col
                      md={9}
                      style={{ marginTop: "auto", marginBottom: "auto" }}
                    >
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        className="sidebar-story-title"
                      >
                        {user.username}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        className="sidebar-story-description"
                      >
                        {user.bio ? user.bio.substring(0, 50) + "..." : ""}
                      </Typography>
                    </Col>
                  </Row>
                </CardContent>
              </CardActionArea>
            </Link>
          </Card>
        );
      })}
    </>
  );
};
