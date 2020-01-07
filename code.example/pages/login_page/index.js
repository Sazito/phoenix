import React from "react";
import { pLogin } from "./login_page.scss";
import { withLocale } from "../../../modules/localization";

const LoginPage = ({ locale }) => {
  const { __ } = locale;
  return <div className={pLogin}>{__("Coming Soon")}</div>;
};

export default withLocale(LoginPage);
