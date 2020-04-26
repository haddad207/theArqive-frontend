import React, { Fragment, useState, useEffect } from "react";

import {
  getPin,
  editPin,
  deletePins,
  addComment,
  deleteComment,
  getPinsWithBounds,
  getMinPinDate,
  getMaxPinDate,
  getPins,
} from "../../actions/pins";
import { useDispatch, useSelector } from "react-redux";
import useAddPinForm from "./CustomHooks/useAddPinForm";
import useFlagForm from "./CustomHooks/useFlagForm";
import useEditPinForm from "./CustomHooks/useEditPinForm";
import useRemovalConfirm from "../profile/CustomHooks/useRemovalConfirm";
import {
  Switch,
  Route,
  useParams,
  Redirect,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import LeafletMap from "./LeafletMap";
import SearchSidebar from "../layout/SearchSidebar";
import Story from "./Story/Story";
import StorySidebar from "../layout/StorySidebar";
import ConfirmationModal from "../profile/ConfirmationModal";
const sidebarStyle = {
  position: "absolute",
  top: "0",
  height: "100%",
  zIndex: "1000",
  overflow: "hidden",
  right: "0px",
  // z-index: 1000;
  // position: absolute;
  // height: 100%;
  // overflow: hidden;
  // width: 100%;
  // top: 0;
};

export default function MapDashboard() {
  let { path, url } = useRouteMatch();

  const [divStyle, setdivStyle] = useState({
    height: "100%",
    width: "100%",
  });
  const [divStyle1, setdivStyle1] = useState({
    height: "100%",
    width: "100%",
    left: "0",
  });
  const [mapContainerStyle, setMapContainerStyle] = useState({
    height: "100%",
    width: "100%",
    left: "0",
  });

  const [placement, setplacement] = useState({
    id: "",
    userlat: 34.0522,
    userlng: -118.2437,
    zoom: 12,
  });

  const pins = useSelector((state) => state.pins.pins);
  const dispatch = useDispatch();
  const [pinData, setPinData] = useState();
  const history = useHistory();
  const [mapReference, setMapReference] = useState();
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    dispatch(getPins());
    dispatch(getMaxPinDate());
    dispatch(getMinPinDate());
  }, []);
  useEffect(() => {
    console.log("here trying first");
    if (mapReference != undefined) {
      let mapBounds = mapReference.getBounds();
      let south = mapBounds.getSouth();
      let west = mapBounds.getWest();
      let north = mapBounds.getNorth();
      let east = mapBounds.getEast();
      dispatch(getPinsWithBounds(north, south, east, west));
    }
  }, [mapReference]);

  useEffect(() => {
    console.log("in use effect");
    console.log("is search " + isSearch);
    if (mapReference != undefined && !isSearch) {
      console.log("here");
      // dispatch(getPins());
      mapReference.once("moveend", function () {
        let mapBounds = mapReference.getBounds();
        let south = mapBounds.getSouth();
        let west = mapBounds.getWest();
        let north = mapBounds.getNorth();
        let east = mapBounds.getEast();
        dispatch(getPinsWithBounds(north, south, east, west));
      });
    }
  }, [pins]);

  useEffect(() => {
    getLocation();
  }, []);

  const centerMarker = (marker) => {
    if (mapReference) {
      mapReference.panTo([marker.latitude, marker.longitude]);
      setplacement({
        id: marker.id,
        userlat: marker.latitude,
        userlng: marker.longitude,
        zoom: mapReference.getZoom(),
      });
    }
  };

  const {
    addPinValues,
    setaddPinValues,
    handleAddPinSubmit,
    handleAddPinChange,
    modalState,
    setmodalstate,
    setAnonRadius,
  } = useAddPinForm(userAddedPin);
  const {
    flagForm,
    flagToggle,
    flagModalState,
    onFlagSubmit,
    handleFlagFormChange,
    flagCommentToggle,
    flagCommentModalState,
    onFlagCommentSubmit,
  } = useFlagForm();
  const {
    editToggle,
    editPinForm,
    seteditPinForm,
    editpinmodalState,
    seteditpinmodalState,
    onEditSubmit,
    updateEditForm,
    setEditPinState,
  } = useEditPinForm(pinData, setPinData);
  const onDelProfile = () => {
    dispatch(deletePins(removalFav));
    setStorySidebarOpen(!storySidebarOpen);
    setPinDeleted(true);
    setPinData("");
    dispatch(getMinPinDate());
    dispatch(getMaxPinDate());
  };
  const {
    // uses modal from profile page
    removalModalState,
    removalToggle,
    onDeleteHome,
    removalFav,
  } = useRemovalConfirm(onDelProfile);
  function userAddedPin() {
    mapReference.flyTo([addPinValues.latitude, addPinValues.longitude], 15);
  }

  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, user } = auth;
  const [darkMode, setdarkMode] = useState(true);
  //opens modal for adding new pins
  // const [editpinmodalState, seteditpinmodalState] = useState(false); // opens modal for editing pin
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [storySidebarOpen, setStorySidebarOpen] = useState(false);
  const [showSidebarButton, setShowSidebarButton] = useState(false);
  const [map, setMap] = useState();
  const [addAddress, setAddAddress] = useState(false);
  const minPinDate = useSelector((state) => state.pins.pinMinDate);
  const maxPinDate = useSelector((state) => state.pins.pinMaxDate);

  const [pinCluster, setPinCluster] = useState(false);
  const [isLeavingStoryPage, setIsLeavingStoryPage] = useState(false);

  const addMarker = (e) => {
    setplacement({
      ...placement,
      userlat: e.latlng.lat,
      userlng: e.latlng.lng,
    });
    setaddPinValues({
      ...addPinValues,
      latitude: e.latlng.lat,
      longitude: e.latlng.lng,
    });

    setmodalstate(!modalState);
  };

  const toggle = () => {
    if (modalState == true) {
      setAddAddress(false);
    }
    setmodalstate(!modalState);
  };

  const [pinDeleted, setPinDeleted] = useState(false);

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (succes) => {
          if (mapReference != undefined) {
            mapReference.panTo([
              succes.coords.latitude,
              succes.coords.longitude,
            ]);
          }
          setplacement({
            ...placement,
            userlat: succes.coords.latitude,
            userlng: succes.coords.longitude,
          });
        },
        (error) => {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    }
  }

  const [userComment, setuserComment] = useState({
    pin: "",
    description: "lit",
  });
  const [toggleComment, settoggleComment] = useState(false);
  const onSubmitComment = (e) => {
    e.preventDefault();
    const submit = {
      ...userComment,
      commenter: user.id,
    };
    settoggleComment(false);
    dispatch(addComment(submit));
    // dispatch(addComment(userComment));
  };
  const onDeleteComment = (commentid) => {
    dispatch(deleteComment(commentid));
  };

  return (
    <Fragment>
      <Switch>
        <Route exact path="/">
          <div id={"map-dashboard"}>
            <div id={"sidebar-style"}>
              <SearchSidebar
                sidebarOpen={sidebarOpen}
                maxPinDate={maxPinDate}
                minPinDate={minPinDate}
                setSidebarOpen={setSidebarOpen}
                mapReference={mapReference}
                setPlacement={setplacement}
                centerMarker={centerMarker}
                isSearch={isSearch}
                setIsSearch={setIsSearch}
              />
              <StorySidebar
                maplink={"/story"}
                pinData={pinData}
                setPinData={setPinData}
                pins={pins}
                storySidebarOpen={storySidebarOpen}
                setStorySidebarOpen={setStorySidebarOpen}
                isAuthenticated={isAuthenticated}
                user={user}
                editpinmodalState={editpinmodalState}
                seteditpinmodalState={seteditpinmodalState}
                setEditPinState={setEditPinState}
                pinCluster={pinCluster}
                setPinCluster={setPinCluster}
                setSidebarOpen={setSidebarOpen}
                centerMarker={centerMarker}
                removalToggle={removalToggle}
              />
            </div>
            <LeafletMap
              maplink={"/story"}
              pins={pins}
              divStyle={divStyle}
              addMarker={addMarker}
              placement={placement}
              setPlacement={setplacement}
              modalState={modalState}
              toggle={toggle}
              editPin={editPinForm}
              seteditPin={seteditPinForm}
              updateEditForm={updateEditForm}
              editToggle={editToggle}
              editpinmodalState={editpinmodalState}
              seteditpinmodalState={seteditpinmodalState}
              onEditSubmit={onEditSubmit}
              getLocation={getLocation}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              pinDeleted={pinDeleted}
              setPinDeleted={setPinDeleted}
              showSidebarButton={true}
              addPinValues={addPinValues}
              handleAddPinChange={handleAddPinChange}
              handleAddPinSubmit={handleAddPinSubmit}
              setaddPinValues={setaddPinValues}
              setAnonRadius={setAnonRadius}
              darkMode={darkMode}
              setdarkMode={setdarkMode}
              mapReference={mapReference}
              setMapReference={setMapReference}
              user={user}
              isAuthenticated={isAuthenticated}
              storySidebarOpen={storySidebarOpen}
              setStorySidebarOpen={setStorySidebarOpen}
              pinData={pinData}
              setPinData={setPinData}
              pinCluster={pinCluster}
              setPinCluster={setPinCluster}
              mapContainerStyle={divStyle1}
              setMapContainerStyle={setMapContainerStyle}
              centerMarker={centerMarker}
              addAddress={addAddress}
              setAddAddress={setAddAddress}
            />
          </div>
        </Route>
        <Route path="/story">
          <div id={"story-container"}>
            {pinDeleted ? <Redirect to={"/"} /> : null}
            <div id={"map-dashboard"}>
              <LeafletMap
                centerMarker={centerMarker}
                maplink={"/story"}
                pins={pins}
                divStyle={divStyle1}
                addMarker={addMarker}
                placement={placement}
                setPlacement={setplacement}
                modalState={modalState}
                toggle={toggle}
                editPin={editPinForm}
                seteditPin={seteditPinForm}
                editToggle={editToggle}
                editpinmodalState={editpinmodalState}
                seteditpinmodalState={seteditpinmodalState}
                onEditSubmit={onEditSubmit}
                getLocation={getLocation}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                pinDeleted={pinDeleted}
                setPinDeleted={setPinDeleted}
                showSidebarButton={true}
                setStorySidebarOpen={setStorySidebarOpen}
                addPinValues={addPinValues}
                handleAddPinChange={handleAddPinChange}
                handleAddPinSubmit={handleAddPinSubmit}
                setaddPinValues={setaddPinValues}
                setAnonRadius={setAnonRadius}
                darkMode={darkMode}
                setdarkMode={setdarkMode}
                mapReference={mapReference}
                setMapReference={setMapReference}
                user={user}
                isAuthenticated={isAuthenticated}
                setPinData={setPinData}
                isIndividualStoryPage={true}
                mapContainerStyle={mapContainerStyle}
                setMapContainerStyle={setMapContainerStyle}
                centerMarker={centerMarker}
                updateEditForm={updateEditForm}
                addAddress={addAddress}
                setAddAddress={setAddAddress}
              />
            </div>
            <StoryDisplay
              placement={placement}
              setplacement={setplacement}
              toggleComment={toggleComment}
              settoggleComment={settoggleComment}
              userComment={userComment}
              setuserComment={setuserComment}
              onSubmitComment={onSubmitComment}
              onDeleteComment={onDeleteComment}
              user={user}
              isAuthenticated={isAuthenticated}
              editpinmodalState={editpinmodalState}
              seteditpinmodalState={seteditpinmodalState}
              removalToggle={removalToggle}
              setEditPinState={setEditPinState}
              pinDeleted={pinDeleted}
              setPinDeleted={setPinDeleted}
              editPin={editPinForm}
              seteditPin={seteditPinForm}
              flagForm={flagForm}
              flagToggle={flagToggle}
              flagModalState={flagModalState}
              onFlagSubmit={onFlagSubmit}
              handleFlagFormChange={handleFlagFormChange}
              flagCommentToggle={flagCommentToggle}
              flagCommentModalState={flagCommentModalState}
              onFlagCommentSubmit={onFlagCommentSubmit}
              setMapDivStyle={setdivStyle1}
              setMapContainerStyle={setMapContainerStyle}
              mapContainerStyle={mapContainerStyle}
              mapReference={mapReference}
              centerMarker={centerMarker}
              isLeavingStoryPage={isLeavingStoryPage}
              setIsLeavingStoryPage={setIsLeavingStoryPage}
              history={history}
            />
          </div>
        </Route>
      </Switch>

      <ConfirmationModal
        modalState={removalModalState}
        toggle={removalToggle}
        onSubmit={onDeleteHome}
        title="Remove"
      />
    </Fragment>
  );
}
function StoryDisplay(props) {
  let match = useRouteMatch();
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, guest_user } = auth;

  let [storyStyle, setStoryStyle] = useState({ top: "100%" });
  let [redirectHome, setRedirectHome] = useState(false);
  // change the map & story page styling for story slide up effect
  useEffect(() => {
    setStoryStyle({
      top: "45%",
    });
    props.setMapContainerStyle({
      height: "45%",
    });
  }, []);

  // useEffect(() => {
  //   return () => {

  //     setStoryStyle({
  //       top: "100%"
  //     });
  //     props.setMapContainerStyle({
  //       height: "100%"
  //     });
  //     setTimeout(function() { //Start the timer
  //           props.setIsLeavingStoryPage(false);
  //           props.history.push("/#");
  //     }.bind(this), 700);
  //   }
  // }, [props.isLeavingStoryPage]);
  return (
    <div id={"story-page"} style={storyStyle}>
      <Switch>
        <Route path={`${match.path}/:id`}>
          {(isAuthenticated || guest_user) && <IndividualStory {...props} />}
        </Route>
        <Route path={match.path}>
          <h3>Please select an IndividualStory.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function IndividualStory(props) {
  let { id } = useParams();
  const pin = useSelector((state) => state.pins.pin);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, user, favoritedPin } = auth;
  const userid = isAuthenticated ? user.id : false;
  console.log(pin);
  useEffect(() => {
    dispatch(getPin(id, userid));
    props.setuserComment({
      description: "fff",
      pin: id,
    });
  }, [id]);

  useEffect(() => {
    props.seteditPin({
      title: "",
      description: "",
      category: "",
    });
  }, [id]);

  return (
    <Story
      pin={pin}
      pinData={props.pinData}
      mapReference={props.mapReference}
      {...props}
    />
  );
}
