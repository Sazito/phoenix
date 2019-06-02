import Loadable from "react-loadable";

const DashboardRoute = Loadable({
  loader: () =>
    import(
      "../../pages/dashboard_pages/dashboard_settings_page" /* webpackChunkName: "dashboard-settings" */
    ),
  loading: () => null
});

export default DashboardRoute;
