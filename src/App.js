import React, { useEffect } from "react";
import PrivateRoute from "./components/PrivateRoute";
import { logout, getVideos } from "./store/actions";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  withRouter,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import CreateVideo from "./components/CreateVideo";
import VideoList from "./components/VideoList";
import Navigation from "./components/Navigation";
import SingleVideoPage from "./components/SingleVideoPage";
import UserPage from "./components/UserPage";
import Search from "./components/SearchVideos";
import style from "styled-components";
import "./App.css";

const Base = style.div`
  background: rgb(25,7,85);
  background: linear-gradient(180deg, rgba(25,7,85,1) 0%, rgba(228,0,94,1) 100%, rgba(2,0,36,1) 190755%);
  min-height: 100vh;
`;

function App(props) {
  return (
    <Router>
      <Base>
        <Navigation />
        <Switch>
          <Route exact path="/" component={VideoList} />
          {/* <Route exact path="/" >
            <VideoList videoList={props.videoList} />
          </Route> */}
          <Route exact path="/videos/:videoId" component={SingleVideoPage} />
          {/* <SingleVideoPage videoList={props.videoList} /> */}
          {/* <PrivateRoute exact path="/videos/:videoID">
            <SingleVideoPage videoList={props.videoList} />
          </PrivateRoute> */}
          <PrivateRoute
            path="/create"
            exact
            component={localStorage.getItem("token") ? CreateVideo : Signup}
          />
          <Route exact path="/users/:username" component={UserPage} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
           <Route path="/search" component={Search} />
        </Switch>
      </Base>
    </Router>
  );
}

const mapStateToProps = (state) => ({
  loginStart: state.loginStart,
  token: state.token,
});

export default connect(mapStateToProps, { logout, getVideos })(withRouter(App));
