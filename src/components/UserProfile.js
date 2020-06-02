import React from "react";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";

const UserProfile = () => {
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
