import React from "react";
import { pNotFound } from "./not_found.scss";

export default ({ staticContext = {} }) => {
  staticContext.status = 404;
  return (
    <div className={pNotFound}>
      <h1>Oops, nothing here!</h1>
      <span>404</span>
    </div>
  );
};
