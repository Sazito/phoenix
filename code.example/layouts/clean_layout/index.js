import React from "react";
import { Link } from "react-router-dom";
import { lCleanLayoutNavbar } from "./clean_layout.scss";
import { ROUTE_HOME, ROUTE_LOGIN, ROUTE_DASHBOARD } from "../../consts/routes";
import { withLocale } from "../../../modules/localization";
import LanguageSwitcher from "../../components/language_switcher";

const CleanLayout = ({ children, locale }) => {
  const { __, getRoutes } = locale;
  return (
    <>
      <div className={lCleanLayoutNavbar}>
        <Link to={getRoutes(ROUTE_HOME)}>{__("Home")}</Link>
        <Link to={getRoutes(ROUTE_LOGIN)}>{__("Login")}</Link>
        <Link to={getRoutes(ROUTE_DASHBOARD)}>{__("Dashboard")}</Link>
        <Link to={"/notmatch"}>{__("404")}</Link>
        <LanguageSwitcher />
      </div>
      {children}
    </>
  );
};

export default withLocale(CleanLayout);
