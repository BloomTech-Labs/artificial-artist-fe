import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { Link, useParams, withRouter } from "react-router-dom";
import { Container } from "reactstrap";
import axios from "axios";
import { getUserVideos } from "../store/actions";

const UserPage = props => {
  const { username } = useParams();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    props.getUserVideos(localStorage.getItem("token"), username);
    /*axios
      .get(`http://localhost:5050/api/users/username/${username}`)
      .then(res => {
        //console.log(res.data[0].id);
        axios
          .get(`http://localhost:5050/api/videos/user/${res.data[0].id}`)
          .then(res => {
            setVideos(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });*/
  }, [username]);

  let greeting;

  if (localStorage.getItem("username") === username) {
    greeting = `Welcome ${username}`;
    console.log("Welcome");
  } else {
    greeting = `${username} Videos`;
    console.log(username);
  }

  return (
    <>
      <Container>
        <div>
          {/* Need to display user's username in Welcome*/}
          <h1>{greeting}</h1>
          <p>
            Now that you're logged in, lets{" "}
            <Link to="/create">create some videos!</Link>
          </p>
          {props.userVideos.map(video => {
            return (
              <>
                <div Key={video.id}>
                  <h1>{video.video_title}</h1>
                  <div>{video.location}</div>
                </div>
              </>
            );
          })}
        </div>
      </Container>
    </>
  );
};

const mapStateToProps = state => ({
  userVideos: state.userVideos,
  getUserVideosStart: state.getUserVideosStart,
  getUserVideosSuccess: state.getUserVideosSuccess,
  getUserVideosError: state.getUserVideosError
});

export default connect(
  mapStateToProps,
  { getUserVideos }
)(withRouter(UserPage));
