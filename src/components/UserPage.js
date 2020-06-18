import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useParams, withRouter } from "react-router-dom";
import { Container } from "reactstrap";
import { getUserVideos } from "../store/actions";
import Video from "./Video";
import style from "styled-components";

const VideoListContainer = style.div`
  width: 65%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const SmallerVideo = style.div`
  width: 40%;
  margin-bottom: 40px;
  background-color: #44E0F6;
  border: 10px solid #44E0F6;
  box-shadow: 10px 10px 0px 0px rgba(125,250,154,1), 10px 10px 23px 2px rgba(0,0,0,0.46);
`;

const UserPage = (props) => {
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
      <VideoListContainer>
        <h1>{greeting}</h1>
        {props.userVideos && props.userVideos ? (
          props.userVideos.map((video) => {
            return (
              <SmallerVideo key={video.id}>
                <h3>{video.video_title}</h3>
                <Link to={`/videos/${video.id}`}>
                  <Video video={video} />
                </Link>
              </SmallerVideo>
            );
          })
        ) : (
          <p>
            Looks like you haven't created any videos yet, lets {""}
            <Link to="/create">create some videos!</Link>
          </p>
        )}
      </VideoListContainer>
    </>
  );
};

const mapStateToProps = (state) => ({
  userVideos: state.userVideos,
  getUserVideosStart: state.getUserVideosStart,
  getUserVideosSuccess: state.getUserVideosSuccess,
  getUserVideosError: state.getUserVideosError,
});

export default connect(mapStateToProps, { getUserVideos })(
  withRouter(UserPage)
);
