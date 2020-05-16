import React from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import {useSelector} from"react-redux"
import Video from "./Video";

const SingleVideoPage = (props) => {

  const videos = useSelector(state => state.videoList)
  const { videoID } = useParams();
  const correctVideo = videos.find(
    (video) => video.id === Number(videoID)
  );
console.log(correctVideo)
  console.log(props);

  return (
    <>
      <Video video={correctVideo} />
    </>
  );
};

export default SingleVideoPage;
