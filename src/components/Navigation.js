import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { TokenChecker } from "../middleware/TokenChecker";
import style from "styled-components";

const Navbar = style.nav`
  margin: 0 auto;
  padding: 80px;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    padding: 20px 0;
    margin: unset;
  }
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
  @media (max-width: 768px) {
    -webkit-text-stroke-width: 1.00px; 
    font-size: 35px;
    width: 100%;
    margin-right: unset;
    text-align: center;
  }
`;

const SubHead = style.h2`
  padding: 20px 0 0;
  font-family: "Gibson Bold";
  font-size: 28px;
  line-height: 60px;
  -webkit-text-fill-color: #7dfa9b;
  -webkit-text-stroke-color: #44e0f6;
  -webkit-text-stroke-width: 1px;
  color: #7dfa9b;
  a {
    color: #7dfa9b;
  }
  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    font-size: 18x;
    line-height: 34px;
  }
`;

const Menu = style.div`
  padding: 0 0 80px;
  display: flex;
  margin-bottom: auto;
  margin-right: auto;
  justify-content: space-between;
  font-family: "Gibson Bold";
  @media (max-width: 768px) {
    margin-right: unset;
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
  const token = TokenChecker();

  return (
    <Navbar>
      <Logo to="/">The Artificial Artist</Logo>
      <SubHead>
        Create crazy, weird, unsettling, rad,{" "}
        <a
          target="_blank"
          href="https://en.wikipedia.org/wiki/Generative_adversarial_network"
        >
          GAN
        </a>{" "}
        built music videos that will keep you up at night
      </SubHead>
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
