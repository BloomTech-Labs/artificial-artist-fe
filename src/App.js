import React, { useEffect } from "react";
import PrivateRoute from "./components/PrivateRoute";
import { logout, getVideos } from "./store/actions";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  withRouter,
  Switch,
  Redirect
} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import CreateVideo from "./components/CreateVideo";
import VideoList from "./components/VideoList";
import Navigation from "./components/Navigation";
import SingleVideoPage from "./components/SingleVideoPage";
import UserPage from "./components/UserPage";

function App(props) {
  return (
    <Router>
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
      </Switch>
    </Router>
  );
}

const mapStateToProps = state => ({
  loginStart: state.loginStart,
  token: state.token
});

export default connect(
  mapStateToProps,
  { logout, getVideos }
)(withRouter(App));
