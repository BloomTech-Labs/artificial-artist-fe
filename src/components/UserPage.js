import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { Link, useParams, withRouter } from "react-router-dom";
import { Container } from "reactstrap";
import axios from "axios";
import { getUserVideos } from "../store/actions";

const UserPage = props => {
  const { username } = useParams();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    props.getUserVideos(localStorage.getItem("token"), username);
  }, [username]);

  let greeting;

  if (localStorage.getItem("username") === username) {
    greeting = `Welcome ${username}`;
    console.log("Welcome");
  } else {
    greeting = `${username} Videos`;
    console.log(username);
  }
  return (
    <>
      <Container>
        <div>
          <h1>{greeting}</h1>
          <p>
            Now that you're logged in, lets{" "}
            <Link to="/create">create some videos!</Link>
          </p>
          {props.userVideos.map(video => {
            return (
              <>
                <div Key={video.id}>
                  <h1>{video.video_title}</h1>
                  <div>{video.location}</div>
                </div>
              </>
            );
          })}
        </div>
      </Container>
    </>
  );
};

const mapStateToProps = state => ({
  userVideos: state.userVideos,
  getUserVideosStart: state.getUserVideosStart,
  getUserVideosSuccess: state.getUserVideosSuccess,
  getUserVideosError: state.getUserVideosError
});

export default connect(
  mapStateToProps,
  { getUserVideos }
)(withRouter(UserPage));
