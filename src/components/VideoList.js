import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { getVideos } from "../store/actions";
import Video from "./Video";
import Thumbnail from "./Thumbnail.js";

const videoListContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const VideoThumbsContainer = {
  display: "flex",
  flexWrap: "wrap",
  width: "70%",
  margin: "0 auto",
};

const VideoList = ({ getVideosStart, videoList, stateVL }) => {



  return (
    <div style={videoListContainer}>
      <Video />
      <div style={VideoThumbsContainer}>
        {stateVL &&
          stateVL.map((video) => (
            <div key={video.id}>
              <Link to={`/videos/${video.id}`}>
                <Thumbnail video={video} />
              </Link>
            </div>
          ))}
      </div>
    </div>
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
})(withRouter(VideoList));
