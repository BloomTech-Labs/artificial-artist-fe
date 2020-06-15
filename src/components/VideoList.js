import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { getVideos } from "../store/actions";
import Video from "./Video";
import style from "styled-components";

const VideoListContainer = style.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const HeroVideo = style.div`
    width: 100%;
    border-top: 2px solid #FCFC0B;
    border-bottom: 2px solid #FCFC0B;
`;

const SmallerVideo = style.div`
  width: 45%;
  margin-bottom: 40px;
  background-color: #44E0F6;
  border: 10px solid #44E0F6;
  box-shadow: 10px 10px 0px 0px rgba(125,250,154,1);
`;

const VideoList = ({ getVideosStart, videoList, videos, getVideos }) => {
  useEffect(() => {
    getVideos();
  }, []);

  return (
    <>
      <HeroVideo></HeroVideo>
      <VideoListContainer>
        {videos &&
          videos.map((video, index) => {
            if (index > 0) {
              return (
                <SmallerVideo>
                  <Link to={`/videos/${video.id}`} key={video.id}>
                    <Video video={video} />
                  </Link>
                </SmallerVideo>
              );
            }
          })}
      </VideoListContainer>
    </>
  );
};

const mapStateToProps = (state) => ({
  getVideosStart: state.getVideosStart,
  postVideoSuccess: state.postVideoSuccess,
  loginSuccess: state.loginSuccess,
  videos: state.videoList,
});

export default connect(mapStateToProps, {
  getVideos,
})(withRouter(VideoList));
