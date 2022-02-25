import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./nav.css";
const Nav = ({ LoggedIn, setLoggedIn }) => {
  useEffect(() => {
   sessionStorage.getItem("currentUser") ? setLoggedIn(true) :setLoggedIn(false)
 },[setLoggedIn])
  const logoutHandler = () => {
    setLoggedIn(false);
    sessionStorage.clear();
  };

  return (
    <div className="nav">
      <input type="checkbox" id="nav-check" />
      <div className="nav-header">
        <div className="nav-title">JoGeek</div>
      </div>
      <div className="nav-btn">
        <label htmlFor="nav-check">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>

      <div className="nav-links">
        <NavLink to="/" className="item">
          {" "}
          Home
        </NavLink>
        {LoggedIn ? (
          ""
        ) : (
          <NavLink to="/register" className="item">
            Register
          </NavLink>
        )}
        {LoggedIn ? (
          <NavLink to="/logout" className="item" onClick={logoutHandler}>
            Logout
          </NavLink>
        ) : (
          <NavLink to="/login" className="item">
            Login
          </NavLink>
        )}
      </div>
    </div>
    // </div>
  );
};

export default Nav;
