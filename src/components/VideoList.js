import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { getVideos } from "../store/actions";
import Video from "./Video";
import Navigation from "./Navigation";
import Footer from "./Footer";
import style from "styled-components";

const VideoListContainer = style.div`
  width: 50%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

const HeroContainer = style.div`
    width: 60%;
    background-color: #FCFC0B;
    border: 4px solid #FCFC0B;
    margin: 80px;
    box-shadow: 0 20px 40px 0 rgba(0,0,0,.7);
    margin-bottom: 80px;
    @media (max-width: 768px) {
      width: 100%;
      margin: 0px;
      flex-direction: row;
    }
`;

const SmallerVideo = style.div`
  width: 40%;
  margin-bottom: 80px;
  background-color: #44E0F6;
  border: 10px solid #44E0F6;
  box-shadow: 10px 10px 0px 0px #7DFA9A, 0 20px 40px 0 rgba(0,0,0,.4);
  transition: all .25s ease-in-out;
  &:hover {
    background-color: #7DFA9A;
    border: 10px solid #7DFA9A;
    box-shadow: 10px 10px 0px 0px #44E0F6, 0 20px 40px 0 rgba(0,0,0,.4);
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const NavWrapper = style.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 40px;
  }
`;

const VideoList = ({ getVideosStart, videoList, videos, getVideos }) => {
  useEffect(() => {
    getVideos();
  }, []);

  return (
    <>
      <NavWrapper>
        <Navigation heroNav={true} />
        <HeroContainer>
          {videos && <Video heroVideo={true} video={videos[0]} />}
        </HeroContainer>
      </NavWrapper>

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
      <Footer />
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
