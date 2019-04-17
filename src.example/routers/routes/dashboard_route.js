import Loadable from "react-loadable";

const DashboardRoute = Loadable({
  loader: () => import('../../pages/dashboard_pages/dashboard_page' /* webpackChunkName: "dashboard" */),
  loading: () => null
});

export default DashboardRoute;