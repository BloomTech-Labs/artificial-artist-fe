import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { useParams, useRouteMatch, withRouter, Link } from "react-router-dom";
import { getSingleVideo } from "../store/actions";
import Video from "./Video";

const SingleVideoPage = ({ videos }) => {
  const { videoID } = useParams();

  const correctVideo = videos.find(video => video.id === Number(videoID));

  // useEffect(() => {
  //   if (video.id !== Number(videoID)) {
  //     return <Loading />;
  //   }
  // });

  return (
    <>
      <Video video={correctVideo} />
      {/* <h1>Title: {videos.title}</h1>
      <h3>Creator: {videos.username}</h3> */}
    </>
  );
};

const mapStateToProps = state => ({
  getSingleVideoStart: state.getSingleVideoStart,
  postSingleVideoSuccess: state.postSingleVideoSuccess,
  loginSuccess: state.loginSuccess,
  videos: state.videoList
});

export default connect(
  mapStateToProps,
  {
    getSingleVideo
  }
)(withRouter(SingleVideoPage));
