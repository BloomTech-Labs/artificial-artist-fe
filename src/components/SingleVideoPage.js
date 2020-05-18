import React from "react";
import { connect, useSelector } from "react-redux";
import { useParams, useRouteMatch, withRouter, Link } from "react-router-dom";
import { getVideos } from "../store/actions";
import Video from "./Video";

const SingleVideoPage = ({ videos }) => {
  const { videoID } = useParams();

  const correctVideo = videos.find((video) => video.id === Number(videoID));

  return (
    <>
      <Video video={correctVideo} />
    </>
  );
};

const mapStateToProps = (state) => ({
  getVideosStart: state.getVideosStart,
  postVideoSuccess: state.postVideoSuccess,
  loginSuccess: state.loginSuccess,
  videos: state.videoList,
});

export default connect(mapStateToProps, {
  getVideos,
})(withRouter(SingleVideoPage));
