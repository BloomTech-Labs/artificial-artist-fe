import React from "react";
import "../../node_modules/video-react/dist/video-react.css";
// import { Player, BigPlayButton } from "video-react";
import style from "styled-components";
import ReactPlayer from "react-player/lazy";

const VideoContainer = style.div`
  width: 100%;
`;

const Video = (props) => {
  console.log("props.video", props.video);
  return (
    <>
      <VideoContainer>
        <ReactPlayer
          playsinline
          fileConfig={{ attributes: { poster: props.video.thumbnai } }}
          width="100%"
          height="100%"
          controls="true"
          url={
            props.video
              ? props.video.location
              : `${process.env.REACT_APP_S3VIDEOS}billieeilish--you_should_see_me_in_a_crown-king_me_-coLerbRvgsQ.mp4`
          }
        ></ReactPlayer>
      </VideoContainer>
    </>
  );
};

export default Video;
