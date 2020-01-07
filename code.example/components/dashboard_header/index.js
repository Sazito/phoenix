import React from "react";
import { Link } from "react-router-dom";
import { cDashboardHeader } from "./dashboard_header.scss";
import getRoutes, {
  ROUTE_DASHBOARD_SETTINGS,
  ROUTE_DASHBOARD_PROFILE
} from "../../consts/routes";
import { withLocale } from "../../../modules/localization";

const Header = ({ locale }) => {
  const { __ } = locale;
  return (
    <div className={cDashboardHeader}>
      <h2>Welcome to dashboard</h2>
      <Link to={getRoutes(ROUTE_DASHBOARD_SETTINGS)}>{__("Settings")}</Link>
      <Link to={getRoutes(ROUTE_DASHBOARD_PROFILE)}>{__("Profile")}</Link>
    </div>
  );
};

export default withLocale(Header);
