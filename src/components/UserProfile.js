import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container } from "reactstrap";
import axios from "axios";

const UserProfile = () => {
  const { username } = useParams();
  //const [userId, setUserId] = useState("");

  axios
    .get(`http://localhost:5050/api/users/username/${username}`)
    .then(res => {
      //console.log(res.data[0].id);
      axios
        .get(`http://localhost:5050/api/videos/user/${res.data[0].id}`)
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });

  return (
    <Container>
      <div>
        {/* Need to display user's username in Welcome*/}
        <h1>Welcome, User!</h1>
      </div>
      <div>
        <p>
          Now that you're logged in, lets{" "}
          <Link to="/create">create some videos!</Link>
        </p>
      </div>
    </Container>
  );
};

export default UserProfile;
