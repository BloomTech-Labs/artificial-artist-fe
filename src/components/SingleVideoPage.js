import React from "react";
import { connect, useSelector } from "react-redux";
import { useParams, useRouteMatch, withRouter, Link } from "react-router-dom";
import { getVideos } from "../store/actions";
import Video from "./Video";

const SingleVideoPage = ({ stateVL }) => {
  const { videoID } = useParams();
console.log("line9SVP",{videoID})
  const correctVideo = stateVL.find((video) => video.id === Number(videoID));

  console.log("#########################--->>>>>", { correctVideo });

  return (
    <>
      {console.log("#########################--->>>>>", { correctVideo })}
      <Video video={correctVideo} />
    </>
  );
};

const mapStateToProps = (state) => ({
  getVideosStart: state.getVideosStart,
  postVideoSuccess: state.postVideoSuccess,
  loginSuccess: state.loginSuccess,
  stateVL: state.videoList,
});

export default connect(mapStateToProps, {
  getVideos,
})(withRouter(SingleVideoPage));
