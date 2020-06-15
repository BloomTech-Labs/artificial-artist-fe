import React, { useState } from "react";
import "../../node_modules/video-react/dist/video-react.css";
// import { Player, BigPlayButton } from "video-react";
import style from "styled-components";
import ReactPlayer from "react-player/lazy";

const VideoContainer = style.div`
  width: 100%;
  position: relative;
`;

const VideoPlayPause = style.img`
  top: calc(50% - 35px);
  left: calc(50% - 35px);
  position: absolute;
  display: ${(props) => (props.playing ? "none" : "flex")};
`;

const Video = (props) => {
  const [playerState, setPlayerState] = useState({
    playing: false,
    controls: false,
  });

  const handlePlayPause = () => {
    setPlayerState({ ...playerState, playing: !playerState.playing });
  };

  return (
    <>
      <VideoContainer onClick={handlePlayPause}>
        <ReactPlayer
          playsinline
          fileConfig={{ attributes: { poster: props.video.thumbnail } }}
          playing={playerState.playing}
          controls={playerState.controls}
          width="100%"
          height="100%"
          url={
            props.video
              ? props.video.location
              : `${process.env.REACT_APP_S3VIDEOS}billieeilish--you_should_see_me_in_a_crown-king_me_-coLerbRvgsQ.mp4`
          }
        ></ReactPlayer>
        <VideoPlayPause
          playing={playerState.playing}
          src="../images/icon-video-play.svg"
        />
      </VideoContainer>
    </>
  );
};

export default Video;
