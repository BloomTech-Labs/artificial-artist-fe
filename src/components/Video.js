import React, { useState } from "react";
import "../../node_modules/video-react/dist/video-react.css";
// import { Player, BigPlayButton } from "video-react";
import style from "styled-components";
import ReactPlayer from "react-player/lazy";

const VideoContainer = style.div`
  // width: ${(props) => (props.heroVideo ? "40%" : "100%")};
  width: 100%;
  height: calc(100% - 2px);
  margin: 0 auto;
  display: block;
  position: relative;
`;

const VideoPlayPause = style.img`
  top: calc(50% - 35px);
  left: calc(50% - 35px);
  position: absolute;
  cursor: pointer;
  display: ${(props) => (props.playing ? "none" : "block")};
`;

const ReactPlayerExt = style(ReactPlayer)`
  height: calc(100% + 4px) !important;
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
      <VideoContainer heroVideo={props.heroVideo} onClick={handlePlayPause}>
        <ReactPlayerExt
          playsinline
          config={{ file: { attributes: { poster: props.video.thumbnail } } }}
          playing={playerState.playing}
          controls={playerState.controls}
          width="100%"
          height="100%"
          url={
            props.video
              ? props.video.location
              : `${process.env.REACT_APP_S3VIDEOS}billieeilish--you_should_see_me_in_a_crown-king_me_-coLerbRvgsQ.mp4`
          }
        ></ReactPlayerExt>
        <VideoPlayPause
          playing={playerState.playing}
          src="../images/icon-video-play.svg"
        />
      </VideoContainer>
    </>
  );
};

export default Video;
