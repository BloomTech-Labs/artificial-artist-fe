import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { login } from "../store/actions";
import style from "styled-components";

const ContentCenter = style.div`
  margin: 0 auto;
  display: block;
  width: 30%;
  padding-bottom: 300px;
`;

const LoginLabel = style.label`
  padding: 10px 15px;
  color: #44E0F6;
  font-size: 18px;
  display: block;
  font-weight: 800;
`;

const LoginInput = style.input`
  padding: 10px 15px;
  border: 2px solid #FCFC0B;
  border-radius: 8px;
  color: #FCFC0B;
  font-size: 24px;
  background-color: #0E0429;
  display: block;
  width: 100%;
  &:focus {
    border: 2px solid #44E0F6;
    outline: none;
  }
`;

const LoginButton = style.button`
  padding: 20px 30px;
  color: #0E0429;
  border-radius: 8px;
  font-size: 18px;
  display: block;
  font-weight: 800;
  width: 100%;
  margin-top: 20px;
  border: 2px solid #FCFC0B;
  cursor: pointer;
  background: rgb(250,112,239);
  background: linear-gradient(180deg, rgba(250,112,239,1) 0%, rgba(254,235,251,1) 100%, rgba(2,0,36,1) 190755%);
  &:hover {
    background: rgb(254,235,251);
    background: radial-gradient(circle, rgba(254,235,251,1) 0%, rgba(250,112,239,1) 100%, rgba(2,0,36,1) 190755%);
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
      <ContentCenter>
        <form onSubmit={onSubmit}>
          <LoginLabel>email</LoginLabel>
          <LoginInput
            required
            type="text"
            name="email"
            value={creds.email}
            onChange={handleChange}
            placeholder="email"
          ></LoginInput>
          <LoginLabel>Password</LoginLabel>
          <LoginInput
            required
            type="password"
            name="password"
            value={creds.password}
            onChange={handleChange}
            placeholder="password"
          ></LoginInput>
          {props.loginStart ? (
            <LoginButton type="submit" disabled>
              Loading...
            </LoginButton>
          ) : (
            <LoginButton type="submit" data-testid="submit">
              Login
            </LoginButton>
          )}
          {props.loginError && (
            <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
              There has been an issue logging in. Please check your credentials.
            </p>
          )}
        </form>
      </ContentCenter>
    </>
  );
}

const mapStateToProps = (state) => ({
  loginStart: state.loginStart,
  loginError: state.loginError,
});

export default connect(mapStateToProps, { login })(withRouter(Login));
