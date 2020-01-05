export const ROUTE_HOME = "route_home";
export const ROUTE_LOGIN = "route_login";
export const ROUTE_DASHBOARD = "route_dashboard";
export const ROUTE_DASHBOARD_PROFILE = "route_dashboard_pofile";
export const ROUTE_DASHBOARD_SETTINGS = "route_dashboard_settings";

export const ROUTES = {
  [ROUTE_HOME]: "/",
  [ROUTE_LOGIN]: "/login",
  [ROUTE_DASHBOARD]: "/dashboard",
  [ROUTE_DASHBOARD_PROFILE]: "/dashboard/profile",
  [ROUTE_DASHBOARD_SETTINGS]: "/dashboard/settings"
};

import getRoutes from "../../../modules/get_route";
export default getRoutes;
