import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getVideos } from "../store/actions";
import Video from "./Video";
import style from "styled-components";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import axios from "axios";
import { SingleVideoCard } from "./SingleVideoCard.js";

const videoListContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const VideoThumbsContainer = {
    display:"flex",
  flexWrap:"wrap",
  width:"70%",
  margin:"0 auto"
};

const VideoList = (props) => {
  const [videoList, setVideoList] = useState([]);
  console.log({ videoList });
  // We might use something like this for when videos get updated, perhaps not though
  // useEffect(() => {
  //     props.getVideos(localStorage.getItem("token"));
  // }, [props.postVideoSuccess]);

  useEffect(() => {
    axios
      .get(`http://localhost:5050/api/videos`)
      .then((res) => setVideoList(res.data.videos))
      .then((_) => console.log({ videoList }));
  }, []);



  return (

    <div style={videoListContainer}>
      <Video />

      {/* {props.videos && props.videos.map((video) => <SingleVideoCard video={video}/>)} */}
      <div style={VideoThumbsContainer}>
        {videoList.length > 0 &&
          videoList.map((video) => <SingleVideoCard video={video} />)}
        {console.log({ videoList })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  videos: state.videos,
  getVideosStart: state.getVideosStart,
  postVideoSuccess: state.postVideoSuccess,
  loginSuccess: state.loginSuccess,
});

export default connect(mapStateToProps, {
  getVideos,
})(withRouter(VideoList));
