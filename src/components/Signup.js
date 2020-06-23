import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { signup } from "../store/actions";
import style from "styled-components";

const PageAlign = style.div`
  display: flex;
  min-height: 100vh;
  overflow: hidden;
`;

const FormContents = style.div`
  width: 30%;
  padding: 80px;
`;

const SidebarContents = style.div`
  background-color: #0E0429;
  width: 70%;
  overflow: hidden;
  height: 100vh;
  img {
    margin: 0 auto;
    width: 150%;
    display: block;
  }
`;

const Header = style.h1`
  font-family: "Gill Sans Ultra", sans-serif;
  -webkit-text-fill-color: #F14946;
  -webkit-text-stroke-color: #FCFC0B;
  -webkit-text-stroke-width: 0.50px; 
`;

const SignupLabel = style.label`
  padding: 10px 15px;
  color: #44E0F6;
  font-size: 18px;
  display: block;
  font-weight: 800;
`;

const SignupInput = style.input`
  padding: 10px 15px;
  border: none;
  border-bottom: 2px solid #FCFC0B;
  color: #FCFC0B;
  font-size: 24px;
  border-radius: 30px;
  margin-bottom: 20px;
  background-color: #0E0429;
  display: block;
  width: 100%;
  &:focus {
    border: 2px solid #44E0F6;
    outline: none;
  }
`;

const SignupButton = style.button`
  background-color: #4499F6;
  color: #FCFC0B; 
  border-radius: 30px;
  border: 0;
  width: 100%;
  font-family: "Gibson Bold";
  box-shadow: 0 20px 40px 0 rgba(0,0,0,.4);
  padding: 15px 20px;
  cursor: pointer;
  white-space: nowrap;
  font-size: 26px;
  &:hover {
    background-color: #F14946;
  }
`;

function Signup(props) {
  const [creds, setCreds] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCreds({
      ...creds,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    props.signup(creds, props.history);
  };

  return (
    <>
      <PageAlign>
        <FormContents>
          <Header>Sign Up</Header>
          <form onSubmit={onSubmit}>
            <SignupLabel htmlFor="username">username</SignupLabel>
            <SignupInput
              required
              type="text"
              name="username"
              value={creds.username}
              onChange={handleChange}
            ></SignupInput>
            <SignupLabel htmlFor="first_name">first name</SignupLabel>
            <SignupInput
              required
              type="text"
              name="first_name"
              value={creds.first_name}
              onChange={handleChange}
            ></SignupInput>
            <SignupLabel htmlFor="last_name">last name</SignupLabel>
            <SignupInput
              required
              type="text"
              name="last_name"
              value={creds.last_name}
              onChange={handleChange}
            ></SignupInput>
            <SignupLabel htmlFor="email">email</SignupLabel>
            <SignupInput
              required
              type="text"
              name="email"
              value={creds.email}
              onChange={handleChange}
            ></SignupInput>
            <SignupLabel htmlFor="password">Password</SignupLabel>
            <SignupInput
              required
              type="password"
              name="password"
              value={creds.password}
              onChange={handleChange}
            ></SignupInput>
            {props.signupStart ? (
              <SignupButton type="submit" disabled>
                Loading...
              </SignupButton>
            ) : (
              <SignupButton type="submit">Sign up</SignupButton>
            )}
            {props.signupError && (
              <p
                style={{ color: "red", textAlign: "center", marginTop: "10px" }}
              >
                There has been an issue logging in. Please check your
                credentials.
              </p>
            )}
          </form>
        </FormContents>
        <SidebarContents>
          <img alt="logo" src="/images/face.svg" />
        </SidebarContents>
      </PageAlign>
    </>
  );
}

const mapStateToProps = (state) => ({
  signupStart: state.signupStart,
  signupError: state.signupError,
});

export default connect(mapStateToProps, { signup })(withRouter(Signup));
