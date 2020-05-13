import React from "react";
import Video from "./Video"
import style from "styled-components";

const SingleVideoPage = (props) => {
  const singleVideo = props.videos.find(
    (video) => `${video.id}` === props.match.params.id
  );

  return (
    <>
      <Video videoStream={singleVideo.videoStream} />
    </>
  );
};

export default SingleVideoPage;
