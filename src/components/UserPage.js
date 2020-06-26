import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useParams, withRouter } from "react-router-dom";
import { getUserVideos } from "../store/actions";
import Video from "./Video";
import SecondaryNav from "./SecondaryNav";
import Footer from "./Footer";
import styled from "styled-components";
import { linkSync } from "fs";

const VideoListContainer = styled.div`
  background-color: #0e0429;
`;

const Container = styled.div`
  margin: 0 auto;
  width: 60%;
  padding: 20px 0 60px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (max-width: 768px) {
    width: 90%;
  }
`;

const VideoContainer = styled.div`
  width: 45%;
  @media (max-width: 768px) {
    width: 90%;
  }
`;

const VideoTitle = styled.h3`
  color: #fcfc0b;
  font-size: 24px;
  padding: 20px 0;
`;

const SmallerVideo = styled.div`
  background-color: #44e0f6;
  border: 10px solid #44e0f6;
  box-shadow: 10px 10px 0px 0px #7dfa9a, 0 20px 40px 0 rgba(0, 0, 0, 0.4);
  transition: all 0.25s ease-in-out;
  &:hover {
    background-color: #7dfa9a;
    border: 10px solid #7dfa9a;
    box-shadow: 10px 10px 0px 0px #44e0f6, 0 20px 40px 0 rgba(0, 0, 0, 0.4);
  }
`;

const Greeting = styled.h1`
  font-family: "Gibson Bold";
  width: 100%;
  padding-bottom: 40px;
  text-align: center;
  -webkit-text-fill-color: #7dfa9b;
  -webkit-text-stroke-color: #44e0f6;
  -webkit-text-stroke-width: 1px;
  color: #7dfa9b;
  font-size: 40px;
`;

const CreateGreeting = styled.p`
  text-align: center;
  width: 100%;
  color: aquamarine;
  font-size: 20px;
`;

const StyledLink = styled(Link)`
  text-align: center;
  width: 100%;
  text-decoration: none;
  background: -webkit-linear-gradient(#ffeb3b, #e3005e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 20px;
`;

const UserPage = (props) => {
  const { username } = useParams();

  useEffect(() => {
    props.getUserVideos(localStorage.getItem("token"), username);
  }, [username]);

  let greeting;

  if (localStorage.getItem("username") === username) {
    greeting = `Welcome ${username}`;
    console.log("Welcome");
  } else {
    greeting = `${username} Videos`;
    console.log(username);
  }
  //this if statement will greet a user with a list of their videos, otherwise it will send a prompt to create a video

  return (
    <>
      <Container>
        <SecondaryNav />
      </Container>
      <VideoListContainer>
        <Container>
          <Greeting>{greeting}!</Greeting>
          {props.userVideos && props.userVideos.length > 0 ? (
            props.userVideos.map((video) => {
              return (
                <>
                  <VideoContainer>
                    <SmallerVideo key={video.id}>
                      <Link to={`/videos/${video.id}`}>
                        <Video video={video} />
                      </Link>
                    </SmallerVideo>
                    <VideoTitle>{video.video_title}</VideoTitle>
                  </VideoContainer>
                </>
              );
            })
          ) : (
            <CreateGreeting>
              Looks like you haven't created any videos yet, lets {""}
              <StyledLink to="/create">create some videos!</StyledLink>
            </CreateGreeting>
          )}
        </Container>
      </VideoListContainer>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  userVideos: state.userVideos,
  getUserVideosStart: state.getUserVideosStart,
  getUserVideosSuccess: state.getUserVideosSuccess,
  getUserVideosError: state.getUserVideosError,
});

export default connect(mapStateToProps, { getUserVideos })(
  withRouter(UserPage)
);
