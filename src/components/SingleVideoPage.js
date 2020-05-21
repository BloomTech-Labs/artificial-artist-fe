import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { useParams, useRouteMatch, withRouter, Link } from "react-router-dom";
import { getVidID } from "../store/actions";
import Video from "./Video";

const SingleVideoPage = ({ videos }) => {
  const { videoID } = useParams();

  const correctVideo = videos.find((video) => video.id === Number(videoID));

  //check if video is loading
  const [isVideoLoading, setIsVideoLoading] = useState()

  const downloadVid = url =>{
    
  }

  return (
    <>
      <Video video={correctVideo} />
      <h1>Title: {videos.title}</h1>
      <h3>Creator: {videos.username}</h3>
    </>
  );
};

const mapStateToProps = (state) => ({
  getVidIdStart: state.getVidIdStart,
  postVidIdSuccess: state.postVidIdSuccess,
  loginSuccess: state.loginSuccess,
  videos: state.videoList,
});

export default connect(mapStateToProps, {
  getVidID,
})(withRouter(SingleVideoPage));
