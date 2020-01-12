import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const logoutHandler = e => {
    e.preventDefault();
    auth.logout();
    history.push("/");
  };
  return (
    <nav>
      <div className="nav-wrapper blue darken-1" style={{ padding: "0 2rem" }}>
        <a href="/" className="brand-logo">
          Link`s split
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <NavLink to="/create"> Create</NavLink>
          </li>
          <li>
            <NavLink to="/links"> Links</NavLink>
          </li>
          <li>
            <a href="/" onClick={logoutHandler}>
              Log Out
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
