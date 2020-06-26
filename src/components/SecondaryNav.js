import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import style from "styled-components";

const Navbar = style.nav`
  margin: 0 auto;
  padding: 10px 0 40px;
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Logo = style(Link)`
    font-family: "Gill Sans Ultra",sans-serif;
    -webkit-text-fill-color: #0E0429;
    -webkit-text-stroke-color: #E4005E;
    -webkit-text-stroke-width: 1.00px;
    font-size: 36px;
    text-decoration: none;
    margin-right: auto;
    width: 25%;
    transition: all .25s ease-in-out;
    &:hover {
      -webkit-text-stroke-color: #44E0F6;
    }
    @media (max-width: 768px) {
      width: 100%;
      text-align: center;
      font-size: 28px;
      margin-right: unset;
    }
`;

const Menu = style.div`
  padding: 30px 0;
  display: flex;
  margin-left: auto;
  justify-content: space-between;
  font-family: "Gibson Bold";
  @media (max-width: 768px) {
    margin-left: unset;
  }
`;

const NavLink = style(Link)`
  color: #4499F6;
  padding: 15px 20px;
  text-decoration: none;
  white-space: nowrap;
  font-size: 26px;
  transition: all .25s ease-in-out;
  &:hover {
    color: #F14946;
  }
`;

const NavButton = style.button`
  color: #4499F6;
  padding: 15px 20px;
  text-decoration: none;
  white-space: nowrap;
  border: 0;
  background-color: transparent;
  font-family: "Gibson Bold";
  cursor: pointer;
  font-size: 26px;
  transition: all .25s ease-in-out;
  &:hover {
    color: #F14946;
  }
`;

const NavLinkButton = style(Link)`
  background-color: #4499F6;
  color: #FCFC0B; 
  border-radius: 30px;
  border: 0;
  font-family: "Gibson Bold";
  text-decoration: none;
  padding: 15px 20px;
  cursor: pointer;
  white-space: nowrap;
  font-size: 26px;
  transition: all .25s ease-in-out;
  &:hover {
    background-color: #F14946;
  }
`;

const Navigation = (props) => {
  const history = useHistory();
  const location = useLocation();
  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    history.push("/login");
  };
  let username = localStorage.getItem("username");
  return (
    <Navbar>
      <Logo to="/">The Artificial Artist</Logo>
      {/* display create videos and log out if user has token, else 
            display browse videos, log in, and sign up */}
      {localStorage.getItem("token") ? (
        <Menu>
          <NavLinkButton to="/create">Create Video</NavLinkButton>
          <NavLink to="/search">Search</NavLink>
          <NavLink to={`/users/${username}`}>Profile</NavLink>
          <NavButton onClick={logout}>Log out</NavButton>
        </Menu>
      ) : (
        <Menu>
          <NavLink to="/search">Search</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLinkButton to="/signup">Sign Up</NavLinkButton>
        </Menu>
      )}
    </Navbar>
  );
};
export default Navigation;
