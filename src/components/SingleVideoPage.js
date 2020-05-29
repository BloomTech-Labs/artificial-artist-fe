import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { useParams, useRouteMatch, withRouter, Link } from "react-router-dom";
import { getVideos } from "../store/actions";
import Video from "./Video";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const SingleVideoPage = props => {
  const { videoID } = useParams();
  console.log(videoID);

  const videos = [
    {
      video_title: "",
      location: "youtube.com/video",
      song_id: "",
      title: "",
      artist_name: ""
    }
  ];

  const correctVideo = videos.find(video => video.id === Number(videoID));

  useEffect(() => {
    //Solo video props will need to be passed through here
    console.log("I am inside of the Single Video Page");
  });

  return (
    <>
      <Video video={correctVideo} />
    </>
  );
};

const mapStateToProps = state => {
  return {
    getVideosStart: state.getVideosStart,
    postVideoSuccess: state.postVideoSuccess,
    loginSuccess: state.loginSuccess,
    videos: state.videoList
  };
};

export default connect(
  mapStateToProps,
  {
    getVideos
  }
)(withRouter(SingleVideoPage));

//Courtney's loading state from Loading.js

/*const { location } = state;

useEffect(() => {
  axiosWithAuth
    .get("/video/:id")
    .then((res) => {
      console.log(res);
      if (location.status === null) {
        const pingTimerId = setTimeout(() => {
          setIsLoading(false);
        }, 5000);
      } else if ((location.status = "url")) {
        return setIsLoading(videoData);
      }
    })
    .catch((err) => {
      console.log("Server error while getting video", err);
    });

  return () => {
    clearTimeout(pingTimerId);
  };
});*/
