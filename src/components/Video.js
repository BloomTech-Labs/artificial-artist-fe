import React from "react";
import style from "styled-components";
import "../../node_modules/video-react/dist/video-react.css";
import "../App.css";
import { Player } from "video-react";

const videoContainer = {
  maxWidth: "50%",
  width: "-webkit-fill-available",
  left: "calc(50%/2)",
  position: "absolute",
};

const Video = (props) => {
  return (
    <div style={videoContainer}>
      <Player
        playsInline
        poster="/assets/poster.png"
        src={
          props.videoStream
            ? props.videoStream
            : "https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
        }
      />
    </div>
  );
};

export default Video;
