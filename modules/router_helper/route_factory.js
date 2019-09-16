import React from "react";
import { Route } from "react-router-dom";
import isNill from "lodash/isNil";
import isArray from "lodash/isArray";
import filterProps from "../utils/filter_props";
import WithSubRouters from "./with_subrouters";
import WithLayout from "./with_layout";
import WithACL from "./with_acl";

const RouteFactory = props => {
  const { routes } = props;
  const routerProps = filterProps(props, { include: ["exact", "path"] });
  const layoutProps = filterProps(props, { include: ["layout"] });
  const aclProps = filterProps(props, { include: ["permissions", "onReject"] });
  const componentProps = filterProps(props, {
    exclude: ["component", "routes", "exact", "path", "layout", "permissions"]
  });
  const { component: Component } = props;
  let render;
  if (isNill(routes)) {
    render = prop => (
      <WithACL {...aclProps}>
        <WithLayout {...layoutProps}>
          {Component && <Component {...prop} {...componentProps} />}
        </WithLayout>
      </WithACL>
    );
  }
  if (isArray(routes)) {
    const calculatedRoutes = routes.map(route => ({
      ...route,
      path: route.path
    }));
    render = prop => (
      <WithACL {...aclProps}>
        <WithLayout {...layoutProps}>
          <WithSubRouters routes={calculatedRoutes}>
            {Component && <Component {...prop} {...componentProps} />}
          </WithSubRouters>
        </WithLayout>
      </WithACL>
    );
  }

  return <Route {...routerProps} render={render} />;
};

export default RouteFactory;
