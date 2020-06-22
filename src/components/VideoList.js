import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { getVideos } from "../store/actions";
import Video from "./Video";
import style from "styled-components";

const VideoListContainer = style.div`
  width: 50%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const HeroContainer = style.div`
    width: 100%;
    background-color: #000;
    border-top: 2px solid #FCFC0B;
    box-shadow: 0px 10px 23px 0px rgba(0,0,0,0.53);
    margin-bottom: 80px;
`;

const SmallerVideo = style.div`
  width: 40%;
  margin-bottom: 40px;
  background-color: #44E0F6;
  border: 10px solid #44E0F6;
  box-shadow: 10px 10px 0px 0px rgba(125,250,154,1), 10px 10px 23px 2px rgba(0,0,0,0.46);
`;

const VideoList = ({ getVideosStart, videoList, videos, getVideos }) => {
  useEffect(() => {
    getVideos();
  }, []);

  return (
    <>
      <HeroContainer>
        {videos && <Video heroVideo={true} video={videos[0]} />}
      </HeroContainer>
      <VideoListContainer>
        {videos &&
          videos.map((video, index) => {
            if (index > 0) {
              return (
                <SmallerVideo key={video.id}>
                  <Link to={`/videos/${video.id}`}>
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
