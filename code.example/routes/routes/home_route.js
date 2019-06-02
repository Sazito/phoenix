import Loadable from "react-loadable";

const HomeRoute = Loadable({
  loader: () => import("../../pages/home_page" /* webpackChunkName: "home" */),
  loading: () => null
});

HomeRoute.fetchData = require("../../pages/home_page/prefetch").default;

export default HomeRoute;
