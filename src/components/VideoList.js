import React, { useEffect, useState } from "react";
import { connect,useSelector } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { getVideos } from "../store/actions";
import Video from "./Video";
import style from "styled-components";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import axios from "axios";
import { Thumbnail } from "./Thumbnail.js";

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

const VideoList = (props) => {


  const vs = useSelector(state => state.videoList);

  const [videoList, setVideoList] = useState([]);
  console.log("beforeuseeffect","localuseState{videoList}",{ videoList },"reduxstatemachine props.videoList",props.videoList,"useSelector --vs",vs);
  // We might use something like this for when videos get updated, perhaps not though
  // useEffect(() => {
    //     props.getVideos(localStorage.getItem("token"));
    // }, [props.postVideoSuccess]);

    useEffect(() => {
      axios
      .get(`http://localhost:5050/api/videos`)
      .then((res) => setVideoList(res.data.videos))
      .then((_) => console.log({ videoList }))
      .then((_) => props.getVideos);
      console.log("inuseEffect","localuseState{videoList}",{ videoList },"reduxstatemachine props.videoList",props.videoList,"useSelector --vs",vs);
  }, []);

  return (
    <div style={videoListContainer}>
      <Video />

      {/* {props.videos && props.videos.map((video) => <Thumbnail video={video}/>)} */}
      <div style={VideoThumbsContainer}>
        {videoList.length > 0 &&
          videoList.map((video) => (
            <div key={video.id}>
              <Link to={`/videos/${video.id}`}>
                <Thumbnail video={video} />
              </Link>
            </div>
          ))}
        {console.log("line59*****************",{ videoList })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  videos: state.videoList,
  getVideosStart: state.getVideosStart,
  postVideoSuccess: state.postVideoSuccess,
  loginSuccess: state.loginSuccess,
});
console.log("mapstatetoporps.videosline71",mapStateToProps.videos)

export default connect(mapStateToProps, {
  getVideos,
})(withRouter(VideoList));
