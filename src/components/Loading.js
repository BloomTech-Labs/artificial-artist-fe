import React, { useState, useEffect } from "react";
import style from "styled-components";
import SingleVideoPage from "./SingleVideoPage";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Loading = (props) => {
  const { bgcolor, completed } = props;

  const [videoData, setVideoData] = useState({});
  const location = props.video.location;
  const loading = this.state;

  useEffect(() => {
    axiosWithAuth
      .get("/video/:id")
      .then((res) => {
        console.log(res);
        if ((location.status = loading)) {
          return props.completed;
        } else if ((location.status = "url")) {
          return setVideoData(videoData);
        }
      })
      // .then(video=>{
      //   const videoData = res.data;
      //   setVideoData(videoData);
      // })
      .catch((err) => {
        console.log("Server error while getting video", err);
      });
  });

  return (
    <div>
      <div>
        <span>{`${completed}%`}</span>
      </div>
    </div>
  );
};

export default Loading;
