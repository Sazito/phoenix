import Loadable from "react-loadable";

const DashboardRoute = Loadable({
  loader: () =>
    import(
      "../../pages/dashboard_pages/dashboard_profile_page" /* webpackChunkName: "dashboard-profile" */
    ),
  loading: () => null
});

export default DashboardRoute;
