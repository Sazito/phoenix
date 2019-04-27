import React from "react";
import RouteFactory from "./route_factory";
import filterProps from "../utils/filter_props";

const WithSubRouters = props => {
  const { children, routes } = props;
  const componentProps = filterProps(props, {
    exclude: ["children", "routes"]
  });
  return (
    <>
      {children}
      {routes.map((route, index) => (
        <RouteFactory key={index} {...route} {...componentProps} />
      ))}
    </>
  );
};

export default WithSubRouters;
