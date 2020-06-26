import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { login } from "../store/actions";
import style from "styled-components";

const PageAlign = style.div`
  display: flex;
  min-height: 100vh;
  overflow: hidden;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FormContents = style.div`
  width: 30%;
  padding: 80px;
  margin: auto;
  @media (max-width: 768px) {
    width: 90%;
    padding: 40px;
  }
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
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Header = style.h1`
  font-family: "Gill Sans Ultra", sans-serif;
  -webkit-text-fill-color: #F14946;
  -webkit-text-stroke-color: #FCFC0B;
  -webkit-text-stroke-width: 0.50px; 
`;

const LoginLabel = style.label`
  padding: 10px 15px;
  color: #44E0F6;
  font-size: 18px;
  display: block;
  font-weight: 800;
`;

const LoginInput = style.input`
  padding: 15px 20px;
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

const LoginButton = style.button`
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
  transition: all .25s ease-in-out;
  &:hover {
    background-color: #F14946;
  }
  &:disabled {
    background-color: #0E0429;
  }
`;

function Login(props) {
  const [creds, setCreds] = useState({
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
    props.login(creds, props.history);
  };

  return (
    <>
      <PageAlign>
        <FormContents>
          <Header>Log in</Header>
          <form onSubmit={onSubmit}>
            <LoginLabel>email</LoginLabel>
            <LoginInput
              required
              type="text"
              name="email"
              value={creds.email}
              onChange={handleChange}
            ></LoginInput>
            <LoginLabel>Password</LoginLabel>
            <LoginInput
              required
              type="password"
              name="password"
              value={creds.password}
              onChange={handleChange}
            ></LoginInput>
            {props.loginStart ? (
              <LoginButton type="submit" disabled>
                Loading...
              </LoginButton>
            ) : (
              <LoginButton type="submit">Login</LoginButton>
            )}
            {props.loginError && (
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
  loginStart: state.loginStart,
  loginError: state.loginError,
});

export default connect(mapStateToProps, { login })(withRouter(Login));
