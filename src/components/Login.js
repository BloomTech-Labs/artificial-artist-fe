import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { login } from "../store/actions";
import style from "styled-components";

function Login(props) {
  const [creds, setCreds] = useState({
    email: "",
    password: ""
  });

  const handleChange = e => {
    setCreds({
      ...creds,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    props.login(creds, props.history);
  };

  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <img src="images/Logo.svg" />
          <h1>Login</h1>
          <label>email</label>
          <input
            required
            type="text"
            name="email"
            value={creds.email}
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            required
            type="password"
            name="password"
            value={creds.password}
            onChange={handleChange}
          />
          {props.loginStart ? (
            <button type="submit" disabled>
              Loading...
            </button>
          ) : (
            <button type="submit">Login</button>
          )}
          {props.loginError && (
            <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
              There has been an issue logging in. Please check your credentials.
            </p>
          )}
        </form>
      </div>
    </>
  );
}

const mapStateToProps = state => ({
  loginStart: state.loginStart,
  loginError: state.loginError
});

export default connect(
  mapStateToProps,
  { login }
)(withRouter(Login));
