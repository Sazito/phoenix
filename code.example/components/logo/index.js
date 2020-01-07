import React from "react";
import style from "./logo.scss";
import logo from "../../assets/images/logo.png";
import { env } from "../../configs";

const Logo = () => {
  return (
    <div className={style.cLogo}>
      <img
        width={120}
        className={style.cLogoImage}
        src={logo}
        alt={env.APP_NAME}
      />
    </div>
  );
};

export default Logo;
