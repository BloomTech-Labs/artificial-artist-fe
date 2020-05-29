import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { useParams, useRouteMatch, withRouter, Link } from "react-router-dom";
import { getVidID } from "../store/actions";
import Video from "./Video";
import axios from "axios";

const SingleVideoPage = ({ video, getVidID }) => {
  const { id } = useParams();

  //const correctVideo = videos.find((video) => video.id === Number(videoID));

  useEffect(() => {
    axios
      .get(`/video/${video.id}`)
      .then((res) => {
        console.log(res);
        // if (location.status === null) {
        //   const pingTimerId = setTimeout(() => {
        //     setIsLoading(false);
        //   }, 5000);
        // } else if ((location.status = "url")) {
        //   return setIsLoading(videoData);
        // }
        if (video.id === Number(id)) {
          getVidID(id);
        } else {
          if (video.id !== Number(id)) {
            //if it doesn't match return video component which has a default video
            return <Video />;
          }
        }
      })
      .catch((err) => {
        console.log("Server error while getting video", err);
      });

    // return () => {
    //   clearTimeout(pingTimerId);
    // };
  }, [video.id]);

  return (
    <>
      <Video video={video} />
      {/* <h1>Title: {videos.title}</h1>
      <h3>Creator: {videos.username}</h3> */}
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
