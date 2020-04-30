import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { signup } from "../store/actions";
import style from "styled-components";

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
      <div>
        <form onSubmit={onSubmit}>
          <img src="images/Logo.svg" />
          <h1>Sign Up</h1>
          <label htmlFor="username">username</label>
          <input
            required
            type="text"
            name="username"
            value={creds.username}
            onChange={handleChange}
          ></input>
          <label htmlFor="first_name">first name</label>
          <input
            required
            type="text"
            name="first_name"
            value={creds.first_name}
            onChange={handleChange}
          ></input>
          <label htmlFor="last_name">last name</label>
          <input
            required
            type="text"
            name="last_name"
            value={creds.last_name}
            onChange={handleChange}
          ></input>
          <label htmlFor="email">email</label>
          <input
            required
            type="text"
            name="email"
            value={creds.email}
            onChange={handleChange}
          ></input>
          <label htmlFor="password">Password</label>
          <input
            required
            type="password"
            name="password"
            value={creds.password}
            onChange={handleChange}
          ></input>
          {props.signupStart ? (
            <button type="submit" disabled>
              Loading...
            </button>
          ) : (
            <button type="submit">Sign up</button>
          )}
          {props.signupError && (
            <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
              There has been an issue logging in. Please check your credentials.
            </p>
          )}
        </form>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  signupStart: state.signupStart,
  signupError: state.signupError,
});

export default connect(mapStateToProps, { signup })(withRouter(Signup));
