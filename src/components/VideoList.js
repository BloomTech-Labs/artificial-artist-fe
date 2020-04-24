import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getVideos } from "../store/actions";
import style from "styled-components";

const VideoList = props => {

    // We might use something like this for when videos get updated, perhaps not though
    useEffect(() => {
        props.getVideos(localStorage.getItem("token"));
    }, [props.postVideoSuccess]);

	return (
        <>
        </>
    );
}

const mapStateToProps = (state) => ({
  videos: state.videos,
  getVideosStart: state.getVideosStart,
  postVideoSuccess: state.postVideoSuccess,
  loginSuccess: state.loginSuccess,
});

export default connect(mapStateToProps, {
  getVideos,
})(withRouter(VideoList));