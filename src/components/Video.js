import React from "react";
import "../../node_modules/video-react/dist/video-react.css";
import { Player } from "video-react";

const videoContainer = {
  maxWidth: "50%",
  width: "-webkit-fill-available",
  margin: "0 auto",
};

const Video = (props) => {
  console.log("props.video", props.video);
  return (
    <div style={videoContainer}>
      <Player
        playsInline
        src={
          props.video
            ? props.video.location
            : `${process.env.REACT_APP_S3VIDEOS}billieeilish--you_should_see_me_in_a_crown-king_me_-coLerbRvgsQ.mp4`
        }
      />
    </div>
  );
};

export default Video;
