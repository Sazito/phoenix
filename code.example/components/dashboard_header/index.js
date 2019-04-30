import React from "react";
import { Link } from "react-router-dom";
import { cDashboardHeader } from "./dashboard_header.scss";

const Header = () => {
  return (
    <div className={cDashboardHeader}>
      <h2>Welcome to dashboard</h2>
      <Link to={"/dashboard/settings"}>Settings</Link>
      <Link to={"/dashboard/profile"}>Profile</Link>
    </div>
  );
};

export default Header;
