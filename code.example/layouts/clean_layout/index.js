import React from "react";
import { Link } from "react-router-dom";
import {
  lCleanLayoutNavbar,
  lCleanLayoutNavbarMain,
  lCleanLayoutNavbarExtra
} from "./clean_layout.scss";
import { ROUTE_HOME, ROUTE_LOGIN, ROUTE_DASHBOARD } from "../../consts/routes";
import { withLocale } from "../../../modules/localization";
import LanguageSwitcher from "../../components/language_switcher";

const CleanLayout = ({ children, locale }) => {
  const { __, number, getRoutes } = locale;
  return (
    <>
      <div className={lCleanLayoutNavbar}>
        <div className={lCleanLayoutNavbarMain}>
          <Link to={getRoutes(ROUTE_HOME)}>{__("Home")}</Link>
          <Link to={getRoutes(ROUTE_LOGIN)}>{__("Login")}</Link>
          <Link to={getRoutes(ROUTE_DASHBOARD)}>{__("Dashboard")}</Link>
          <Link to={"/notmatch"}>{number("404")}</Link>
        </div>
        <LanguageSwitcher className={lCleanLayoutNavbarExtra} />
      </div>
      {children}
    </>
  );
};

export default withLocale(CleanLayout);
