import Loadable from "react-loadable";

const LoginRoute = Loadable({
  loader: () =>
    import("../../pages/login_page" /* webpackChunkName: "login" */),
  loading: () => null
});

export default LoginRoute;
