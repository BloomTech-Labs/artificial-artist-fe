import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { useParams, useRouteMatch, withRouter, Link } from "react-router-dom";
import { getSingleVideo } from "../store/actions";
import Video from "./Video";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import Thumbnail from "./Thumbnail";
// import { Player } from "video-react";

const SingleVideoPage = (props) => {
  const { videoId } = useParams();
  console.log(videoId);

  useEffect(() => {
    props.getSingleVideo(localStorage.getItem("token"), videoId);
  }, [videoId]);

  return (
    <>
      {props.singleVideo.video_status === "creating" ? (
        <>
          <h2>
            We're crunching the numbers on this one, STILL, check back in a few
            minutes...
          </h2>
        </>
      ) : props.singleVideo.video_status === "successful" ? (
        <>
          <Video video={props.singleVideo} />
          <h2>{props.singleVideo.video_title}</h2>
          <h3>{props.singleVideo.title}</h3>
          <h3>{props.singleVideo.artist_name}</h3>
        </>
      ) : props.singleVideo.video_status === "failed" ? (
        <>
          <h2>Something failed, we're so, so, so deeply sorry</h2>
        </>
      ) : (
        console.log("end of ternary????")
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  singleVideo: state.singleVideo,
  getSingleVideoStart: state.getSingleVideoStart,
  getSingleVideoSuccess: state.getSingleVideoSuccess,
  getSingleVideoError: state.getSingleVideoError,
});

export default connect(mapStateToProps, { getSingleVideo })(
  withRouter(SingleVideoPage)
);
