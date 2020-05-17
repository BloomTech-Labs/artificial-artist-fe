import React from "react";
import "../../node_modules/video-react/dist/video-react.css";
import "../App.css";
import { Player } from "video-react";

const videoContainer = {
  maxWidth: "50%",
  width: "-webkit-fill-available",
  margin: "0 auto",
};

const Video = (props) => {
  console.log("props.video",props.video)
  return (
    <div style={videoContainer}>
      <Player
        playsInline

        src={
          props.video
            ? props.video.location
            : "https://elasticbeanstalk-us-east-1-427400502172.s3.amazonaws.com/Videosforbackend/TarantulaCrisp.mp4"
        }
      />
    </div>
  );
};

export default Video;
