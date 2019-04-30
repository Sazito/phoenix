import Loadable from "react-loadable";

const LoginRoute = Loadable({
  loader: () =>
    import("../../pages/login_page" /* webpackChunkName: "login" */),
  loading: () => null
});

LoginRoute.fetchData = require("../../pages/login_page/prefetch").default;

export default LoginRoute;
