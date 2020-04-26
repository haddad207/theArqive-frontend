import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
  useRouteMatch,
  useLocation,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ManageFlag from "./ManageFlag";
import ManageUsers from "./ManageUsers";
import ManageComments from "./ManageComments";
import ManageCategory from "./ManageCategory";
import { RoutedTabs, NavTab } from "react-router-tabs";
import "./styles/react-router-tabs.css";
export default function Manage() {
  let { path, url } = useRouteMatch();
  console.log("the path is " + path + " and the url is " + url);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, user } = auth;

  return (
    <div className="main-content-div">
      <NavTab to="/manage/flag">Check Flags</NavTab>
      <NavTab to="/manage/users">Manage User</NavTab>
      <NavTab to="/manage/comments">Manage Comments</NavTab>
      <NavTab to="/manage/category">Manage Category</NavTab>
      <Switch>
        <Route exact path={`/manage`}>
          <MainManage />
          {path}
          <Locate />
        </Route>
        <Route path={`/manage/flag`}>
          <ManageFlag />
        </Route>
        <Route path={`/manage/users`}>
          <ManageUsers />
        </Route>
        <Route path={`/manage/comments`}>
          <ManageComments />
        </Route>
        <Route path={`/manage/category`}>
          <ManageCategory />
        </Route>
      </Switch>
    </div>
  );
}

function MainManage() {
  let { setting } = useParams();

  return (
    <div>
      {setting}
      <Redirect to="/manage/flag" />;
    </div>
  );
}

function Locate() {
  let location = useLocation();
  return <div>{location.pathname}</div>;
}
