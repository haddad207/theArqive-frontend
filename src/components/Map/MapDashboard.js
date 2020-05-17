import React, { Fragment, useState, useEffect, Suspense } from "react";

import {
  getPin,
  deletePins,
  addComment,
  deleteComment,
  // getPinsWithBounds,
  getMinPinDate,
  getMaxPinDate,
  getPins,
} from "../../actions/pins";
import { searchUsers } from "../../actions/users";
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
import StorySidebar from "../layout/StorySidebar";
import ConfirmationModal from "../profile/ConfirmationModal";


import LeafletMap from "./LeafletMap";
const Story = React.lazy(() => import("./Story/Story"));
const SearchSidebar = React.lazy(() => import("../layout/SearchSidebar"));
export default function MapDashboard() {

  const divStyle = {
    height: "100%",
    width: "100%",
  };
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
    dispatch(getMaxPinDate());
    dispatch(getMinPinDate());
    dispatch(searchUsers(""));
    dispatch(getPins());
  }, [dispatch]);

  // I changed the below two useEffects in order to make the getPinsWithBounds work
  // pretty much get pins that are within the view and if the map moves re-fetch pins in new coord bounds
  // useEffect(() => {
  //   if (mapReference !== undefined) {
  //     let mapBounds = mapReference.getBounds();
  //     let south = mapBounds.getSouth();
  //     let west = mapBounds.getWest();
  //     let north = mapBounds.getNorth();
  //     let east = mapBounds.getEast();
  //     dispatch(getPinsWithBounds(north, south, east, west));
  //   }
  // }, [mapReference]);
  //
  // useEffect(() => {
  //   if (mapReference !== undefined && !isSearch) {
  //     // dispatch(getPins());
  //     mapReference.once("moveend", function () {
  //       let mapBounds = mapReference.getBounds();
  //       let south = mapBounds.getSouth();
  //       let west = mapBounds.getWest();
  //       let north = mapBounds.getNorth();
  //       let east = mapBounds.getEast();
  //       dispatch(getPinsWithBounds(north, south, east, west));
  //     });
  //   }
  // }, [pins]);

  useEffect(() => {
    getLocation();
  }, []);

  const centerMarker = (marker) => {
    if (mapReference) {
      setplacement({
        id: marker.id,
        userlat: Number(marker.latitude),
        userlng: Number(marker.longitude),
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
  } = useEditPinForm(userEditedPin, pinData, setPinData);
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
    loginToggle,
    loginregisterModalState,
  } = useRemovalConfirm(onDelProfile);

  function userAddedPin() {
    mapReference.flyTo([addPinValues.latitude, addPinValues.longitude], 15);
    centerMarker(addPinValues);
  }

  function userEditedPin() {
    mapReference.flyTo([editPinForm.latitude, editPinForm.longitude], 15);
    centerMarker(editPinForm);
  }

  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, user } = auth;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [storySidebarOpen, setStorySidebarOpen] = useState(false);

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
    if (modalState === true) {
      setAddAddress(false);
    }
    setmodalstate(!modalState);
  };

  const [pinDeleted, setPinDeleted] = useState(false);

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (succes) => {
          if (mapReference !== undefined) {
            mapReference.setView([
              succes.coords.latitude,
              succes.coords.longitude,
            ], 15);
          }
          setplacement({
            ...placement,
            userlat: succes.coords.latitude,
            userlng: succes.coords.longitude,
            zoom: 15
          });
        },
        (error) => {
          // console.log(error);
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
    description: "",
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
    setuserComment({
      ...userComment,
      description: "",
    });
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
              <Suspense fallback={<div>Loading...</div>}>
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
              </Suspense>
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
                showSidebarButton={false}
                setStorySidebarOpen={setStorySidebarOpen}
                addPinValues={addPinValues}
                handleAddPinChange={handleAddPinChange}
                handleAddPinSubmit={handleAddPinSubmit}
                setaddPinValues={setaddPinValues}
                setAnonRadius={setAnonRadius}
                mapReference={mapReference}
                setMapReference={setMapReference}
                user={user}
                isAuthenticated={isAuthenticated}
                setPinData={setPinData}
                isIndividualStoryPage={true}
                mapContainerStyle={mapContainerStyle}
                setMapContainerStyle={setMapContainerStyle}
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
              loginToggle={loginToggle}
              sidebarOpen={sidebarOpen}
              maxPinDate={maxPinDate}
              minPinDate={minPinDate}
              setSidebarOpen={setSidebarOpen}
              setPlacement={setplacement}
              isSearch={isSearch}
              setIsSearch={setIsSearch}
            />
          </div>
        </Route>
      </Switch>

      <ConfirmationModal
        modalState={removalModalState}
        toggle={removalToggle}
        onSubmit={onDeleteHome}
        title="Are you sure you want to delete this story?"
        buttonTitle={"Yes, delete this story"}
      />
      <ConfirmationModal
        modalState={loginregisterModalState}
        toggle={loginToggle}
        login={true}
        title="login or register to favorite"
      />
    </Fragment>
  );
}
function StoryDisplay(props) {
  let match = useRouteMatch();
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, guest_user } = auth;

  let [storyStyle, setStoryStyle] = useState({ top: "100%" });

  // change the map & story page styling for story slide up effect
  useEffect(() => {
    setStoryStyle({
      top: "45%",
    });
    props.setMapContainerStyle({
      height: "45%",
    });
    return () => {
      setStoryStyle({
        top: "100%",
      });
      props.setMapContainerStyle({
        height: "100%",
      });
    };
  }, []);

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
  const { isAuthenticated, user } = auth;
  const userid = isAuthenticated ? user.id : false;
  useEffect(() => {
    dispatch(getPin(id, userid));
    props.setuserComment({
      description: " ",
      pin: id,
    });
  }, [id]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Story
        pin={pin}
        pinData={props.pinData}
        centerMarker={props.centerMarker}
        mapReference={props.mapReference}
        {...props}
      />
    </Suspense>
  );
}
