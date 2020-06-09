import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useParams, withRouter } from "react-router-dom";
import { Container } from "reactstrap";
import { getUserVideos } from "../store/actions";
import Thumbnail from "./Thumbnail";

const videoListContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
};

const VideoThumbsContainer = {
  display: "flex",
  flexWrap: "wrap",
  width: "70%",
  margin: "0 auto",
  placeContent: "center"
};

const UserPage = props => {
  const { username } = useParams();

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
  //this if statement will greet a user with a list of their videos, otherwise it will send a prompt to create a video

  return (
    <>
      <Container>
        <h1>{greeting}</h1>
        <div style={videoListContainer}>
          <div style={VideoThumbsContainer}>
            {props.userVideos && props.userVideos ? (
              props.userVideos.map(video => {
                return (
                  <div Key={video.id}>
                    <h3>{video.video_title}</h3>
                    <Link to={`/videos/${video.id}`}>
                      <Thumbnail video={video} />
                    </Link>
                  </div>
                );
              })
            ) : (
              <p>
                Looks like you haven't created any videos yet, lets {""}
                <Link to="/create">create some videos!</Link>
              </p>
            )}
          </div>
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
