import React from "react";
import PrivateRoute from "./components/PrivateRoute";
import { logout } from "./store/actions";
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

function App(props) {

  return (
    <Router>
      <Navigation />
      <Switch>
        <PrivateRoute
          path="/"
          exact
          component={localStorage.getItem("token") ? VideoList : Signup}
        />
        <PrivateRoute
          path="/create"
          exact
          component={localStorage.getItem("token") ? CreateVideo : Signup}
        />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route
          exact
          path="/"
          render={() =>
            localStorage.getItem("token") ? (
              <Redirect to="/" />
            ) : (
                <Signup />
              )
          }
          
          <PrivateRoute exact path="/videos/:id" render={props => (
            <SingleVideoPage {...props} videos={props.videos}  />
          )}
        />
      </Switch>
    </Router>
  );
}

const mapStateToProps = (state) => ({
  loginStart: state.loginStart,
  token: state.token,
  videos:state.videos
});

export default connect(mapStateToProps, { logout })(withRouter(App));
