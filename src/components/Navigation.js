import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";

const Navigation = () => {
  const history = useHistory();
  const location = useLocation();
  const logout = e => {
    e.preventDefault();
    localStorage.clear();
    history.push("/login");
  };
  return (
    <Navbar>
      <NavbarBrand tag={Link} to="/" className="mr-auto navbar-brand">
        Artificial Artist
      </NavbarBrand>
      {/* display create videos and log out if user has token, else 
            display browse videos, log in, and sign up */}
      {localStorage.getItem("token") ? (
        <Nav className="nav-links">
          <NavItem>
            <NavLink
              tag={Link}
              to="/create"
              className={location.pathname === "/create" ? "active" : ""}
            >
              Create Videos
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              tag={Link}
              to="/users/:username"
              className={
                location.pathname === "/users/:username" ? "active" : ""
              }
            >
              Profile
            </NavLink>
          </NavItem>
          <NavItem onClick={logout}>
            <NavLink tag={Link} to="#">
              Log Out
            </NavLink>
          </NavItem>
        </Nav>
      ) : (
        <Nav className="nav-links">
          <NavItem>
            <NavLink
              tag={Link}
              to="/"
              className={location.pathname === "/" ? "active" : ""}
            >
              Browse Videos
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              tag={Link}
              to="/login"
              className={location.pathname === "/login" ? "active" : ""}
            >
              Login
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              tag={Link}
              to="/signup"
              className={location.pathname === "/signup" ? "active" : ""}
            >
              Sign Up
            </NavLink>
          </NavItem>
        </Nav>
      )}
    </Navbar>
  );
};
export default Navigation;
