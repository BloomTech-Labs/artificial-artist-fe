import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { TokenChecker } from "../middleware/TokenChecker";
import style from "styled-components";

const Navbar = style.nav`
  margin: 0 auto;
  padding: 80px;
  display: flex;
  flex-direction: column;
`;

const Logo = style(Link)`
  font-family: "Gill Sans Ultra", sans-serif;
  -webkit-text-fill-color: #F14946;
  -webkit-text-stroke-color: #FCFC0B;
  -webkit-text-stroke-width: 2.00px; 
  font-size: 80px;
  text-decoration: none;
  margin-right: auto;
  width: 40%;
`;

const Menu = style.div`
  padding: 80px 0;
  display: flex;
  margin-bottom: auto;
  margin-right: auto;
  justify-content: space-between;
  font-family: "Gibson Bold";
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
  const token = TokenChecker();

  return (
    <Navbar>
      <Logo to="/">The Artificial Artist</Logo>
      {/* display create videos and log out if user has token, else 
            display browse videos, log in, and sign up */}
      {token ? (
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
