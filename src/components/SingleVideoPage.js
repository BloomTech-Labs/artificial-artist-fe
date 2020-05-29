import React from "react";
import { connect, useSelector } from "react-redux";
import { useParams, useRouteMatch, withRouter, Link } from "react-router-dom";
// import { getVideos } from "../store/actions";
// import Video from "./Video";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const SingleVideoPage = () => {
  const { videoId } = useParams();
  console.log(videoId);

  axiosWithAuth()
    .get(`/videos/${videoId}`)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  return <></>;
};

const mapStateToProps = (state) => ({
  loginSuccess: state.loginSuccess,
});

export default connect(mapStateToProps, {})(withRouter(SingleVideoPage));
