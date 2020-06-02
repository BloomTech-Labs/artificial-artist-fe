import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { useParams, useRouteMatch, withRouter, Link } from "react-router-dom";
import { getSingleVideo } from "../store/actions";
import Video from "./Video";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const SingleVideoPage = (props) => {
  const { videoId } = useParams();
  console.log(videoId);

  useEffect(() => {
    props.getSingleVideo(localStorage.getItem("token"), videoId);
    console.log(props.singleVideo);
  }, [videoId]);

  return (
    <>
      {props.singleVideo === "initializing" ? (
        <>
          <h2>Loading...</h2>
        </>
      ) : (
        <>
          {props.singleVideo.location &&
          props.singleVideo.location.length > 1 ? (
            <>
              <h2>
                <Video video={props.singleVideo} />
              </h2>
            </>
          ) : (
            <>
              <h2>We're still chugging away on this one</h2>
            </>
          )}
        </>
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
