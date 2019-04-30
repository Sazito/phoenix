import React from "react";
import { Link } from "react-router-dom";
import { lCleanLayoutNavbar } from "./clean_layout.scss";

const CleanLayout = ({ children }) => {
  return (
    <>
      <div className={lCleanLayoutNavbar}>
        <Link to={"/"}>Home</Link>
        <Link to={"/login"}>Login</Link>
        <Link to={"/dashboard"}>Dashboard</Link>
        <Link to={"/notmatch"}>404</Link>
      </div>
      {children}
    </>
  );
};

export default CleanLayout;
