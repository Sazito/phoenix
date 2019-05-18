import React from "react";
import { Switch } from "react-router-dom";
import RouteFactory from "../../modules/router_helper/route_factory";

// project routes
import index from "../../code/routes";

const RoutersComponent = () => {
  return (
    <Switch>
      {index.map((route, index) => (
        <RouteFactory key={index} {...route} />
      ))}
    </Switch>
  );
};

export default RoutersComponent;
