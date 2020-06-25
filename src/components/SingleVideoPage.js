import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { useParams, useRouteMatch, withRouter, Link } from "react-router-dom";
import { getSingleVideo } from "../store/actions";
import Video from "./Video";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import Thumbnail from "./Thumbnail";
import SecondaryNav from "./SecondaryNav";
import style from "styled-components";

const Logo = style(Link)`
    font-family: "Gill Sans Ultra",sans-serif;
    -webkit-text-fill-color: #0E0429;
    -webkit-text-stroke-color: #E4005E;
    -webkit-text-stroke-width: 1.00px;
    font-size: 46px;
    text-decoration: none;
    width: 300px;
    text-align: center;
    margin: 0 auto;
    margin-top: 80px;
    cursor: pointer;
    background-color: transparent;
    border: none;
    transition: all .25s ease-in-out;
    &:hover {
      -webkit-text-stroke-color: #44E0F6;
    }
`;

const PageAlign = style.div`
  display: flex;
`;

const Container = style.div`
  margin: 0 auto;
  width: 60%;
  padding: 20px 0 60px;
`;

const VideoWrapper = style.div`
  background-color: #0E0429;
  width: 50%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VideoContainer = style.div`
  width: 80%;
  background-color: #FCFC0B;
  border: 4px solid #FCFC0B;
  margin: 80px;
  box-shadow: 0 20px 40px 0 rgba(0,0,0,.8);
  margin-bottom: 80px;
`;

const Notices = style.h2`
  font-family: "Gill Sans Ultra", sans-serif;
  -webkit-text-fill-color: #F14946;
  -webkit-text-stroke-color: #FCFC0B;
  -webkit-text-stroke-width: 0.50px; 
  width: 50%;
  font-size: 36px;
  margin: 100px auto;
  display: block;
  padding: 20px 0;
  text-align: center;
`;

const PageContent = style.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 30%;
  color: #2FBCD4;
  text-shadow: 1px 1px 0 #0E0429;
  font-family: "Gill Sans Ultra", sans-serif;
  -webkit-text-fill-color: #F14946;
  -webkit-text-stroke-color: #FCFC0B;
  -webkit-text-stroke-width: 0.30px; 
  h2 {
    font-size: 40px;
  }
  h3 {
    font-size: 20px;
  }
`;

const Text = style.div`
  margin: auto;
  margin-top: 80px;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const SingleVideoPage = (props) => {
  const { videoId } = useParams();
  console.log(videoId);

  useEffect(() => {
    props.getSingleVideo(localStorage.getItem("token"), videoId);
  }, [videoId]);

  return (
    <>
      {props.singleVideo.video_status === "creating" ? (
        <>
          <Container>
            <SecondaryNav />
            <Notices>
              Hang tight for a few minutes, these take a lot of computing power!
            </Notices>
          </Container>
        </>
      ) : props.singleVideo.video_status === "successful" ? (
        <>
          <PageAlign>
            <VideoWrapper>
              <VideoContainer>
                <Video heroVideo={true} video={props.singleVideo} />
              </VideoContainer>
            </VideoWrapper>
            <PageContent>
              <Logo to="/">The Artificial Artist</Logo>
              <Text>
                <h2>{props.singleVideo.video_title}</h2>
                <h3>{props.singleVideo.title}</h3>
                <h3>{props.singleVideo.artist_name}</h3>
              </Text>
            </PageContent>
          </PageAlign>
        </>
      ) : props.singleVideo.video_status === "failed" ? (
        <>
          <Container>
            <SecondaryNav />
            <Notices>
              Something failed, the video will never exist... We're so sorry
              :```(
            </Notices>
          </Container>
        </>
      ) : (
        console.log("end of ternary????")
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  singleVideo: state.singleVideo,
  getSingleVideoStart: state.getSingleVideoStart,
  getSingleVideoSuccess: state.getSingleVideoSuccess,
  getSingleVideoError: state.getSingleVideoError,
});

export default connect(mapStateToProps, { getSingleVideo })(
  withRouter(SingleVideoPage)
);
