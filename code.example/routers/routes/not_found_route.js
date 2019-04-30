import Loadable from "react-loadable";

const NotFoundRoute = Loadable({
  loader: () =>
    import("../../pages/not_found" /* webpackChunkName: "not-found" */),
  loading: () => null
});

export default NotFoundRoute;
