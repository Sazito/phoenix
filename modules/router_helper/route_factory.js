import React from "react";
import {Route} from "react-router-dom";
import isNill from "lodash/isNil";
import isArray from 'lodash/isArray';
import filterProps from '../utils/filter_props';
import WithSubRouters from "./with_subrouters";
import WithLayout from "./with_layout";

const RouteFactory = props => {
  const { routes } = props;
  const routerProps = filterProps(props, {include: ['exact', 'path']});
  const layoutProps = filterProps(props, {include: [ 'layout']});
  const componentProps = filterProps(props,
    {exclude: ['component', 'routes','exact', 'path', 'layout']}
  );
  const { component: Component } = props;
  let render;
  if (isNill(routes)) {
    render = prop =>
    (<WithLayout {...layoutProps}>
      {Component && <Component {...prop} {...componentProps} />}
    </WithLayout>);

  }
  if(isArray(routes)) {
    const calculatedRoutes  = routes.map(route => ({...route, path:  `${props.path}${route.path}`}));
    render = prop =>
      (<WithLayout {...layoutProps}>
        <WithSubRouters routes={calculatedRoutes}>
          {Component && <Component {...prop} {...componentProps} />}
        </WithSubRouters>
      </WithLayout>);
  }

  return (
    <Route
      {...routerProps}
      render={render}
    />
  );
};

export default RouteFactory;